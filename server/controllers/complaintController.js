const Complaint = require('../models/Complaint');
const { analyzeComplaint } = require('../utils/aiService');

const getComplaints = async (req, res) => {
    try {
        let complaints;
        if (req.user.role === 'admin') {
            complaints = await Complaint.find({});
        } else {
            complaints = await Complaint.find({ userId: req.user._id });
        }
        res.status(200).json(complaints);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const submitComplaint = async (req, res) => {
    try {
        const { title, description, attachment } = req.body;
        
        // AI Neural Analysis
        const aiResults = analyzeComplaint(title, description);

        const complaint = await Complaint.create({
            userId: req.user._id,
            title,
            description,
            attachment,
            status: 'pending',
            aiAnalysis: aiResults
        });

        res.status(201).json(complaint);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateComplaintStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const complaint = await Complaint.findById(req.params.id);

        if (!complaint) return res.status(404).json({ message: 'Complaint not found' });
        
        if (req.user.role !== 'admin' && complaint.userId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        complaint.status = status;
        await complaint.save();
        res.json(complaint);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteComplaint = async (req, res) => {
    try {
        const complaint = await Complaint.findById(req.params.id);

        if (!complaint) return res.status(404).json({ message: 'Complaint not found' });
        
        if (req.user.role !== 'admin' && complaint.userId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await complaint.deleteOne();
        res.json({ message: 'Complaint removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getComplaints, submitComplaint, updateComplaintStatus, deleteComplaint };
