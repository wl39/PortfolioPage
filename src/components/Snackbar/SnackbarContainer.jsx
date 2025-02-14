import React, { useCallback, useEffect, useState } from "react";
import Snackbar from "./Snackbar";

import styles from "./Snackbar.module.css";

const SnackbarContainer = ({ addSnackbar }) => {
  const [snackbars, setSnackbars] = useState([]);

  const removeSnackbar = (id) => {
    setSnackbars((prev) => prev.filter((snackbar) => snackbar.id !== id));
  };

  const internalAddSnackbar = useCallback((string) => {
    const id = Date.now();
    setSnackbars((prev) => [
      ...prev,
      {
        id: id,
        component: (
          <Snackbar
            string={string}
            id={id}
            key={id}
            removeSnackbar={removeSnackbar}
          />
        ),
      },
    ]);
  }, []);

  useEffect(() => {
    if (addSnackbar) {
      addSnackbar(() => internalAddSnackbar);
    }
  }, [addSnackbar, internalAddSnackbar]);

  return (
    <div className={styles.container}>
      {snackbars.map((snackbar) => snackbar.component)}
    </div>
  );
};

export default SnackbarContainer;
