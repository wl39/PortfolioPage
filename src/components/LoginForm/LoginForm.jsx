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
import CardInput from '../CardInput/CardInput';
import CardButton from '../CardButton/CardButton';
import OauthButton from '../OauthButton/OauthButton';

import { ReactComponent as Naver } from '../../Icons/sns_naver_large_logo.svg';
import { ReactComponent as Kakao } from '../../Icons/sns_kakao_large_logo.svg';
import { ReactComponent as Google } from '../../Icons/sns_google_large.svg';

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
        <div className={styles.title}>Sign In</div>
        <div className={styles.subtitle}>
          Enter your credentials to continue
        </div>
        <CardInput
          label={'Email Address'}
          placeholder="Enter your email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') userLogin();
          }}
        />
        <br />
        <CardInput
          label={'Password'}
          placeholder="Enter your password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') userLogin();
          }}
        />
        <br />
        <CardButton
          color="blue"
          disabled={!(email && password)}
          propStyles={styles.loginButton}
          onClick={userLogin}
        >
          Sign in
        </CardButton>

        {/* <button className={styles.oauthButton}>
                    <img className={styles.oauthImage} src={naver} alt="naver_sign_in" />
                </button>
                <button className={styles.oauthButton}>
                    <img className={styles.oauthImage} src={kakao} alt="kakao_sign_in" />
                </button>
                <button className={styles.oauthButton}>
                    <img className={styles.oauthImage} src={goolge} alt="google_sign_in" />
                </button> */}
        <br />
        <div className={styles.orContainer}>
          <div className={styles.lineContainer}>
            <div className={styles.line} />
          </div>
          <div className={styles.textContainer}>
            <span className={styles.orText}>Or continue with</span>
          </div>
        </div>
        <br />

        <OauthButton
          provider={'google'}
          svg={<Google width={20} height={20} style={{ padding: 10 }} />}
          color={'white'}
          textColor={'black'}
          text={'Continue with Google'}
        />
        <br />
        <OauthButton
          provider={'naver'}
          svg={<Naver width={40} height={40} />}
          color={'#03C75A'}
          textColor={'white'}
          text={'Continue with Naver'}
        />
        <br />
        <OauthButton
          provider={'kakao'}
          svg={<Kakao width={40} height={40} />}
          color={'#FEE500'}
          textColor={'#191919'}
          text={'Continue with Kakao'}
        />
        <br />
        <p className={styles.signupText}>
          Don't you have an account? <Link to="/signup">Sign Up here</Link>
        </p>
      </Card>
      {/* </form> */}
    </>
  );
};

export default LoginForm;
