import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../config';

const ComplaintDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [complaint, setComplaint] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchComplaint = async () => {
            try {
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                const config = {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                };
                const { data } = await axios.get(`${BASE_URL}/api/complaints`, config);
                const found = data.find(c => c._id === id);
                setComplaint(found);
                setLoading(false);
            } catch (error) {
                console.error('Core error');
                setLoading(false);
            }
        };
        fetchComplaint();
    }, [id]);

    const handleDownloadPDF = () => {
        const dateStr = complaint.createdAt 
            ? new Date(complaint.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }) 
            : 'N/A';

        let attachmentHtml = '';
        if (complaint.attachment) {
            if (complaint.attachment.endsWith('.pdf')) {
                attachmentHtml = '<div style="margin:25px 0;padding:15px;background:#f0fdf4;border:1px solid #86efac;border-radius:8px;"><p style="margin:0;color:#166534;font-weight:bold;font-size:13px;">📎 Forensic PDF Document Attached</p></div>';
            } else {
                attachmentHtml = '<div style="margin:25px 0;"><p style="font-size:11px;color:#6366f1;font-weight:bold;letter-spacing:1px;margin:0 0 10px 0;">📸 FORENSIC EVIDENCE</p><img src="' + BASE_URL + complaint.attachment + '" style="max-width:100%;border-radius:8px;border:2px solid #e0e7ff;" /></div>';
            }
        }

        const statusColor = complaint.status === 'resolved' ? '#10b981' : complaint.status === 'pending' ? '#f59e0b' : '#ef4444';
        const statusBg = complaint.status === 'resolved' ? '#ecfdf5' : complaint.status === 'pending' ? '#fffbeb' : '#fef2f2';

        const content = 
            '<div style="max-width:720px;margin:0 auto;font-family:Segoe UI,Arial,sans-serif;">' +

            // === HEADER BANNER ===
            '<div style="background:linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%);padding:35px 40px;border-radius:12px 12px 0 0;margin-bottom:0;">' +
                '<table style="width:100%;"><tr>' +
                    '<td style="vertical-align:middle;">' +
                        '<h1 style="font-size:26px;font-weight:900;color:#fff;margin:0 0 4px 0;letter-spacing:2px;">RESOLVEX<span style="color:#818cf8;">.AI</span></h1>' +
                        '<p style="font-size:10px;color:#a5b4fc;letter-spacing:3px;margin:0;">INCIDENT DOSSIER REPORT</p>' +
                    '</td>' +
                    '<td style="text-align:right;vertical-align:middle;">' +
                        '<div style="background:' + statusBg + ';border:1px solid ' + statusColor + ';border-radius:20px;padding:6px 16px;display:inline-block;">' +
                            '<span style="font-size:11px;font-weight:800;color:' + statusColor + ';">' + complaint.status.toUpperCase() + '</span>' +
                        '</div>' +
                    '</td>' +
                '</tr></table>' +
            '</div>' +

            // === META STRIP ===
            '<div style="background:#eef2ff;padding:15px 40px;border-bottom:2px solid #c7d2fe;">' +
                '<table style="width:100%;"><tr>' +
                    '<td><span style="font-size:10px;color:#6366f1;font-weight:700;">[ ' + (complaint?.aiAnalysis?.category || 'GENERAL').toUpperCase() + ' ]</span></td>' +
                    '<td style="text-align:center;"><span style="font-size:10px;color:#64748b;">📅 Filed: ' + dateStr + '</span></td>' +
                    '<td style="text-align:right;"><span style="font-size:9px;color:#94a3b8;">ID: ' + complaint._id + '</span></td>' +
                '</tr></table>' +
            '</div>' +

            // === BODY ===
            '<div style="padding:30px 40px;background:#fff;">' +

                // Title
                '<h2 style="font-size:22px;font-weight:800;color:#1e293b;margin:0 0 25px 0;padding-bottom:15px;border-bottom:2px solid #e2e8f0;">' + complaint.title.toUpperCase() + '</h2>' +

                // Description
                '<div style="margin-bottom:25px;">' +
                    '<p style="font-size:11px;color:#6366f1;font-weight:700;letter-spacing:1px;margin:0 0 10px 0;">INCIDENT DESCRIPTION</p>' +
                    '<div style="background:linear-gradient(135deg, #faf5ff 0%, #f0f9ff 100%);padding:20px 25px;border-left:4px solid #6366f1;border-radius:0 8px 8px 0;">' +
                        '<p style="font-size:14px;line-height:1.8;color:#334155;margin:0;">' + complaint.description + '</p>' +
                    '</div>' +
                '</div>' +

                attachmentHtml +

                // AI Analysis Cards
                '<table style="width:100%;margin-top:20px; page-break-inside: avoid; break-inside: avoid;"><tr>' +
                    '<td style="vertical-align:top;width:65%;padding-right:10px;">' +
                        '<div style="background:linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%);padding:22px;border-radius:10px;border:1px solid #c7d2fe;height:100%;">' +
                            '<p style="font-size:10px;color:#4338ca;font-weight:800;letter-spacing:1px;margin:0 0 10px 0;">🧠 AI SUGGESTED FIX</p>' +
                            '<p style="font-size:13px;line-height:1.7;color:#3730a3;margin:0;">' + (complaint?.aiAnalysis?.suggestedFix || 'N/A') + '</p>' +
                        '</div>' +
                    '</td>' +
                    '<td style="vertical-align:top;width:35%;">' +
                        '<div style="background:linear-gradient(135deg, #fef2f2 0%, #fff1f2 100%);padding:22px;border-radius:10px;border:1px solid #fecaca;text-align:center;height:100%;">' +
                            '<p style="font-size:10px;color:#991b1b;font-weight:800;letter-spacing:1px;margin:0 0 10px 0;">⚡ PRIORITY</p>' +
                            '<p style="font-size:28px;font-weight:900;color:#dc2626;margin:0;">' + (complaint?.aiAnalysis?.priority || 'N/A').toUpperCase() + '</p>' +
                        '</div>' +
                    '</td>' +
                '</tr></table>' +

            '</div>' +

            // === FOOTER ===
            '<div style="background:linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);padding:18px 40px;border-radius:0 0 12px 12px;text-align:center;">' +
                '<p style="font-size:9px;color:#a5b4fc;margin:0;letter-spacing:1px;">Generated by ResolveX.AI Neural Engine &bull; ' + new Date().toLocaleString() + '</p>' +
            '</div>' +

            '</div>';

        // Automatically download as PDF
        const element = document.createElement('div');
        element.innerHTML = `
            <div style="background:#f1f5f9;padding:40px;margin:0;font-family:Inter,sans-serif;">
                ${content}
            </div>
        `;
        
        const opt = {
            margin:       0.4,
            filename:     `Dossier_${complaint.title.replace(/\s+/g, '_')}.pdf`,
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, useCORS: true, allowTaint: true },
            jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        import('html2pdf.js').then((html2pdf) => {
            html2pdf.default().set(opt).from(element).save();
        });
    };

    if (loading) return <div className="dashboard"><p className="text-gradient" style={{ padding: '3rem', fontSize: '1.2rem', fontWeight: 'bold' }}>Loading report...</p></div>;

    const statusColors = {
        pending: { color: '#fbbf24', bg: 'rgba(251,191,36,0.1)', border: 'rgba(251,191,36,0.2)' },
        resolved: { color: '#2dd4bf', bg: 'rgba(45,212,191,0.1)', border: 'rgba(45,212,191,0.2)' },
        'in-progress': { color: '#818cf8', bg: 'rgba(129,140,248,0.1)', border: 'rgba(129,140,248,0.2)' }
    };
    const status = statusColors[complaint?.status] || statusColors.pending;

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    return (
        <div className="dashboard" style={{ padding: '2.5rem 3rem' }}>
            <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '2rem' }}>
                <button 
                    onClick={() => navigate('/my-complaints')} 
                    style={{ 
                        fontSize: '0.75rem', padding: '0.6rem 1.2rem', fontWeight: '600',
                        background: 'rgba(255,255,255,0.04)', border: '1px solid var(--glass-border)', 
                        color: '#94a3b8', borderRadius: '10px', cursor: 'pointer', fontFamily: 'Inter, sans-serif'
                    }}
                >
                    ← Back
                </button>
                {userInfo?.role === 'admin' && (
                    <button 
                        onClick={handleDownloadPDF} 
                        style={{ 
                            fontSize: '0.75rem', padding: '0.6rem 1.2rem', fontWeight: '700',
                            background: 'linear-gradient(135deg, #2dd4bf, #14b8a6)', border: 'none', 
                            color: '#fff', borderRadius: '10px', cursor: 'pointer', fontFamily: 'Inter, sans-serif'
                        }}
                    >
                        📄 Export PDF
                    </button>
                )}
            </div>

            <div className="prism-card" style={{ maxWidth: '1000px', padding: '3rem' }}>
                <header style={{ marginBottom: '2.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <span style={{ fontSize: '0.65rem', fontWeight: '700', color: '#818cf8', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                            {complaint?.aiAnalysis?.category || 'General'}
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <span style={{ 
                                fontSize: '0.6rem', fontWeight: '700', padding: '4px 10px',
                                background: status.bg, border: `1px solid ${status.border}`,
                                color: status.color, borderRadius: '20px', textTransform: 'uppercase'
                            }}>
                                {complaint.status}
                            </span>
                            <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>ID: {complaint._id}</span>
                        </div>
                    </div>
                    <h1 className="text-gradient" style={{ fontSize: '2rem', fontWeight: '800' }}>{complaint.title}</h1>
                </header>

                <section style={{ marginBottom: '2.5rem' }}>
                    <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: '600', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>
                        Incident Description
                    </p>
                    <div style={{ padding: '1.5rem', background: 'rgba(129,140,248,0.04)', border: '1px solid rgba(129,140,248,0.1)', borderRadius: '12px', borderLeft: '3px solid #818cf8' }}>
                        <p style={{ color: 'var(--text-primary)', fontSize: '0.95rem', lineHeight: '1.8' }}>
                            {complaint.description}
                        </p>
                    </div>
                </section>

                {complaint.attachment && (
                    <div style={{ marginBottom: '2.5rem' }}>
                        <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: '600', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>
                            📸 Forensic Evidence
                        </p>
                        {complaint.attachment.endsWith('.pdf') ? (
                            <a href={`${BASE_URL}${complaint.attachment}`} target="_blank" rel="noreferrer" style={{ color: '#818cf8', fontWeight: '600' }}>
                                View PDF Document →
                            </a>
                        ) : (
                            <img src={`${BASE_URL}${complaint.attachment}`} alt="Evidence" style={{ maxWidth: '100%', borderRadius: '12px', border: '1px solid var(--glass-border)' }} />
                        )}
                    </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', borderTop: '1px solid var(--glass-border)', paddingTop: '2rem' }}>
                    <div style={{ padding: '1.5rem', background: 'rgba(129,140,248,0.06)', border: '1px solid rgba(129,140,248,0.12)', borderRadius: '12px' }}>
                        <h4 style={{ color: '#818cf8', fontSize: '0.7rem', marginBottom: '0.8rem', fontWeight: '700', letterSpacing: '0.05em' }}>🧠 AI Suggested Fix</h4>
                        <p style={{ fontSize: '0.9rem', lineHeight: '1.7', color: 'var(--text-secondary)' }}>{complaint?.aiAnalysis?.suggestedFix}</p>
                    </div>
                    <div style={{ padding: '1.5rem', background: 'rgba(251,113,133,0.06)', border: '1px solid rgba(251,113,133,0.12)', borderRadius: '12px', textAlign: 'center' }}>
                        <h4 style={{ color: '#fb7185', fontSize: '0.7rem', marginBottom: '0.8rem', fontWeight: '700', letterSpacing: '0.05em' }}>⚡ Priority Level</h4>
                        <p style={{ fontSize: '2rem', fontWeight: '900', color: '#fb7185' }}>{complaint?.aiAnalysis?.priority?.toUpperCase()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComplaintDetails;
