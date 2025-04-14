import React from "react";
import styles from "./NotFoundBlock.module.scss";
console.log(styles);
export const NotFoundBlock = () => {
  return (
    <div>
      <h1 className={styles.root}>Ничего не найдено:(</h1>
    </div>
  );
};
