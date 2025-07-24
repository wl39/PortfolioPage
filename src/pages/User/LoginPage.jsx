import LoginForm from '../../components/LoginForm/LoginForm';
import styles from './LoginPage.module.css';
const LoginPage = () => {
  return (
    <div className={styles.container}>
      <p className={styles.loginTitle}>Welcome Back</p>
      <p className={styles.loginSubTitle}>Sign In to your account</p>
      <LoginForm directTo="user" addParam={true} />
    </div>
  );
};

export default LoginPage;
