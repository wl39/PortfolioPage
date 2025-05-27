import { useSelector } from 'react-redux';

const StudentPage = () => {
  const username = useSelector((state) => state.user.username);
  return (
    <>
      <h1>{username || sessionStorage.getItem('username') || 'Login First'}</h1>
    </>
  );
};

export default StudentPage;
