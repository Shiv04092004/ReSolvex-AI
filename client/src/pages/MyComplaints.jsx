import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config';
import ComplaintCard from '../components/ComplaintCard';

const MyComplaints = () => {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState('active');

    const fetchComplaints = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            const { data } = await axios.get(`${BASE_URL}/api/complaints`, config);
            const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setComplaints(sortedData);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch');
            setLoading(false);
        }
    };

    useEffect(() => { fetchComplaints(); }, []);

    const handleResolve = async (id) => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            await axios.put(`${BASE_URL}/api/complaints/${id}`, { status: 'resolved' }, config);
            fetchComplaints();
        } catch (error) { alert('Resolution failed.'); }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this record permanently?")) return;
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            await axios.delete(`${BASE_URL}/api/complaints/${id}`, config);
            fetchComplaints();
        } catch (error) { alert('Deletion failed.'); }
    };

    const filteredComplaints = useMemo(() => {
        return complaints.filter(complaint => {
            const matchesTab = viewMode === 'active' 
                ? complaint.status !== 'resolved' 
                : complaint.status === 'resolved';
            const matchesSearch = 
                complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                complaint.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (complaint.aiAnalysis?.category || '').toLowerCase().includes(searchTerm.toLowerCase());
            return matchesTab && matchesSearch;
        });
    }, [complaints, searchTerm, viewMode]);

    return (
        <div className="my-complaints">
            <header style={{ marginBottom: '2.5rem' }}>
                <h1 className="text-gradient" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                    My Reports
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '2rem' }}>
                    Track and manage all your submitted incident reports
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button 
                            onClick={() => setViewMode('active')}
                            style={{ 
                                padding: '0.6rem 1.2rem', borderRadius: '10px', fontSize: '0.75rem', fontWeight: '600',
                                background: viewMode === 'active' ? 'linear-gradient(135deg, #818cf8, #6366f1)' : 'rgba(255,255,255,0.04)',
                                border: viewMode === 'active' ? 'none' : '1px solid var(--glass-border)',
                                color: '#fff', cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.3s'
                            }}
                        >
                            Active
                        </button>
                        <button 
                            onClick={() => setViewMode('resolved')}
                            style={{ 
                                padding: '0.6rem 1.2rem', borderRadius: '10px', fontSize: '0.75rem', fontWeight: '600',
                                background: viewMode === 'resolved' ? 'linear-gradient(135deg, #2dd4bf, #14b8a6)' : 'rgba(255,255,255,0.04)',
                                border: viewMode === 'resolved' ? 'none' : '1px solid var(--glass-border)',
                                color: '#fff', cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.3s'
                            }}
                        >
                            Resolved
                        </button>
                    </div>

                    <input 
                        type="text" 
                        placeholder="Search reports..." 
                        className="prism-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ width: '300px', padding: '0.7rem 1rem', fontSize: '0.8rem' }}
                    />
                </div>
            </header>

            {loading ? (
                <p className="text-gradient" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Loading reports...</p>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '1.5rem' }}>
                    {filteredComplaints.length === 0 ? (
                        <div className="prism-card" style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '4rem' }}>
                            <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
                                {searchTerm ? 'No reports match your search' : 'No reports in this section'}
                            </p>
                        </div>
                    ) : (
                        filteredComplaints.map((complaint) => (
                            <ComplaintCard 
                                key={complaint._id} 
                                complaint={complaint} 
                                onResolve={handleResolve} 
                                onDelete={handleDelete}
                            />
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default MyComplaints;
