import React from 'react';
// import { useNavigate } from 'react-router-dom';
import styles from './MathSolvePage.module.css';
import LoginForm from '../../components/LoginForm/LoginForm';
const MathSolveMainPage = () => {
  // const [name, setName] = useState('');
  // const navigate = useNavigate();

  // const handleStart = () => {
  //   if (name) {
  //     navigate('/math/start', { state: { name: name } });
  //   }
  // };

  return (
    <div className={styles.container}>
      <div className={styles.question}>Simple Math Question</div>
      <LoginForm directTo="math/start" addParam={false} />
      {/* <div className={styles.inputContainer}>
        <input
          style={{ height: '60px', fontSize: '30px' }}
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          className={styles.button}
          disabled={!name}
          onClick={handleStart}
        >
          Start
        </button>
      </div> */}
    </div>
  );
};

export default MathSolveMainPage;
