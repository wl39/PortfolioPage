import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSubscriptions } from '../../services/api/HMSService';
import { useLocation, useNavigate } from 'react-router-dom';
import { setUsername } from '../../features/user/userSlice';

const StudentPage = () => {
  // const [username, setUsername] = useState('');
  const username = useSelector((state) => state.user.username);

  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();

  const userRef = useRef();

  const redirectionMap = {
    'Simple Math Question': '/math/result',
    Question: '/tutoring/',
  };

  useEffect(() => {
    const savedUsername = sessionStorage.getItem('username');
    if (savedUsername) {
      userRef.current = savedUsername;
      dispatch(setUsername(savedUsername));
    }
  }, [dispatch]);

  useEffect(() => {
    const fetchAllSubscriptions = async () => {
      try {
        let localUsername =
          userRef.current || sessionStorage.getItem('username');

        const result = await getAllSubscriptions(localUsername);

        console.log(result);
      } catch (error) {
        if (error && error.response && error.response.status === 401) {
          navigate('/login', { state: { from: location }, replace: true });
        }
      }
    };

    fetchAllSubscriptions();
  }, [dispatch, location, navigate]); // username 변경되면 다시 호출

  return (
    <>
      <h1>{username || sessionStorage.getItem('username') || 'Login First'}</h1>
    </>
  );
};

export default StudentPage;
