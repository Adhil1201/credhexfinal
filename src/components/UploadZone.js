import React, { useState } from 'react';

function UploadZone({ onUpload, isUploading }) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0]);
    }
  };

  return (
    <div className="card">
      <div
        className="upload-zone"
        style={{
          border: `2px dashed ${dragActive ? '#3B82F6' : '#D1D5DB'}`,
          borderRadius: '12px',
          padding: '24px 16px',
          textAlign: 'center',
          transition: 'all 0.2s ease',
          background: dragActive ? 'rgba(59, 130, 246, 0.05)' : 'transparent',
          position: 'relative',
          minHeight: '120px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          onChange={handleFileSelect}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: 0,
            cursor: 'pointer'
          }}
          disabled={isUploading}
        />
        
        <div style={{ pointerEvents: 'none' }}>
          <span className="material-icons" style={{ 
            fontSize: '36px', 
            color: dragActive ? '#3B82F6' : '#9CA3AF',
            marginBottom: '12px',
            display: 'block'
          }}>
            {isUploading ? 'hourglass_empty' : 'cloud_upload'}
          </span>
          
          <h3 style={{ 
            fontSize: '16px', 
            fontWeight: '600', 
            marginBottom: '6px',
            color: dragActive ? '#3B82F6' : '#374151'
          }}>
            {isUploading ? 'Uploading...' : 'Upload Certificate'}
          </h3>
          
          <p style={{ 
            color: '#6B7280', 
            fontSize: '12px',
            marginBottom: '12px',
            lineHeight: '1.4'
          }}>
            {isUploading 
              ? 'Please wait while your certificate is being uploaded'
              : 'Drag and drop your certificate here, or tap to browse'
            }
          </p>
          
          {!isUploading && (
            <div style={{ fontSize: '10px', color: '#9CA3AF' }}>
              Supported: PDF, JPG, PNG, DOC, DOCX
            </div>
          )}
        </div>
      </div>
      
      <style jsx>{`
        @media (min-width: 640px) {
          .upload-zone {
            padding: 40px 20px !important;
            min-height: 160px !important;
          }
          
          .material-icons {
            font-size: 48px !important;
            margin-bottom: 16px !important;
          }
          
          h3 {
            font-size: 18px !important;
            margin-bottom: 8px !important;
          }
          
          p {
            font-size: 14px !important;
            margin-bottom: 16px !important;
          }
          
          div[style*="font-size: 10px"] {
            font-size: 12px !important;
          }
        }
        
        @media (hover: hover) {
          .upload-zone:hover {
            border-color: #3B82F6;
            background: rgba(59, 130, 246, 0.02);
          }
        }
      `}</style>
    </div>
  );
}

export default UploadZone;