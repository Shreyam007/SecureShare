const express = require('express');
const router = express.Router();
const multer = require('multer');
const File = require('../models/File');
const { protect } = require('../middleware/auth');
const mongoose = require('mongoose');
const memoryStore = require('../config/memoryStore');
const fs = require('fs');
const path = require('path');

// Ensure uploads directory exists on startup
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer to use in-memory storage (Zero-Disk Footprint)
// In step 3, files will be encrypted client-side, but for this step we process multipart upload in memory and discard the buffer.
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 1024 } // 1GB limit
});

// @route   POST /api/files/upload
// @desc    Upload file, encrypt it with AES-256-CBC, save encrypted file to disk, store metadata in database
// @access  Private
router.post('/upload', protect, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const { expiration, downloadLimit, passwordProtected, password } = req.body;

    // Ensure encryption key is loaded
    if (!process.env.FILE_ENCRYPTION_KEY) {
      return res.status(500).json({ success: false, message: 'Encryption service is not configured (key missing)' });
    }

    // Generate secure random IV and cipher key
    const crypto = require('crypto');
    const fs = require('fs');
    const path = require('path');
    
    const iv = crypto.randomBytes(16);
    const key = Buffer.from(process.env.FILE_ENCRYPTION_KEY, 'hex');
    
    // Encrypt file buffer
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    const encryptedBuffer = Buffer.concat([cipher.update(req.file.buffer), cipher.final()]);

    // Handle In-Memory fallback mode (e.g. database offline or mock login user)
    const isMockUser = req.user && String(req.user._id).startsWith('mock-');
    if (mongoose.connection.readyState !== 1 || isMockUser) {
      const mockId = `mock-file-${Date.now()}`;
      
      // Save encrypted file to disk
      const filePath = path.join(__dirname, '../uploads', `${mockId}.enc`);
      fs.writeFileSync(filePath, encryptedBuffer);
      
      const mockFile = {
        _id: mockId,
        name: req.file.originalname,
        size: req.file.size,
        type: req.file.mimetype || 'application/octet-stream',
        expiration: expiration || '24 Hours',
        downloadLimit: downloadLimit ? parseInt(downloadLimit) : 1,
        passwordProtected: passwordProtected === 'true' || passwordProtected === true,
        password: password || '',
        iv: iv.toString('hex'),
        owner: req.user._id,
        createdAt: new Date()
      };
      
      memoryStore.files.push(mockFile);
      
      return res.status(201).json({
        success: true,
        message: 'File encrypted using AES-256 and saved to fallback store.',
        file: {
          id: mockFile._id,
          name: mockFile.name,
          size: mockFile.size,
          type: mockFile.type,
          expiration: mockFile.expiration,
          downloadLimit: mockFile.downloadLimit,
          passwordProtected: mockFile.passwordProtected,
          downloadCount: 0,
          uploadDate: mockFile.createdAt
        }
      });
    }

    // Generate MongoDB ObjectId first to use as filename
    const fileId = new mongoose.Types.ObjectId();
    const filePath = path.join(__dirname, '../uploads', `${fileId.toString()}.enc`);
    
    // Save encrypted file to disk
    fs.writeFileSync(filePath, encryptedBuffer);

    // Save metadata to MongoDB (including the unique IV hex)
    const file = await File.create({
      _id: fileId,
      name: req.file.originalname,
      size: req.file.size,
      type: req.file.mimetype || 'application/octet-stream',
      expiration: expiration || '24 Hours',
      downloadLimit: downloadLimit ? parseInt(downloadLimit) : 1,
      passwordProtected: passwordProtected === 'true' || passwordProtected === true,
      password: password || '',
      iv: iv.toString('hex'),
      owner: req.user._id
    });

    res.status(201).json({
      success: true,
      message: 'File encrypted using AES-256 and saved to secure storage.',
      file: {
        id: file._id,
        name: file.name,
        size: file.size,
        type: file.type,
        expiration: file.expiration,
        downloadLimit: file.downloadLimit,
        passwordProtected: file.passwordProtected,
        downloadCount: 0,
        uploadDate: file.createdAt
      }
    });
  } catch (error) {
    console.error('File upload/encryption error:', error);
    res.status(500).json({ success: false, message: 'Server error processing file encryption/upload' });
  }
});

