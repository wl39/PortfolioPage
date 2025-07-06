import { useEffect } from 'react';
import { logout } from '../../services/api/HMSService';

function LogoutPage() {
  useEffect(() => {
    const localLogout = async () => {
      try {
        const data = await logout();

        if (data) {
          console.log(data);
          window.location.href = '/login';
        }
      } catch (error) {
        console.error(error);
      }
    };

    localLogout();
  });
  return <></>;
}

export default LogoutPage;
