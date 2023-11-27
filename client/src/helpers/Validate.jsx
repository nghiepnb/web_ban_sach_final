/* eslint-disable no-useless-escape */
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// validate loginpage username
export async function usernameValidate(values) {
  const errors = usernameVerify({}, values);
  return errors;
}
// validate loginpage password
export async function passwordValidate(values) {
  const errors = passwordVerify({}, values);
  return errors;
}

/** validate reset password */
export async function resetPasswordValidation(values) {
  const errors = passwordVerify({}, values);

  if (values.password !== values.confirm_pwd) {
    errors.exist = toast.error("Password not match...!");
  }

  return errors;
}
//validate profile page
export async function registerValidation(values) {
  const errors = emailVerify({}, values);
  return errors;
}

//validate register form
export async function registerValidate(values) {
  const errors = null
  passwordVerify(errors, values);
  emailVerify(errors, values);

  return errors;
}
// Validate username
function usernameVerify(error = {}, values) {
  if (!values.username) {
    error.username = toast.error("Username Required!");
  } 
  return error;
}

//Validate password

function passwordVerify(error = {}, values) {
 
  return error;
}

//validate email
function emailVerify(error = {}, values) {
  if (!values.email) {
    error.email = toast.error("Email Required...!");
  } else if (values.email.includes(" ")) {
    error.email = toast.error("Wrong Email...!");
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    error.email = toast.error("Invalid email address...!");
  }

  return error;
}
