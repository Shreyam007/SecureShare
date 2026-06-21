import React, { useState, useEffect } from 'react';
import './App.css';

// SVG Icons
const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 11 2 2 4-4" />
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const LockIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const KeyIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="m21 2-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0 1.5 1.5M15.5 7.5 14 6" />
  </svg>
);

const GlobeIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const CloudUploadIcon = () => (
  <svg viewBox="0 0 24 24" width="40" height="40" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 16l-4-4-4 4M12 12v9" />
    <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
    <polyline points="16 16 12 12 8 16" />
  </svg>
);

const FolderIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
);

const ChartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const SettingsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const FileIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);

const HelpIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const LogoutIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const getFlagEmoji = (countryCode) => {
  if (!countryCode || countryCode.length !== 2) return '🌐';
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  try {
    return String.fromCodePoint(...codePoints);
  } catch (e) {
    return '🌐';
  }
};

const getTopCountries = (downloads) => {
  if (!downloads || downloads.length === 0) return [];
  const counts = {};
  downloads.forEach(d => {
    const key = d.countryCode || 'US';
    if (!counts[key]) {
      counts[key] = { code: key, name: d.countryName || 'United States', count: 0 };
    }
    counts[key].count += 1;
  });
  return Object.values(counts).sort((a, b) => b.count - a.count);
};

const getApiBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl) {
    return envUrl.endsWith('/api') ? envUrl : `${envUrl}/api`;
  }
  // If not set, check if we are on localhost. If so, use local backend port 5000.
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:5000/api';
  }
  // Default to live Render backend for production Vercel builds
  return 'https://secureshare-1der.onrender.com/api';
};

const API_BASE_URL = getApiBaseUrl();

