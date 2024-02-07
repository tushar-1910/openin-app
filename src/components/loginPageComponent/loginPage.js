import React from "react";
import styles from "./loginpage.module.css";
import logo from "../images/logo1.svg";
import github from "../images/gihub.svg";
import twitter from "../images/twitter.svg";
import linkedin from "../images/linkedin.svg";
import discord from "../images/discord.svg";
import google from "../images/google.svg";
import apple from "../images/apple.svg";
import merged from "../images/mergedIcons.svg";
import logo2 from "../images/mobile_logo.svg";
import { googleLogout } from "@react-oauth/google";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {

  const navigate = useNavigate()


  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );
        navigate('/dashboard')

        window.sessionStorage.setItem('name',res.data.name)
        window.sessionStorage.setItem('picture',res.data.picture)
        window.sessionStorage.setItem('loged','yes')

      } catch (e) {
        alert('Login Error')
        console.log(e);
      }
    },
  });



  return (
    <div className={styles.outter}>
      <div className={styles.left}>
        <div className={styles.bg}></div>
        <div className={styles.left_content}>
          <div className={styles.logo_div}>
            <img src={logo}  alt="logo"/>
          </div>
          <div className={styles.content_div}>BASE</div>
          <div className={styles.footer_div}>
            <img src={github} alt="github"/>
            <img src={twitter} alt="twitter"/>
            <img src={linkedin} alt="linkedin"/>
            <img src={discord} alt="discord"/>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.mobile_header}>
          <img src={logo2} alt="logo"/>
        </div>
        <div className={styles.right_content}>
          <span
            style={{
              fontSize: "2rem",
              fontFamily: "Montserrat",
              fontWeight: "bold",
              marginBottom: "0.4rem",
            }}
          >
            Sign In
          </span>
          <span style={{ marginBottom: "1rem" }}>Sign in to your account</span>
          <div className={styles.options_div}>
            <span onClick={() => login()}>
              <img src={google} style={{ marginRight: "1rem" }} alt="google" />
              Sign in with Google
            </span>
            <span
              onClick={() => {
                googleLogout();
              }}
            >
              <img src={apple} style={{ marginRight: "1rem" }} alt="apple" />
              Sign in with Apple
            </span>
          </div>
          <div className={styles.form_div}>
            <span>Email address</span>
            <input type="email" maxLength={30} />
            <span>Password</span>
            <input type="password" maxLength={25} />
            <span
              style={{
                color: "#346BD4",
                cursor: "pointer",
                marginBottom: "1rem",
              }}
            >
              Forgot password?
            </span>
            <button onClick={()=>alert('Please! Login Using Google')}>Sign In</button>
          </div>
          <div className={styles.bottom_txt} style={{ alignSelf: "center" }}>
            Don’t have an account?{" "}
            <span style={{ color: "#346BD4", cursor: "pointer" }}>
              {" "}
              Register here
            </span>
          </div>
            <img className={styles.bottom_icons} style={{marginTop:'4rem',marginBottom:'2rem',width:'40%',alignSelf:'center'}} src={merged} alt="merged"></img>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
