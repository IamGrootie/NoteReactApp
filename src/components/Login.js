import {useNavigate, Link} from 'react-router-dom';
import React from 'react';
import {signInWithEmailAndPassword} from 'firebase/auth';
import { auth } from "../firebase-config";
import logo from '../images/logo_white.png';
import login from '../images/login_img.svg';
import google from '../images/google.svg';
import facebook from '../images/facebook.svg';
import divider from '../images/divider.svg';
import './loginSign.css'

export default function Login () {
    const navigate = useNavigate();

    const [userLogin, setUserLogin] = React.useState({
        email: '',
        password: ''
    });

    function handleSubmit(e) {
        e.preventDefault();
        signInWithEmailAndPassword(auth, userLogin.email, userLogin.password)
          .then((cred)=>{console.log("user logined:"+cred.user)
          navigate("/")} )
          .catch((err) => { console.log(err) })
    }

    function handleChange(e) {
        const { type, value } = e.target;
        setUserLogin((prev) => ({ ...prev, [type]: value }))
      }

    return (
        <div className='Login-content'>
            <div className='lateral-nav'>
                <img src={logo} className='login-logo' alt=''/>
                <img src={login} className='login-img' alt=''/>
            </div>
            <div className='login-container'>
                <Link to="/" className='back-btn'>Back</Link>
                <form 
                    className="contact-container"
                >
                    <h1>Account Login</h1>
                    <div className='socials'>
                        <button className='social-logo'>
                            <img src={google}  alt=''/>
                            Google account
                        </button>
                        <button className='social-logo'>
                            <img src={facebook}  alt=''/>
                            Facebook account
                        </button>
                    </div>
                    <div className='divider'>
                        <img src={divider} className="divider-img" alt=''></img>
                        <p>Or</p>
                        <img src={divider} className="divider-img" alt=''></img>
                    </div>
                    <label className='label'>E-mail address</label>
                    <input className='input' type="email" name="email" onChange={handleChange}/>
                    <label className='label'>Password</label>
                    <input className='input' type="password" name="password" onChange={handleChange}/>
                    <button onClick={handleSubmit} className='signup-btn'>Login</button>
                    <p className='question'>Don't have an account ? <Link to="/signup"> Sign up here</Link></p>
                </form>
            </div>
        </div>
    )}