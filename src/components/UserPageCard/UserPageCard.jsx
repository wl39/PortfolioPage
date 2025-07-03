import { useEffect, useState } from 'react';

import Card from '../Card/Card';
import styles from './UserPageCard.module.css';
import { postNewImage } from '../../services/api/HMSService';

const UserPageCard = ({
  username = 'Jane Doe',
  userData = {
    totalQuestions: 0,
    totalSubmissions: 0,
    toSolve: 0,
    averageScore: 0,
    id: 0,
    imageURL: 'https://img.91b.co.uk/73cfba62-a3fb-474d-a466-befca9268af4.webp',
  },
}) => {
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      alert('파일을 선택하세요.');
      return;
    }

    const formData = new FormData();
    formData.append('username', 'wl39');
    formData.append('image', file);

    postNewImage(formData);

    // 예시용 fetch (실제 서버 주소로 변경해야 함)
    // fetch('https://img.91b.co.uk/upload', {
    //   method: 'POST',
    //   body: formData,
    //   credentials: 'include', // JWT 쿠키 자동 포함
    // })
    //   .then((res) => {
    //     if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    //     return res.json(); // JSON 파싱
    //   })
    //   .then((data) => {
    //     alert('업로드 성공');
    //     console.log(data);
    //   })
    //   .catch((err) => {
    //     alert('업로드 실패');
    //     console.error(err);
    //   });
  };

  //   const user = use(getAssignmentCounts(username));
  useEffect(() => {
    console.log(userData);
    // const getAssignmentCounts = async () => {
    //   //   const data = await getAssignmentCounts(user.username);
    // };
  }, [username, userData]);
  return (
    <Card propStyles={styles.container}>
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
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>submit</button>
    </Card>
  );
};

export default UserPageCard;
