import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../config';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user', adminCode: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post(`${BASE_URL}/api/auth/register`, formData);
            alert('Account created successfully! Please sign in.');
            navigate('/login');
        } catch (error) {
            alert(error.response?.data?.message || 'Registration failed');
        }
        setLoading(false);
    };

    return (
        <div className="auth-container">
            <div className="prism-box">
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <h2 className="text-gradient" style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>Create Account</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Join the ResolveX platform</p>
                </div>
                <form onSubmit={handleSubmit} style={{ background: 'transparent', border: 'none', boxShadow: 'none', padding: 0, margin: 0, maxWidth: '100%' }}>
                    <div style={{ marginBottom: '1.2rem' }}>
                        <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: '600', letterSpacing: '0.05em', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Full Name</label>
                        <input 
                            type="text" 
                            placeholder="John Doe" 
                            className="prism-input"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                            autoComplete="off"
                        />
                    </div>
                    <div style={{ marginBottom: '1.2rem' }}>
                        <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: '600', letterSpacing: '0.05em', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Email</label>
                        <input 
                            type="email" 
                            placeholder="your@email.com" 
                            className="prism-input"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            autoComplete="off"
                        />
                    </div>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: '600', letterSpacing: '0.05em', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Password</label>
                        <input 
                            type="password" 
                            placeholder="••••••••" 
                            className="prism-input"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                            autoComplete="new-password"
                        />
                    </div>
                    
                    <div style={{ 
                        marginBottom: formData.role === 'admin' ? '1rem' : '2rem', display: 'flex', alignItems: 'center', gap: '10px',
                        padding: '1rem', background: 'rgba(129,140,248,0.06)', borderRadius: '12px',
                        border: '1px solid rgba(129,140,248,0.1)'
                    }}>
                        <input 
                            type="checkbox" 
                            id="adminToggle"
                            checked={formData.role === 'admin'}
                            onChange={(e) => setFormData({ ...formData, role: e.target.checked ? 'admin' : 'user' })}
                            style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: '#818cf8' }}
                        />
                        <label htmlFor="adminToggle" style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', cursor: 'pointer', fontWeight: '500' }}>
                            Register as <span style={{ color: '#818cf8', fontWeight: '700' }}>Administrator</span>
                        </label>
                    </div>

                    {formData.role === 'admin' && (
                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', color: '#fb7185', fontSize: '0.7rem', fontWeight: '600', letterSpacing: '0.05em', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Admin Secret Code</label>
                            <input 
                                type="password" 
                                placeholder="Enter authorization code" 
                                className="prism-input"
                                value={formData.adminCode}
                                onChange={(e) => setFormData({ ...formData, adminCode: e.target.value })}
                                required
                                style={{ borderColor: 'rgba(251,113,133,0.3)' }}
                            />
                        </div>
                    )}

                    <button type="submit" className="prism-button" style={{ width: '100%' }} disabled={loading}>
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                    <p style={{ marginTop: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                        Already have an account? <a href="/login" style={{ color: 'var(--accent-indigo)', textDecoration: 'none', fontWeight: '600' }}>Sign in</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;
