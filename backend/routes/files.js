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
const uploadsDir = process.env.VERCEL 
  ? '/tmp' 
  : path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Active SSE clients: array of objects containing user id and res object
let sseClients = [];

// Helper to broadcast real-time files state updates to all active SSE clients of a user
const notifyUserFilesUpdate = async (userId) => {
  const userClients = sseClients.filter(c => String(c.userId) === String(userId));
  if (userClients.length === 0) return;

  let userFiles = [];
  try {
    const isMockUser = String(userId).startsWith('mock-');
    if (mongoose.connection.readyState !== 1 || isMockUser) {
      userFiles = memoryStore.files
        .filter(f => String(f.owner) === String(userId))
        .sort((a, b) => b.createdAt - a.createdAt);
    } else {
      userFiles = await File.find({ owner: userId }).sort({ createdAt: -1 });
    }

    const filesData = userFiles.map(file => ({
      id: file._id,
      name: file.name,
      size: file.size,
      type: file.type,
      expiration: file.expiration,
      downloadLimit: file.downloadLimit,
      passwordProtected: file.passwordProtected,
      notifyOnDownload: file.notifyOnDownload || false,
      downloads: file.downloads || [],
      downloadCount: file.downloadCount || 0,
      uploadDate: file.createdAt
    }));

    const payload = JSON.stringify({ type: 'FILES_UPDATE', files: filesData });
    for (const client of userClients) {
      try {
        client.res.write(`data: ${payload}\n\n`);
      } catch (err) {
        console.error('Error writing to client SSE connection:', err.message);
      }
    }
  } catch (err) {
    console.error('Error broadcasting SSE update:', err.message);
  }
};

// Client IP resolution helper
const getClientIp = (req) => {
  let ip = req.headers['x-forwarded-for'];
  if (ip) {
    ip = ip.split(',')[0].trim();
  } else {
    ip = req.socket.remoteAddress || req.ip || '127.0.0.1';
  }
  if (ip.startsWith('::ffff:')) {
    ip = ip.substring(7);
  }
  return ip;
};

// IP geolocation function
const geolocateIp = async (ip) => {
  if (
    !ip ||
    ip === '127.0.0.1' ||
    ip === '::1' ||
    ip.startsWith('127.0.') ||
    ip.startsWith('192.168.') ||
    ip.startsWith('10.') ||
    ip.startsWith('172.16.') ||
    ip.startsWith('::ffff:127.')
  ) {
    return { countryCode: 'Unknown', countryName: 'Unknown' };
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000); // 2-second timeout
    const res = await fetch(`http://ip-api.com/json/${ip}`, { signal: controller.signal });
    clearTimeout(timeoutId);

    const data = await res.json();
    if (data && data.status === 'success') {
      return {
        countryCode: data.countryCode || 'Unknown',
        countryName: data.country || 'Unknown'
      };
    }
  } catch (err) {
    console.error('GeoIP lookup error:', err.message);
  }

  return { countryCode: 'Unknown', countryName: 'Unknown' };
};

// Nodemailer setups
const nodemailer = require('nodemailer');
let transporter = null;

const initTransporter = async () => {
  if (process.env.SMTP_HOST && process.env.SMTP_USER) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
    console.log('Nodemailer SMTP Transporter configured.');
  } else {
    try {
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass
        }
      });
      console.log('Nodemailer Ethereal Email Transporter configured. Test user:', testAccount.user);
    } catch (err) {
      console.error('Failed to create Nodemailer test account:', err.message);
    }
  }
};

