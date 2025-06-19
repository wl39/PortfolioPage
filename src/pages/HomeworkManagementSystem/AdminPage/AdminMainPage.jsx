import { useEffect, useMemo, useState } from 'react';
import {
  checkAuth,
  getAllServices,
  getAllStudents,
  getAllTopics,
  getAllUsers,
  getSimpleQuestionsWithTopics,
  postService,
  postSubscriptions,
  reloadCalendars,
  reloadTopicStats,
} from '../../../services/api/HMSService';

import { useLocation, useNavigate } from 'react-router-dom';
import Input from '../../../components/Input/Input';
import AssignmentBox from '../../../components/AssignmentBox/AssignmentBox';
import Accordion from '../../../components/Accordion/Accordion';
import Pageable from '../../../layouts/Pageable/Pageable';
import QuestionTopicContainer from '../../../components/QuestionTopic/QuestionTopicContainer';

import styles from './AdminMainPage.module.css';
import Reload from '../../../components/Reload/Reload';
import UserCard from '../../../components/UserCard/UserCard';

function AdminMainPage() {
  const [user, setUser] = useState({});
  const [students, setStudents] = useState([]);
  const [service, setService] = useState('');
  const [services, setServices] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  const sourceToTargets = useMemo(() => {
    return services.reduce((acc, service) => {
      acc[service] = students.reduce((arr, student) => {
        for (const sub of student.subscriptions) {
          if (sub.service.name === service) {
            arr.push(student.name);
            break;
          }
        }
        return arr;
      }, []);
      return acc;
    }, {});
  }, [services, students]);

  const target = useMemo(() => {
    return students.map((student) => student.name);
  }, [students]);

  const targetToSources = useMemo(() => {
    return students.reduce((acc, student) => {
      acc[student.name] = student.subscriptions.map((sub) => sub.service.name);
      return acc;
    }, {});
  }, [students]);

  const fetchCheckAuth = async () => {
    const obj = (input) => {
      return Object.fromEntries(
        input.split(', ').map((pair) => {
          const [key, value] = pair.split(':').map((s) => s.trim());
          return [key, value];
        })
      );
    };

    const response = await checkAuth();
    return obj(response);
  };

  const fetchAllServices = async () => {
    const servicesData = await getAllServices();
    return servicesData;
  };

  const fetchAllStudents = async () => {
    const studentsData = await getAllStudents();
    return studentsData;
  };

  useEffect(() => {
    (async () => {
      try {
        const [userRes, servicesRes, studentsRes] = await Promise.all([
          fetchCheckAuth(),
          fetchAllServices(),
          fetchAllStudents(),
        ]);

        if (userRes?.role !== 'ADMIN') {
          navigate('/login', { state: { from: location }, replace: true });
          return;
        }

        setUser(userRes);
        setStudents(studentsRes);
        setServices(servicesRes);
      } catch (error) {
        if (error && error.response && error.response.status === 401) {
          navigate('/login', { state: { from: location }, replace: true });
        } else {
          alert('There is an issue on the server...');
        }
      }
    })();
  }, [navigate, location]);

  const fetchService = () => {
    if (
      window.confirm('Are you sure to post the new Service name: ' + service)
    ) {
      const fetchNewService = async () => {
        try {
          const data = await postService(service);
          alert(`Service ${service} is added!`);
        } catch (error) {
          alert(error);
        }
      };

      fetchNewService();
    }
  };

  const fetchSubscriptions = (servicesCheck, studentsCheck) => {
    let subscriptionsToPost = [];

    for (const studentKey in studentsCheck) {
      for (const serviceKey in servicesCheck) {
        if (studentsCheck[studentKey] && servicesCheck[serviceKey])
          subscriptionsToPost.push({
            studentName: studentKey,
            serviceName: serviceKey,
          });
      }
    }

    console.log(subscriptionsToPost);

    const fetchAllSubscriptions = async () => {
      try {
        const response = await postSubscriptions(subscriptionsToPost);

        console.log(response);
      } catch (error) {
        alert('There is an error');
      }
    };

    if (window.confirm('Are you usre to assign the services?')) {
      fetchAllSubscriptions();
    }
  };

  return (
    <>
      {user ? (
        <div>
          <div>
            <label htmlFor="service">Post Service</label>
            <Input
              id={'service'}
              value={service}
              onChange={(e) => setService(e.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') fetchService();
              }}
            />
          </div>
          <Accordion title={'Tutoring'} isHidden={true}>
            <Reload title={'Calendar'} reload={reloadCalendars} />
            <Reload title={'Topic Stats'} reload={reloadTopicStats} />
          </Accordion>
          <Accordion title={'Services'}>
            <AssignmentBox
              source={services}
              sourceToTargets={sourceToTargets}
              target={target}
              targetToSources={targetToSources}
              submit={(s, t) => {
                fetchSubscriptions(s, t);
              }}
            />
          </Accordion>
          <Accordion title={'Users'} onLoad={async () => getAllUsers()}>
            {(data, reload) => (
              <div className={styles.userCardContainer}>
                {data.map((value) => (
                  <UserCard
                    userData={value}
                    key={'user' + value.email}
                    onModified={reload}
                  />
                ))}
              </div>
            )}
          </Accordion>
          <Accordion title={'Topics'} isHidden={true}>
            <Pageable
              propStyles={styles.pageableContainer}
              key={'topics'}
              isFixed={false}
              hasScroll={false}
              sortTypes={[]}
              sortParams={[]}
            >
              <QuestionTopicContainer />
            </Pageable>
          </Accordion>
        </div>
      ) : null}
    </>
  );
}

export default AdminMainPage;
