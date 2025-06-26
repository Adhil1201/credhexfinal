import React from 'react';

function Header({ user, onLogout }) {
  return (
    <header style={{
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
      padding: '12px 0',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: '48px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img 
            src="https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop"
            alt="CredHex Logo"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              objectFit: 'cover'
            }}
          />
          <h1 style={{ 
            fontSize: '20px', 
            fontWeight: '700',
            background: 'linear-gradient(135deg, #3B82F6, #1D4ED8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            CredHex
          </h1>
        </div>
        
        {user && (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            flexWrap: 'wrap'
          }}>
            <span style={{ 
              color: '#6B7280', 
              fontSize: '12px',
              display: 'none'
            }} className="user-email">
              {user.email}
            </span>
            <button className="btn btn-secondary" onClick={onLogout} style={{
              fontSize: '12px',
              padding: '8px 12px',
              gap: '4px'
            }}>
              <span className="material-icons" style={{ fontSize: '16px' }}>logout</span>
              <span className="logout-text">Logout</span>
            </button>
          </div>
        )}
      </div>
      
      <style jsx>{`
        @media (min-width: 480px) {
          .user-email {
            display: inline !important;
          }
        }
        
        @media (min-width: 640px) {
          header {
            padding: 16px 0 !important;
          }
          
          .container {
            gap: 16px !important;
          }
          
          h1 {
            font-size: 24px !important;
          }
          
          .btn {
            font-size: 14px !important;
            padding: 12px 16px !important;
            gap: 6px !important;
          }
          
          .material-icons {
            font-size: 18px !important;
          }
        }
        
        @media (max-width: 479px) {
          .logout-text {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}

export default Header;