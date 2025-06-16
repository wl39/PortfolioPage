import LoginForm from '../../components/LoginForm/LoginForm';

const LoginPage = () => {
  return (
    <>
      <LoginForm directTo="user" addParam={true} />
    </>
  );
};

export default LoginPage;
