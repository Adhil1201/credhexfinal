import React from 'react';

function CertificateCard({ certificate, userId, onDelete }) {
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    switch (extension) {
      case 'pdf':
        return 'picture_as_pdf';
      case 'jpg':
      case 'jpeg':
      case 'png':
        return 'image';
      case 'doc':
      case 'docx':
        return 'description';
      default:
        return 'insert_drive_file';
    }
  };

  const certificateUrl = `https://broseasswahrbiglvplk.supabase.co/storage/v1/object/public/certificates/${userId}/${certificate.name}`;

  const handleDownload = async (e) => {
    e.stopPropagation();
    
    try {
      // Show download animation
      const button = e.currentTarget;
      const originalContent = button.innerHTML;
      button.innerHTML = '<span class="material-icons downloading-icon">download</span><span>Downloading...</span>';
      button.disabled = true;
      
      // Fetch the file
      const response = await fetch(certificateUrl);
      if (!response.ok) throw new Error('Download failed');
      
      const blob = await response.blob();
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = certificate.name;
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      // Show success state
      button.innerHTML = '<span class="material-icons">check_circle</span><span>Downloaded!</span>';
      
      // Reset button after 2 seconds
      setTimeout(() => {
        button.innerHTML = originalContent;
        button.disabled = false;
      }, 2000);
      
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try again.');
      
      // Reset button on error
      const button = e.currentTarget;
      button.innerHTML = '<span class="material-icons">download</span><span>Download</span>';
      button.disabled = false;
    }
  };

  return (
    <>
      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }
        
        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .certificate-card {
          animation: slideInUp 0.6s ease-out;
        }
        
        .certificate-card:nth-child(even) {
          animation-delay: 0.1s;
        }
        
        .certificate-card:nth-child(odd) {
          animation-delay: 0.2s;
        }
        
        .downloading-icon {
          animation: rotate 1s linear infinite;
        }
        
        .certificate-title {
          animation: fadeInScale 0.8s ease-out;
          animation-delay: 0.3s;
          animation-fill-mode: both;
        }
        
        .certificate-meta {
          animation: fadeInScale 0.8s ease-out;
          animation-delay: 0.4s;
          animation-fill-mode: both;
        }
        
        .certificate-actions {
          animation: fadeInScale 0.8s ease-out;
          animation-delay: 0.5s;
          animation-fill-mode: both;
        }
        
        @media (min-width: 640px) {
          .certificate-card {
            padding: 20px !important;
          }
          
          .certificate-card .card-content {
            flex-direction: row !important;
          }
          
          .certificate-card .card-content > div:first-child {
            flex: 1;
          }
          
          .certificate-card .btn-group {
            width: auto !important;
            flex-shrink: 0;
          }
          
          .certificate-card .btn {
            flex: none !important;
            min-width: auto !important;
            font-size: 12px !important;
            padding: 8px 16px !important;
          }
          
          .certificate-card h3 {
            font-size: 16px !important;
          }
          
          .certificate-card .material-icons {
            font-size: 16px !important;
          }
          
          .certificate-card span[style*="font-size: 11px"] {
            font-size: 12px !important;
          }
          
          .certificate-card span[style*="font-size: 12px"] {
            font-size: 14px !important;
          }
        }
        
        .certificate-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
        
        .certificate-card:hover .certificate-title {
          animation: pulse 0.6s ease-in-out;
        }
        
        @media (max-width: 639px) {
          .certificate-card .btn-group {
            flex-direction: column;
          }
          
          .certificate-card .btn-group .btn {
            width: 100%;
          }
        }
        
        .btn:hover .material-icons {
          animation: bounce 0.6s ease-in-out;
        }
        
        .btn:active {
          transform: scale(0.95);
        }
      `}</style>
      <div className="card fade-in certificate-card" style={{
        padding: '16px',
        transition: 'all 0.2s ease',
        cursor: 'pointer'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'flex-start', 
          gap: '12px',
          flexDirection: 'column'
        }} className="card-content">
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px',
            width: '100%'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #3B82F6, #1D4ED8)',
              borderRadius: '10px',
              padding: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: '40px',
              height: '40px',
              flexShrink: 0
            }}>
              <span className="material-icons" style={{ color: 'white', fontSize: '20px' }}>
                {getFileIcon(certificate.name)}
              </span>
            </div>
            
            <div style={{ flex: 1, minWidth: 0 }}>
              <h3 className="certificate-title" style={{ 
                fontSize: '14px', 
                fontWeight: '600', 
                marginBottom: '4px',
                wordBreak: 'break-word',
                lineHeight: '1.3'
              }}>
                {certificate.name}
              </h3>
              
              <div className="certificate-meta" style={{ 
                display: 'flex', 
                gap: '12px', 
                marginBottom: '8px',
                flexWrap: 'wrap'
              }}>
                <span style={{ fontSize: '11px', color: '#6B7280' }}>
                  <span className="material-icons" style={{ fontSize: '12px', verticalAlign: 'middle', marginRight: '2px' }}>
                    storage
                  </span>
                  {formatFileSize(certificate.metadata?.size || 0)}
                </span>
                <span style={{ fontSize: '11px', color: '#6B7280' }}>
                  <span className="material-icons" style={{ fontSize: '12px', verticalAlign: 'middle', marginRight: '2px' }}>
                    schedule
                  </span>
                  {formatDate(certificate.created_at)}
                </span>
              </div>
            </div>
          </div>
          
          <div className="btn-group certificate-actions" style={{ 
            display: 'flex', 
            gap: '6px', 
            width: '100%',
            flexWrap: 'wrap'
          }}>
            <a
              href={certificateUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
              style={{ 
                fontSize: '11px', 
                padding: '8px 12px',
                flex: '1',
                minWidth: '80px'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <span className="material-icons" style={{ fontSize: '14px' }}>visibility</span>
              <span>View</span>
            </a>
            
            <button
              onClick={handleDownload}
              className="btn btn-secondary"
              style={{ 
                fontSize: '11px', 
                padding: '8px 12px',
                flex: '1',
                minWidth: '80px'
              }}
            >
              <span className="material-icons" style={{ fontSize: '14px' }}>download</span>
              <span>Download</span>
            </button>
            
            {onDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (window.confirm('Are you sure you want to delete this certificate?')) {
                    onDelete(certificate.name);
                  }
                }}
                className="btn btn-danger"
                style={{ 
                  fontSize: '11px', 
                  padding: '8px 12px',
                  flex: '1',
                  minWidth: '80px'
                }}
              >
                <span className="material-icons" style={{ fontSize: '14px' }}>delete</span>
                <span>Delete</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CertificateCard;