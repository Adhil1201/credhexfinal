import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      setError(error.message);
    } else {
      navigate('/dashboard');
    }
    
    setIsLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      <Header />
      
      <div className="container" style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        minHeight: 'calc(100vh - 80px)',
        padding: '20px 16px'
      }}>
        <div className="card fade-in" style={{ width: '100%', maxWidth: '400px' }}>
          <div className="text-center mb-6">
            <span className="material-icons" style={{ 
              fontSize: '36px', 
              color: '#3B82F6',
              marginBottom: '12px',
              display: 'block'
            }}>
              login
            </span>
            <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '6px' }}>
              Welcome Back
            </h2>
            <p style={{ color: '#6B7280', fontSize: '14px' }}>
              Sign in to access your certificate vault
            </p>
          </div>

          {error && (
            <div style={{
              background: '#FEF2F2',
              border: '1px solid #FECACA',
              color: '#DC2626',
              padding: '12px',
              borderRadius: '8px',
              marginBottom: '16px',
              fontSize: '13px'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ width: '100%', justifyContent: 'center' }}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="material-icons">hourglass_empty</span>
                  Signing In...
                </>
              ) : (
                <>
                  <span className="material-icons">login</span>
                  Sign In
                </>
              )}
            </button>
          </form>

          <div className="text-center mt-4">
            <p style={{ color: '#6B7280', fontSize: '13px' }}>
              Don't have an account?{' '}
              <a 
                href="/" 
                style={{ 
                  color: '#3B82F6', 
                  textDecoration: 'none',
                  fontWeight: '500'
                }}
              >
                Create one here
              </a>
            </p>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @media (min-width: 640px) {
          .container {
            padding: 40px 20px !important;
          }
          
          .material-icons {
            font-size: 48px !important;
            margin-bottom: 16px !important;
          }
          
          h2 {
            font-size: 28px !important;
            margin-bottom: 8px !important;
          }
          
          p {
            font-size: 16px !important;
          }
          
          .form-group:last-of-type p {
            font-size: 14px !important;
          }
          
          div[style*="font-size: 13px"] {
            font-size: 14px !important;
          }
        }
      `}</style>
    </div>
  );
}

export default Login;