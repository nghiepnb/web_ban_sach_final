import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import { registerValidate } from "../helpers/Validate";
import { useState } from "react";
import convertToBase64 from "../helpers/ImgConverter";
import { apiClient } from "../config/service";
import { useDispatch } from "react-redux";
import { login } from "../app/features/login/loginSlice";
const Register = () => {
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
    },
    validate: registerValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        const data = await apiClient.post("shop/signup", values);
        console.log("data", data);
        toast.success("Đăng ký tài khoản thành công");
        const { metaData } = data.data;
        const action = login(metaData.metaData.shop);
        dispatch(action);
        localStorage.setItem("userInfo", metaData.metaData.shop);
        localStorage.setItem(
          "accessToken",
          JSON.stringify(metaData.metaData.tokens.accessToken)
        );
        navigate("/");
      } catch (error) {
        toast.error(error);
      }
    },
  });

  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };
  return (
    <div
      style={{
        fontSize: "10px",
        background: "red",
        backgroundImage: `url(" /images/Background.png")`,
        height: "100vh",
      }}
    >
      <Wrapper className="container mx-auto">
        <div className="flex-div">
          <div className="glass">
            <div className="title">
              <h4>Register</h4>
              <span className="greetings">Happy to Join you!</span>
            </div>
            <form className="py-1" onSubmit={formik.handleSubmit}>
              <div className="profile">
                <label htmlFor="profile">
                  <img
                    src={file || "/images/logo.png"}
                    className="profile-img"
                    alt="avatar"
                  />
                </label>
                <input
                  onChange={onUpload}
                  type="file"
                  id="profile"
                  name="profile"
                />
              </div>

              <div className="text-box">
                <input
                  className="i-box"
                  type="email"
                  placeholder="Email*"
                  {...formik.getFieldProps("email")}
                />
                <input
                  className="i-box"
                  type="text"
                  placeholder="name*"
                  {...formik.getFieldProps("name")}
                />

                <input
                  className="i-box"
                  type="password"
                  placeholder="Password*"
                  {...formik.getFieldProps("password")}
                />
                <button className="btn" type="submit">
                  Register
                </button>
              </div>

              <div className="title">
                <span className="greetings">
                  Already register?
                  <NavLink to="/login">Login Now</NavLink>
                </span>
              </div>
            </form>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

const Wrapper = styled.section`
  .container {
    width: 100%;
    height: 100vh;
  }

  @media (min-width: 375px) {
    .container {
      max-width: 375px;
    }
    .glass {
      min-width: 70%;
    }
  }
  @media (min-width: 640px) {
    .container {
      max-width: 640px;
    }
    .glass {
      min-width: 50%;
    }
  }
  @media (min-width: 768px) {
    .container {
      max-width: 768px;
    }
    .glass {
      min-width: 50%;
    }
  }
  @media (min-width: 1024px) {
    .container {
      max-width: 1024px;
    }
    .glass {
      max-width: 40%;
    }
  }
  @media (min-width: 1280px) {
    .container {
      max-width: 1280px;
    }
    .glass {
      min-width: 30%;
    }
  }

  .mx-auto {
    margin-right: auto;
    margin-left: auto;
  }
  .flex-div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .glass {
    background: rgba(255, 255, 255, 0.55);
    border-radius: 16px;
    box-shadow: 0 4px 30px #4747470b;
    backdrop-filter: blur(7.1px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    padding-left: 1.75em;
    padding-right: 1.75em;
    padding-top: 5em;
    padding-bottom: 5em;
    flex-shrink: 0;
    border-radius: 1.5em;
    border-width: 4px;
    border-color: #f9fafb;
    height: 75%;
    width: 40%;

    .title {
      display: flex;
      flex-direction: column;
      align-items: center;
      h4 {
        font-size: 3em;
        line-height: 1;
        font-weight: 700;
      }
      .greetings {
        padding-top: 1em;
        padding-bottom: 1em;
        width: 66.666667%;
        font-size: 1.25em;
        line-height: 1.75em;
        text-align: center;
        color: #6b7280;
      }
    }
  }
  .py-1 {
    padding-top: 0.25em;
    padding-bottom: 0.25em;
  }
  .profile {
    display: flex;
    padding-top: 1em;
    padding-bottom: 1em;
    justify-content: center;
    .profile-img {
      border-radius: 999px;
      max-width: 130px;
      max-height: 130px;
      object-fit: cover;
      border-width: 4px;
      border-color: #f3f4f6;
      cursor: pointer;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
        0 4px 6px -2px rgba(0, 0, 0, 0.05);
      width: 130px;
      &:hover {
        border-color: #e5e7eb;
      }
    }
  }
  .text-box {
    display: flex;
    flex-direction: column;
    gap: 1.5em;
    align-items: center;
    .i-box {
      padding-top: 1em;
      padding-bottom: 1em;
      padding-left: 1.25em;
      padding-right: 1.25em;
      border-radius: 0.75em;
      border-width: 0;
      width: 75%;
      font-size: 1.125em;
      line-height: 1.75em;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    }
    .btn {
      padding-top: 1em;
      padding-bottom: 1em;
      border-radius: 0.5em;
      border-width: 0.5px;
      width: 75%;
      font-size: 1.25em;
      line-height: 1.75em;
      text-align: center;
      color: #f9fafb;
      background-color: #6366f1;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
      transition: all 0.3s ease;
      -webkit-transition: all 0.3s ease 0s;
      -moz-transition: all 0.3s ease 0s;
      -o-transition: all 0.3s ease 0s;
      &:hover {
        box-shadow: 0 2em 2em 0 rgb(132 144 255 / 30%);
        transform: scale(0.96);
      }
    }
  }
  input[type="file"] {
    display: none;
  }
`;

export default Register;
