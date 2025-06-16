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
        const data = await getSutdentTopicStats(pageParams, 'hyerin');

        let newUser = {
          name: 'wl39',
          data: [],
        };

        data.forEach((value) => {
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

  return (
    <>
      {/* <div>Hello</div>
      <AutoComplete data={data} />
      <SeamCarving />
      <button onClick={halo}>temp!</button>
      <SnackbarContainer addSnackbar={setTemp} />*/}

      <button onClick={halo}>temp!</button>
      <button onClick={temp2}>temp!</button>
      <SnackbarContainer addSnackbar={setTemp} />

      <ScatterPlot width={900} height={800} data={data} />
      <RadarChart
        width={400}
        height={400}
        dataList={userData}
        colors={colorList}
      />

      <RadarChart
        width={400}
        height={400}
        dataList={radarData}
        colors={colorList}
      />
      <LineGraph data={sampleData} width={700} height={400} />
      <Bar />
    </>
  );
}

export default SandBoxPage;
