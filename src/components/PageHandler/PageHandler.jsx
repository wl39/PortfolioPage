import React, { useEffect, useState } from "react";
import styles from "./PageHandler.module.css";
const PageHandler = ({ pageable, changePage }) => {
  let [pages, setPages] = useState([]);

  useEffect(() => {
    makePage(pageable, pageable.totalPages);
  }, [pageable]);

  const makePage = (pageable, totalPages) => {
    let pages = [];

    if (totalPages < 7) {
      for (let i = 0; i < totalPages; i++) {
        pages.push(
          <div
            className={
              pageable.pageNumber === i
                ? styles.pageContainerSelected
                : styles.pageContainer
            }
            key={i}
            onClick={() => {
              changePage(i);
            }}
          >
            {i + 1}
          </div>
        );
      }
    } else {
      if (pageable.pageNumber < 4) {
        for (let i = 0; i < 5; i++) {
          pages.push(
            <div
              className={
                pageable.pageNumber === i
                  ? styles.pageContainerSelected
                  : styles.pageContainer
              }
              key={i}
              onClick={() => {
                changePage(i);
              }}
            >
              {i + 1}
            </div>
          );
        }

        pages.push(
          <div className={styles.dot} key={5}>
            ...
          </div>
        );
        pages.push(
          <div
            className={styles.pageContainer}
            key={totalPages - 1}
            onClick={() => {
              changePage(totalPages - 1);
            }}
          >
            {totalPages}
          </div>
        );
      } else if (totalPages - pageable.pageNumber < 5) {
        pages.push(
          <div
            className={styles.pageContainer}
            key={0}
            onClick={() => {
              changePage(0);
            }}
          >
            1
          </div>
        );
        pages.push(
          <div className={styles.dot} key={1}>
            ...
          </div>
        );
        for (let i = totalPages - 5; i < totalPages; i++) {
          pages.push(
            <div
              className={
                pageable.pageNumber === i
                  ? styles.pageContainerSelected
                  : styles.pageContainer
              }
              key={i}
              onClick={() => {
                changePage(i);
              }}
            >
              {i + 1}
            </div>
          );
        }
      } else {
        pages.push(
          <div
            className={styles.pageContainer}
            key={0}
            onClick={() => {
              changePage(0);
            }}
          >
            1
          </div>
        );
        pages.push(
          <div className={styles.dot} key={1}>
            ...
          </div>
        );
        for (
          let i = pageable.pageNumber - 2;
          i < pageable.pageNumber + 3;
          i++
        ) {
          pages.push(
            <div
              className={
                pageable.pageNumber === i
                  ? styles.pageContainerSelected
                  : styles.pageContainer
              }
              key={i}
              onClick={() => {
                changePage(i);
              }}
            >
              {i + 1}
            </div>
          );
        }
        pages.push(
          <div className={styles.dot} key={totalPages - 2}>
            ...
          </div>
        );
        pages.push(
          <div
            className={styles.pageContainer}
            key={totalPages - 1}
            onClick={() => {
              changePage(totalPages - 1);
            }}
          >
            {totalPages}
          </div>
        );
      }
    }

    setPages(pages);
    // this.setState({ page: pageable.pageNumber + 1, pages: pages });
  };

  return (
    <div className={styles.pageHandlerContainer}>
      {pages.map((value) => value)}
    </div>
  );
};

export default PageHandler;
