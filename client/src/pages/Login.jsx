import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../config';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await axios.post(`${BASE_URL}/api/auth/login`, formData);
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate('/dashboard');
        } catch (error) {
            alert(error.response?.data?.message || 'Authentication failed');
        }
        setLoading(false);
    };

    return (
        <div className="auth-container">
            <div className="prism-box">
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <h2 className="text-gradient" style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>Welcome Back</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Sign in to your ResolveX account</p>
                </div>
                <form onSubmit={handleSubmit} style={{ background: 'transparent', border: 'none', boxShadow: 'none', padding: 0, margin: 0, maxWidth: '100%' }}>
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
                    <div style={{ marginBottom: '2rem' }}>
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
                    <button type="submit" className="prism-button" style={{ width: '100%' }} disabled={loading}>
                        {loading ? 'Authenticating...' : 'Sign In'}
                    </button>
                    <p style={{ marginTop: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                        New here? <a href="/register" style={{ color: 'var(--accent-indigo)', textDecoration: 'none', fontWeight: '600' }}>Create an account</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
