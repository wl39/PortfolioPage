import React, { useState } from "react";
import PageHandler from "../../components/PageHandler/PageHandler";
import ScrollTo from "../../components/ScrollTo/ScrollTo";
import PageParameterController from "../../components/PageParameterController/PageParameterController";
import { PageableContext } from "./PageableContext";

import stylese from "./Pageable.module.css";

function Pageable({ children }) {
  const [pageable, setPageable] = useState({
    numberOfElements: 5,
    size: 5,
    totalElements: 5,
    totalPages: 1,
    pageNumber: 0,
  });
  const [pageParams, setPageParams] = useState({
    page: 0,
    size: 5,
    sortType: "asc",
    sortParam: "id",
  });

  const changePage = (page) => {
    setPageParams((prev) => ({ ...prev, page: page }));
  };

  return (
    <PageableContext.Provider
      value={{ pageable, setPageable, pageParams, setPageParams }}
    >
      <div className={stylese.main}>
        <div className={stylese.paramContainer}>
          <PageParameterController
            pageParams={pageParams}
            setPageParams={setPageParams}
          />
        </div>
        {children}
        <br />
        <PageHandler pageable={pageable} changePage={changePage} />
        <ScrollTo />
      </div>
    </PageableContext.Provider>
  );
}

export default Pageable;
