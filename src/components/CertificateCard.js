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

  return (
    <>
      <style>{`
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
        
        @media (max-width: 639px) {
          .certificate-card .btn-group {
            flex-direction: column;
          }
          
          .certificate-card .btn-group .btn {
            width: 100%;
          }
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
              <h3 style={{ 
                fontSize: '14px', 
                fontWeight: '600', 
                marginBottom: '4px',
                wordBreak: 'break-word',
                lineHeight: '1.3'
              }}>
                {certificate.name}
              </h3>
              
              <div style={{ 
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
          
          <div className="btn-group" style={{ 
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
            
            <a
              href={certificateUrl}
              download={certificate.name}
              className="btn btn-secondary"
              style={{ 
                fontSize: '11px', 
                padding: '8px 12px',
                flex: '1',
                minWidth: '80px'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <span className="material-icons" style={{ fontSize: '14px' }}>download</span>
              <span>Download</span>
            </a>
            
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