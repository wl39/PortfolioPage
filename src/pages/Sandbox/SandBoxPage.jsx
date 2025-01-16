import React from "react";
import AutoComplete from "../../components/AutoComplete/AutoComplete";
import data from "../../data/countries.txt";
import SeamCarving from "../../components/SeamCarving/SeamCarving";

function SandBoxPage(props) {
  return (
    <>
      <div>Hello</div>
      <AutoComplete data={data} />
      <SeamCarving />
    </>
  );
}

export default SandBoxPage;
