import { useEffect, useState } from 'react';

import Card from '../Card/Card';
import styles from './UserPageCard.module.css';
import { postNewImage } from '../../services/api/HMSService';
import CardButton from '../CardButton/CardButton';
import Modal from '../Modal/Modal';
import Input from '../Input/Input';
import CardInput from '../CardInput/CardInput';

const UserPageCard = ({
  username = 'Jane Doe',
  userData = {
    email: '',
    username: '',
    totalQuestions: 0,
    totalSubmissions: 0,
    toSolve: 0,
    averageScore: 0,
    id: 0,
    imageURL: 'https://img.91b.co.uk/73cfba62-a3fb-474d-a466-befca9268af4.webp',
  },
  setUserData,
}) => {
  const [file, setFile] = useState(null);
  const [hide, setHide] = useState(true);
  const [userEmail, setUserEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      alert('Select a File');
      return;
    }

    const formData = new FormData();
    formData.append('username', userData.username);
    formData.append('image', file);

    setIsLoading(true);
    const changeImage = async () => {
      try {
        const response = await postNewImage(formData);
        alert('DONE!');

        setUserData((prevUserData) => ({
          ...prevUserData,
          imageURL: response.data.url,
        }));
      } catch (error) {
        alert('There is an issue on the server!');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    changeImage();
  };

  //   const user = use(getAssignmentCounts(username));
  useEffect(() => {
    setFirstName(userData.username);
    setUserEmail(userData.email);
  }, [username, userData]);
  return (
    <Card propStyles={styles.container}>
      <img className={styles.img} src={userData.imageURL} alt="user" />
      <div className={styles.username}>{username}</div>
      <Card propStyles={styles.statsCard}>
        <div>Total Questions</div>
        <div className={styles.stats}> {userData.totalQuestions}</div>
      </Card>

      <Card propStyles={styles.statsCard}>
        <div>Total Submissions</div>
        <div className={styles.stats}>{userData.totalSubmissions}</div>
      </Card>

      <Card propStyles={styles.statsCard}>
        <div>Average Score</div>
        <div className={styles.stats}>{userData.averageScore}</div>
      </Card>

      <Card propStyles={styles.statsCard}>
        <div>To Solve</div>
        <div className={styles.stats}>{userData.toSolve}</div>
      </Card>
      <CardButton
        onClick={() => setHide(false)}
        propStyles={styles.editButton}
        color={'green'}
      >
        Edit Profile
      </CardButton>
      <Modal hide={hide} close={() => setHide(true)}>
        <div className={styles.inputContainer}>
          <CardInput
            value={firstName}
            label={'Name'}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
        </div>
        <div className={styles.inputContainer}>
          <CardInput
            value={userEmail}
            label={'Email'}
            onChange={(e) => {
              setUserEmail(e.target.value);
            }}
          />
        </div>
        <input
          accept="image/*"
          onChange={handleChange}
          id="userImage"
          type="file"
          hidden
        />
        <label className={styles.fileInput} htmlFor="userImage">
          <span className={styles.span}>
            {file ? file.name : 'Select a File'}
          </span>
        </label>
        <div className={styles.buttonContainer}>
          <CardButton
            disabled={isLoading}
            propStyles={styles.button}
            onClick={() => setHide(true)}
            color={'gray'}
          >
            Cancel
          </CardButton>
          <CardButton
            disabled={isLoading}
            onClick={handleUpload}
            propStyles={styles.button}
            color={'green'}
          >
            Save Changes
          </CardButton>
        </div>
      </Modal>
      {/* <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>submit</button> */}
    </Card>
  );
};

export default UserPageCard;
