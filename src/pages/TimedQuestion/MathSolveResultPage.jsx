import React, { useContext, useEffect } from "react";
import { PageableContext } from "../../layouts/Pageable/PageableContext";
import { useParams } from "react-router-dom";
import { getSimpleMathCounts } from "../../services/api/HMSService";

const MathSolveResultPage = () => {
  const { setPageable, setPageParams, pageParams } =
    useContext(PageableContext);
  const { studentName } = useParams();

  useEffect(() => {
    setPageParams({
      page: 0,
      size: 5,
      sortType: "desc",
      sortParam: "submitDate",
    });
  }, []);

  useEffect(() => {
    if (pageParams.sortParam === "submitDate") {
      getSimpleMathCounts(studentName, pageParams)
        .then((response) => {
          setPageable({
            numberOfElements: response.numberOfElements,
            size: response.size,
            totalElements: response.totalElements,
            totalPages: response.totalPages,
            pageNumber: response.pageable.pageNumber,
          });
        })
        .catch((err) => {
          console.error(err);

          window.alert("There is an issue...");
        });
    }
  }, [pageParams, setPageable]);

  return (
    <>
      <h1>{studentName}</h1>
    </>
  );
};

export default MathSolveResultPage;
