const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a file name'],
      trim: true,
    },
    size: {
      type: Number,
      required: [true, 'Please add a file size'],
    },
    type: {
      type: String,
      required: [true, 'Please add a file type'],
    },
    expiration: {
      type: String,
      default: '24 Hours',
    },
    downloadLimit: {
      type: Number,
      default: 1,
    },
    passwordProtected: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      default: '',
    },
    iv: {
      type: String,
      required: [true, 'Please add the encryption initialization vector'],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    downloadCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('File', FileSchema);