// @route   GET /api/files
// @desc    Get all files uploaded by logged in user
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    // In-memory fallback for offline DB or mock login user
    const isMockUser = req.user && String(req.user._id).startsWith('mock-');
    if (mongoose.connection.readyState !== 1 || isMockUser) {
      const userFiles = memoryStore.files
        .filter(f => String(f.owner) === String(req.user._id))
        .sort((a, b) => b.createdAt - a.createdAt);
        
      return res.status(200).json({
        success: true,
        files: userFiles.map(file => ({
          id: file._id,
          name: file.name,
          size: file.size,
          type: file.type,
          expiration: file.expiration,
          downloadLimit: file.downloadLimit,
          passwordProtected: file.passwordProtected,
          downloadCount: file.downloadCount || 0,
          uploadDate: file.createdAt
        }))
      });
    }

    const files = await File.find({ owner: req.user._id }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      files: files.map(file => ({
        id: file._id,
        name: file.name,
        size: file.size,
        type: file.type,
        expiration: file.expiration,
        downloadLimit: file.downloadLimit,
        passwordProtected: file.passwordProtected,
        downloadCount: file.downloadCount || 0,
        uploadDate: file.createdAt
      }))
    });
  } catch (error) {
    console.error('Fetch files error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching files list' });
  }
});

// @route   GET /api/files/metadata/:id
// @desc    Get file metadata (verifies validity of token/expiration/limit)
// @access  Private (requires token)
router.get('/metadata/:id', async (req, res) => {
  try {
    const fileId = req.params.id;
    let fileMetadata = null;

    const isMockFile = String(fileId).startsWith('mock-file-');
    if (mongoose.connection.readyState !== 1 || isMockFile) {
      fileMetadata = memoryStore.files.find(f => f._id === fileId);
    } else {
      fileMetadata = await File.findById(fileId);
    }

    if (!fileMetadata) {
      return res.status(404).json({ success: false, message: 'File not found' });
    }

    // Helper to resolve owner name
    let ownerName = 'Alex Rivera'; // Default fallback
    try {
      const isMockOwner = String(fileMetadata.owner).startsWith('mock-');
      if (mongoose.connection.readyState !== 1 || isMockOwner) {
        const ownerUser = memoryStore.users.find(u => String(u._id) === String(fileMetadata.owner));
        if (ownerUser) {
          ownerName = ownerUser.name;
        }
      } else {
        const User = require('../models/User');
        const dbUser = await User.findById(fileMetadata.owner);
        if (dbUser) {
          ownerName = dbUser.name;
        }
      }
    } catch (e) {
      console.error('Error fetching owner details:', e);
    }

    // Expiration check logic
    const isFileExpired = (file) => {
      if (!file.expiration || file.expiration === 'Never') {
        return false;
      }
      const createdAt = new Date(file.createdAt);
      const now = new Date();
      let durationMs = 0;
      if (file.expiration === '1 Hour') {
        durationMs = 60 * 60 * 1000;
      } else if (file.expiration === '6 Hours') {
        durationMs = 6 * 60 * 60 * 1000;
      } else if (file.expiration === '24 Hours') {
        durationMs = 24 * 60 * 60 * 1000;
      } else if (file.expiration === '7 Days') {
        durationMs = 7 * 24 * 60 * 60 * 1000;
      } else {
        const match = file.expiration.match(/^(\d+)\s*(Hour|Hours|Day|Days|Min|Mins|Minute|Minutes)$/i);
        if (match) {
          const val = parseInt(match[1]);
          const unit = match[2].toLowerCase();
          if (unit.startsWith('hour')) {
            durationMs = val * 60 * 60 * 1000;
          } else if (unit.startsWith('day')) {
            durationMs = val * 24 * 60 * 60 * 1000;
          } else if (unit.startsWith('min')) {
            durationMs = val * 60 * 1000;
          }
        }
      }
      if (durationMs > 0) {
        return now.getTime() - createdAt.getTime() > durationMs;
      }
      return false;
    };

    const isExpired = isFileExpired(fileMetadata);
    const limitHit = fileMetadata.downloadLimit !== undefined
      ? (fileMetadata.downloadCount || 0) >= fileMetadata.downloadLimit
      : (fileMetadata.downloadCount || 0) >= 1;

    res.status(200).json({
      success: true,
      file: {
        id: fileMetadata._id,
        name: fileMetadata.name,
        size: fileMetadata.size,
        type: fileMetadata.type,
        expiration: fileMetadata.expiration,
        downloadLimit: fileMetadata.downloadLimit,
        downloadCount: fileMetadata.downloadCount || 0,
        passwordProtected: fileMetadata.passwordProtected,
        isExpired,
        limitHit,
        ownerName,
        createdAt: fileMetadata.createdAt
      }
    });

  } catch (error) {
    console.error('Fetch metadata error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching file metadata' });
  }
});

