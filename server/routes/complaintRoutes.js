const express = require('express');
const router = express.Router();
const { getComplaints, submitComplaint, updateComplaintStatus, deleteComplaint } = require('../controllers/complaintController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getComplaints)
    .post(protect, submitComplaint);

router.route('/:id')
    .put(protect, updateComplaintStatus)
    .delete(protect, deleteComplaint);

module.exports = router;
