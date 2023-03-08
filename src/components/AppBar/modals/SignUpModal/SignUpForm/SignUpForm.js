import React, { useState } from "react";
import "./SignUpForm.css";
import { Button, makeStyles, TextField, Typography } from "@material-ui/core";
import dataProvider from "../../../../../Data/dataProvider";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../../../../../redux/error_slice";
import { setUser } from "../../../../../redux/user_slice";
const useStyles = makeStyles({
  root: {
    minWidth: "200px",
  },
  button: {
    fontSize: "20px",
    width: "50px",
    margin: "10px 0px",
  },
});

const SignUpForm = (props) => {
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [error, setInputError] = useState({
    user: false,
    userText: "",
    phone: false,
    phoneText: "",
    pass: false,
    passText: "",
  });
  async function finalSignUp() {
    const username = user.phone,
      password = document.getElementById("signUpPasswordInput").value,
      name = document.getElementById("signUpNameInput").value,
      email = document.getElementById("signUpEmailInput").value;
    setInputError({
      user: name === "",
      userText: name === "" ? "لطفا نام  خود را وارد کنید" : "",
      phone: username === "",
      phoneText: username === "" ? "لطفا شماره موبایل خود را وارد کنید" : "",
      pass: password === "" || password.length < 4,
      passText:
        password === ""
          ? "لطفا رمز عبور خود را وارد کنید"
          : password.length < 4
          ? "رمز عبور نمی‌تواند کمتر از 4 کاراکتر داشته باشد"
          : "",
    });
    if (
      name != "" &&
      username != "" &&
      password != "" &&
      password.length >= 4
    ) {
      dispatch(setError({ loading: true }));
      let personInfo = {
        username: username,
        password: password,
        name: name,
        email: email,
      };
      let data = await dataProvider.sendInformation("customer/signup", {
        data: personInfo,
      });
      
      if (data) {
        props.setOpen(false);
        dispatch(setUser({ id: data._id, name: data.name, login: false }));
        const label = user.name + " " + "حساب کاربری شما با موفقیت ایجاد شد.";
        dispatch(
          setError({
            open: true,
            message: label,
            state: "success",
            loading: false,
          })
        );
      }
      props.setOpen(true)
      dispatch(setError({ loading: false }));
    }
  }

  return (
    <div style={{ textAlign: "center" }}>
      <div className="signUpForm">
        <div className="signUpInputContainer">
          <TextField
            error={error.user}
            helperText={error.userText}
            variant="outlined"
            type="text"
            className={classes.root}
            id="signUpNameInput"
            placeholder="نام و نام خانوادگی"
          />
        </div>
        <div className="signUpInputContainer">
          <TextField
            error={error.pass}
            helperText={error.passText}
            variant="outlined"
            type="text"
            className={classes.root}
            id="signUpPasswordInput"
            placeholder="رمز عبور"
          />
        </div>
        <div className="signUpInputContainer">
          <TextField
            variant="outlined"
            type="text"
            className={classes.root}
            id="signUpEmailInput"
            placeholder="ایمیل(اختیاری)"
          />
        </div>
      </div>
      <img className="formDivider" />
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        onClick={finalSignUp}
      >
        ثبت
      </Button>
    </div>
  );
};

export default SignUpForm;
