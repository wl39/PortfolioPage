import React, { useState } from "react";
// import AutoComplete from "../../components/AutoComplete/AutoComplete";
// import data from "../../data/countries.txt";
// import SeamCarving from "../../components/SeamCarving/SeamCarving";
// import SnackbarContainer from "../../components/Snackbar/SnackbarContainer";
import Bar from "../../components/Bar/Bar";

function SandBoxPage(props) {
  const [temp, setTemp] = useState(null);

  const halo = () => {
    temp("Good job!");
  };
  return (
    <>
      {/* <div>Hello</div>
      <AutoComplete data={data} />
      <SeamCarving />
      <button onClick={halo}>temp!</button>
      <SnackbarContainer addSnackbar={setTemp} />*/}
      <Bar />
    </>
  );
}

export default SandBoxPage;
