import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../config';

const SubmitComplaint = () => {
    const [formData, setFormData] = useState({ title: '', description: '' });
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

            let attachmentUrl = null;

            if (file) {
                const uploadData = new FormData();
                uploadData.append('forensicFile', file);
                const uploadConfig = {
                    headers: { 
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${userInfo.token}` 
                    }
                };
                const { data } = await axios.post(`${BASE_URL}/api/upload`, uploadData, uploadConfig);
                attachmentUrl = data;
            }

            const finalData = { ...formData, attachment: attachmentUrl };
            await axios.post(`${BASE_URL}/api/complaints`, finalData, config);
            
            setUploading(false);
            navigate('/my-complaints');
        } catch (error) {
            setUploading(false);
            alert('Submission failed: ' + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div className="submit-complaint" style={{ display: 'flex', justifyContent: 'center', paddingTop: '2rem' }}>
            <div className="prism-box" style={{ maxWidth: '800px', width: '100%' }}>
                <div style={{ marginBottom: '2.5rem' }}>
                    <h2 className="text-gradient" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Submit New Report</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Describe the incident and our AI will analyze it automatically</p>
                </div>
                
                <form onSubmit={handleSubmit} style={{ background: 'transparent', border: 'none', padding: 0 }}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: '600', letterSpacing: '0.05em', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                            Report Title
                        </label>
                        <input 
                            type="text" 
                            placeholder="Brief summary of the incident..." 
                            className="prism-input"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                        />
                    </div>
                    
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: '600', letterSpacing: '0.05em', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                            Attach Evidence (Optional)
                        </label>
                        <input 
                            type="file" 
                            onChange={(e) => setFile(e.target.files[0])}
                            className="prism-input"
                            style={{ padding: '0.8rem' }}
                            accept="image/*,.pdf"
                        />
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: '600', letterSpacing: '0.05em', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                            Full Description
                        </label>
                        <textarea 
                            placeholder="Provide a detailed description of the incident..." 
                            className="prism-input"
                            rows="7"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            required
                            style={{ resize: 'vertical' }}
                        ></textarea>
                    </div>
                    <button type="submit" className="prism-button" style={{ width: '100%' }} disabled={uploading}>
                        {uploading ? '⏳ Uploading & Analyzing...' : '🚀 Submit Report'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SubmitComplaint;