function App() {
  // Navigation states
  const [view, setView] = useState('landing'); // 'landing' | 'login' | 'signup'
  const [dashboardTab, setDashboardTab] = useState('dashboard'); // 'dashboard' | 'upload'
  
  // User Authentication states
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [apiError, setApiError] = useState('');
  const [apiSuccess, setApiSuccess] = useState('');
  
  // Dashboard states
  const [userFiles, setUserFiles] = useState([]);
  const [filesLoading, setFilesLoading] = useState(false);

  // Delivery Controls states
  const [expiration, setExpiration] = useState('24 Hours');
  const [downloadLimit, setDownloadLimit] = useState(1);
  const [passwordProtected, setPasswordProtected] = useState(false);

  // Upload progress states
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState('READY'); // 'READY' | 'UPLOADING' | 'COMPLETED' | 'ERROR'
  const [uploadingFileName, setUploadingFileName] = useState('');
  const [uploadingFileSize, setUploadingFileSize] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [filePassword, setFilePassword] = useState('');
  const [sharingFile, setSharingFile] = useState(null);

  // Bulk upload and expanded statistics states
  const [bulkUploadedFiles, setBulkUploadedFiles] = useState([]);
  const [notifyOnDownload, setNotifyOnDownload] = useState(false);
  const [expandedFileId, setExpandedFileId] = useState(null);

  // Global bulk settings
  const [globalExpiration, setGlobalExpiration] = useState('24 Hours');
  const [globalDownloadLimit, setGlobalDownloadLimit] = useState(1);
  const [globalPasswordProtected, setGlobalPasswordProtected] = useState(false);
  const [globalPassword, setGlobalPassword] = useState('');
  const [globalNotifyOnDownload, setGlobalNotifyOnDownload] = useState(false);

  // Download Portal states
  const [downloadFileId, setDownloadFileId] = useState('');
  const [downloadMetadata, setDownloadMetadata] = useState(null);
  const [downloadMetaLoading, setDownloadMetaLoading] = useState(false);
  const [downloadMetaError, setDownloadMetaError] = useState('');
  const [downloadPassword, setDownloadPassword] = useState('');
  const [downloadError, setDownloadError] = useState('');
  const [downloadSuccess, setDownloadSuccess] = useState('');
  const [showDownloadPassword, setShowDownloadPassword] = useState(false);
  const [redirectPath, setRedirectPath] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [tableCopiedId, setTableCopiedId] = useState('');

  // Initial user check and URL routing
  useEffect(() => {
    // Check if there is an ID token in the URL hash from Google OAuth redirect
    const hash = window.location.hash;
    if (hash && hash.includes('id_token=')) {
      const params = new URLSearchParams(hash.substring(1));
      const idToken = params.get('id_token');
      if (idToken) {
        // Clear hash from URL immediately
        window.history.replaceState(null, null, window.location.pathname);
        
        // Restore view state if it was stored
        const savedView = localStorage.getItem('oauth_view');
        if (savedView) {
          setView(savedView);
          localStorage.removeItem('oauth_view');
        }
        
        handleGoogleLoginWithToken(idToken);
      }
    }

    const token = localStorage.getItem('token');
    
    // Parse URL path
    const path = window.location.pathname;
    const match = path.match(/^\/download\/([^/]+)$/);
    
    if (match) {
      const fileId = match[1];
      setDownloadFileId(fileId);
      setView('download_portal');
      setRedirectPath(`/download/${fileId}`);
      fetchDownloadMetadata(fileId, token);
    } else if (path === '/dashboard') {
      if (token) {
        setView('dashboard');
        setDashboardTab('dashboard');
        fetchUserProfile(token);
      } else {
        setRedirectPath('/dashboard');
        window.history.pushState({}, '', '/login');
        setView('login');
      }
    } else if (path === '/login') {
      if (token) {
        window.history.pushState({}, '', '/dashboard');
        setView('dashboard');
        setDashboardTab('dashboard');
        fetchUserProfile(token);
      } else {
        setView('login');
      }
    } else {
      if (token) {
        fetchUserProfile(token);
      }
    }
  }, []);

  // Real-time EventSource connection (SSE) for files updates
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token || !user) return;

    const sseUrl = `${API_BASE_URL}/files/sse?token=${encodeURIComponent(token)}`;
    const eventSource = new EventSource(sseUrl);

    // Initial load state
    setFilesLoading(true);

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'FILES_UPDATE') {
          setUserFiles(data.files);
          setFilesLoading(false);
        }
      } catch (err) {
        console.error('Failed to parse SSE message:', err);
      }
    };

    eventSource.onerror = (err) => {
      console.error('SSE connection error:', err);
      setFilesLoading(false);
    };

    return () => {
      eventSource.close();
    };
  }, [user]);

  // Dynamically update active uploaded file controls on the server
  useEffect(() => {
    if (!uploadedFile) return;

    const delayDebounceFn = setTimeout(async () => {
      const token = localStorage.getItem('token');
      try {
        await fetch(`${API_BASE_URL}/files/${uploadedFile.id || uploadedFile._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            expiration,
            downloadLimit,
            passwordProtected,
            password: filePassword,
            notifyOnDownload
          })
        });
      } catch (err) {
        console.error('Error auto-updating file settings:', err);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [expiration, downloadLimit, passwordProtected, filePassword, notifyOnDownload, uploadedFile]);

  const fetchUserProfile = async (token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setUser(data.user);
        setView((prev) => (prev === 'download_portal' || prev === 'share' ? prev : 'dashboard'));
      } else {
        localStorage.removeItem('token');
        setUser(null);
        if (window.location.pathname === '/dashboard') {
          window.history.pushState({}, '', '/login');
          setView('login');
        }
      }
    } catch (err) {
      console.error('Error fetching user profile:', err);
    }
  };

  const handleGoToDashboard = () => {
    const token = localStorage.getItem('token');
    if (token) {
      window.history.pushState({}, '', '/dashboard');
      setView('dashboard');
      setDashboardTab('dashboard');
      if (!user) {
        fetchUserProfile(token);
      }
    } else {
      setRedirectPath('/dashboard');
      window.history.pushState({}, '', '/login');
      setView('login');
    }
  };

  const handleLoginSuccess = (token, userObj) => {
    setUser(userObj);
    const path = redirectPath || '/dashboard';
    window.history.pushState({}, '', path);
    if (path === '/dashboard') {
      setView('dashboard');
      setDashboardTab('dashboard');
    } else {
      setView('download_portal');
      const fileId = path.split('/').pop();
      setDownloadFileId(fileId);
      fetchDownloadMetadata(fileId, token);
    }
    setRedirectPath('');
  };

  const fetchDownloadMetadata = async (fileId, userToken) => {
    const token = userToken || localStorage.getItem('token');
    setDownloadMetaLoading(true);
    setDownloadMetaError('');
    try {
      const headers = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      const response = await fetch(`${API_BASE_URL}/files/metadata/${fileId}`, {
        headers
      });
      const data = await response.json();
      if (data.success && data.file) {
        setDownloadMetadata(data.file);
      } else {
        setDownloadMetaError(data.message || 'Failed to load file details.');
      }
    } catch (err) {
      setDownloadMetaError('Error connecting to security server.');
    } finally {
      setDownloadMetaLoading(false);
    }
  };

  const fetchUserFiles = async (showLoading = false) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    if (showLoading) setFilesLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/files`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setUserFiles(data.files);
      }
    } catch (err) {
      console.error('Error fetching files metadata:', err);
    } finally {
      if (showLoading) setFilesLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setApiError('');
    setApiSuccess('');

    const url = view === 'login' 
      ? `${API_BASE_URL}/auth/login` 
      : `${API_BASE_URL}/auth/register`;

    const body = view === 'login'
      ? { email: formData.email, password: formData.password }
      : { name: formData.name, email: formData.email, password: formData.password };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await response.json();

      if (data.success) {
        localStorage.setItem('token', data.token);
        setUser(data.user);
        setApiSuccess(view === 'login' ? 'Logged in successfully!' : 'Account registered successfully!');
        
        setTimeout(() => {
          handleLoginSuccess(data.token, data.user);
          setFormData({ name: '', email: '', password: '' });
          setApiSuccess('');
        }, 1000);
      } else {
        setApiError(data.message || 'Authentication failed. Please check credentials.');
      }
    } catch (err) {
      setApiError('Unable to connect to the authentication server. Ensure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setView('landing');
    setDashboardTab('upload');
    setSelectedFile(null);
    setUploadStatus('READY');
    setUploadProgress(0);
    setUploadedFile(null);
  };

  // Multipart XHR Upload Handler (Real-time progress)
  const handleFileUpload = (fileToUpload) => {
    if (!fileToUpload) return;
    
    setSelectedFile(fileToUpload);
    setUploadingFileName(fileToUpload.name);
    setUploadedFile(null);
    
    // Format file size
    const sizeInMB = fileToUpload.size / (1024 * 1024);
    setUploadingFileSize(sizeInMB > 0.1 ? `${sizeInMB.toFixed(2)} MB` : `${(fileToUpload.size / 1024).toFixed(2)} KB`);
    
    setUploadProgress(0);
    setUploadStatus('UPLOADING');

    const token = localStorage.getItem('token');
    const formDataUpload = new FormData();
    formDataUpload.append('file', fileToUpload);
    formDataUpload.append('expiration', expiration);
    formDataUpload.append('downloadLimit', downloadLimit);
    formDataUpload.append('passwordProtected', passwordProtected);
    formDataUpload.append('password', filePassword);
    formDataUpload.append('notifyOnDownload', notifyOnDownload);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${API_BASE_URL}/files/upload`, true);
    
    if (token) {
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    }

    // Real-time progress monitoring
    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable) {
        const percent = Math.round((e.loaded / e.total) * 100);
        setUploadProgress(percent);
      }
    });

    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200 || xhr.status === 201) {
          setUploadStatus('COMPLETED');
          try {
            const data = JSON.parse(xhr.responseText);
            if (data.success && data.file) {
              setUploadedFile(data.file);
            }
          } catch (e) {
            console.error('Error parsing response:', e);
          }
          fetchUserFiles();
        } else {
          setUploadStatus('ERROR');
          alert('Upload failed: ' + xhr.responseText);
        }
      }
    };

    xhr.send(formDataUpload);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleMultipleFilesUpload = async (filesList) => {
    if (!filesList || filesList.length === 0) return;

    setUploadStatus('UPLOADING');
    setUploadProgress(0);
    setUploadedFile(null);
    setSelectedFile(null);
    
    // Initialize bulkUploadedFiles state
    const initialFiles = filesList.map((file) => ({
      name: file.name,
      size: file.size,
      progress: 0,
      status: 'UPLOADING',
      uploadedData: null,
      expiration: expiration,
      downloadLimit: downloadLimit,
      passwordProtected: passwordProtected,
      password: filePassword,
      notifyOnDownload: notifyOnDownload
    }));
    
    setBulkUploadedFiles(initialFiles);

    const token = localStorage.getItem('token');

    // Helper to upload a single file in the batch
    const uploadSingleFile = (file, index) => {
      return new Promise((resolve) => {
        const formDataUpload = new FormData();
        formDataUpload.append('file', file);
        formDataUpload.append('expiration', expiration);
        formDataUpload.append('downloadLimit', downloadLimit);
        formDataUpload.append('passwordProtected', passwordProtected);
        formDataUpload.append('password', filePassword);
        formDataUpload.append('notifyOnDownload', notifyOnDownload);

        const xhr = new XMLHttpRequest();
        xhr.open('POST', `${API_BASE_URL}/files/upload`, true);
        
        if (token) {
          xhr.setRequestHeader('Authorization', `Bearer ${token}`);
        }

        xhr.upload.addEventListener('progress', (e) => {
          if (e.lengthComputable) {
            const percent = Math.round((e.loaded / e.total) * 100);
            
            // Update individual progress
            setBulkUploadedFiles((prev) => {
              const updated = [...prev];
              if (updated[index]) {
                updated[index].progress = percent;
              }
              // Calculate average progress
              const totalProgress = updated.reduce((sum, item) => sum + (item.progress || 0), 0);
              const avgProgress = Math.round(totalProgress / updated.length);
              setUploadProgress(avgProgress);
              return updated;
            });
          }
        });

        xhr.onreadystatechange = () => {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            setBulkUploadedFiles((prev) => {
              const updated = [...prev];
              if (!updated[index]) return prev;

              if (xhr.status === 200 || xhr.status === 201) {
                updated[index].status = 'COMPLETED';
                try {
                  const data = JSON.parse(xhr.responseText);
                  if (data.success && data.file) {
                    updated[index].uploadedData = data.file;
                  }
                } catch (e) {
                  console.error('Error parsing response:', e);
                }
              } else {
                updated[index].status = 'ERROR';
                console.error(`Upload failed for file ${file.name}: ${xhr.responseText}`);
              }
              
              // Check if all files are complete
              const allDone = updated.every((item) => item.status === 'COMPLETED' || item.status === 'ERROR');
              if (allDone) {
                const anySuccess = updated.some((item) => item.status === 'COMPLETED');
                setUploadStatus(anySuccess ? 'COMPLETED' : 'ERROR');
                fetchUserFiles();
                
                // If there are multiple files or we want to show the bulk share view
                if (updated.length > 1 && anySuccess) {
                  // Wait 1 second and then transition to bulk share view
                  setTimeout(() => {
                    setView('bulk_share');
                  }, 1000);
                } else if (updated.length === 1 && anySuccess) {
                  // Fallback: single file shows the standard share view
                  const successFile = updated.find(f => f.status === 'COMPLETED');
                  setUploadedFile(successFile.uploadedData);
                }
              }

              return updated;
            });
            resolve();
          }
        };

        xhr.send(formDataUpload);
      });
    };

    // Run uploads in parallel
    await Promise.all(filesList.map((file, idx) => uploadSingleFile(file, idx)));
  };

  const applyGlobalSettings = async () => {
    const token = localStorage.getItem('token');
    const updatedFiles = await Promise.all(bulkUploadedFiles.map(async (file) => {
      if (file.status === 'COMPLETED' && file.uploadedData) {
        const fileId = file.uploadedData.id || file.uploadedData._id;
        try {
          await fetch(`${API_BASE_URL}/files/${fileId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              expiration: globalExpiration,
              downloadLimit: globalDownloadLimit,
              passwordProtected: globalPasswordProtected,
              password: globalPassword,
              notifyOnDownload: globalNotifyOnDownload
            })
          });
          
          return {
            ...file,
            expiration: globalExpiration,
            downloadLimit: globalDownloadLimit,
            passwordProtected: globalPasswordProtected,
            password: globalPassword,
            notifyOnDownload: globalNotifyOnDownload,
            uploadedData: {
              ...file.uploadedData,
              expiration: globalExpiration,
              downloadLimit: globalDownloadLimit,
              passwordProtected: globalPasswordProtected,
              notifyOnDownload: globalNotifyOnDownload
            }
          };
        } catch (err) {
          console.error(`Error updating settings for ${file.name}:`, err);
        }
      }
      return file;
    }));
    setBulkUploadedFiles(updatedFiles);
    alert('Global settings applied to all successfully uploaded files!');
  };

  const updateIndividualFileSettings = async (index, newSettings) => {
    const token = localStorage.getItem('token');
    const file = bulkUploadedFiles[index];
    if (!file || file.status !== 'COMPLETED' || !file.uploadedData) return;

    const fileId = file.uploadedData.id || file.uploadedData._id;
    
    setBulkUploadedFiles((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        ...newSettings
      };
      return updated;
    });

    try {
      await fetch(`${API_BASE_URL}/files/${fileId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          expiration: newSettings.expiration !== undefined ? newSettings.expiration : file.expiration,
          downloadLimit: newSettings.downloadLimit !== undefined ? newSettings.downloadLimit : file.downloadLimit,
          passwordProtected: newSettings.passwordProtected !== undefined ? newSettings.passwordProtected : file.passwordProtected,
          password: newSettings.password !== undefined ? newSettings.password : file.password,
          notifyOnDownload: newSettings.notifyOnDownload !== undefined ? newSettings.notifyOnDownload : file.notifyOnDownload
        })
      });
    } catch (err) {
      console.error(`Error updating settings for ${file.name}:`, err);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleMultipleFilesUpload(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleMultipleFilesUpload(Array.from(e.target.files));
    }
  };

  const handleMockGoogleLogin = () => {
    const mockUser = {
      id: 'mock-google-id',
      name: 'Google User',
      email: 'googleuser@example.com',
      avatar: ''
    };
    setUser(mockUser);
    localStorage.setItem('token', 'mock-token-google');
    handleLoginSuccess('mock-token-google', mockUser);
  };

  const handleGoogleLogin = () => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '135623497828-uokgbi5mqe04t65u6gimfpqlhsk1s8u8.apps.googleusercontent.com';
    const redirectUri = `${window.location.origin}/login`;
    const scope = 'openid email profile';
    const nonce = Math.random().toString(36).substring(2) + Date.now().toString(36);
    
    localStorage.setItem('oauth_view', view);
    
    const oauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(clientId)}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=id_token&scope=${encodeURIComponent(scope)}&nonce=${nonce}`;
    window.location.href = oauthUrl;
  };

  const handleGoogleLoginWithToken = async (idToken) => {
    setLoading(true);
    setApiError('');
    setApiSuccess('');
    try {
      const res = await fetch(`${API_BASE_URL}/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: idToken })
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('token', data.token);
        setUser(data.user);
        setApiSuccess('Logged in successfully via Google!');
        
        setTimeout(() => {
          handleLoginSuccess(data.token, data.user);
          setApiSuccess('');
        }, 1000);
      } else {
        setApiError(data.message || 'Google authentication failed.');
        setView('login');
      }
    } catch (err) {
      setApiError('Unable to connect to Google authentication server.');
      setView('login');
    } finally {
      setLoading(false);
    }
  };

  const handleMockSAML = () => {
    const mockUser = {
      id: 'mock-saml-id',
      name: 'Enterprise User',
      email: 'enterprise@company.com',
      avatar: ''
    };
    setUser(mockUser);
    localStorage.setItem('token', 'mock-token-saml');
    handleLoginSuccess('mock-token-saml', mockUser);
  };

  const isFileExpiredClient = (file) => {
    if (!file.expiration || file.expiration === 'Never') {
      return false;
    }
    const createdAt = new Date(file.uploadDate);
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

  const handleTableCopyLink = (fileId) => {
    const downloadLink = `${window.location.origin}/download/${fileId}`;
    navigator.clipboard.writeText(downloadLink);
    setTableCopiedId(fileId);
    setTimeout(() => {
      setTableCopiedId('');
    }, 2000);
  };

  const handleRevokeFile = async (fileId) => {
    if (!window.confirm('Are you sure you want to revoke this link? Nobody will be able to download it anymore.')) {
      return;
    }
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${API_BASE_URL}/files/${fileId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          downloadLimit: 0
        })
      });
      const data = await response.json();
      if (data.success) {
        alert('File share link revoked successfully.');
        fetchUserFiles();
      } else {
        alert('Failed to revoke link settings: ' + data.message);
      }
    } catch (err) {
      alert('Error revoking settings: ' + err.message);
    }
  };

  const handleDeleteFile = async (fileId) => {
    if (!window.confirm('Are you sure you want to delete this file permanently? This action cannot be undone.')) {
      return;
    }
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${API_BASE_URL}/files/${fileId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        alert('File deleted successfully.');
        fetchUserFiles();
      } else {
        alert('Failed to delete file: ' + data.message);
      }
    } catch (err) {
      alert('Error deleting file: ' + err.message);
    }
  };

  const handleShareFile = (file) => {
    // If we are sharing the active uploaded file, merge the latest UI state values
    if (uploadedFile && (file.id === uploadedFile.id || file._id === uploadedFile.id)) {
      setSharingFile({
        ...file,
        expiration,
        downloadLimit,
        passwordProtected,
        password: filePassword
      });
    } else {
      setSharingFile(file);
    }
    setView('share');
  };

  const handleCopyLink = (fileId) => {
    const downloadLink = `${window.location.origin}/download/${fileId}`;
    navigator.clipboard.writeText(downloadLink);
    alert(`Copied link to clipboard: ${downloadLink}`);
  };

  const handleDownloadFile = async (fileId, fileName, isPasswordProtected) => {
    const token = localStorage.getItem('token');
    let passwordPrompt = '';
    if (isPasswordProtected) {
      passwordPrompt = prompt('This file is password-protected. Please enter the password to decrypt:');
      if (passwordPrompt === null) return; // user cancelled
    }

    try {
      const url = passwordPrompt
        ? `${API_BASE_URL}/files/download/${fileId}?password=${encodeURIComponent(passwordPrompt)}`
        : `${API_BASE_URL}/files/download/${fileId}`;

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const blob = await response.blob();
        const urlBlob = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = urlBlob;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(urlBlob);
        
        // Refresh table count immediately in real-time
        fetchUserFiles();
      } else {
        const errData = await response.json();
        alert('Download failed: ' + (errData.message || response.statusText));
      }
    } catch (err) {
      alert('Error downloading and decrypting file: ' + err.message);
    }
  };

  const handleClearAllFiles = async () => {
    if (!window.confirm('Are you sure you want to clear all uploaded files? This action cannot be undone.')) {
      return;
    }
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${API_BASE_URL}/files`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        alert('All uploaded files cleared successfully.');
        setUploadedFile(null);
        setSelectedFile(null);
        setUploadStatus('READY');
        setUploadProgress(0);
        fetchUserFiles();
      } else {
        alert('Failed to clear files: ' + data.message);
      }
    } catch (err) {
      alert('Error clearing files: ' + err.message);
    }
  };

  // Helper to format file size for display
  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  // 1. RENDER AUTH VIEW (Split screen card view)
  if (view === 'login' || view === 'signup') {
    return (
      <div className="grid-container">
        <div className="app-wrapper">
          {/* Auth Header */}
          <header className="header">
            <div className="container">
              <a href="/" className="logo-text" onClick={(e) => { e.preventDefault(); setView('landing'); }}>SecureShare</a>
              <nav className="nav-links">
                <a href="#support" className="nav-link">Support</a>
                <a href="#about" className="nav-link">About</a>
              </nav>
            </div>
          </header>

          <main className="auth-page-container">
            <div className="auth-card">
              {/* Left pane (Black banner with stars) */}
              <div className="auth-left-pane">
                <div className="shooting-stars-container">
                  <div className="shooting-star star-1"></div>
                  <div className="shooting-star star-2"></div>
                  <div className="shooting-star star-3"></div>
                  <div className="shooting-star star-4"></div>
                </div>

                <div>
                  <div className="auth-left-badge">
                    <ShieldIcon />
                    <span>Enterprise Grade Security</span>
                  </div>
                  <h2 className="auth-left-heading">
                    Secure Infrastructure for Modern Professionals.
                  </h2>
                  <p className="auth-left-text">
                    Experience the peace of mind that comes with zero-knowledge encryption and precision-engineered data management.
                  </p>
                </div>

                <div className="auth-quote-card">
                  <p className="auth-quote-text">
                    "The standard for sensitive document handling in our firm. Uncompromising speed and total technical trust."
                  </p>
                  <div className="auth-quote-user">
                    <div className="auth-quote-avatar" style={{ backgroundColor: '#c7d2fe' }}></div>
                    <div className="auth-quote-details">
                      <span className="auth-quote-name">Shreyam Pandey</span>
                      <span className="auth-quote-role">Lead Developer, SecureShare</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right pane (white credentials form) */}
              <div className="auth-right-pane">
                <div className="auth-right-badge">
                  <LockIcon />
                  <span>Your data is always encrypted</span>
                </div>
                
                <h3 className="auth-right-title">
                  {view === 'login' ? 'Welcome back' : 'Create Account'}
                </h3>
                <p className="auth-right-subtitle">
                  {view === 'login' 
                    ? 'Enter your credentials to access your secure vault.' 
                    : 'Get started by setting up your secure vault credentials.'}
                </p>

                {apiError && <div className="alert alert-error">{apiError}</div>}
                {apiSuccess && <div className="alert alert-success">{apiSuccess}</div>}

                <form onSubmit={handleFormSubmit}>
                  {view === 'signup' && (
                    <div className="auth-form-group">
                      <label className="auth-form-label" htmlFor="name">Full Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        className="auth-form-input" 
                        placeholder="John Doe"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                  )}

                  <div className="auth-form-group">
                    <label className="auth-form-label" htmlFor="email">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      className="auth-form-input" 
                      placeholder="name@company.com"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="auth-form-group">
                    <div className="auth-form-label-row">
                      <label className="auth-form-label" htmlFor="password">Password</label>
                      {view === 'login' && <span className="auth-form-forgot">Forgot?</span>}
                    </div>
                    <input 
                      type="password" 
                      id="password" 
                      name="password" 
                      className="auth-form-input" 
                      placeholder="********"
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                  </div>

                  <button type="submit" className="auth-btn-submit" disabled={loading}>
                    {loading ? (
                      <>
                        <span className="spinner"></span>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <span>{view === 'login' ? 'Login' : 'Create Account'}</span>
                    )}
                  </button>
                </form>

                <p className="auth-switch-text">
                  {view === 'login' ? (
                    <>
                      Don't have an account?{' '}
                      <span className="auth-switch-link" onClick={() => { setView('signup'); setApiError(''); }}>Create Account</span>
                    </>
                  ) : (
                    <>
                      Already have an account?{' '}
                      <span className="auth-switch-link" onClick={() => { setView('login'); setApiError(''); }}>Login</span>
                    </>
                  )}
                </p>

                <div className="auth-oauth-divider">Or continue with</div>

                <div className="auth-oauth-grid" style={{ gridTemplateColumns: '1fr' }}>
                  <button onClick={handleGoogleLogin} className="auth-oauth-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                    </svg>
                    <span>Google</span>
                  </button>
                </div>
              </div>
            </div>
          </main>

          <footer className="footer" style={{ padding: '40px 0', marginTop: 'auto' }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="footer-copy">© 2024 SecureShare. AES-256 Encrypted.</span>
              <div className="footer-links" style={{ gap: '24px' }}>
                <a href="#privacy" className="footer-link">Privacy Policy</a>
                <a href="#terms" className="footer-link">Terms of Service</a>
                <a href="#audit" className="footer-link">Security Audit</a>
                <a href="#contact" className="footer-link">Contact</a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    );
  }

  // 4. RENDER SHARE VIEW (Premium file ready page)
  if (view === 'share' && sharingFile) {
    const downloadLink = `${window.location.origin}/download/${sharingFile.id || sharingFile._id}`;
    return (
      <div className="grid-container">
        <div className="app-wrapper">
          {/* Header */}
          <header className="header">
            <div className="container">
              <a href="/" className="logo-text" onClick={(e) => { e.preventDefault(); setView('landing'); }}>SecureShare</a>
              <nav className="nav-links">
                <a href="#dashboard" className="nav-link" onClick={(e) => { e.preventDefault(); handleGoToDashboard(); }}>Dashboard</a>
                <a href="#about" className="nav-link">About</a>
                <a href="#support" className="nav-link">Support</a>
              </nav>
              <div className="auth-buttons">
                {user ? (
                  <div className="user-widget">
                    <span className="user-name">{user.name}</span>
                    <button onClick={handleLogout} className="btn-logout">Logout</button>
                  </div>
                ) : (
                  <>
                    <button onClick={() => setView('login')} className="btn-text">Login</button>
                    <button onClick={() => setView('signup')} className="btn-primary">Get Started</button>
                  </>
                )}
              </div>
            </div>
          </header>

          {/* Share Content */}
          <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexGrow: 1, padding: '40px 24px' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: '#d1fae5',
              border: '8px solid #ecfdf5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#10b981',
              marginBottom: '24px'
            }}>
              <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            <h1 style={{ fontSize: '36px', fontWeight: '800', color: '#09090b', marginBottom: '8px', letterSpacing: '-1px' }}>
              File Ready to Share
            </h1>
            <p style={{ fontSize: '15px', color: '#71717a', marginBottom: '40px', textAlign: 'center' }}>
              Your encrypted link has been generated and is ready for distribution.
            </p>

            {/* Main Share Card */}
            <div className="share-card-container" style={{
              width: '100%',
              maxWidth: '640px',
              backgroundColor: '#ffffff',
              border: '1px solid #e4e4e7',
              borderRadius: '16px',
              padding: '36px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.03)',
              marginBottom: '32px'
            }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px', textAlign: 'left' }}>
                Shareable URL
              </label>

              {/* URL + Copy button */}
              <div style={{ display: 'flex', gap: '12px', marginBottom: '28px' }}>
                <div style={{ 
                  flexGrow: 1, 
                  backgroundColor: '#f4f4f5', 
                  border: '1px solid #e4e4e7', 
                  borderRadius: '8px', 
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  minWidth: 0
                }}>
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="#71717a" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                  <span style={{ 
                    fontSize: '14px', 
                    color: '#09090b', 
                    fontWeight: '600', 
                    whiteSpace: 'nowrap', 
                    overflow: 'hidden', 
                    textOverflow: 'ellipsis',
                    userSelect: 'all',
                    width: '100%',
                    textAlign: 'left'
                  }}>
                    {downloadLink}
                  </span>
                </div>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(downloadLink);
                    setCopiedLink(true);
                    setTimeout(() => setCopiedLink(false), 2000);
                  }}
                  style={{
                    backgroundColor: '#000000',
                    color: '#ffffff',
                    padding: '0 24px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer'
                  }}
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  <span>Copy Link</span>
                </button>
              </div>
              {copiedLink && (
                <div style={{
                  fontSize: '13px',
                  color: '#10b981',
                  fontWeight: '700',
                  textAlign: 'right',
                  marginTop: '-16px',
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  gap: '4px',
                  transition: 'opacity 0.3s ease-in-out',
                  opacity: copiedLink ? 1 : 0
                }}>
                  <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Copied successfully!</span>
                </div>
              )}

              {/* Metadata */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', borderTop: '1px solid #f1f1f4', paddingTop: '24px', paddingBottom: '24px', borderBottom: '1px solid #f1f1f4', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #f1f1f4', minWidth: 0 }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569', flexShrink: 0 }}>
                    <FileIcon />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', minWidth: 0 }}>
                    <span style={{ fontSize: '11px', fontWeight: '800', color: '#71717a', textTransform: 'uppercase' }}>File Name</span>
                    <span style={{ fontSize: '13px', fontWeight: '700', color: '#09090b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={sharingFile.name}>
                      {sharingFile.name}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #f1f1f4', minWidth: 0 }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569', flexShrink: 0 }}>
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <ellipse cx="12" cy="5" rx="9" ry="3" />
                      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                      <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
                    </svg>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', minWidth: 0 }}>
                    <span style={{ fontSize: '11px', fontWeight: '800', color: '#71717a', textTransform: 'uppercase' }}>Size</span>
                    <span style={{ fontSize: '13px', fontWeight: '700', color: '#09090b' }}>
                      {formatBytes(sharingFile.size)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Badges */}
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: '#ecfdf5',
                  color: '#065f46',
                  borderRadius: '20px',
                  padding: '6px 14px',
                  fontSize: '12px',
                  fontWeight: '700'
                }}>
                  <ClockIcon />
                  <span>
                    {sharingFile.expiration === 'Never' && 'Never Expires'}
                    {sharingFile.expiration === '24 Hours' && 'Expires in 24h'}
                    {sharingFile.expiration === '1 Hour' && 'Expires in 1h'}
                    {sharingFile.expiration === '6 Hours' && 'Expires in 6h'}
                    {sharingFile.expiration === '7 Days' && 'Expires in 7d'}
                    {(!sharingFile.expiration || (sharingFile.expiration !== 'Never' && sharingFile.expiration !== '24 Hours' && sharingFile.expiration !== '1 Hour' && sharingFile.expiration !== '6 Hours' && sharingFile.expiration !== '7 Days')) && `Expires in ${sharingFile.expiration || '24h'}`}
                  </span>
                </span>

                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: sharingFile.passwordProtected ? '#fffbeb' : '#f4f4f5',
                  color: sharingFile.passwordProtected ? '#92400e' : '#71717a',
                  borderRadius: '20px',
                  padding: '6px 14px',
                  fontSize: '12px',
                  fontWeight: '700'
                }}>
                  <LockIcon />
                  <span>{sharingFile.passwordProtected ? 'Password Protected' : 'No Password'}</span>
                </span>

                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: '#f5f3ff',
                  color: '#5b21b6',
                  borderRadius: '20px',
                  padding: '6px 14px',
                  fontSize: '12px',
                  fontWeight: '700'
                }}>
                  <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  <span>{sharingFile.downloadLimit || 1} Time{sharingFile.downloadLimit > 1 ? 's' : ''} Download</span>
                </span>
              </div>
            </div>

            {/* Footer Navigation */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '14px', fontWeight: '700' }}>
              <button 
                onClick={() => { setView('landing'); setDashboardTab('upload'); }}
                style={{ color: '#4f46e5', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
              >
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l-.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
                <span>Edit Security Settings</span>
              </button>
              <span style={{ color: '#d1d5db' }}>•</span>
              <button 
                onClick={handleGoToDashboard}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e4e4e7',
                  borderRadius: '8px',
                  padding: '10px 20px',
                  color: '#09090b',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer'
                }}
              >
                <span>Go to Dashboard</span>
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
          </main>

          <footer className="footer" style={{ padding: '40px 0', marginTop: 'auto', backgroundColor: 'transparent', borderTop: 'none' }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="footer-copy">© 2024 SecureShare. AES-256 Encrypted.</span>
              <div className="footer-links" style={{ gap: '24px' }}>
                <a href="#privacy" className="footer-link">Privacy Policy</a>
                <a href="#terms" className="footer-link">Terms of Service</a>
                <a href="#audit" className="footer-link">Security Audit</a>
                <a href="#contact" className="footer-link">Contact</a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    );
  }

  // 6. RENDER BULK SHARE VIEW (Premium multi-file ready page)
  if (view === 'bulk_share') {
    const handleCopyAllBulkLinks = () => {
      const links = bulkUploadedFiles
        .filter(f => f.status === 'COMPLETED' && f.uploadedData)
        .map(f => `${window.location.origin}/download/${f.uploadedData.id}`);
      if (links.length > 0) {
        navigator.clipboard.writeText(links.join('\n'));
        alert('All share links copied to clipboard!');
      }
    };

    return (
      <div className="grid-container">
        <div className="app-wrapper">
          {/* Header */}
          <header className="header">
            <div className="container">
              <a href="/" className="logo-text" onClick={(e) => { e.preventDefault(); setView('landing'); }}>SecureShare</a>
              <nav className="nav-links">
                <a href="#dashboard" className="nav-link" onClick={(e) => { e.preventDefault(); if (user) { setView('landing'); setDashboardTab('dashboard'); } else { setView('login'); } }}>Dashboard</a>
                <a href="#about" className="nav-link">About</a>
                <a href="#support" className="nav-link">Support</a>
              </nav>
              <div className="auth-buttons">
                {user ? (
                  <div className="user-widget">
                    <span className="user-name">{user.name}</span>
                    <button onClick={handleLogout} className="btn-logout">Logout</button>
                  </div>
                ) : (
                  <>
                    <button onClick={() => setView('login')} className="btn-text">Login</button>
                    <button onClick={() => setView('signup')} className="btn-primary">Get Started</button>
                  </>
                )}
              </div>
            </div>
          </header>

          {/* Bulk Share Content */}
          <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', flexGrow: 1, padding: '40px 24px' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: '#d1fae5',
              border: '8px solid #ecfdf5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#10b981',
              marginBottom: '24px'
            }}>
              <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
              </svg>
            </div>

            <h1 style={{ fontSize: '36px', fontWeight: '800', color: '#09090b', marginBottom: '8px', letterSpacing: '-1px' }}>
              Files Encrypted & Ready
            </h1>
            <p style={{ fontSize: '15px', color: '#71717a', marginBottom: '40px', textAlign: 'center' }}>
              Configure individual delivery settings or apply global rules across all uploaded files.
            </p>

            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '32px',
              width: '100%',
              maxWidth: '1200px',
              marginBottom: '40px',
              alignItems: 'start'
            }}>
              {/* Left Column: Global Configuration Card */}
              <div style={{
                flex: '1 1 360px',
                backgroundColor: '#ffffff',
                border: '1px solid #e4e4e7',
                borderRadius: '16px',
                padding: '28px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.03)',
                textAlign: 'left'
              }}>
                <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#09090b', marginBottom: '6px' }}>Apply to All Files</h3>
                <p style={{ fontSize: '13px', color: '#71717a', marginBottom: '20px' }}>Apply standard configuration rules to all uploaded items in one click.</p>

                <div className="control-group" style={{ marginBottom: '16px' }}>
                  <label className="control-label" style={{ fontSize: '12px', fontWeight: '700' }}>Expiration Link</label>
                  <select 
                    className="control-select"
                    value={globalExpiration}
                    onChange={(e) => setGlobalExpiration(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e4e4e7', outline: 'none' }}
                  >
                    <option value="1 Hour">1 Hour</option>
                    <option value="6 Hours">6 Hours</option>
                    <option value="24 Hours">24 Hours</option>
                    <option value="7 Days">7 Days</option>
                    <option value="Never">Never</option>
                  </select>
                </div>

                <div className="control-group" style={{ marginBottom: '16px' }}>
                  <label className="control-label" style={{ fontSize: '12px', fontWeight: '700' }}>Download Limit</label>
                  <input 
                    type="number"
                    min="1"
                    className="control-select"
                    value={globalDownloadLimit}
                    onChange={(e) => setGlobalDownloadLimit(parseInt(e.target.value) || 1)}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e4e4e7', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>

                <div className="control-group" style={{ marginBottom: '16px' }}>
                  <div className="toggle-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="toggle-label-desc">
                      <span className="toggle-title" style={{ fontSize: '13px', fontWeight: '700' }}>Password Protection</span>
                    </div>
                    <label className="switch" style={{ scale: '0.9' }}>
                      <input 
                        type="checkbox" 
                        checked={globalPasswordProtected}
                        onChange={(e) => {
                          setGlobalPasswordProtected(e.target.checked);
                          if (!e.target.checked) setGlobalPassword('');
                        }}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                  {globalPasswordProtected && (
                    <div style={{ marginTop: '10px' }}>
                      <input 
                        type="password" 
                        className="control-select" 
                        placeholder="Enter security password"
                        value={globalPassword}
                        onChange={(e) => setGlobalPassword(e.target.value)}
                        style={{ 
                          padding: '10px 12px',
                          border: '1px solid #e4e4e7',
                          borderRadius: '8px',
                          fontSize: '13px',
                          width: '100%',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>
                  )}
                </div>

                <div className="control-group" style={{ marginBottom: '24px' }}>
                  <div className="toggle-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="toggle-label-desc">
                      <span className="toggle-title" style={{ fontSize: '13px', fontWeight: '700' }}>Download Email Alerts</span>
                    </div>
                    <label className="switch" style={{ scale: '0.9' }}>
                      <input 
                        type="checkbox" 
                        checked={globalNotifyOnDownload}
                        onChange={(e) => setGlobalNotifyOnDownload(e.target.checked)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>

                <button 
                  onClick={applyGlobalSettings}
                  style={{
                    width: '100%',
                    backgroundColor: '#4f46e5',
                    color: '#ffffff',
                    padding: '12px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '700',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(79, 70, 229, 0.15)',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#4338ca'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#4f46e5'}
                >
                  Apply to All Files
                </button>
              </div>

              {/* Right Column: Files List Stack */}
              <div style={{
                flex: '2 2 600px',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '14px', fontWeight: '700', color: '#71717a' }}>
                    Uploaded Files ({bulkUploadedFiles.filter(f => f.status === 'COMPLETED').length})
                  </span>
                  <button 
                    onClick={handleCopyAllBulkLinks}
                    style={{
                      backgroundColor: '#000000',
                      color: '#ffffff',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      fontSize: '13px',
                      fontWeight: '700',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
                    }}
                  >
                    <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.5" fill="none">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    <span>Copy All Links</span>
                  </button>
                </div>

                {bulkUploadedFiles.map((file, idx) => {
                  const isCompleted = file.status === 'COMPLETED' && file.uploadedData;
                  const fileId = isCompleted ? (file.uploadedData.id || file.uploadedData._id) : null;
                  const fileLink = fileId ? `${window.location.origin}/download/${fileId}` : '';

                  return (
                    <div key={idx} style={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e4e4e7',
                      borderRadius: '16px',
                      padding: '24px',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.01)',
                      textAlign: 'left'
                    }}>
                      {/* Individual File Header */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: '16px', borderBottom: '1px solid #f4f4f5', paddingBottom: '16px', marginBottom: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                          <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569', flexShrink: 0 }}>
                            <FileIcon />
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                            <span style={{ fontSize: '14px', fontWeight: '700', color: '#09090b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={file.name}>
                              {file.name}
                            </span>
                            <span style={{ fontSize: '12px', color: '#71717a' }}>{formatBytes(file.size)}</span>
                          </div>
                        </div>

                        {isCompleted ? (
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(fileLink);
                              alert(`Copied link for ${file.name}`);
                            }}
                            style={{
                              backgroundColor: 'transparent',
                              border: '1px solid #e4e4e7',
                              borderRadius: '6px',
                              padding: '6px 12px',
                              fontSize: '12px',
                              fontWeight: '700',
                              color: '#09090b',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                          >
                            <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2.5" fill="none">
                              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                            </svg>
                            <span>Copy Link</span>
                          </button>
                        ) : (
                          <span style={{ fontSize: '12px', fontWeight: '700', color: file.status === 'ERROR' ? '#ef4444' : '#f59e0b' }}>
                            {file.status === 'ERROR' ? 'Failed' : `Uploading (${file.progress || 0}%)`}
                          </span>
                        )}
                      </div>

                      {isCompleted && (
                        <div>
                          {/* Individual Settings */}
                          <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth < 640 ? '1fr' : '1fr 1fr', gap: '16px 24px' }}>
                            <div className="control-group">
                              <label className="control-label" style={{ fontSize: '11px', fontWeight: '700', color: '#71717a' }}>Expiration</label>
                              <select 
                                className="control-select"
                                value={file.expiration}
                                onChange={(e) => updateIndividualFileSettings(idx, { expiration: e.target.value })}
                                style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #e4e4e7', fontSize: '13px' }}
                              >
                                <option value="1 Hour">1 Hour</option>
                                <option value="6 Hours">6 Hours</option>
                                <option value="24 Hours">24 Hours</option>
                                <option value="7 Days">7 Days</option>
                                <option value="Never">Never</option>
                              </select>
                            </div>

                            <div className="control-group">
                              <label className="control-label" style={{ fontSize: '11px', fontWeight: '700', color: '#71717a' }}>Download Limit</label>
                              <input 
                                type="number"
                                min="1"
                                className="control-select"
                                value={file.downloadLimit}
                                onChange={(e) => updateIndividualFileSettings(idx, { downloadLimit: parseInt(e.target.value) || 1 })}
                                style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #e4e4e7', fontSize: '13px', boxSizing: 'border-box' }}
                              />
                            </div>

                            <div className="control-group">
                              <div className="toggle-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span className="toggle-title" style={{ fontSize: '12px', fontWeight: '700', color: '#71717a' }}>Password Protected</span>
                                <label className="switch" style={{ scale: '0.8' }}>
                                  <input 
                                    type="checkbox" 
                                    checked={file.passwordProtected}
                                    onChange={(e) => {
                                      const updatedProtected = e.target.checked;
                                      updateIndividualFileSettings(idx, {
                                        passwordProtected: updatedProtected,
                                        password: updatedProtected ? file.password : ''
                                      });
                                    }}
                                  />
                                  <span className="slider"></span>
                                </label>
                              </div>
                              {file.passwordProtected && (
                                <div style={{ marginTop: '8px' }}>
                                  <input 
                                    type="password" 
                                    className="control-select" 
                                    placeholder="Enter file password"
                                    value={file.password}
                                    onChange={(e) => updateIndividualFileSettings(idx, { password: e.target.value })}
                                    style={{ 
                                      padding: '8px 10px',
                                      border: '1px solid #e4e4e7',
                                      borderRadius: '6px',
                                      fontSize: '12px',
                                      width: '100%',
                                      outline: 'none',
                                      boxSizing: 'border-box'
                                    }}
                                  />
                                </div>
                              )}
                            </div>

                            <div className="control-group">
                              <div className="toggle-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span className="toggle-title" style={{ fontSize: '12px', fontWeight: '700', color: '#71717a' }}>Email Notifications</span>
                                <label className="switch" style={{ scale: '0.8' }}>
                                  <input 
                                    type="checkbox" 
                                    checked={file.notifyOnDownload}
                                    onChange={(e) => updateIndividualFileSettings(idx, { notifyOnDownload: e.target.checked })}
                                  />
                                  <span className="slider"></span>
                                </label>
                              </div>
                            </div>
                          </div>

                          <div style={{ marginTop: '16px', backgroundColor: '#fafafa', padding: '10px 14px', borderRadius: '8px', border: '1px solid #f1f1f4', fontSize: '12px', color: '#4b5563', wordBreak: 'break-all' }}>
                            <strong>Share Link:</strong> {fileLink}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Back Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '14px', fontWeight: '700' }}>
              <button 
                onClick={() => { setView('landing'); setDashboardTab('upload'); }}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e4e4e7',
                  borderRadius: '8px',
                  padding: '10px 20px',
                  color: '#09090b',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer'
                }}
              >
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none">
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
                <span>Upload More Files</span>
              </button>
              <button 
                onClick={handleGoToDashboard}
                style={{
                  backgroundColor: '#000000',
                  color: '#ffffff',
                  borderRadius: '8px',
                  padding: '10px 20px',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer'
                }}
              >
                <span>Go to Dashboard</span>
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
          </main>

          <footer className="footer" style={{ padding: '40px 0', marginTop: 'auto', backgroundColor: 'transparent', borderTop: 'none' }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="footer-copy">© 2024 SecureShare. AES-256 Encrypted.</span>
              <div className="footer-links" style={{ gap: '24px' }}>
                <a href="#privacy" className="footer-link">Privacy Policy</a>
                <a href="#terms" className="footer-link">Terms of Service</a>
                <a href="#audit" className="footer-link">Security Audit</a>
                <a href="#contact" className="footer-link">Contact</a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    );
  }

  const handlePortalDownloadFile = async () => {
    setDownloadError('');
    setDownloadSuccess('');

    const token = localStorage.getItem('token');
    try {
      const url = downloadMetadata.passwordProtected
        ? `${API_BASE_URL}/files/download/${downloadFileId}?password=${encodeURIComponent(downloadPassword)}`
        : `${API_BASE_URL}/files/download/${downloadFileId}`;

      const headers = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(url, {
        headers
      });

      if (response.ok) {
        setDownloadSuccess('Verification success! Decrypting and downloading file...');
        const blob = await response.blob();
        const urlBlob = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = urlBlob;
        a.download = downloadMetadata.name;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(urlBlob);

        // Refresh metadata after download
        setTimeout(() => {
          fetchDownloadMetadata(downloadFileId);
        }, 1000);
      } else {
        const errData = await response.json();
        setDownloadError(errData.message || 'Download validation failed.');
      }
    } catch (err) {
      setDownloadError('Network error decrypting or downloading file.');
    }
  };

  // 5. RENDER DOWNLOAD PORTAL VIEW
  if (view === 'download_portal') {
    return (
      <div className="grid-container">
        <div className="app-wrapper">
          {/* Header */}
          <header className="header">
            <div className="container">
              <a href="/" className="logo-text" onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', '/'); setView('landing'); }}>SecureShare</a>
              <nav className="nav-links">
                <a href="#dashboard" className="nav-link" onClick={(e) => { e.preventDefault(); handleGoToDashboard(); }}>Dashboard</a>
                <a href="#about" className="nav-link">About</a>
                <a href="#support" className="nav-link">Support</a>
              </nav>
              <div className="auth-buttons">
                {user ? (
                  <div className="user-widget">
                    <span className="user-name">{user.name}</span>
                    <button onClick={handleLogout} className="btn-logout">Logout</button>
                  </div>
                ) : (
                  <>
                    <button onClick={() => setView('login')} className="btn-text">Login</button>
                    <button onClick={() => setView('signup')} className="btn-primary">Get Started</button>
                  </>
                )}
              </div>
            </div>
          </header>

          <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexGrow: 1, padding: '40px 24px' }}>
            {downloadMetaLoading ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <span className="spinner" style={{ borderTopColor: '#000000', width: '24px', height: '24px' }}></span>
                <p style={{ marginTop: '16px', color: '#71717a', fontSize: '14px' }}>Loading secure file information...</p>
              </div>
            ) : downloadMetaError ? (
              <div className="share-card-container" style={{
                width: '100%',
                maxWidth: '520px',
                backgroundColor: '#ffffff',
                border: '1px solid #fee2e2',
                borderRadius: '16px',
                padding: '36px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.03)',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  backgroundColor: '#fee2e2',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ef4444',
                  margin: '0 auto 20px auto'
                }}>
                  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2.5" fill="none">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#991b1b', marginBottom: '8px' }}>Security Check Failed</h3>
                <p style={{ fontSize: '14px', color: '#7f1d1d', marginBottom: '24px' }}>{downloadMetaError}</p>
                <button className="btn-primary" onClick={() => { window.history.pushState({}, '', '/'); setView('landing'); }}>Go to Home</button>
              </div>
            ) : downloadMetadata ? (
              <div className="share-card-container" style={{
                width: '100%',
                maxWidth: '520px',
                backgroundColor: '#ffffff',
                border: '1px solid #e4e4e7',
                borderRadius: '16px',
                padding: '36px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.03)',
                position: 'relative'
              }}>
                {/* 1. Green Threat Scan Badge */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    backgroundColor: '#ecfdf5',
                    color: '#047857',
                    borderRadius: '20px',
                    padding: '6px 14px',
                    fontSize: '13px',
                    fontWeight: '700',
                    border: '1px solid #a7f3d0'
                  }}>
                    <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <polyline points="9 11 11 13 15 9" />
                    </svg>
                    <span>Scan complete: No threats detected</span>
                  </div>
                </div>

                {/* Header */}
                <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#09090b', marginBottom: '4px', letterSpacing: '-0.5px', textAlign: 'center' }}>
                  Receive Secure File
                </h2>
                <p style={{ fontSize: '14px', color: '#71717a', marginBottom: '28px', textAlign: 'center' }}>
                  Shared via AES-256 Encrypted Tunnel
                </p>

                {/* Error Banner */}
                {downloadError && (
                  <div className="alert alert-error" style={{ marginBottom: '20px' }}>
                    {downloadError}
                  </div>
                )}
                {downloadSuccess && (
                  <div className="alert alert-success" style={{ marginBottom: '20px' }}>
                    {downloadSuccess}
                  </div>
                )}

                {/* File Details Container Box */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '16px 20px',
                  marginBottom: '28px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: 0 }}>
                    <div style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '8px',
                      backgroundColor: '#0f172a',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff',
                      flexShrink: 0
                    }}>
                      <FileIcon />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', minWidth: 0 }}>
                      <span style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={downloadMetadata.name}>
                        {downloadMetadata.name}
                      </span>
                      <span style={{ fontSize: '13px', color: '#64748b', fontWeight: '500' }}>
                        {formatBytes(downloadMetadata.size)} • {
                          downloadMetadata.isExpired ? 'Expired' : 
                          downloadMetadata.limitHit ? 'Limit Hit' : 
                          downloadMetadata.expiration === 'Never' ? 'Never Expires' :
                          downloadMetadata.expiration === '24 Hours' ? 'Expires in 24 hours' :
                          downloadMetadata.expiration === '1 Hour' ? 'Expires in 1 hour' :
                          downloadMetadata.expiration === '6 Hours' ? 'Expires in 6 hours' :
                          downloadMetadata.expiration === '7 Days' ? 'Expires in 7 days' :
                          `Expires in ${downloadMetadata.expiration}`
                        }
                      </span>
                    </div>
                  </div>
                  <div style={{ color: downloadMetadata.passwordProtected ? '#3b82f6' : '#94a3b8', flexShrink: 0 }}>
                    <LockIcon />
                  </div>
                </div>

                {/* Expiry / Limit Warnings */}
                {downloadMetadata.isExpired && (
                  <div style={{ textAlign: 'center', color: '#ef4444', fontSize: '14px', fontWeight: '600', marginBottom: '24px' }}>
                    This share link has expired and is no longer accessible.
                  </div>
                )}
                {downloadMetadata.limitHit && !downloadMetadata.isExpired && (
                  <div style={{ textAlign: 'center', color: '#ef4444', fontSize: '14px', fontWeight: '600', marginBottom: '24px' }}>
                    This file has reached its download limit.
                  </div>
                )}

                {/* Password field if protected */}
                {!downloadMetadata.isExpired && !downloadMetadata.limitHit && downloadMetadata.passwordProtected && (
                  <div style={{ marginBottom: '28px', textAlign: 'left' }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
                      Access Password
                    </label>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                      <input
                        type={showDownloadPassword ? 'text' : 'password'}
                        className="control-select"
                        placeholder="Enter share password"
                        value={downloadPassword}
                        onChange={(e) => setDownloadPassword(e.target.value)}
                        style={{
                          padding: '12px 48px 12px 16px',
                          border: '1px solid #cbd5e1',
                          borderRadius: '8px',
                          fontSize: '14px',
                          width: '100%',
                          outline: 'none',
                          boxSizing: 'border-box',
                          backgroundColor: '#f8fafc'
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowDownloadPassword(!showDownloadPassword)}
                        style={{
                          position: 'absolute',
                          right: '16px',
                          background: 'none',
                          border: 'none',
                          color: '#64748b',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          padding: 0
                        }}
                      >
                        {showDownloadPassword ? (
                          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                            <line x1="1" y1="1" x2="23" y2="23" />
                          </svg>
                        ) : (
                          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* Download Button */}
                <button
                  onClick={handlePortalDownloadFile}
                  disabled={downloadMetadata.isExpired || downloadMetadata.limitHit}
                  style={{
                    width: '100%',
                    backgroundColor: (downloadMetadata.isExpired || downloadMetadata.limitHit) ? '#cbd5e1' : '#000000',
                    color: '#ffffff',
                    padding: '16px',
                    borderRadius: '8px',
                    fontSize: '15px',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    cursor: (downloadMetadata.isExpired || downloadMetadata.limitHit) ? 'not-allowed' : 'pointer',
                    border: 'none',
                    marginBottom: '28px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    if (!downloadMetadata.isExpired && !downloadMetadata.limitHit) {
                      e.target.style.backgroundColor = '#18181b';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!downloadMetadata.isExpired && !downloadMetadata.limitHit) {
                      e.target.style.backgroundColor = '#000000';
                    }
                  }}
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  <span>Download Secure File</span>
                </button>

                {/* Avatar and Owner Badge at bottom */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderTop: '1px solid #f1f1f4',
                  paddingTop: '20px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: '#e2e8f0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '700',
                      fontSize: '12px',
                      color: '#475569',
                      overflow: 'hidden'
                    }}>
                      {downloadMetadata.ownerName ? downloadMetadata.ownerName.substring(0, 2).toUpperCase() : 'AR'}
                    </div>
                    <span style={{ fontSize: '14px', color: '#475569', fontWeight: '500' }}>
                      Shared by <strong style={{ color: '#0f172a' }}>{downloadMetadata.ownerName || 'Alex Rivera'}</strong>
                    </span>
                  </div>
                  
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    color: '#0f766e',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    <svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" strokeWidth="2.5" fill="none">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    <span>ID Verified</span>
                  </div>
                </div>

              </div>
            ) : null}

            {/* Encryption Technical Details Text */}
            <p style={{ fontSize: '12px', color: '#71717a', marginTop: '24px', textAlign: 'center' }}>
              Your connection is encrypted. Technical details: TLS 1.3, XChaCha20-Poly1305.
            </p>
          </main>

          <footer className="footer" style={{ padding: '40px 0', marginTop: 'auto', backgroundColor: 'transparent', borderTop: 'none' }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="footer-copy">© 2024 SecureShare. AES-256 Encrypted.</span>
              <div className="footer-links" style={{ gap: '24px' }}>
                <a href="#privacy" className="footer-link">Privacy Policy</a>
                <a href="#terms" className="footer-link">Terms of Service</a>
                <a href="#audit" className="footer-link">Security Audit</a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    );
  }

  // 2. RENDER WORKSPACE/DASHBOARD VIEW (Logged-in user interface)
  if (user && view === 'dashboard') {
    return (
      <div className="dashboard-layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <a href="/" className="sidebar-logo" onClick={(e) => { e.preventDefault(); setView('landing'); }}>SecureShare</a>
          
          <button className="sidebar-btn-new" onClick={() => setDashboardTab('upload')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span>New Upload</span>
          </button>

          <nav className="sidebar-nav">
            <button 
              className={`sidebar-nav-item ${dashboardTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setDashboardTab('dashboard')}
            >
              <FolderIcon />
              <span>Dashboard</span>
            </button>
            <button 
              className={`sidebar-nav-item ${dashboardTab === 'upload' ? 'active' : ''}`}
              onClick={() => setDashboardTab('upload')}
            >
              <CloudUploadIcon />
              <span>Upload Files</span>
            </button>
          </nav>

          <div className="sidebar-footer">
            <div className="sidebar-profile">
              <div className="sidebar-profile-avatar">
                {/* Default user initials avatar */}
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#6366f1', color: 'white', fontWeight: 'bold', fontSize: '15px' }}>
                  {user.name.substring(0, 2).toUpperCase()}
                </div>
              </div>
              <div className="sidebar-profile-info">
                <span className="sidebar-profile-name">{user.name}</span>
                <span className="sidebar-profile-role">Pro Account</span>
              </div>
            </div>

            <button className="sidebar-footer-link" onClick={() => alert('Support ticket system triggered. How can we help you?')}>
              <HelpIcon />
              <span>Help Center</span>
            </button>
            
            <button className="sidebar-footer-link" onClick={handleLogout}>
              <LogoutIcon />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Workspace content page */}
        <div className="dashboard-main">
          {/* Top Navbar */}
          <div className="dashboard-top-nav">
            <div className="breadcrumbs">
              <span className="breadcrumb-muted">Dashboard</span>
              <span className="breadcrumb-sep">&gt;</span>
              <span>
                {dashboardTab === 'upload' && 'Secure Upload'}
                {dashboardTab === 'dashboard' && 'Overview'}
              </span>
            </div>
            
            <div className="status-pill-aes">
              AES-256
            </div>
          </div>

          {/* Tab Workspaces */}
          <main className="dashboard-content">
            {dashboardTab === 'upload' && (
              <>
                <h1 className="dashboard-title">Share Encrypted Files</h1>
                <p className="dashboard-subtitle">
                  Your data is encrypted locally before it ever touches our servers. Professional-grade security with single-use delivery controls.
                </p>

                {/* Dashboard layout grid (Upload + stack controls) */}
                <div className="dashboard-workspace-grid">
                  
                  {/* Left Column (Drag-and-Drop) */}
                  <div className="upload-box-card">
                    <label 
                      className={`upload-dropzone ${dragActive ? 'drag-active' : ''}`}
                      onDragEnter={handleDrag}
                      onDragOver={handleDrag}
                      onDragLeave={handleDrag}
                      onDrop={handleDrop}
                      htmlFor="dashboard-file-upload"
                    >
                      <input 
                        type="file" 
                        id="dashboard-file-upload" 
                        style={{ display: 'none' }} 
                        onChange={handleFileSelect}
                        multiple
                      />
                      
                      <div className="upload-dropzone-icon">
                        <CloudUploadIcon />
                      </div>
                      
                      <p className="upload-dropzone-title">Drag and drop to secure</p>
                      <p className="upload-dropzone-subtitle">
                        or <span className="upload-dropzone-link">browse files</span> from your computer
                      </p>

                      <div className="pills-row">
                        <span className="type-pill">
                          <FileIcon />
                          <span>PDF</span>
                        </span>
                        <span className="type-pill">
                          <GlobeIcon />
                          <span>PNG/JPG</span>
                        </span>
                        <span className="type-pill">
                          <LockIcon />
                          <span>ZIP</span>
                        </span>
                      </div>
                    </label>
                  </div>

                  {/* Right Column (Controls + Status) */}
                  <div className="workspace-right-stack">
                    {/* Delivery Controls */}
                    <div className="controls-card">
                      <h3 className="card-title-header">Delivery Controls</h3>
                      
                      <div className="control-group">
                        <label className="control-label">Expiration Link</label>
                        <select 
                          className="control-select"
                          value={expiration}
                          onChange={(e) => setExpiration(e.target.value)}
                        >
                          <option value="1 Hour">1 Hour</option>
                          <option value="6 Hours">6 Hours</option>
                          <option value="24 Hours">24 Hours</option>
                          <option value="7 Days">7 Days</option>
                          <option value="Never">Never</option>
                        </select>
                      </div>

                      <div className="control-group">
                        <label className="control-label">Download Limit</label>
                        <div className="btn-group-row">
                          <button 
                            className={`limit-btn ${downloadLimit === 1 ? 'active' : ''}`}
                            onClick={() => setDownloadLimit(1)}
                          >
                            1
                          </button>
                          <button 
                            className={`limit-btn ${downloadLimit === 5 ? 'active' : ''}`}
                            onClick={() => setDownloadLimit(5)}
                          >
                            5
                          </button>
                          <button 
                            className={`limit-btn ${downloadLimit === 10 ? 'active' : ''}`}
                            onClick={() => setDownloadLimit(10)}
                          >
                            10
                          </button>
                        </div>
                      </div>

                      <div className="control-group" style={{ marginTop: '24px' }}>
                        <div className="toggle-row">
                          <div className="toggle-label-desc">
                            <span className="toggle-title">Password Protection</span>
                            <span className="toggle-subtitle">Add extra layer of security</span>
                          </div>
                          <label className="switch">
                            <input 
                              type="checkbox" 
                              checked={passwordProtected}
                              onChange={(e) => {
                                setPasswordProtected(e.target.checked);
                                if (!e.target.checked) setFilePassword('');
                              }}
                            />
                            <span className="slider"></span>
                          </label>
                        </div>
                        {passwordProtected && (
                          <div style={{ marginTop: '12px' }}>
                            <input 
                              type="password" 
                              className="control-select" 
                              placeholder="Enter security password"
                              value={filePassword}
                              onChange={(e) => setFilePassword(e.target.value)}
                              style={{ 
                                padding: '10px 12px',
                                border: '1px solid #e4e4e7',
                                borderRadius: '8px',
                                fontSize: '13px',
                                width: '100%',
                                outline: 'none',
                                boxSizing: 'border-box'
                              }}
                            />
                          </div>
                        )}
                      </div>

                      <div className="control-group" style={{ marginTop: '24px' }}>
                        <div className="toggle-row">
                          <div className="toggle-label-desc">
                            <span className="toggle-title">Download Email Alerts</span>
                            <span className="toggle-subtitle">Notify me on each download</span>
                          </div>
                          <label className="switch">
                            <input 
                              type="checkbox" 
                              checked={notifyOnDownload}
                              onChange={(e) => setNotifyOnDownload(e.target.checked)}
                            />
                            <span className="slider"></span>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Status Card */}
                    <div className="status-card">
                      <div className="status-card-header">
                        <span className="status-label">STATUS</span>
                        <span className={`status-badge ${uploadStatus === 'UPLOADING' ? 'uploading' : ''}`}>
                          {uploadStatus === 'READY' && 'READY'}
                          {uploadStatus === 'UPLOADING' && 'UPLOADING'}
                          {uploadStatus === 'COMPLETED' && 'COMPLETED'}
                          {uploadStatus === 'ERROR' && 'ERROR'}
                        </span>
                      </div>

                      <div className="status-details-row">
                        <div className="status-left">
                          <div className="status-icon-circle">
                            <LockIcon />
                          </div>
                          <div className="status-info-col">
                            <span className="status-title-text">
                              {uploadStatus === 'READY' && 'Waiting for files...'}
                              {uploadStatus === 'UPLOADING' && uploadingFileName}
                              {uploadStatus === 'COMPLETED' && (uploadedFile ? uploadedFile.name : 'Upload Complete')}
                              {uploadStatus === 'ERROR' && 'Upload Failed'}
                            </span>
                            <span className="status-subtitle-text">
                              {uploadStatus === 'READY' && 'Queue empty'}
                              {uploadStatus === 'UPLOADING' && `${uploadingFileSize} • ${uploadProgress}%`}
                              {uploadStatus === 'COMPLETED' && (uploadedFile ? `${formatBytes(uploadedFile.size)} • Encrypted` : 'Saved metadata to MongoDB')}
                              {uploadStatus === 'ERROR' && 'Please try again'}
                            </span>
                          </div>
                        </div>

                        {uploadStatus === 'COMPLETED' && uploadedFile && (
                          <div className="status-actions">
                            <button 
                              className="status-action-btn share"
                              onClick={() => handleShareFile(uploadedFile)}
                            >
                              Share
                            </button>
                            <button 
                              className="status-action-btn download"
                              onClick={() => handleDownloadFile(uploadedFile.id, uploadedFile.name, uploadedFile.passwordProtected)}
                            >
                              Download
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="status-progress-bar-container">
                        <div 
                          className="status-progress-bar-fill" 
                          style={{ width: `${uploadStatus === 'COMPLETED' ? 100 : uploadProgress}%` }}
                        ></div>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Dashboard bottom cards */}
                <div style={{ borderTop: '1px solid #e4e4e7', paddingTop: '40px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
                    <div>
                      <div style={{ display: 'flex', color: '#3b82f6', marginBottom: '16px' }}><ShieldIcon /></div>
                      <h4 style={{ fontSize: '15px', fontWeight: '800', marginBottom: '8px' }}>Zero-Knowledge Storage</h4>
                      <p style={{ fontSize: '13px', color: '#71717a', lineHeight: '1.5' }}>
                        Files are encrypted with a unique key generated on your device. We never see the key or the file content.
                      </p>
                    </div>
                    <div>
                      <div style={{ display: 'flex', color: '#3b82f6', marginBottom: '16px' }}>
                        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2.2" fill="none">
                          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                        </svg>
                      </div>
                      <h4 style={{ fontSize: '15px', fontWeight: '800', marginBottom: '8px' }}>Auto-Destruct Links</h4>
                      <p style={{ fontSize: '13px', color: '#71717a', lineHeight: '1.5' }}>
                        After the download limit or time limit is reached, all traces of your data are wiped from our storage cluster.
                      </p>
                    </div>
                    <div>
                      <div style={{ display: 'flex', color: '#3b82f6', marginBottom: '16px' }}>
                        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2.2" fill="none">
                          <polyline points="16 18 22 12 16 6" />
                          <polyline points="8 6 2 12 8 18" />
                        </svg>
                      </div>
                      <h4 style={{ fontSize: '15px', fontWeight: '800', marginBottom: '8px' }}>Developer Friendly</h4>
                      <p style={{ fontSize: '13px', color: '#71717a', lineHeight: '1.5' }}>
                        Need to automate? Use our CLI tool or REST API to integrate secure file sharing into your CI/CD pipelines.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Recent Uploads Section */}
                <div style={{ borderTop: '1px solid #e4e4e7', paddingTop: '40px', marginTop: '40px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#09090b', margin: 0 }}>
                      Recent Uploads
                    </h3>
                    {userFiles.length > 0 && (
                      <button
                        onClick={handleClearAllFiles}
                        style={{
                          backgroundColor: 'transparent',
                          border: '1px solid #fee2e2',
                          color: '#dc2626',
                          padding: '6px 14px',
                          borderRadius: '6px',
                          fontSize: '13px',
                          fontWeight: '700',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#fef2f2';
                          e.target.style.borderColor = '#fca5a5';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = 'transparent';
                          e.target.style.borderColor = '#fee2e2';
                        }}
                      >
                        Clear All
                      </button>
                    )}
                  </div>
                  
                  <div className="files-list-card" style={{ padding: '24px' }}>
                    {userFiles.length > 0 ? (
                      <table className="files-table">
                        <thead>
                          <tr>
                            <th>File Name</th>
                            <th>Size</th>
                            <th>Expiration</th>
                            <th>Downloads</th>
                            <th>Uploaded</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {userFiles.slice(0, 5).map((file) => (
                            <tr key={file.id}>
                              <td>
                                <div className="file-name-cell">
                                  <div className="file-icon-square">
                                    <FileIcon />
                                  </div>
                                  <span>{file.name}</span>
                                </div>
                              </td>
                              <td>{formatBytes(file.size)}</td>
                              <td>{file.expiration}</td>
                              <td>{file.downloadCount || 0} / {file.downloadLimit || 1}</td>
                              <td style={{ color: '#71717a', fontSize: '13px' }}>
                                {new Date(file.uploadDate).toLocaleDateString()}
                              </td>
                              <td>
                                <div style={{ display: 'flex', gap: '12px' }}>
                                  <button 
                                    className="file-action-btn"
                                    onClick={() => handleShareFile(file)}
                                  >
                                    Share
                                  </button>
                                  <button 
                                    className="file-action-btn"
                                    onClick={() => handleDownloadFile(file.id, file.name, file.passwordProtected)}
                                    style={{ color: '#10b981' }}
                                  >
                                    Download
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <div style={{ textAlign: 'center', padding: '24px', color: '#71717a', fontSize: '14px' }}>
                        No recent uploads found. Upload a file above to secure it.
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {dashboardTab === 'dashboard' && (
              <>
                <h1 className="dashboard-title">Dashboard</h1>
                <p className="dashboard-subtitle">Monitor your secure deliveries, track downloads, and revoke links in real-time.</p>

                {/* Glass stat cards row */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '24px',
                  marginBottom: '32px'
                }}>
                  {/* Card 1: Total Uploads */}
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.45)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '16px',
                    padding: '24px',
                    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.04)',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px'
                  }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(99, 102, 241, 0.12)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#4f46e5'
                    }}>
                      <FolderIcon />
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: '800', color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Uploads</div>
                      <div style={{ fontSize: '28px', fontWeight: '800', color: '#09090b', marginTop: '4px' }}>{userFiles.length}</div>
                    </div>
                  </div>

                  {/* Card 2: Active Links */}
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.45)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '16px',
                    padding: '24px',
                    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.04)',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px'
                  }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(16, 185, 129, 0.12)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#10b981'
                    }}>
                      <ShieldIcon />
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: '800', color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Active Links</div>
                      <div style={{ fontSize: '28px', fontWeight: '800', color: '#09090b', marginTop: '4px' }}>
                        {userFiles.filter(file => !isFileExpiredClient(file) && (file.downloadCount || 0) < (file.downloadLimit || 1) && file.downloadLimit > 0).length}
                      </div>
                    </div>
                  </div>

                  {/* Card 3: Total Downloads */}
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.45)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '16px',
                    padding: '24px',
                    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.04)',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px'
                  }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(245, 158, 11, 0.12)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#f59e0b'
                    }}>
                      <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: '800', color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Downloads</div>
                      <div style={{ fontSize: '28px', fontWeight: '800', color: '#09090b', marginTop: '4px' }}>
                        {userFiles.reduce((acc, file) => acc + (file.downloadCount || 0), 0)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Table card with Glassmorphism */}
                <div className="files-list-card" style={{
                  background: 'rgba(255, 255, 255, 0.45)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.04)',
                  borderRadius: '16px',
                  padding: '24px'
                }}>
                  {filesLoading ? (
                    <div style={{ textAlign: 'center', padding: '40px 0' }}>
                      <span className="spinner" style={{ borderTopColor: '#000000', width: '24px', height: '24px' }}></span>
                      <p style={{ marginTop: '16px', color: '#71717a', fontSize: '14px' }}>Loading files list...</p>
                    </div>
                  ) : userFiles.length > 0 ? (
                    <table className="files-table">
                      <thead>
                        <tr>
                          <th>File Name</th>
                          <th>Upload Date</th>
                          <th>Expiry</th>
                          <th>Downloads Used</th>
                          <th>Status</th>
                          <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {userFiles.map((file) => {
                          const isExpired = isFileExpiredClient(file);
                          const isLimitHit = (file.downloadCount || 0) >= (file.downloadLimit || 1);
                          const isRevoked = file.downloadLimit === 0;

                          let statusLabel = 'Active';
                          let statusStyle = {
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            backgroundColor: 'rgba(209, 250, 229, 0.6)',
                            color: '#065f46',
                            border: '1px solid rgba(52, 211, 153, 0.4)',
                            padding: '4px 10px',
                            borderRadius: '12px',
                            fontWeight: '700',
                            fontSize: '11px',
                            textTransform: 'uppercase'
                          };

                          if (isRevoked) {
                            statusLabel = 'Revoked';
                            statusStyle = {
                              ...statusStyle,
                              backgroundColor: 'rgba(244, 244, 245, 0.8)',
                              color: '#71717a',
                              border: '1px solid rgba(228, 228, 231, 0.8)'
                            };
                          } else if (isExpired) {
                            statusLabel = 'Expired';
                            statusStyle = {
                              ...statusStyle,
                              backgroundColor: 'rgba(254, 226, 226, 0.6)',
                              color: '#991b1b',
                              border: '1px solid rgba(248, 113, 113, 0.4)'
                            };
                          } else if (isLimitHit) {
                            statusLabel = 'Limit Reached';
                            statusStyle = {
                              ...statusStyle,
                              backgroundColor: 'rgba(254, 243, 199, 0.6)',
                              color: '#92400e',
                              border: '1px solid rgba(251, 191, 36, 0.4)'
                            };
                          }

                          return (
                            <React.Fragment key={file.id || file._id}>
                              <tr>
                                <td>
                                  <div className="file-name-cell">
                                    <div className="file-icon-square" style={{ backgroundColor: 'rgba(15, 23, 42, 0.05)', color: '#0f172a' }}>
                                      <FileIcon />
                                    </div>
                                    <span style={{ fontWeight: '600', color: '#0f172a' }}>{file.name}</span>
                                  </div>
                                </td>
                                <td style={{ color: '#71717a', fontSize: '13px' }}>
                                  {new Date(file.uploadDate).toLocaleDateString()}
                                </td>
                                <td style={{ color: '#71717a', fontSize: '13px' }}>
                                  {file.expiration === 'Never' ? 'Never' : file.expiration}
                                </td>
                                <td style={{ color: '#71717a', fontSize: '13px', fontWeight: '600' }}>
                                  {file.downloadCount || 0} / {file.downloadLimit || 0}
                                </td>
                                <td>
                                  <span style={statusStyle}>{statusLabel}</span>
                                </td>
                                <td>
                                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', alignItems: 'center' }}>
                                    {/* Stats/Details Button */}
                                    <button
                                      onClick={() => setExpandedFileId(expandedFileId === (file.id || file._id) ? null : (file.id || file._id))}
                                      style={{
                                        backgroundColor: 'transparent',
                                        border: '1px solid #cbd5e1',
                                        borderRadius: '6px',
                                        padding: '6px 10px',
                                        fontSize: '12px',
                                        fontWeight: '700',
                                        color: '#4f46e5',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px',
                                        transition: 'all 0.15s'
                                      }}
                                      onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(99, 102, 241, 0.05)'}
                                      onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                                    >
                                      <ChartIcon />
                                      <span>Stats</span>
                                    </button>

                                    {/* Copy Link Button */}
                                    <button
                                      onClick={() => handleTableCopyLink(file.id || file._id)}
                                      style={{
                                        backgroundColor: 'transparent',
                                        border: '1px solid #e4e4e7',
                                        borderRadius: '6px',
                                        padding: '6px 10px',
                                        fontSize: '12px',
                                        fontWeight: '700',
                                        color: '#09090b',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px',
                                        transition: 'all 0.15s'
                                      }}
                                      onMouseEnter={(e) => e.target.style.backgroundColor = '#f4f4f5'}
                                      onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                                    >
                                      <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2.5" fill="none">
                                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                      </svg>
                                      <span>{tableCopiedId === (file.id || file._id) ? 'Copied!' : 'Copy'}</span>
                                    </button>

                                    {/* Revoke Button */}
                                    <button
                                      onClick={() => handleRevokeFile(file.id || file._id)}
                                      disabled={isRevoked || isExpired || isLimitHit}
                                      style={{
                                        backgroundColor: 'transparent',
                                        border: '1px solid #fee2e2',
                                        borderRadius: '6px',
                                        padding: '6px 10px',
                                        fontSize: '12px',
                                        fontWeight: '700',
                                        color: (isRevoked || isExpired || isLimitHit) ? '#d1d5db' : '#ef4444',
                                        cursor: (isRevoked || isExpired || isLimitHit) ? 'not-allowed' : 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px',
                                        transition: 'all 0.15s'
                                      }}
                                      onMouseEnter={(e) => { if (!isRevoked && !isExpired && !isLimitHit) e.target.style.backgroundColor = '#fef2f2'; }}
                                      onMouseLeave={(e) => { if (!isRevoked && !isExpired && !isLimitHit) e.target.style.backgroundColor = 'transparent'; }}
                                    >
                                      <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2.5" fill="none">
                                        <circle cx="12" cy="12" r="10" />
                                        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                                      </svg>
                                      <span>Revoke</span>
                                    </button>

                                    {/* Delete Button */}
                                    <button
                                      onClick={() => handleDeleteFile(file.id || file._id)}
                                      style={{
                                        backgroundColor: 'transparent',
                                        border: '1px solid #fee2e2',
                                        borderRadius: '6px',
                                        padding: '6px 10px',
                                        fontSize: '12px',
                                        fontWeight: '700',
                                        color: '#dc2626',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px',
                                        transition: 'all 0.15s'
                                      }}
                                      onMouseEnter={(e) => e.target.style.backgroundColor = '#fef2f2'}
                                      onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                                    >
                                      <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2.5" fill="none">
                                        <polyline points="3 6 5 6 21 6" />
                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                      </svg>
                                      <span>Delete</span>
                                    </button>
                                  </div>
                                </td>
                              </tr>
                              {expandedFileId === (file.id || file._id) && (
                                <tr style={{ backgroundColor: 'rgba(248, 250, 252, 0.5)' }}>
                                  <td colSpan={6} style={{ padding: '20px 24px', borderTop: 'none' }}>
                                    <div style={{
                                      display: 'flex',
                                      flexWrap: 'wrap',
                                      gap: '24px',
                                      width: '100%',
                                      alignItems: 'start'
                                    }}>
                                      {/* Geolocation Log (Left Pane) */}
                                      <div style={{ flex: '1 1 350px', minWidth: '300px' }}>
                                        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '800', color: '#1f2937', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                          <span style={{ fontSize: '18px' }}>📍</span> Download Geolocation History
                                        </h4>
                                        <div style={{
                                          maxHeight: '200px',
                                          overflowY: 'auto',
                                          border: '1px solid #e2e8f0',
                                          borderRadius: '8px',
                                          backgroundColor: '#ffffff'
                                        }}>
                                          {file.downloads && file.downloads.length > 0 ? (
                                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                                              <thead>
                                                <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', textAlign: 'left' }}>
                                                  <th style={{ padding: '8px 12px', fontWeight: '700', color: '#64748b' }}>Country</th>
                                                  <th style={{ padding: '8px 12px', fontWeight: '700', color: '#64748b' }}>IP Address</th>
                                                  <th style={{ padding: '8px 12px', fontWeight: '700', color: '#64748b' }}>Timestamp</th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                {file.downloads.map((dl, idx) => (
                                                  <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                                    <td style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '600' }}>
                                                      <span>{getFlagEmoji(dl.countryCode)}</span>
                                                      <span>{dl.countryName || 'Unknown'}</span>
                                                    </td>
                                                    <td style={{ padding: '8px 12px', color: '#475569', fontFamily: 'monospace' }}>
                                                      {dl.ip || '127.0.0.1'}
                                                    </td>
                                                    <td style={{ padding: '8px 12px', color: '#64748b' }}>
                                                      {new Date(dl.timestamp).toLocaleString()}
                                                    </td>
                                                  </tr>
                                                ))}
                                              </tbody>
                                            </table>
                                          ) : (
                                            <div style={{ padding: '24px', textAlign: 'center', color: '#64748b' }}>
                                              No download logs available yet.
                                            </div>
                                          )}
                                        </div>
                                      </div>

                                      {/* Top Countries Chart (Right Pane) */}
                                      <div style={{ flex: '1 1 350px', minWidth: '300px' }}>
                                        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '800', color: '#1f2937', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                          <span style={{ fontSize: '18px' }}>📊</span> Top Downloading Countries
                                        </h4>
                                        <div style={{
                                          border: '1px solid #e2e8f0',
                                          borderRadius: '8px',
                                          padding: '16px',
                                          backgroundColor: '#ffffff',
                                          minHeight: '120px',
                                          display: 'flex',
                                          flexDirection: 'column',
                                          justifyContent: 'center'
                                        }}>
                                          {file.downloads && file.downloads.length > 0 ? (
                                            (() => {
                                              const topCountries = getTopCountries(file.downloads);
                                              const maxCount = Math.max(...topCountries.map(c => c.count));
                                              return (
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                                  {topCountries.map((c, idx) => {
                                                    const percent = Math.round((c.count / maxCount) * 100);
                                                    return (
                                                      <div key={idx} style={{ display: 'flex', alignItems: 'center' }}>
                                                        <span style={{ width: '28px', fontSize: '14px', textAlign: 'left' }}>{getFlagEmoji(c.code)}</span>
                                                        <span style={{ width: '100px', fontSize: '12px', fontWeight: '600', color: '#475569', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textAlign: 'left' }} title={c.name}>
                                                          {c.name}
                                                        </span>
                                                        <div style={{ flexGrow: 1, backgroundColor: '#f1f5f9', height: '8px', borderRadius: '4px', margin: '0 12px', overflow: 'hidden' }}>
                                                          <div style={{ width: `${percent}%`, backgroundColor: '#6366f1', height: '100%', borderRadius: '4px' }}></div>
                                                        </div>
                                                        <span style={{ fontSize: '12px', fontWeight: '700', color: '#0f172a', width: '24px', textAlign: 'right' }}>{c.count}</span>
                                                      </div>
                                                    );
                                                  })}
                                                </div>
                                              );
                                            })()
                                          ) : (
                                            <div style={{ textAlign: 'center', color: '#64748b' }}>
                                              No geolocation data available.
                                            </div>
                                          )}
                                        </div>
                                      </div>

                                      {/* Dynamic Controls Override (Expanded settings) */}
                                      <div style={{ flex: '1 1 200px', minWidth: '180px' }}>
                                        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '800', color: '#1f2937', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                          <span style={{ fontSize: '18px' }}>⚙️</span> Delivery Settings
                                        </h4>
                                        <div style={{
                                          border: '1px solid #e2e8f0',
                                          borderRadius: '8px',
                                          padding: '16px',
                                          backgroundColor: '#ffffff'
                                        }}>
                                          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                              <span style={{ fontSize: '12px', fontWeight: '700', color: '#475569' }}>Email Alerts</span>
                                              <label className="switch" style={{ scale: '0.85', transformOrigin: 'right center' }}>
                                                <input 
                                                  type="checkbox" 
                                                  checked={file.notifyOnDownload || false}
                                                  onChange={async (e) => {
                                                    const updatedVal = e.target.checked;
                                                    const token = localStorage.getItem('token');
                                                    try {
                                                      const fileId = file.id || file._id;
                                                      await fetch(`${API_BASE_URL}/files/${fileId}`, {
                                                        method: 'PUT',
                                                        headers: {
                                                          'Content-Type': 'application/json',
                                                          'Authorization': `Bearer ${token}`
                                                        },
                                                        body: JSON.stringify({
                                                          notifyOnDownload: updatedVal
                                                        })
                                                      });
                                                      fetchUserFiles();
                                                    } catch (err) {
                                                      console.error('Failed to update email alert toggle:', err);
                                                    }
                                                  }}
                                                />
                                                <span className="slider"></span>
                                              </label>
                                            </div>
                                            <div style={{ fontSize: '11px', color: '#64748b', lineHeight: '1.4' }}>
                                              Toggle email notifications when this file is downloaded.
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </React.Fragment>
                          );
                        })}
                      </tbody>
                    </table>
                  ) : (
                    <div className="no-files-placeholder" style={{ padding: '60px 40px', textAlign: 'center' }}>
                      <div style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(113, 113, 122, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#71717a',
                        margin: '0 auto 16px auto'
                      }}>
                        <FolderIcon />
                      </div>
                      <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#09090b', marginBottom: '6px' }}>No files uploaded yet</h4>
                      <p style={{ fontSize: '13px', color: '#71717a', maxWidth: '320px', margin: '0 auto 20px auto', lineHeight: '1.5' }}>
                        Start sharing secure and encrypted files with time-limited links.
                      </p>
                      <button className="btn-primary" onClick={() => setDashboardTab('upload')}>
                        Upload First File
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </main>

          {/* Dashboard Footer */}
          <footer className="footer" style={{ marginTop: 'auto', backgroundColor: 'transparent', padding: '32px 40px', borderTop: 'none' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="footer-copy">© 2024 SecureShare. AES-256 Encrypted.</span>
              <div className="footer-links" style={{ gap: '24px' }}>
                <a href="#privacy" className="footer-link">Privacy Policy</a>
                <a href="#terms" className="footer-link">Terms of Service</a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    );
  }

  // 3. RENDER VISITOR LANDING PAGE VIEW (Logged-out user interface)
  return (
    <div className="grid-container">
      <div className="app-wrapper">
        {/* Navigation Navbar */}
        <header className="header">
          <div className="container">
            <a href="/" className="logo-text" onClick={(e) => { e.preventDefault(); setView('landing'); }}>SecureShare</a>
            
            <nav className="nav-links">
              <a href="#dashboard" className="nav-link" onClick={(e) => { e.preventDefault(); handleGoToDashboard(); }}>Dashboard</a>
              <a href="#about" className="nav-link">About</a>
              <a href="#support" className="nav-link">Support</a>
            </nav>

            <div className="auth-buttons">
              {user ? (
                <div className="user-widget">
                  <span className="user-name">{user.name}</span>
                  <button onClick={handleLogout} className="btn-logout">Logout</button>
                </div>
              ) : (
                <>
                  <button onClick={() => setView('login')} className="btn-text">Login</button>
                  <button onClick={() => setView('signup')} className="btn-primary">Get Started</button>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="hero-section">
          <div className="container">
            <div className="badge-wrapper">
              <div className="pill-badge">
                <ShieldIcon />
                <span>AES-256 Military Grade Encryption</span>
              </div>
            </div>
            
            <h1 className="hero-title">Share files with absolute privacy.</h1>
            <p className="hero-description">
              AES-256 encrypted storage with time-limited, password-protected links. No tracking, no metadata storage, just secure data transfer.
            </p>

            <div className="hero-actions">
              <button onClick={handleGoToDashboard} className="btn-primary" style={{ backgroundColor: '#0f172a', padding: '14px 32px', fontSize: '15px' }}>
                Go to Dashboard
              </button>
              <button className="btn-secondary" style={{ padding: '14px 32px', fontSize: '15px' }} onClick={() => {
                document.getElementById('features-section').scrollIntoView({ behavior: 'smooth' });
              }}>How it works</button>
            </div>
          </div>
        </section>

        {/* Showcase Grid */}
        <section className="showcase-section">
          <div className="container">
            <div className="showcase-grid">
              
              {/* Left Mockup Card */}
              <div 
                className="browser-card" 
                style={{ cursor: 'pointer' }} 
                onClick={() => { if (user) { setView('dashboard'); } else { setView('signup'); } }}
              >
                <div className="browser-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div className="browser-dots" style={{ display: 'flex', gap: '8px' }}>
                    <span className="browser-dot" style={{ width: '11px', height: '11px', borderRadius: '50%', backgroundColor: '#e9d5ff' }}></span>
                    <span className="browser-dot" style={{ width: '11px', height: '11px', borderRadius: '50%', backgroundColor: '#c7d2fe' }}></span>
                    <span className="browser-dot" style={{ width: '11px', height: '11px', borderRadius: '50%', backgroundColor: '#a7f3d0' }}></span>
                  </div>
                  <div style={{
                    fontSize: '13px',
                    color: '#71717a',
                    fontFamily: 'monospace',
                    background: '#f4f4f5',
                    padding: '4px 16px',
                    borderRadius: '6px'
                  }}>
                    secureshare.app/v/x9k2-4m1p
                  </div>
                </div>
                
                <div className="browser-content" style={{ position: 'relative', overflow: 'hidden', padding: '32px', display: 'flex', flexDirection: 'column' }}>
                  {/* Dim Background Image Mockup */}
                  <img 
                    src="/src/assets/hero.png" 
                    alt="Mockup Background" 
                    style={{ 
                      position: 'absolute', 
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%) rotate(-5deg)',
                      width: '80%', 
                      height: 'auto', 
                      opacity: '0.08', 
                      pointerEvents: 'none',
                      zIndex: 1
                    }} 
                  />
                  
                  <div style={{
                    border: '1px dashed #cbd5e1',
                    borderRadius: '12px',
                    backgroundColor: '#fafafa',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexGrow: 1,
                    padding: '60px 24px',
                    textAlign: 'center',
                    zIndex: 2,
                    position: 'relative'
                  }}>
                    <div className="dropzone-icon-wrapper" style={{ color: '#94a3b8' }}>
                      <CloudUploadIcon />
                    </div>
                    <div>
                      <p className="dropzone-title" style={{ color: '#4b5563', margin: '0 0 8px 0' }}>Drop files here to encrypt and share</p>
                      <p className="dropzone-subtitle" style={{ color: '#9ca3af', margin: 0 }}>Max file size: 10GB</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Stack Cards */}
              <div className="feature-stack">
                <div className="feature-stacked-card">
                  <div className="stacked-card-icon blue">
                    <ClockIcon />
                  </div>
                  <h3 className="stacked-card-title">Auto-Delete</h3>
                  <p className="stacked-card-desc">Links vanish after 1 download or 24 hours by default.</p>
                </div>
                
                <div className="feature-stacked-card">
                  <div className="stacked-card-icon green">
                    <LockIcon />
                  </div>
                  <h3 className="stacked-card-title">Zero-Knowledge</h3>
                  <p className="stacked-card-desc">We never see your files. Encryption happens in-browser.</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* User Dashboard Showcase Section */}
        <section style={{ padding: '80px 0', backgroundColor: '#fffdf9', borderTop: '1px solid #f4f4f5' }}>
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '38px', fontWeight: '800', color: '#18181b', marginBottom: '16px', letterSpacing: '-1.5px', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
              User Dashboard
            </h2>
            <p style={{ fontSize: '16px', color: '#71717a', maxWidth: '800px', margin: '0 auto 60px auto', lineHeight: '1.6', fontWeight: '500', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
              Give authenticated users a central hub to manage everything they've uploaded. The dashboard is the control center for all file activity.
            </p>
            
            <div className="bottom-features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
              {/* File Overview */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}>
                <div style={{
                  width: '100%',
                  height: '180px',
                  backgroundColor: '#f9f6ed',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '24px',
                  padding: '16px',
                  boxSizing: 'border-box'
                }}>
                  {/* Left Mockup Illustration */}
                  <div style={{
                    width: '95%',
                    height: '90%',
                    backgroundColor: '#ffffff',
                    border: '1px solid #e4e4e7',
                    borderRadius: '8px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.02)',
                    padding: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    boxSizing: 'border-box'
                  }}>
                    {/* Header */}
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#ef4444' }}></span>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#fbbf24' }}></span>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981' }}></span>
                    </div>
                    {/* Fake rows */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', fontWeight: '800', color: '#a1a1aa', borderBottom: '1px solid #f4f4f5', paddingBottom: '4px' }}>
                      <span>File Name</span>
                      <span>Downloads</span>
                      <span>Status</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '10px', fontWeight: '600', color: '#27272a' }}>
                      <span>📄 contract.pdf</span>
                      <span>12 / 20</span>
                      <span style={{ fontSize: '8px', color: '#065f46', backgroundColor: '#d1fae5', padding: '2px 6px', borderRadius: '10px', fontWeight: '700' }}>Active</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '10px', fontWeight: '600', color: '#27272a' }}>
                      <span>🖼️ logo.png</span>
                      <span>5 / 5</span>
                      <span style={{ fontSize: '8px', color: '#92400e', backgroundColor: '#fef3c7', padding: '2px 6px', borderRadius: '10px', fontWeight: '700' }}>Limit</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '10px', fontWeight: '600', color: '#27272a' }}>
                      <span>🎥 demo.mp4</span>
                      <span>0 / 10</span>
                      <span style={{ fontSize: '8px', color: '#991b1b', backgroundColor: '#fee2e2', padding: '2px 6px', borderRadius: '10px', fontWeight: '700' }}>Expired</span>
                    </div>
                  </div>
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#18181b', marginBottom: '10px', letterSpacing: '-0.5px', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                  File Overview
                </h3>
                <p style={{ fontSize: '14px', color: '#71717a', lineHeight: '1.6', margin: 0, fontWeight: '500', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                  Display file name, upload date, download count, expiry date, and current status
                </p>
              </div>

              {/* File Actions */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}>
                <div style={{
                  width: '100%',
                  height: '180px',
                  backgroundColor: '#f2f0e6',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '24px',
                  padding: '16px',
                  boxSizing: 'border-box'
                }}>
                  {/* Middle Mockup Illustration */}
                  <div style={{
                    width: '80%',
                    height: '85%',
                    backgroundColor: '#ffffff',
                    border: '1px solid #e4e4e7',
                    borderRadius: '8px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.02)',
                    padding: '14px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    boxSizing: 'border-box',
                    position: 'relative'
                  }}>
                    <span style={{ fontSize: '10px', fontWeight: '800', color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '0.5px' }}>File Actions</span>
                    <span style={{ fontSize: '13px', fontWeight: '700', color: '#18181b' }}>database.sqlite</span>
                    <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
                      <button style={{
                        flex: 1,
                        backgroundColor: '#ef4444',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '8px 0',
                        fontSize: '11px',
                        fontWeight: '700',
                        cursor: 'default'
                      }}>Delete</button>
                      <button style={{
                        flex: 1,
                        backgroundColor: '#f59e0b',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '8px 0',
                        fontSize: '11px',
                        fontWeight: '700',
                        cursor: 'default'
                      }}>Revoke</button>
                    </div>
                  </div>
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#18181b', marginBottom: '10px', letterSpacing: '-0.5px', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                  File Actions
                </h3>
                <p style={{ fontSize: '14px', color: '#71717a', lineHeight: '1.6', margin: 0, fontWeight: '500', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                  Delete files, revoke active share links, and view detailed statistics
                </p>
              </div>

              {/* Statistics */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}>
                <div style={{
                  width: '100%',
                  height: '180px',
                  backgroundColor: '#f5f3e7',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '24px',
                  padding: '16px',
                  boxSizing: 'border-box'
                }}>
                  {/* Right Mockup Illustration */}
                  <div style={{
                    width: '95%',
                    height: '90%',
                    backgroundColor: '#ffffff',
                    border: '1px solid #e4e4e7',
                    borderRadius: '8px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.02)',
                    padding: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    boxSizing: 'border-box'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '9px', fontWeight: '800', color: '#a1a1aa' }}>DOWNLOAD TRENDS</span>
                      <span style={{ fontSize: '10px', fontWeight: '800', color: '#10b981' }}>+48%</span>
                    </div>
                    {/* Mini Charts */}
                    <div style={{ display: 'flex', gap: '8px', height: '60px', alignItems: 'flex-end', borderBottom: '1px solid #f4f4f5', paddingBottom: '4px' }}>
                      {/* Bar 1 */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, gap: '4px', height: '100%', justifyContent: 'flex-end' }}>
                        <div style={{ width: '100%', height: '30%', backgroundColor: '#cbd5e1', borderRadius: '3px 3px 0 0' }}></div>
                        <span style={{ fontSize: '7px', color: '#a1a1aa' }}>M</span>
                      </div>
                      {/* Bar 2 */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, gap: '4px', height: '100%', justifyContent: 'flex-end' }}>
                        <div style={{ width: '100%', height: '60%', backgroundColor: '#cbd5e1', borderRadius: '3px 3px 0 0' }}></div>
                        <span style={{ fontSize: '7px', color: '#a1a1aa' }}>T</span>
                      </div>
                      {/* Bar 3 */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, gap: '4px', height: '100%', justifyContent: 'flex-end' }}>
                        <div style={{ width: '100%', height: '45%', backgroundColor: '#cbd5e1', borderRadius: '3px 3px 0 0' }}></div>
                        <span style={{ fontSize: '7px', color: '#a1a1aa' }}>W</span>
                      </div>
                      {/* Bar 4 */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, gap: '4px', height: '100%', justifyContent: 'flex-end' }}>
                        <div style={{ width: '100%', height: '80%', backgroundColor: '#6366f1', borderRadius: '3px 3px 0 0' }}></div>
                        <span style={{ fontSize: '7px', color: '#a1a1aa', fontWeight: 'bold' }}>T</span>
                      </div>
                      {/* Bar 5 */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, gap: '4px', height: '100%', justifyContent: 'flex-end' }}>
                        <div style={{ width: '100%', height: '55%', backgroundColor: '#cbd5e1', borderRadius: '3px 3px 0 0' }}></div>
                        <span style={{ fontSize: '7px', color: '#a1a1aa' }}>F</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', fontWeight: '700', color: '#71717a' }}>
                      <span>Total Downloads</span>
                      <span>154</span>
                    </div>
                  </div>
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#18181b', marginBottom: '10px', letterSpacing: '-0.5px', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                  Statistics
                </h3>
                <p style={{ fontSize: '14px', color: '#71717a', lineHeight: '1.6', margin: 0, fontWeight: '500', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                  Track total uploads, active links, and download trends over time
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed 3-Column Features Section */}
        <section id="features-section" className="bottom-features-section">
          <div className="container">
            <div className="bottom-features-grid">
              
              {/* Feature 1 */}
              <div className="bottom-feature-item">
                <div className="bottom-feature-icon">
                  <ShieldIcon />
                </div>
                <h4 className="bottom-feature-title">End-to-End Encryption</h4>
                <p className="bottom-feature-desc">
                  Your files are encrypted before they even leave your computer using industry-standard AES-256. SecureShare cannot read your data.
                </p>
                <div className="bottom-feature-badge">
                  Verified Protocol
                </div>
              </div>

              {/* Feature 2 */}
              <div className="bottom-feature-item">
                <div className="bottom-feature-icon">
                  <ClockIcon />
                </div>
                <h4 className="bottom-feature-title">Expiring Links</h4>
                <p className="bottom-feature-desc">
                  Set your files to self-destruct after a specific time period or number of downloads. Once gone, they are wiped from our servers forever.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bottom-feature-item">
                <div className="bottom-feature-icon">
                  <KeyIcon />
                </div>
                <h4 className="bottom-feature-title">Password Protection</h4>
                <p className="bottom-feature-desc">
                  Add an extra layer of security with custom passwords. Recipients must provide the key to decrypt and access the shared files.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* Dark Call-To-Action Section */}
        <section className="cta-section">
          <div className="container">
            <h2 className="cta-title">Ready for technical trust?</h2>
            <p className="cta-desc">
              Join 50,000+ professionals sharing files with total confidence. No credit card required to start.
            </p>
            <button onClick={handleGoToDashboard} className="btn-white" style={{ fontWeight: '800' }}>
              Go to Dashboard
            </button>
          </div>
        </section>

        {/* Footer Section */}
        <footer className="footer">
          <div className="container">
            <div className="footer-grid">
              <div className="footer-left">
                <span className="logo-text" style={{ fontSize: '18px' }}>SecureShare</span>
                <span className="footer-copy">© 2024 SecureShare. AES-256 Encrypted.</span>
              </div>
              
              <div className="footer-links">
                <a href="#privacy" className="footer-link">Privacy Policy</a>
                <a href="#terms" className="footer-link">Terms of Service</a>
                <a href="#audit" className="footer-link">Security Audit</a>
                <a href="#contact" className="footer-link">Contact</a>
              </div>

              <div className="footer-right">
                <button className="footer-icon-btn" aria-label="Language selection">
                  <GlobeIcon />
                </button>
                <button className="footer-icon-btn" aria-label="Toggle dark mode">
                  <MoonIcon />
                </button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
