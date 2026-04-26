const express = require('express');
const multer = require('multer');
const path = require('path');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ 
    storage,
    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg|png|pdf/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Images and PDFs only!');
        }
    }
});

router.post('/', protect, upload.single('forensicFile'), (req, res) => {
    res.send(`/${req.file.path.replace('\\', '/')}`);
});

module.exports = router;
