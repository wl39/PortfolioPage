import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { registerOauth2User } from '../../../services/api/HMSService';

const OauthRegisterPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  useEffect(() => {
    const fecthOauth2SignIn = async () => {
      try {
        const res = await registerOauth2User(token);

        navigate('/user/' + res);
      } catch (error) {
        console.error('There is issue on the server');
      }
    };

    if (!token) {
      navigate('/login');
    } else {
      if (
        window.confirm('You are not signed it yet.\nDo you want to sign in?')
      ) {
        fecthOauth2SignIn();
      } else {
        navigate('/login');
      }
    }
  }, []);

  return <div>{}</div>;
};

export default OauthRegisterPage;
