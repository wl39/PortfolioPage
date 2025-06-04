import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAllSubscriptions } from '../../services/api/HMSService';

const StudentPage = () => {
  const username = useSelector((state) => state.user.username);

  useEffect(() => {
    const fetchAllSubscriptions = async () => {
      const result = await getAllSubscriptions(
        username || sessionStorage.getItem('username')
      );
      console.log(result);
    };

    fetchAllSubscriptions();
  }, [username]); // username 변경되면 다시 호출

  return (
    <>
      <h1>{username || sessionStorage.getItem('username') || 'Login First'}</h1>
    </>
  );
};

export default StudentPage;
