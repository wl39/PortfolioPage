import React, { useState } from "react";
import { useParams } from "react-router-dom";
function Tutoring() {
  const { id } = useParams();
  return <>{id}</>;
}

export default Tutoring;
