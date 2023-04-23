import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import app from '../../firebase/firebase.config';



const auth = getAuth(app);

const Login = () => {

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');


    const handleSubmit = (event) => {
        event.preventDefault();
        setError('')
        setSuccess('')
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(email, password);
        

        // PassWord validation System 
        if(!/(?=.*[A-Z].*[A-Z].*[A-Z])/.test(password)){
            setError('Please add at least 3 Uppercase.')
            return;
        }
        else if(!/(?=.*[0-9])/.test(password)){
            setError('Please add at least one numbers');
            return;
        }
        else if(password.length <6){
            setError("Please add at least 6 charecters");
            return;
        }


        signInWithEmailAndPassword(auth, email, password)
        .then(result =>{
            const loggedInUser = result.user;
            console.log(loggedInUser);
            setError('');
            event.target.reset();
            setSuccess(`Login Approved. Wellcome ${loggedInUser.email}`)
        })
        .catch(error =>{
            setError(error.message)
        })
    }

    










    return (
        <div className='form-container'>
            <h4>Please Login:</h4>
            <form onSubmit={handleSubmit}>
                <input required className='box' type="email" name='email' placeholder='Your email' />
                <br />
                <input required className='box' type="password" name='password' id='password' placeholder='Your password' />
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

export default Login;