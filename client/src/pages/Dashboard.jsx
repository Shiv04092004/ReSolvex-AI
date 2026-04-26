import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const Dashboard = () => {
    const [stats, setStats] = useState({ total: 0, resolved: 0, pending: 0 });
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                };
                const { data } = await axios.get(`${BASE_URL}/api/complaints`, config);
                const resolved = data.filter(c => c.status === 'resolved').length;
                const pending = data.filter(c => c.status === 'pending').length;
                setStats({ total: data.length, resolved, pending });
            } catch (error) {
                console.error('Core sync error');
            }
        };
        fetchStats();
    }, [userInfo.token]);

    const chartData = [
        { name: 'Total', count: stats.total },
        { name: 'Pending', count: stats.pending },
        { name: 'Resolved', count: stats.resolved },
    ];

    const statCards = [
        { label: 'Total Threads', value: stats.total, color: '#818cf8', gradient: 'linear-gradient(135deg, rgba(129,140,248,0.15), rgba(129,140,248,0.05))' },
        { label: 'Awaiting Resolution', value: stats.pending, color: '#fbbf24', gradient: 'linear-gradient(135deg, rgba(251,191,36,0.15), rgba(251,191,36,0.05))' },
        { label: 'Resolved', value: stats.resolved, color: '#2dd4bf', gradient: 'linear-gradient(135deg, rgba(45,212,191,0.15), rgba(45,212,191,0.05))' },
    ];

    return (
        <div className="dashboard">
            {/* Welcome Header */}
            <header style={{ marginBottom: '3rem' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                    Welcome back
                </p>
                <h1 className="text-gradient" style={{ fontSize: '2.8rem', fontWeight: '900', marginBottom: '0.5rem' }}>
                    {userInfo?.name || 'Operator'}
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    {userInfo?.role === 'admin' ? '👑 System Administrator' : '🔒 Standard Access'} &nbsp;•&nbsp; Here is your analytics overview
                </p>
            </header>

            {/* Stat Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2.5rem' }}>
                {statCards.map((card, i) => (
                    <div key={i} className="prism-card" style={{ background: card.gradient, borderLeft: `3px solid ${card.color}` }}>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>
                            {card.label}
                        </p>
                        <h2 style={{ fontSize: '3rem', fontWeight: '900', color: card.color, lineHeight: 1 }}>
                            {card.value}
                        </h2>
                    </div>
                ))}
            </div>

            {/* Charts */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div className="prism-card" style={{ height: '400px' }}>
                    <h3 style={{ marginBottom: '1.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                        Trend Analysis
                    </h3>
                    <ResponsiveContainer width="100%" height="85%">
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id="meshGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.04)" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11, fontWeight: 500 }} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
                            <Tooltip 
                                contentStyle={{ background: 'rgba(17,15,36,0.95)', border: '1px solid rgba(129,140,248,0.2)', borderRadius: '12px', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}
                                itemStyle={{ color: '#818cf8' }}
                                labelStyle={{ color: '#f1f5f9', fontWeight: 700 }}
                            />
                            <Area type="monotone" dataKey="count" stroke="#818cf8" strokeWidth={2.5} fillOpacity={1} fill="url(#meshGradient)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <div className="prism-card" style={{ height: '400px' }}>
                    <h3 style={{ marginBottom: '1.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                        Status Distribution
                    </h3>
                    <ResponsiveContainer width="100%" height="85%">
                        <BarChart data={chartData} barCategoryGap="25%">
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.04)" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11, fontWeight: 500 }} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
                            <Tooltip 
                                cursor={{ fill: 'rgba(129,140,248,0.06)', radius: 8 }}
                                contentStyle={{ background: 'rgba(17,15,36,0.95)', border: '1px solid rgba(129,140,248,0.2)', borderRadius: '12px', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}
                                itemStyle={{ color: '#2dd4bf' }}
                                labelStyle={{ color: '#f1f5f9', fontWeight: 700 }}
                            />
                            <Bar dataKey="count" fill="url(#barGrad)" radius={[8, 8, 0, 0]} barSize={50}>
                                {chartData.map((entry, index) => {
                                    const colors = ['#818cf8', '#fbbf24', '#2dd4bf'];
                                    return <rect key={index} fill={colors[index]} />;
                                })}
                            </Bar>
                            <defs>
                                <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#818cf8" />
                                    <stop offset="100%" stopColor="#6366f1" />
                                </linearGradient>
                            </defs>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
