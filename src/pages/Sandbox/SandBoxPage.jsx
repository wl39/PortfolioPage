import React, { useState } from 'react';
// import AutoComplete from "../../components/AutoComplete/AutoComplete";
// import data from "../../data/countries.txt";
// import SeamCarving from "../../components/SeamCarving/SeamCarving";
import SnackbarContainer from '../../components/Snackbar/SnackbarContainer';
import Bar from '../../components/Bar/Bar';
import ScatterPlot from '../../components/ScatterPlot/ScatterPlot';
import RadarChart from '../../components/RadarChart/RadarChart';
import LineGraph from '../../components/LineGraph/LineGraph';
import { getSutdentTopicStats } from '../../services/api/HMSService';
import CardButton from '../../components/CardButton/CardButton';

function SandBoxPage(props) {
  const [temp, setTemp] = useState(null);
  const [radarData, setRadarData] = useState([
    {
      name: '',
      data: [],
    },
  ]);

  const halo = () => {
    temp('Good job!');
  };

  const data = [
    { x: 50, y: 60, title: 'Alpha' },
    { x: 35, y: 180, title: 'Beta' },
    { x: 24, y: 100, title: 'Gamma' },
  ];
  const userData = [
    {
      name: 'user1',
      data: [
        { label: 'Power', value: 80 },
        { label: 'Speed', value: 65 },
        { label: 'Agility', value: 90 },
        { label: 'Durability', value: 70 },
        { label: 'Technique', value: 60 },
        { label: 'Luck', value: 40 },
        // { label: 'Strategy', value: 75 },
      ],
    },
    {
      name: 'user2',
      data: [
        { label: 'Power', value: 60 },
        { label: 'Speed', value: 80 },
        { label: 'Agility', value: 60 },
        { label: 'Durability', value: 85 },
        { label: 'Technique', value: 40 },
        { label: 'Luck', value: 50 },
        // { label: 'Strategy', value: 65 },
      ],
    },
  ];

  const colorList = [
    { fill: 'rgba(125,185,232,0.3)', stroke: '#7DB9E8' },
    { fill: 'rgba(255,100,100,0.3)', stroke: '#FF6464' },
  ];

  const sampleData = [
    { x: 1, y: 10 },
    { x: 2, y: 25 },
    { x: 3, y: 18 },
    { x: 4, y: 40 },
    { x: 5, y: 30 },
    { x: 6, y: 50 },
  ];

  const temp2 = () => {
    const temp = async () => {
      try {
        const pageParams = {
          page: 0,
          size: 6,
          sortTypes: ['desc'],
          sortParams: ['totalCount'],
        };
        const data = await getSutdentTopicStats(pageParams, 'wl39');

        let newUser = {
          name: 'wl39',
          data: [],
        };

        data.content.forEach((value) => {
          newUser.data.push({
            label: value.topic,
            value: (value.correctCount / value.totalCount) * 100,
          });
        });

        console.log(newUser);
        setRadarData([newUser]);
      } catch (error) {
        alert('hi!');

        throw error;
      }
    };

    temp();
  };

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

    // 예시용 fetch (실제 서버 주소로 변경해야 함)
    fetch('https://img.91b.co.uk/upload', {
      method: 'POST',
      body: formData,
      credentials: 'include', // JWT 쿠키 자동 포함
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json(); // JSON 파싱
      })
      .then((data) => {
        alert('업로드 성공');
        console.log(data);
      })
      .catch((err) => {
        alert('업로드 실패');
        console.error(err);
      });
  };

  return (
    <>
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>submit</button>
      {/* <div>Hello</div>
      <AutoComplete data={data} />
      <SeamCarving />
      <button onClick={halo}>temp!</button>
      <SnackbarContainer addSnackbar={setTemp} />*/}

      <CardButton onClick={() => console.log('hi')}></CardButton>
      <button onClick={halo}>temp!</button>
      <button onClick={temp2}>temp!</button>
      <SnackbarContainer addSnackbar={setTemp} />

      <ScatterPlot width={900} height={800} data={data} />
      <RadarChart size={300} values={userData} colors={colorList} />

      <RadarChart size={400} values={radarData} colors={colorList} />
      <LineGraph data={sampleData} width={700} height={400} />
      <Bar />
    </>
  );
}

export default SandBoxPage;