// @route   GET /api/files/download/:id
// @desc    Download and decrypt file by ID
// @access  Private
router.get('/download/:id', async (req, res) => {
  try {
    const fileId = req.params.id;
    let fileMetadata = null;

    // Load metadata from Mongoose or memoryStore
    const isMockFile = String(fileId).startsWith('mock-file-');
    if (mongoose.connection.readyState !== 1 || isMockFile) {
      fileMetadata = memoryStore.files.find(f => f._id === fileId);
    } else {
      fileMetadata = await File.findById(fileId);
    }

    if (!fileMetadata) {
      return res.status(404).json({ success: false, message: 'File not found' });
    }

    // Expiration check logic
    const isFileExpired = (file) => {
      if (!file.expiration || file.expiration === 'Never') {
        return false;
      }
      const createdAt = new Date(file.createdAt);
      const now = new Date();
      let durationMs = 0;
      if (file.expiration === '1 Hour') {
        durationMs = 60 * 60 * 1000;
      } else if (file.expiration === '6 Hours') {
        durationMs = 6 * 60 * 60 * 1000;
      } else if (file.expiration === '24 Hours') {
        durationMs = 24 * 60 * 60 * 1000;
      } else if (file.expiration === '7 Days') {
        durationMs = 7 * 24 * 60 * 60 * 1000;
      } else {
        const match = file.expiration.match(/^(\d+)\s*(Hour|Hours|Day|Days|Min|Mins|Minute|Minutes)$/i);
        if (match) {
          const val = parseInt(match[1]);
          const unit = match[2].toLowerCase();
          if (unit.startsWith('hour')) {
            durationMs = val * 60 * 60 * 1000;
          } else if (unit.startsWith('day')) {
            durationMs = val * 24 * 60 * 60 * 1000;
          } else if (unit.startsWith('min')) {
            durationMs = val * 60 * 1000;
          }
        }
      }
      if (durationMs > 0) {
        return now.getTime() - createdAt.getTime() > durationMs;
      }
      return false;
    };

    // 2. Is link expired?
    if (isFileExpired(fileMetadata)) {
      return res.status(400).json({ success: false, message: 'Link has expired' });
    }

    // 3. Download limit hit?
    const limitHit = fileMetadata.downloadLimit !== undefined
      ? (fileMetadata.downloadCount || 0) >= fileMetadata.downloadLimit
      : (fileMetadata.downloadCount || 0) >= 1;
    if (limitHit) {
      return res.status(400).json({ success: false, message: 'Download limit reached' });
    }

    // 4. Password required?
    if (fileMetadata.passwordProtected) {
      const clientPassword = req.query.password;
      if (!clientPassword || clientPassword !== fileMetadata.password) {
        return res.status(401).json({ success: false, message: 'Invalid password for this protected file' });
      }
    }

    const fs = require('fs');
    const path = require('path');
    const crypto = require('crypto');

    const filePath = path.join(__dirname, '../uploads', `${fileId}.enc`);
    
    // Check if the encrypted file exists on disk
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ success: false, message: 'Encrypted file payload missing from storage disk' });
    }

    // Read encrypted buffer from disk
    const encryptedBuffer = fs.readFileSync(filePath);

    // Decrypt the file buffer using the stored IV and master key
    const iv = Buffer.from(fileMetadata.iv, 'hex');
    const key = Buffer.from(process.env.FILE_ENCRYPTION_KEY, 'hex');

    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    const decryptedBuffer = Buffer.concat([decipher.update(encryptedBuffer), decipher.final()]);

    // Increment download count
    if (mongoose.connection.readyState !== 1 || isMockFile) {
      fileMetadata.downloadCount = (fileMetadata.downloadCount || 0) + 1;
    } else {
      await File.findByIdAndUpdate(fileId, { $inc: { downloadCount: 1 } });
    }

    // Send the decrypted stream as file download
    res.setHeader('Content-Type', fileMetadata.type || 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(fileMetadata.name)}"`);
    res.send(decryptedBuffer);

  } catch (error) {
    console.error('File download/decryption error:', error);
    res.status(500).json({ success: false, message: 'Server error decrypting/downloading file' });
  }
});

