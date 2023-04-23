import React, { useState } from 'react';
import './Register.css';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from "firebase/auth";
import app from '../../firebase/firebase.config';

const Register = () => {

    const [eamil, setEmail] = useState("");
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const auth = getAuth(app)





    const handleSubmit = (event) =>{
        event.preventDefault();       
        setSuccess('');
        
        setError('');


        const email = event.target.email.value;
        const password = event.target.password.value;

        // PassWord validation System 
        if(!/(?=.*[A-Z].*[A-Z].*[A-Z])/.test(password)){
            setError('Please add at least 3 Uppercase.')
            return;
        }
        else if(!/(?=.*[0-9].*[0-9])/.test(password)){
            setError('Please add at least 2 numbers');
            return;
        }
        else if(password.length <6){
            setError("Please add at least 6 charecters");
            return;
        }



        createUserWithEmailAndPassword(auth, email, password)
        .then(result =>{
            const loggedUser = result.user;
            console.log(loggedUser);
            setError('');
            event.target.reset();
            setSuccess('Created Successfully')
            sendVarificationEmail(loggedUser)
        })
        .catch(error => {
            console.error(error.message);
            setError(error.message);
        })

    }

    const sendVarificationEmail = (user) =>{
        sendEmailVerification(user)
        .then(result=>{
            console.log(result);
            alert('Verify your mail')
        })
    }

    const handleEmailChange = (event) =>{
        // console.log(event.target.value);
        setEmail(event.target.value)
    }


    const handlePasswordBlur = (event) =>{
        console.log(event.target.value);
    }


    return (
        <div className='form-container'>
            <h4>Please register:</h4>
            <form onSubmit={handleSubmit}>
                <input required className='box' onChange={handleEmailChange} type="email"  name='email' placeholder='Your email'/>
                <br />
                <input required className='box' onBlur={handlePasswordBlur}  type="password" name='password' id='password' placeholder='Your password' />
                <br />
                <input required type="checkbox" /> <span>Accept terms and conditions</span>
                <br />
                <strong>{error}</strong> <br />
                <input className='button' type="submit" value="Register" />
            </form>
            <p>{success}</p>
        </div>
    );
};

export default Register;