import PropTypes from "prop-types";
import CommonStyles from "../../../CommonStyles/CommonStyles.module.css";
import React from "react";

export default function Form({ setSignInData, signInData, showPassword }) {
  return (
    <form>
      <div className={CommonStyles.inputs}>
        <input
          type="text"
          name="email"
          autoComplete="h87h58g7h8hd"
          placeholder={"Email"}
          onChange={(event) => {
            setSignInData({ ...signInData, email: event.target.value });
          }}
        />
        <input
          type={showPassword ? "text" : "password"}
          placeholder={"Пароль"}
          onChange={(event) => {
            setSignInData({
              ...signInData,
              password: event.target.value,
            });
          }}
        />
      </div>
    </form>
  );
}

Form.propTypes = {
  setSignInData: PropTypes.func.isRequired,
  signInData: PropTypes.object.isRequired,
  showPassword: PropTypes.bool.isRequired,
};
