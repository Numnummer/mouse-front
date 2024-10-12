import styles from "./Button.module.css";
import React from "react";
import PropTypes from "prop-types";

export default function Button({ text, handler }) {
  return (
    <button className={styles.button} onClick={handler}>
      {text}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  handler: PropTypes.func.isRequired,
};
