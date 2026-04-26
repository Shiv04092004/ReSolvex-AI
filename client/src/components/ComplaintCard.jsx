import React from 'react';

const ComplaintCard = ({ complaint, onResolve, onDelete }) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    
    const statusColors = {
        pending: { color: '#fbbf24', bg: 'rgba(251,191,36,0.1)', border: 'rgba(251,191,36,0.2)' },
        resolved: { color: '#2dd4bf', bg: 'rgba(45,212,191,0.1)', border: 'rgba(45,212,191,0.2)' },
        'in-progress': { color: '#818cf8', bg: 'rgba(129,140,248,0.1)', border: 'rgba(129,140,248,0.2)' }
    };
    const status = statusColors[complaint.status] || statusColors.pending;

    return (
        <div className="prism-card" style={{ marginBottom: '1.2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.2rem' }}>
                <div>
                    <span style={{ 
                        fontSize: '0.65rem', fontWeight: '700', color: '#818cf8', 
                        letterSpacing: '0.08em', textTransform: 'uppercase'
                    }}>
                        {complaint?.aiAnalysis?.category || 'Uncategorized'}
                    </span>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: '#f1f5f9', marginTop: '0.3rem' }}>
                        {complaint?.title}
                    </h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                    <span style={{ 
                        fontSize: '0.6rem', fontWeight: '700', padding: '4px 10px',
                        background: status.bg, border: `1px solid ${status.border}`,
                        color: status.color, borderRadius: '20px', textTransform: 'uppercase'
                    }}>
                        {complaint.status}
                    </span>
                    <span style={{ fontSize: '0.6rem', color: '#fb7185', fontWeight: '700' }}>
                        {complaint?.aiAnalysis?.priority?.toUpperCase()}
                    </span>
                </div>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                {complaint?.description?.substring(0, 150)}...
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid var(--glass-border)' }}>
                <div 
                    onClick={() => window.location.href = `/complaint/${complaint._id}`}
                    style={{ 
                        fontSize: '0.75rem', color: '#818cf8', cursor: 'pointer', fontWeight: '600',
                        display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.3s'
                    }}
                >
                    View Details →
                </div>
                <div style={{ display: 'flex', gap: '0.8rem' }}>
                    {userInfo?.role === 'admin' && (
                        <>
                            {complaint.status !== 'resolved' ? (
                                <button 
                                    onClick={() => onResolve(complaint._id)}
                                    style={{ 
                                        fontSize: '0.65rem', padding: '0.5rem 1rem', fontWeight: '600',
                                        background: 'rgba(45,212,191,0.1)', border: '1px solid rgba(45,212,191,0.2)', 
                                        color: '#2dd4bf', borderRadius: '8px', cursor: 'pointer',
                                        fontFamily: 'Inter, sans-serif', transition: 'all 0.3s'
                                    }}
                                >
                                    ✓ Resolve
                                </button>
                            ) : (
                                <button 
                                    onClick={() => onDelete(complaint._id)}
                                    style={{ 
                                        fontSize: '0.65rem', padding: '0.5rem 1rem', fontWeight: '600',
                                        background: 'rgba(251,113,133,0.1)', border: '1px solid rgba(251,113,133,0.2)', 
                                        color: '#fb7185', borderRadius: '8px', cursor: 'pointer',
                                        fontFamily: 'Inter, sans-serif', transition: 'all 0.3s'
                                    }}
                                >
                                    🗑 Delete
                                </button>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ComplaintCard;
