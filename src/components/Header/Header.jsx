import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import Logout from '../../Icons/Logout/Logout';

import styles from './Header.module.css';
import CardButton from '../CardButton/CardButton';

function Header() {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { studentsName } = useParams();

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

  return (
    <header
      className={styles.header}
      style={{
        transform: showHeader ? 'translateY(0)' : 'translateY(-100%)',
      }}
    >
      <div className={styles.innerHeader}>
        <div className={styles.main}></div>
        <div className={styles.user}>
          <Link to={`/user/${studentsName}`} style={{ textDecoration: 'none' }}>
            <CardButton color={'blue'}>Dashboard</CardButton>
          </Link>
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
