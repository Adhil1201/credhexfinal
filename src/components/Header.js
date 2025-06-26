import React from 'react';

function Header({ user, onLogout }) {
  return (
    <>
      <style>{`
        @media (min-width: 480px) {
          .header-container .user-email {
            display: inline !important;
          }
        }
        
        @media (min-width: 640px) {
          .header-container {
            padding: 16px 0 !important;
          }
          
          .header-container .container {
            gap: 16px !important;
          }
          
          .header-container h1 {
            font-size: 24px !important;
          }
          
          .header-container .btn {
            font-size: 14px !important;
            padding: 12px 16px !important;
            gap: 6px !important;
          }
          
          .header-container .material-icons {
            font-size: 18px !important;
          }
        }
        
        @media (max-width: 479px) {
          .header-container .logout-text {
            display: none;
          }
        }
      `}</style>
      <header className="header-container" style={{
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #3B82F6, #1D4ED8)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
              position: 'relative'
            }}>
              <div style={{
                width: '24px',
                height: '24px',
                background: 'white',
                borderRadius: '4px',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{
                  width: '16px',
                  height: '16px',
                  background: 'linear-gradient(135deg, #3B82F6, #1D4ED8)',
                  borderRadius: '2px',
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '2px',
                    left: '2px',
                    right: '2px',
                    height: '2px',
                    background: 'white',
                    borderRadius: '1px'
                  }}></div>
                  <div style={{
                    position: 'absolute',
                    top: '6px',
                    left: '2px',
                    right: '2px',
                    height: '1px',
                    background: 'rgba(255, 255, 255, 0.7)',
                    borderRadius: '0.5px'
                  }}></div>
                  <div style={{
                    position: 'absolute',
                    top: '9px',
                    left: '2px',
                    right: '2px',
                    height: '1px',
                    background: 'rgba(255, 255, 255, 0.7)',
                    borderRadius: '0.5px'
                  }}></div>
                  <div style={{
                    position: 'absolute',
                    bottom: '2px',
                    right: '2px',
                    width: '4px',
                    height: '4px',
                    background: 'white',
                    borderRadius: '50%',
                    border: '1px solid #3B82F6'
                  }}></div>
                </div>
              </div>
            </div>
            <h1 style={{ 
              fontSize: '20px', 
              fontWeight: '700',
              background: 'linear-gradient(135deg, #3B82F6, #1D4ED8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: 0
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
      </header>
    </>
  );
}

export default Header;