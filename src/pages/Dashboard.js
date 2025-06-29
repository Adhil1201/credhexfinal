import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import CertificateCard from '../components/CertificateCard';
import UploadZone from '../components/UploadZone';

function Dashboard() {
  const [certificates, setCertificates] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Fetch uploaded certificates
  const fetchCertificates = async (uid) => {
    try {
      const { data, error } = await supabase.storage
        .from('certificates')
        .list(`${uid}/`, { 
          limit: 100,
          sortBy: { column: 'created_at', order: 'desc' }
        });

      if (error) {
        console.error('Error fetching certificates:', error);
      } else {
        setCertificates(data || []);
      }
    } catch (error) {
      console.error('Error fetching certificates:', error);
    }
  };

  // Upload new certificate
  const handleUpload = async (file) => {
    if (!file || !user) return;

    // Validate file type
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      alert('Please upload a valid file type (PDF, JPG, PNG, DOC, DOCX)');
      return;
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }

    setIsUploading(true);

    try {
      const timestamp = new Date().getTime();
      const fileName = `${timestamp}_${file.name}`;
      const filePath = `${user.id}/${fileName}`;
      
      const { error } = await supabase.storage
        .from('certificates')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        alert('Upload failed: ' + error.message);
      } else {
        await fetchCertificates(user.id);
        alert('Certificate uploaded successfully!');
      }
    } catch (error) {
      alert('Upload failed: ' + error.message);
    }
    
    setIsUploading(false);
  };

  // Delete certificate
  const handleDelete = async (fileName) => {
    if (!user) return;

    try {
      const filePath = `${user.id}/${fileName}`;
      const { error } = await supabase.storage
        .from('certificates')
        .remove([filePath]);

      if (error) {
        alert('Delete failed: ' + error.message);
      } else {
        await fetchCertificates(user.id);
        alert('Certificate deleted successfully!');
      }
    } catch (error) {
      alert('Delete failed: ' + error.message);
    }
  };

  // Logout handler
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  // Filter certificates based on search term
  const filteredCertificates = certificates.filter(cert =>
    cert.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // On load: get user and fetch their certs
  useEffect(() => {
    const getUserAndData = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (data?.user) {
          setUser(data.user);
          await fetchCertificates(data.user.id);
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('Error getting user:', error);
        navigate('/login');
      }
      setIsLoading(false);
    };

    getUserAndData();
  }, [navigate]);

  if (isLoading) {
    return (
      <div style={{ minHeight: '100vh' }}>
        <Header />
        <div className="container" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          minHeight: 'calc(100vh - 80px)',
          padding: '20px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <span className="material-icons loading-spinner" style={{ 
              fontSize: '36px', 
              color: '#3B82F6',
              marginBottom: '12px',
              display: 'block',
              animation: 'spin 1s linear infinite'
            }}>
              hourglass_empty
            </span>
            <p className="loading-text" style={{ color: '#6B7280', fontSize: '14px' }}>Loading your certificates...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @keyframes typewriter {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }
        
        @keyframes blink {
          0%, 50% {
            border-color: transparent;
          }
          51%, 100% {
            border-color: #3B82F6;
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes glow {
          0%, 100% {
            text-shadow: 0 0 5px rgba(59, 130, 246, 0.3);
          }
          50% {
            text-shadow: 0 0 20px rgba(59, 130, 246, 0.6), 0 0 30px rgba(59, 130, 246, 0.4);
          }
        }
        
        @keyframes colorShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        .animated-title {
          animation: slideInLeft 0.8s ease-out, glow 2s ease-in-out infinite;
          background: linear-gradient(-45deg, #FF6B6B, #4ECDC4, #45B7D1, #96CEB4, #FFEAA7, #DDA0DD);
          background-size: 400% 400%;
          animation: slideInLeft 0.8s ease-out, colorShift 3s ease infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 800;
          text-shadow: none;
        }
        
        .animated-subtitle {
          animation: slideInRight 0.8s ease-out;
          animation-delay: 0.2s;
          animation-fill-mode: both;
        }
        
        .certificates-header h2 {
          animation: fadeInUp 0.6s ease-out;
          animation-delay: 0.3s;
          animation-fill-mode: both;
        }
        
        .search-container {
          animation: fadeInUp 0.6s ease-out;
          animation-delay: 0.4s;
          animation-fill-mode: both;
        }
        
        .loading-text {
          animation: typewriter 2s steps(30) infinite, blink 1s step-end infinite;
          border-right: 2px solid #3B82F6;
          white-space: nowrap;
          overflow: hidden;
          display: inline-block;
        }
        
        .loading-spinner {
          animation: spin 1s linear infinite !important;
        }
        
        @media (min-width: 640px) {
          .dashboard-container {
            padding: 40px 20px !important;
          }
          
          .dashboard-container h1 {
            font-size: 32px !important;
            margin-bottom: 8px !important;
          }
          
          .dashboard-container p {
            font-size: 16px !important;
          }
          
          .dashboard-container h2 {
            font-size: 20px !important;
          }
          
          .dashboard-container .certificates-header {
            margin-bottom: 24px !important;
            gap: 16px !important;
          }
          
          .dashboard-container .certificates-header > div {
            width: auto !important;
            min-width: 250px;
          }
        }
        
        @media (max-width: 639px) {
          .dashboard-container .certificates-header {
            flex-direction: column;
            align-items: stretch;
          }
          
          .dashboard-container .certificates-header h2 {
            text-align: center;
          }
        }
      `}</style>
      <div style={{ minHeight: '100vh' }}>
        <Header user={user} onLogout={handleLogout} />
        
        <div className="container dashboard-container" style={{ padding: '20px 16px' }}>
          <div className="fade-in">
            <div style={{ marginBottom: '24px' }}>
              <h1 className="animated-title" style={{ 
                fontSize: '24px', 
                fontWeight: '700', 
                marginBottom: '6px'
              }}>
                Certificate Vault
              </h1>
              <p className="animated-subtitle" style={{ color: '#6B7280', fontSize: '14px' }}>
                Securely store and manage your digital certificates
              </p>
            </div>

            <UploadZone onUpload={handleUpload} isUploading={isUploading} />

            <div className="card" style={{ marginTop: '24px' }}>
              <div className="certificates-header" style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '20px',
                flexWrap: 'wrap',
                gap: '12px'
              }}>
                <h2 style={{ 
                  fontSize: '18px', 
                  fontWeight: '600',
                  margin: 0
                }}>
                  Your Certificates ({filteredCertificates.length})
                </h2>
                
                <div className="search-container" style={{ position: 'relative', width: '100%', maxWidth: '250px' }}>
                  <span className="material-icons" style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#9CA3AF',
                    fontSize: '18px'
                  }}>
                    search
                  </span>
                  <input
                    type="text"
                    className="input"
                    placeholder="Search certificates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ paddingLeft: '40px', fontSize: '14px' }}
                  />
                </div>
              </div>

              {filteredCertificates.length === 0 ? (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '40px 20px',
                  color: '#6B7280'
                }}>
                  <span className="material-icons" style={{ 
                    fontSize: '48px', 
                    color: '#D1D5DB',
                    marginBottom: '12px',
                    display: 'block'
                  }}>
                    {searchTerm ? 'search_off' : 'folder_open'}
                  </span>
                  <h3 style={{ fontSize: '16px', fontWeight: '500', marginBottom: '6px' }}>
                    {searchTerm ? 'No certificates found' : 'No certificates yet'}
                  </h3>
                  <p style={{ fontSize: '14px' }}>
                    {searchTerm 
                      ? 'Try adjusting your search terms'
                      : 'Upload your first certificate to get started'
                    }
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1">
                  {filteredCertificates.map((cert, index) => (
                    <CertificateCard
                      key={cert.name}
                      certificate={cert}
                      userId={user.id}
                      onDelete={handleDelete}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;