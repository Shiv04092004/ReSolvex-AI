const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Complaint = require('./models/Complaint');
const { analyzeComplaint } = require('./utils/aiService');

dotenv.config();

const migrateComplaints = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB. Starting Forced Neural Migration...');

        const complaints = await Complaint.find({});
        let updatedCount = 0;

        for (let complaint of complaints) {
            const aiResults = analyzeComplaint(complaint.title, complaint.description);
            // Force replace the object
            await Complaint.updateOne({ _id: complaint._id }, { $set: { aiAnalysis: aiResults } });
            updatedCount++;
        }

        console.log(`Forced Neural Migration Complete! ${updatedCount} logs retroactively analyzed.`);
        process.exit();
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
};

migrateComplaints();
