import React, { useContext, useEffect, useState } from "react";
import { PageableContext } from "../../layouts/Pageable/PageableContext";
import { useParams } from "react-router-dom";
import { getSimpleMathCounts } from "../../services/api/SimpleMathQuestionService";
import Bar from "../../components/Bar/Bar";

const MathSolveResultPage = () => {
  const { setPageable, setPageParams, pageParams } =
    useContext(PageableContext);
  const { studentName } = useParams();

  const [bars, setBars] = useState([]);

  useEffect(() => {
    setPageParams({
      page: 0,
      size: 5,
      sortType: "desc",
      sortParam: "submitDate",
    });
  }, [setPageParams]);

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

          console.log(response.content);

          let a = [];
          response.content.forEach((value, index) => {
            let b = (
              <Bar
                key={
                  index +
                  "." +
                  (value.correctCounts - value.wrongCounts) +
                  value.date
                }
                label={value.date}
                value={value.correctCounts - value.wrongCounts}
              />
            );

            a = [...a, b];
          });

          setBars(a);
        })
        .catch((err) => {
          console.error(err);

          window.alert("There is an issue...");
        });
    }
  }, [pageParams, setPageable, studentName]);

  return (
    <>
      <h1>{studentName}</h1>
      {bars}
    </>
  );
};

export default MathSolveResultPage;
