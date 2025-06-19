import { useEffect, useState } from 'react';
import Card from '../Card/Card';
import styles from './UserCard.module.css';
import Input from '../Input/Input';
import { isSameObject } from '../../utils/objectHelper';
import { patchUser } from '../../services/api/HMSService';

export default function UserCard({ userData, onModified }) {
  const [user, setUser] = useState({
    id: -1,
    email: '',
    username: '',
    role: '',
    services: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isModifing, setIsModifing] = useState(false);

  const changeValue = (value, target) => {
    let newValue = value;

    if (target === 'role') {
      newValue = value.toUpperCase();
    }

    setUser({ ...user, [target]: newValue });
  };

  useEffect(() => {
    setUser({ ...userData });
  }, [userData]);

  const modify = async () => {
    setIsLoading(true);
    try {
      const updated = await patchUser(user);
      setUser(updated);

      if (onModified) onModified();
    } catch (e) {
      alert('error!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card propStyles={isModifing ? styles.containerModifing : styles.container}>
      {isModifing ? (
        <div
          className={styles.isModifing}
          onClick={() => setIsModifing(!isModifing)}
        />
      ) : (
        <div
          className={styles.isNotModifing}
          onClick={() => setIsModifing(!isModifing)}
        />
      )}
      {isLoading || isSameObject(user, userData) ? (
        <div className={styles.uploadDisabled} />
      ) : (
        <div className={styles.upload} onClick={() => modify()} />
      )}
      <div className={styles.delete} />
      <div style={{ width: '100%' }}>
        {isModifing ? (
          <Input
            value={user.email}
            onChange={(e) => changeValue(e.target.value, 'email')}
            propStyles={styles.input}
          />
        ) : (
          <div className={styles.text}>Email: {user.email}</div>
        )}
        {isModifing ? (
          <Input
            value={user.username}
            onChange={(e) => changeValue(e.target.value, 'username')}
            propStyles={styles.input}
          />
        ) : (
          <div className={styles.text}>Username: {user.username}</div>
        )}
        {isModifing ? (
          <Input
            value={user.role}
            onChange={(e) => changeValue(e.target.value, 'role')}
            propStyles={styles.input}
          />
        ) : (
          <div className={styles.text}>Role: {user.role}</div>
        )}
        <div className={styles.servicesContainer}>
          {user.services.map((value) => (
            <Card propStyles={styles.serviceCard} key={user.email + value}>
              {value}
            </Card>
          ))}
        </div>
      </div>
    </Card>
  );
}
