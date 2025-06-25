import { useEffect, useState } from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import Card from '../../components/Card/Card';

// import goolge from "../../assets/login/web_neutral_sq_SI@4x.png"
// import kakao from "../../assets/login/kakao_login_large_narrow.png"
// import naver from "../../assets/login/btnG_official.png"

import styles from './LoginForm.module.css';
import Input from '../../components/Input/Input';
import { login, refresh } from '../../services/api/HMSService';
import Button from '../Button/Button';
import { useDispatch } from 'react-redux';
import { setUsername } from '../../features/user/userSlice';

const LoginForm = ({ directTo, addParam }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const from = location.state?.from?.pathname || null; // 없으면 홈으로

  const userLogin = () => {
    if (!email) {
      alert('User email is empty!');
      return;
    }

    if (!password) {
      alert('Password is empty!');
      return;
    }

    login({ email: email, password: password })
      .then((response) => {
        dispatch(setUsername(response.data));

        if (from) {
          navigate(from, { replace: true });
        } else {
          navigate(`/${directTo}/${addParam ? response.data : ''}`, {
            state: { name: response.data },
          });
        }
      })
      .catch((error) => {
        console.log(error);
        alert('Either email is invalid or password is wrong.');
        setPassword('');
      });
  };

  useEffect(() => {
    const refreshToken = async () => {
      try {
        const response = await refresh();

        if (response.status === 200) {
          if (from) {
            navigate(from, { replace: true });
          } else {
            navigate(`/${directTo}/${addParam ? response.data : ''}`, {
              state: { name: response.data },
            });
          }
        }
      } catch (error) {}
    };

    refreshToken();
  }, []);

  return (
    <>
      <Card propStyles={styles.inputContainer}>
        <h1 className={styles.title}>Login</h1>
        <Input
          placeholder="Email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') userLogin();
          }}
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') userLogin();
          }}
        />
        <Button
          type="button"
          disabled={!(email && password)}
          propStyles={styles.loginButton}
          onclick={userLogin}
        >
          Login
        </Button>

        {/* <button className={styles.oauthButton}>
                    <img className={styles.oauthImage} src={naver} alt="naver_sign_in" />
                </button>
                <button className={styles.oauthButton}>
                    <img className={styles.oauthImage} src={kakao} alt="kakao_sign_in" />
                </button>
                <button className={styles.oauthButton}>
                    <img className={styles.oauthImage} src={goolge} alt="google_sign_in" />
                </button> */}
        <Link to="/signup">Sign Up</Link>
      </Card>
      {/* </form> */}
    </>
  );
};

export default LoginForm;