const sendDownloadAlert = async (uploaderEmail, fileName, timestamp, country) => {
  const htmlContent = `
    <div style="font-family: sans-serif; padding: 25px; color: #1f2937; max-width: 600px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
      <h2 style="color: #6366f1; margin-top: 0; font-size: 24px; font-weight: 800; border-bottom: 2px solid #f3f4f6; padding-bottom: 12px;">File Download Alert</h2>
      <p style="font-size: 15px; line-height: 1.6;">Hello,</p>
      <p style="font-size: 15px; line-height: 1.6;">We wanted to let you know that your encrypted file has been successfully downloaded by a recipient.</p>
      
      <div style="background-color: #f9fafb; border: 1px solid #f3f4f6; border-radius: 8px; padding: 16px; margin: 24px 0;">
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 6px 0; color: #6b7280; width: 130px;"><strong>File Name:</strong></td>
            <td style="padding: 6px 0; color: #111827;"><strong>${fileName}</strong></td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #6b7280;"><strong>Timestamp:</strong></td>
            <td style="padding: 6px 0; color: #111827;">${new Date(timestamp).toUTCString()}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #6b7280;"><strong>Location:</strong></td>
            <td style="padding: 6px 0; color: #111827;">${country}</td>
          </tr>
        </table>
      </div>
      
      <p style="font-size: 14px; color: #4b5563; margin-bottom: 0;">Best regards,<br/><strong>SecureShare Team</strong></p>
    </div>
  `;

  // Use Brevo REST API if configured for Brevo, to bypass Render SMTP port blocks
  if (process.env.SMTP_HOST === 'smtp-relay.brevo.com' && process.env.SMTP_PASS) {
    try {
      console.log('Sending email alert via Brevo REST API...');
      const response = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'api-key': process.env.SMTP_PASS,
          'Content-Type': 'application/json',
          'accept': 'application/json'
        },
        body: JSON.stringify({
          sender: {
            name: "SecureShare Alerts",
            email: process.env.SMTP_USER || 'alerts@secureshare.com'
          },
          to: [
            {
              email: uploaderEmail
            }
          ],
          subject: `📥 File Downloaded: ${fileName}`,
          htmlContent: htmlContent
        })
      });

      const result = await response.json();
      if (response.ok) {
        console.log(`Alert email sent to ${uploaderEmail} via Brevo API. Message ID: ${result.messageId}`);
        return;
      } else {
        console.error('Brevo API send email failed:', result);
      }
    } catch (apiErr) {
      console.error('Brevo API send email fetch error:', apiErr.message);
    }
  }

  // Fallback to standard SMTP / Nodemailer
  if (!transporter) {
    await initTransporter();
  }
  if (!transporter) return;

  const mailOptions = {
    from: `"SecureShare Alerts" <${process.env.SMTP_USER || 'alerts@secureshare.com'}>`,
    to: uploaderEmail,
    subject: `📥 File Downloaded: ${fileName}`,
    html: htmlContent
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Alert email sent to ${uploaderEmail} via SMTP. Message ID: ${info.messageId}`);
    const previewUrl = nodemailer.getTestMessageUrl(info);
    if (previewUrl) {
      console.log(`--------------------------------------------------`);
      console.log(`📧 Ethereal Email Preview URL: ${previewUrl}`);
      console.log(`--------------------------------------------------`);
    }
  } catch (err) {
    console.error('Failed to send email alert via SMTP:', err.message);
  }
};

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

    const { expiration, downloadLimit, passwordProtected, password, notifyOnDownload } = req.body;

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
      const filePath = path.join(uploadsDir, `${mockId}.enc`);
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
        notifyOnDownload: notifyOnDownload === 'true' || notifyOnDownload === true,
        downloads: [],
        createdAt: new Date()
      };
      
      memoryStore.files.push(mockFile);
      
      notifyUserFilesUpdate(req.user._id);
      
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
          notifyOnDownload: mockFile.notifyOnDownload,
          downloadCount: 0,
          uploadDate: mockFile.createdAt
        }
      });
    }

    // Generate MongoDB ObjectId first to use as filename
    const fileId = new mongoose.Types.ObjectId();
    const filePath = path.join(uploadsDir, `${fileId.toString()}.enc`);
    
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
      owner: req.user._id,
      notifyOnDownload: notifyOnDownload === 'true' || notifyOnDownload === true,
      downloads: []
    });

    notifyUserFilesUpdate(req.user._id);

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
        notifyOnDownload: file.notifyOnDownload,
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
          notifyOnDownload: file.notifyOnDownload || false,
          downloads: file.downloads || [],
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
        notifyOnDownload: file.notifyOnDownload || false,
        downloads: file.downloads || [],
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

    const filePath = path.join(uploadsDir, `${fileId}.enc`);
    
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

    // Increment download count & track geolocation
    const clientIp = getClientIp(req);
    const { countryCode, countryName } = await geolocateIp(clientIp);

    if (mongoose.connection.readyState !== 1 || isMockFile) {
      fileMetadata.downloadCount = (fileMetadata.downloadCount || 0) + 1;
      if (!fileMetadata.downloads) fileMetadata.downloads = [];
      fileMetadata.downloads.push({
        countryCode,
        countryName,
        ip: clientIp,
        timestamp: new Date()
      });
    } else {
      await File.findByIdAndUpdate(fileId, { 
        $inc: { downloadCount: 1 },
        $push: { 
          downloads: {
            countryCode,
            countryName,
            ip: clientIp,
            timestamp: new Date()
          } 
        } 
      });
    }

    notifyUserFilesUpdate(fileMetadata.owner);

    // Download email notification trigger
    if (fileMetadata.notifyOnDownload) {
      let uploaderEmail = '';
      try {
        const isMockOwner = String(fileMetadata.owner).startsWith('mock-');
        if (mongoose.connection.readyState !== 1 || isMockOwner) {
          const ownerUser = memoryStore.users.find(u => String(u._id) === String(fileMetadata.owner));
          if (ownerUser) uploaderEmail = ownerUser.email;
        } else {
          const User = require('../models/User');
          const ownerUser = await User.findById(fileMetadata.owner);
          if (ownerUser) uploaderEmail = ownerUser.email;
        }

        if (uploaderEmail) {
          // Asynchronous fire-and-forget alert email
          sendDownloadAlert(
            uploaderEmail, 
            fileMetadata.name, 
            new Date(), 
            `${countryName} (${countryCode})`
          ).catch(err => console.error('Alert email async error:', err.message));
        }
      } catch (err) {
        console.error('Error initiating download email alert:', err.message);
      }
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
    const filePath = path.join(uploadsDir, `${fileId}.enc`);

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

    notifyUserFilesUpdate(req.user._id);

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
        const filePath = path.join(uploadsDir, `${file._id}.enc`);
        if (fs.existsSync(filePath)) {
          try {
            fs.unlinkSync(filePath);
          } catch (err) {
            console.error('Error deleting file:', err);
          }
        }
      }
      memoryStore.files = memoryStore.files.filter(f => String(f.owner) !== String(req.user._id));
      notifyUserFilesUpdate(req.user._id);
      return res.status(200).json({ success: true, message: 'All fallback files cleared successfully' });
    }

    // Database mode
    const files = await File.find({ owner: req.user._id });
    for (const file of files) {
      const filePath = path.join(uploadsDir, `${file._id.toString()}.enc`);
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (err) {
          console.error('Error deleting file from disk:', err);
        }
      }
    }

    await File.deleteMany({ owner: req.user._id });
    notifyUserFilesUpdate(req.user._id);
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
    const { expiration, downloadLimit, passwordProtected, password, notifyOnDownload } = req.body;

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
      fileMetadata.notifyOnDownload = notifyOnDownload !== undefined ? (notifyOnDownload === 'true' || notifyOnDownload === true) : fileMetadata.notifyOnDownload;
    } else {
      await File.findByIdAndUpdate(fileId, {
        expiration: expiration || fileMetadata.expiration,
        downloadLimit: updatedLimit,
        passwordProtected: isPasswordProtected,
        password: password !== undefined ? password : fileMetadata.password,
        notifyOnDownload: notifyOnDownload !== undefined ? (notifyOnDownload === 'true' || notifyOnDownload === true) : fileMetadata.notifyOnDownload
      });
    }

    notifyUserFilesUpdate(req.user._id);

    res.status(200).json({
      success: true,
      message: 'File settings updated successfully',
      file: {
        id: fileId,
        expiration: expiration || fileMetadata.expiration,
        downloadLimit: updatedLimit,
        passwordProtected: isPasswordProtected,
        notifyOnDownload: notifyOnDownload !== undefined ? (notifyOnDownload === 'true' || notifyOnDownload === true) : fileMetadata.notifyOnDownload
      }
    });

  } catch (error) {
    console.error('Update file settings error:', error);
    res.status(500).json({ success: false, message: 'Server error updating file settings' });
  }
});

// @route   GET /api/files/sse
// @desc    Server-Sent Events endpoint for real-time dashboard updates
// @access  Private
router.get('/sse', protect, async (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  const clientId = Date.now();
  const newClient = {
    id: clientId,
    userId: String(req.user._id),
    res
  };
  sseClients.push(newClient);

  // Immediately send initial user files
  let userFiles = [];
  try {
    const isMockUser = String(req.user._id).startsWith('mock-');
    if (mongoose.connection.readyState !== 1 || isMockUser) {
      userFiles = memoryStore.files
        .filter(f => String(f.owner) === String(req.user._id))
        .sort((a, b) => b.createdAt - a.createdAt);
    } else {
      userFiles = await File.find({ owner: req.user._id }).sort({ createdAt: -1 });
    }

    const filesData = userFiles.map(file => ({
      id: file._id,
      name: file.name,
      size: file.size,
      type: file.type,
      expiration: file.expiration,
      downloadLimit: file.downloadLimit,
      passwordProtected: file.passwordProtected,
      notifyOnDownload: file.notifyOnDownload || false,
      downloads: file.downloads || [],
      downloadCount: file.downloadCount || 0,
      uploadDate: file.createdAt
    }));

    res.write(`data: ${JSON.stringify({ type: 'FILES_UPDATE', files: filesData })}\n\n`);
  } catch (err) {
    console.error('Error sending initial SSE files:', err.message);
  }

  // Keep connection alive with a 15-second heartbeat ping
  const keepAliveInterval = setInterval(() => {
    try {
      res.write(': keepalive ping\n\n');
    } catch (err) {
      // connection might have closed
    }
  }, 15000);

  req.on('close', () => {
    clearInterval(keepAliveInterval);
    sseClients = sseClients.filter(c => c.id !== clientId);
  });
});

// GET /api/files/test-smtp-live
router.get('/test-smtp-live', async (req, res) => {
  try {
    console.log('[Diagnostic] Running SMTP/API test on Live Render Server...');
    const testRecipient = 'p.suhanibbk@gmail.com';
    const subject = 'SecureShare Live Diagnostic Test';
    const text = `This is a test email sent from the live Render backend at ${new Date().toISOString()} to check connectivity.`;

    if (process.env.SMTP_HOST === 'smtp-relay.brevo.com' && process.env.SMTP_PASS) {
      console.log('[Diagnostic] Testing Brevo REST API...');
      const response = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'api-key': process.env.SMTP_PASS,
          'Content-Type': 'application/json',
          'accept': 'application/json'
        },
        body: JSON.stringify({
          sender: {
            name: "SecureShare Alerts",
            email: process.env.SMTP_USER || 'alerts@secureshare.com'
          },
          to: [
            {
              email: testRecipient
            }
          ],
          subject: subject,
          htmlContent: `<html><body><p>${text}</p></body></html>`
        })
      });

      const result = await response.json();
      if (response.ok) {
        return res.json({
          success: true,
          method: 'Brevo REST API',
          message: 'Test mail sent successfully via Brevo REST API!',
          messageId: result.messageId,
          user: process.env.SMTP_USER,
          host: process.env.SMTP_HOST
        });
      } else {
        return res.status(response.status).json({
          success: false,
          method: 'Brevo REST API',
          message: 'Brevo API returned error.',
          error: result,
          user: process.env.SMTP_USER,
          host: process.env.SMTP_HOST
        });
      }
    }

    // Default to SMTP
    if (!transporter) {
      await initTransporter();
    }
    if (!transporter) {
      return res.status(500).json({ 
        success: false, 
        method: 'SMTP',
        message: 'SMTP Transporter not initialized. Check if SMTP_HOST and SMTP_USER are defined.' 
      });
    }
    
    const info = await transporter.sendMail({
      from: `"SecureShare Alerts" <${process.env.SMTP_USER}>`,
      to: testRecipient,
      subject: subject,
      text: text
    });
    
    return res.json({
      success: true,
      method: 'SMTP Relay',
      message: 'SMTP test mail sent successfully!',
      messageId: info.messageId,
      user: process.env.SMTP_USER,
      host: process.env.SMTP_HOST
    });
  } catch (err) {
    console.error('[Diagnostic] Live SMTP test failed:', err);
    return res.status(500).json({
      success: false,
      message: 'SMTP test failed on live Render server.',
      error: err.message,
      user: process.env.SMTP_USER,
      host: process.env.SMTP_HOST
    });
  }
});

// GET /api/files/debug-logs
router.get('/debug-logs', (req, res) => {
  const memoryStore = require('../config/memoryStore');
  res.json({
    dbState: mongoose.connection.readyState,
    envKeys: Object.keys(process.env).filter(k => !k.includes('PASS') && !k.includes('SECRET') && !k.includes('KEY')),
    googleClientIdSet: !!process.env.GOOGLE_CLIENT_ID,
    smtpUserSet: !!process.env.SMTP_USER,
    smtpHostSet: !!process.env.SMTP_HOST,
    smtpPassSet: !!process.env.SMTP_PASS,
    memoryStoreUsers: (memoryStore.users || []).map(u => ({ id: u._id, email: u.email })),
    memoryStoreFiles: (memoryStore.files || []).map(f => ({ id: f._id, name: f.name, owner: f.owner, notify: f.notifyOnDownload })),
    logs: global.debugLogs || []
  });
});

module.exports = router;
