import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);
    setError('');

    const { error } = await supabase.auth.signUp({ 
      email, 
      password,
      options: {
        emailRedirectTo: window.location.origin + '/dashboard'
      }
    });
    
    if (error) {
      setError(error.message);
    } else {
      alert('Registration successful! Please check your email to verify your account.');
      navigate('/login');
    }
    
    setIsLoading(false);
  };

  return (
    <>
      <style>{`
        @media (min-width: 640px) {
          .register-container .container {
            padding: 40px 20px !important;
          }
          
          .register-container .material-icons {
            font-size: 48px !important;
            margin-bottom: 16px !important;
          }
          
          .register-container h2 {
            font-size: 28px !important;
            margin-bottom: 8px !important;
          }
          
          .register-container p {
            font-size: 16px !important;
          }
          
          .register-container .form-group:last-of-type p {
            font-size: 14px !important;
          }
          
          .register-container div[style*="font-size: 13px"] {
            font-size: 14px !important;
          }
        }
      `}</style>
      <div className="register-container" style={{ minHeight: '100vh' }}>
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
                person_add
              </span>
              <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '6px' }}>
                Create Account
              </h2>
              <p style={{ color: '#6B7280', fontSize: '14px' }}>
                Join CredHex to securely manage your certificates
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

            <form onSubmit={handleRegister}>
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
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Confirm Password</label>
                <input
                  type="password"
                  className="input"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
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
                    Creating Account...
                  </>
                ) : (
                  <>
                    <span className="material-icons">person_add</span>
                    Create Account
                  </>
                )}
              </button>
            </form>

            <div className="text-center mt-4">
              <p style={{ color: '#6B7280', fontSize: '13px' }}>
                Already have an account?{' '}
                <a 
                  href="/login" 
                  style={{ 
                    color: '#3B82F6', 
                    textDecoration: 'none',
                    fontWeight: '500'
                  }}
                >
                  Sign in here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;