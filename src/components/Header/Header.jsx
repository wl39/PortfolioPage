import { useContext, useEffect, useState } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';

import Logout from '../../Icons/Logout/Logout';

import styles from './Header.module.css';
import CardButton from '../CardButton/CardButton';
import { checkAuth, refresh } from '../../services/api/HMSService';
import { UsernameContext } from '../../context/UsernameContext';

function Header() {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [roles, setRoles] = useState([]);
  const { studentsName } = useParams();

  const { username, setUsername } = useContext(UsernameContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setShowHeader(false); // 스크롤 내림 → 숨김
      } else {
        setShowHeader(true); // 스크롤 올림 → 보임
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  useEffect(() => {
    const fecthAuth = async () => {
      try {
        const userData = await checkAuth();
        await refresh();

        setRoles(userData.roles);
        setUsername(userData.username);
      } catch (error) {
        const status = error.response?.status;
        if (status === 401) {
          alert('Session Expired, Please login first');
          return navigate('/login', {
            state: { from: location },
            replace: true,
          });
        } else if (status === 403) {
          alert('Access Denied!');
          return navigate('/login', {
            state: { from: location },
            replace: true,
          });
        }

        console.error('Failed to fetch questions', error);
        alert('There is an issue on the server...!');
      }
    };

    fecthAuth();
  }, [location, navigate]);

  return (
    <header
      className={styles.header}
      style={{
        transform: showHeader ? 'translateY(0)' : 'translateY(-100%)',
      }}
    >
      <div className={styles.innerHeader}>
        <div className={styles.main}>
          {roles.length ? (
            <>
              {roles.includes('ROLE_TEACHER') ? (
                <>
                  {location.pathname === '/questions' ? null : (
                    <Link to={'/questions'}>
                      <CardButton color={'yellow'}>Archive</CardButton>
                    </Link>
                  )}

                  {location.pathname === '/teacher' ? null : (
                    <Link to={'/teacher'}>
                      <CardButton color={'yellow'}>Teacher</CardButton>
                    </Link>
                  )}
                  {location.pathname === '/upload' ? null : (
                    <Link to={'/upload'}>
                      <CardButton color={'yellow'}>Upload</CardButton>
                    </Link>
                  )}
                </>
              ) : null}
            </>
          ) : null}
        </div>
        <div className={styles.user}>
          {location.pathname.startsWith('/user/') ? null : (
            <Link
              to={`/user/${studentsName || username}`}
              style={{ textDecoration: 'none' }}
            >
              <CardButton color={'blue'}>Dashboard</CardButton>
            </Link>
          )}
          <div>
            <Link to={'/logout'}>
              <Logout propStyles={styles.icon} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
