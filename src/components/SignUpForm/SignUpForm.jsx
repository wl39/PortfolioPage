import { useState } from 'react';
import Card from '../Card/Card';
import styles from './SignUpForm.module.css';
import Button from '../Button/Button';
import { login, signup } from '../../services/api/HMSService';
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');

  const navigate = useNavigate();

  const userSignup = () => {
    if (!email) {
      alert('Email is Empty!');
      return;
    }

    if (!name) {
      alert('First Name is Empty!');
      return;
    }

    if (!password) {
      alert('Password is Empty!');
      return;
    }

    if (password !== passwordRepeat) {
      alert('Passwords do not match!');
      return;
    }
    signup({ email: email, username: name, password: password })
      .then((res) => {
        login({ email: email, password: password }).then((response) => {
          navigate(`/tutoring/${response.data}`, {
            state: { name: response.data },
          });
        });
      })
      .catch((error) => {
        alert(error.response.data);
      });
  };

  return (
    <>
      <Card propStyles={styles.inputContainer}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') userSignup();
          }}
        />
        <input
          placeholder="First Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') userSignup();
          }}
        />
        <input
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          onKeyDown={(e) => {
            if (e.key === 'Enter') userSignup();
          }}
        />
        <input
          placeholder="Repeat the password"
          value={passwordRepeat}
          onChange={(e) => setPasswordRepeat(e.target.value)}
          type="password"
          onKeyDown={(e) => {
            if (e.key === 'Enter') userSignup();
          }}
        />

        <Button
          disabled={
            !(
              email &&
              name &&
              password &&
              passwordRepeat &&
              password === passwordRepeat
            )
          }
          propStyles={styles.signupButton}
          onclick={userSignup}
        >
          Sign Up
        </Button>
      </Card>
    </>
  );
};

export default SignUpForm;
