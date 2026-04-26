const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['pending', 'in-progress', 'resolved'], default: 'pending' },
    attachment: { type: String, default: null },
    aiAnalysis: {
        category: { type: String, default: 'Uncategorized' },
        priority: { type: String, default: 'Standard' },
        suggestedFix: { type: String, default: 'AI analysis in progress...' }
    },
}, { timestamps: true });

module.exports = mongoose.model('Complaint', complaintSchema);
