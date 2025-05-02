import LoginForm from '../../components/LoginForm/LoginForm';

const LoginPage = () => {
  return (
    <>
      <LoginForm directTo="tutoring" addParam={true} />
    </>
  );
};

export default LoginPage;
