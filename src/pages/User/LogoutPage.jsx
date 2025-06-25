import { useEffect } from 'react';
import { logout } from '../../services/api/HMSService';

function LogoutPage() {
  useEffect(() => {
    const localLogout = async () => {
      const data = await logout();
    };

    localLogout();
  });
  return <></>;
}

export default LogoutPage;
