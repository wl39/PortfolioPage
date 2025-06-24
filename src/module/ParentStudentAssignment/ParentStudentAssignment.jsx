import { useEffect, useState } from 'react';
import Card from '../../components/Card/Card';
import Dropdown from '../../components/Dropdown/Dropdown';
import styles from './ParentStudentAssignment.module.css';
import {
  assignChild,
  getAllParents,
  getAllStudents,
} from '../../services/api/HMSService';
import Button from '../../components/Button/Button';

const ParentStudentAssignment = () => {
  const [students, setStudents] = useState([]);
  const [studentsDropdown, setStudentsDropdown] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [parents, setParents] = useState([]);
  const [parentsDropdown, setParentsDropdown] = useState([]);
  const [selectedParent, setSelectedParent] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await Promise.all([getAllStudents(), getAllParents()]);

        setStudents(data[0]);
        setParents(data[1]);

        setStudentsDropdown(data[0].map((value) => value.name));
        setParentsDropdown(data[1].map((value) => value.username));

        setSelectedStudent(data[0][0].name);
        setSelectedParent(data[1][0].username);
      } catch (error) {
        alert('There is an error on the server');
        throw error;
      }
    };

    getData();
  }, []);

  const submit = () => {
    if (window.confirm('Are you sure to assign the child?')) {
      assignChild(selectedStudent, selectedParent).then((res) => {
        console.log(res);
        window.alert('res');
      });
    }
  };
  return (
    <div className={styles.container}>
      <Card propStyles={styles.card}>
        <h3 className={styles.header}>Assign Student to Parent</h3>
        <div>
          <div className={styles.label}>Select Parent</div>
          <Dropdown
            list={parentsDropdown}
            value={selectedParent}
            select={(value) => setSelectedParent(value)}
            propStyles={styles.dropdownContainer}
            buttonPropStyles={styles.dropdown}
          />
        </div>
        <div style={{ marginTop: 16 }}>
          <div className={styles.label}>Select Student</div>
          <Dropdown
            list={studentsDropdown}
            value={selectedStudent}
            select={(value) => setSelectedStudent(value)}
            propStyles={styles.dropdownContainer}
            buttonPropStyles={styles.dropdown}
          />
        </div>

        <Card propStyles={styles.cardButton}>
          <div onClick={() => submit()}>Assign Student</div>
        </Card>
      </Card>
      <Card propStyles={styles.card}>
        <h3 className={styles.header}>Current Assignments</h3>
        {parents.map((value) => (
          <div
            className={styles.currentAssignmentsContainer}
            key={value.id + ' ' + value.username}
          >
            <div>
              <div style={{ fontWeight: 500, fontSize: 16 }}>
                {value.username}
              </div>
              <div
                style={{ fontWeight: 300, fontSize: 14, lineHeight: '20px' }}
              >
                {value.children.map((child) => child.name).join(', ')}
              </div>
            </div>
            <Button propStyles={styles.delete}></Button>
          </div>
        ))}
      </Card>
    </div>
  );
};

export default ParentStudentAssignment;
