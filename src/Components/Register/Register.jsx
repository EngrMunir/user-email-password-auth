import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../Firebase/firebase-config";
import { useState } from "react";
import { Link } from "react-router-dom";


const Register = () => {
    const [registerError, setRegisterError]=useState('')
    const [success, setSuccess]= useState('');


    const handleRegister = e =>{
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accepted = e.target.terms.checked;

        console.log(email, password, accepted);
              // reset error and success
              setRegisterError('');
              setSuccess('');
      

        if(password.length<6){
            setRegisterError("password should be at least 6 character");
            return;
        }
        else if(!/[A-Z]/.test(password)){
            setRegisterError("your password should have at least 6 character or longer");
            return;
        }
        else if(!accepted){
            setRegisterError("please accept our terms and conditions");
            return;
        }

  
        // create user

        createUserWithEmailAndPassword(auth, email, password)
        .then(result=>{
            console.log(result.user);
            setSuccess("User created successfully");
        })
        .catch(error=>{
            console.error(error);
            setRegisterError(error.message);
        })
    }
    return (
        <div className="">
           <div className="mx-auto md:w-1/2">
           <h2 className="text-3xl mb-8">Please Register</h2>
            <form onSubmit={handleRegister}>
               Email: <input className="mb-4 w-3/4 border px-5 py-2" type="email" name="email" />
                <br />
            Password:<input className="mb-4 w-3/4 border px-5 py-2" type="password" name="password"/>
                <br />
                <div className="mb-2">
                <input type="checkbox" name="terms" id="terms" />
                <label className="ml-2" htmlFor="terms">Accept our <a href="">Terms and Conditions</a></label>
                </div>
                <br />
                {/* <button className="btn btn-secondary w-3/4" >Register</button> */}
                <input className="btn btn-secondary w-3/4" type="submit" value="Register" />
            </form>
            {
                registerError && <p className="text-red-700">{registerError}</p>
            }
            {
                success && <p className="text-green-700">{success}</p>
            }
            <p>Already have an account? Please <Link to="/login">Login</Link></p>
           </div>
        </div>
    );
};

export default Register;