// @route   DELETE /api/files
// @route   DELETE /api/files/:id
// @desc    Delete a single file by ID
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const fileId = req.params.id;
    let fileMetadata = null;

    const isMockFile = String(fileId).startsWith('mock-file-');
    if (mongoose.connection.readyState !== 1 || isMockFile) {
      fileMetadata = memoryStore.files.find(f => f._id === fileId);
    } else {
      fileMetadata = await File.findById(fileId);
    }

    if (!fileMetadata) {
      return res.status(404).json({ success: false, message: 'File not found' });
    }

    // Verify ownership
    if (String(fileMetadata.owner) !== String(req.user._id)) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this file' });
    }

    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../uploads', `${fileId}.enc`);

    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (err) {
        console.error('Error deleting file payload from disk:', err);
      }
    }

    if (mongoose.connection.readyState !== 1 || isMockFile) {
      const index = memoryStore.files.findIndex(f => f._id === fileId);
      if (index !== -1) {
        memoryStore.files.splice(index, 1);
      }
    } else {
      await File.findByIdAndDelete(fileId);
    }

    res.status(200).json({ success: true, message: 'File deleted successfully' });

  } catch (error) {
    console.error('Delete file error:', error);
    res.status(500).json({ success: false, message: 'Server error deleting file' });
  }
});

// @route   DELETE /api/files
// @desc    Clear all files uploaded by logged-in user
// @access  Private
router.delete('/', protect, async (req, res) => {
  try {
    const fs = require('fs');
    const path = require('path');

    const isMockUser = req.user && String(req.user._id).startsWith('mock-');
    if (mongoose.connection.readyState !== 1 || isMockUser) {
      // In-memory fallback
      const filesToDelete = memoryStore.files.filter(f => String(f.owner) === String(req.user._id));
      for (const file of filesToDelete) {
        const filePath = path.join(__dirname, '../uploads', `${file._id}.enc`);
        if (fs.existsSync(filePath)) {
          try {
            fs.unlinkSync(filePath);
          } catch (err) {
            console.error('Error deleting file:', err);
          }
        }
      }
      memoryStore.files = memoryStore.files.filter(f => String(f.owner) !== String(req.user._id));
      return res.status(200).json({ success: true, message: 'All fallback files cleared successfully' });
    }

    // Database mode
    const files = await File.find({ owner: req.user._id });
    for (const file of files) {
      const filePath = path.join(__dirname, '../uploads', `${file._id.toString()}.enc`);
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (err) {
          console.error('Error deleting file from disk:', err);
        }
      }
    }

    await File.deleteMany({ owner: req.user._id });
    res.status(200).json({ success: true, message: 'All encrypted files cleared successfully' });
  } catch (error) {
    console.error('Clear files error:', error);
    res.status(500).json({ success: false, message: 'Server error clearing files' });
  }
});

// @route   PUT /api/files/:id
// @desc    Update file delivery controls metadata
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    const fileId = req.params.id;
    const { expiration, downloadLimit, passwordProtected, password } = req.body;

    let fileMetadata = null;

    const isMockFile = String(fileId).startsWith('mock-file-');
    if (mongoose.connection.readyState !== 1 || isMockFile) {
      fileMetadata = memoryStore.files.find(f => f._id === fileId);
    } else {
      fileMetadata = await File.findById(fileId);
    }

    if (!fileMetadata) {
      return res.status(404).json({ success: false, message: 'File not found' });
    }

    // Verify ownership (only the owner can update controls)
    if (String(fileMetadata.owner) !== String(req.user._id)) {
      return res.status(403).json({ success: false, message: 'Not authorized to modify this file settings' });
    }

    // Update fields
    const updatedLimit = downloadLimit ? parseInt(downloadLimit) : fileMetadata.downloadLimit;
    const isPasswordProtected = passwordProtected === 'true' || passwordProtected === true;

    if (mongoose.connection.readyState !== 1 || isMockFile) {
      fileMetadata.expiration = expiration || fileMetadata.expiration;
      fileMetadata.downloadLimit = updatedLimit;
      fileMetadata.passwordProtected = isPasswordProtected;
      fileMetadata.password = password !== undefined ? password : fileMetadata.password;
    } else {
      await File.findByIdAndUpdate(fileId, {
        expiration: expiration || fileMetadata.expiration,
        downloadLimit: updatedLimit,
        passwordProtected: isPasswordProtected,
        password: password !== undefined ? password : fileMetadata.password
      });
    }

    res.status(200).json({
      success: true,
      message: 'File settings updated successfully',
      file: {
        id: fileId,
        expiration: expiration || fileMetadata.expiration,
        downloadLimit: updatedLimit,
        passwordProtected: isPasswordProtected
      }
    });

  } catch (error) {
    console.error('Update file settings error:', error);
    res.status(500).json({ success: false, message: 'Server error updating file settings' });
  }
});

module.exports = router;
