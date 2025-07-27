import React, { useEffect, useState } from 'react';

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .auth-card {
        width: 800px;
        height: 450px;
        display: flex;
        border-radius: 20px;
        overflow: hidden;
        background: rgba(255, 255, 255, 0.08);
        backdrop-filter: blur(10px);
        box-shadow: 0 15px 25px rgba(0, 0, 0, 0.4);
        transition: all 0.3s ease-in-out;
        color: white;
      }
      .auth-card.reverse {
        flex-direction: row-reverse;
      }
      .left-panel {
        background: rgba(255, 255, 255, 0.12);
        width: 50%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 30px;
        text-align: center;
      }
      .left-panel h2,
      .left-panel p {
        color: white;
      }
      .switch-btn {
        border: 1px solid white;
        color: white;
        background-color: transparent;
        padding: 10px 30px;
        border-radius: 8px;
        cursor: pointer;
        font-weight: bold;
      }
      .right-panel {
        width: 50%;
        padding: 40px;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      .right-panel h2 {
        color: white;
        margin-bottom: 20px;
      }
      .auth-input {
        margin-bottom: 15px;
        padding: 10px;
        border: none;
        border-radius: 5px;
        font-size: 1em;
        background: rgba(255,255,255,0.15);
        color: white;
        outline: none;
      }
      .auth-input::placeholder {
        color: rgba(255,255,255,0.7);
      }
      .auth-options {
        display: flex;
        justify-content: space-between;
        font-size: 0.9em;
        margin-bottom: 20px;
        color: #eee;
      }
      .auth-link {
        text-decoration: none;
        color: #ff4c60;
      }
      .auth-btn {
        padding: 10px;
        background-color: #ff4c60;
        color: white;
        border: none;
        border-radius: 6px;
        font-weight: bold;
        cursor: pointer;
        font-size: 1em;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div style={styles.container}>
      <video autoPlay muted loop style={styles.video}>
        <source src="/video-2.mp4" type="video/mp4" />
      </video>

      <div style={styles.overlay}></div>

      <div style={styles.centerBox}>
        <div className={`auth-card ${isLogin ? '' : 'reverse'}`}>
          <div className="left-panel">
            <h2>Welcome</h2>
            <p>Join Our Unique Platform, Explore a New Experience</p>
            <button onClick={toggleForm} className="switch-btn">
              {isLogin ? 'REGISTER' : 'LOGIN'}
            </button>
          </div>

          <div className="right-panel">
            <h2>{isLogin ? 'Sign In' : 'Register'}</h2>
            <input type="email" placeholder="Email" className="auth-input" />
            <input type="password" placeholder="Password" className="auth-input" />
            {!isLogin && (
              <input type="password" placeholder="Confirm Password" className="auth-input" />
            )}

            {isLogin && (
              <div className="auth-options">
                <label>
                  <input type="checkbox" /> Remember me
                </label>
                <a href="#" className="auth-link">Forgot password?</a>
              </div>
            )}

            <button className="auth-btn">{isLogin ? 'LOGIN' : 'REGISTER'}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    fontFamily: 'Poppins, sans-serif',

  },
  video: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: -2,
  }
  ,
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  centerBox: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};
