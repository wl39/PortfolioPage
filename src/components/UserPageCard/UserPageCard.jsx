import { Suspense, useEffect } from 'react';
import Card from '../Card/Card';

const UserPageCard = ({ username }) => {
  //   const user = use(getAssignmentCounts(username));
  useEffect(() => {
    const getAssignmentCounts = async () => {
      //   const data = await getAssignmentCounts(user.username);
    };
  }, []);
  return (
    <Card>
      {/* <div>{user.username}</div>
      <div>{user.email}</div> */}
    </Card>
  );
};

export default UserPageCard;
