import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ onToggleSidebar }) => {
    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <button className="menu-toggle" onClick={onToggleSidebar}>
                ☰
            </button>
            <h1>ResolveX.AI</h1>
            
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ 
                        width: '32px', height: '32px', borderRadius: '10px', 
                        background: 'linear-gradient(135deg, #818cf8, #2dd4bf)', 
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.75rem', fontWeight: '800', color: '#fff'
                    }}>
                        {userInfo?.name?.charAt(0)?.toUpperCase()}
                    </div>
                    <div className="user-badge-text">
                        <p style={{ fontSize: '0.8rem', fontWeight: '700', color: '#f1f5f9', lineHeight: 1.2 }}>{userInfo?.name}</p>
                        <p style={{ fontSize: '0.6rem', color: '#64748b', fontWeight: '500' }}>
                            {userInfo?.role === 'admin' ? 'Administrator' : 'Standard'}
                        </p>
                    </div>
                </div>
                <button 
                    onClick={handleLogout} 
                    style={{ 
                        padding: '0.5rem 1rem', fontSize: '0.7rem', fontWeight: '600',
                        background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', 
                        color: '#94a3b8', borderRadius: '10px', cursor: 'pointer',
                        transition: 'all 0.3s', fontFamily: 'Inter, sans-serif'
                    }}
                    onMouseOver={(e) => { e.target.style.background = 'rgba(251,113,133,0.1)'; e.target.style.borderColor = '#fb7185'; e.target.style.color = '#fb7185'; }}
                    onMouseOut={(e) => { e.target.style.background = 'rgba(255,255,255,0.05)'; e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.color = '#94a3b8'; }}
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
