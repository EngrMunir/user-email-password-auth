import { sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword} from "@firebase/auth";
import auth from "../../Firebase/firebase-config";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";


const Login = () => {
  const [registerError, setRegisterError]= useState('');
  const [success, setSuccess] = useState('');
  const emailRef = useRef(null);

  const handleLogin = e =>{

    e.preventDefault();
    const email=e.target.email.value;
    const password = e.target.password.value;

    console.log(email, password);

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

    signInWithEmailAndPassword( auth, email, password)
    .then(result=>{
      console.log(result.user);

      if(result.user.emailVerified){
        setSuccess("User logged in successfully");
      }
      else{
        alert('Please verify your email address.')
      }
      

      // send verification email

      sendEmailVerification(result.user)
      .then(()=>{
        alert("Please check your email and verify your account");
      })
      
    })
    .catch(error =>{
      console.error(error);
      setRegisterError(error.message);
    })
  }

  const handleForgetPassword = () =>{
    const email = emailRef.current.value;
    if(!email){

      console.log("Please provide an email", emailRef.current.value);
      return;
    }
    else if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
      console.log("please write a valid email");
    }

    // send validation email

    sendPasswordResetEmail(auth, email)
    .then(()=>{
      alert("please Check your email")
    })
    .catch(error=>
      {
      console.log(error);
    })
    
  }

    return (
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <form onSubmit={handleLogin} className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input type="email"
                   placeholder="email"
                   ref={emailRef} 
                   className="input input-bordered" 
                   name="email" 
                   required />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input type="password" placeholder="password" className="input input-bordered" name="password" required />
                  <label className="label">
                <a href="#" onClick={ handleForgetPassword } className="label-text-alt link link-hover">Forgot password?</a>
              </label>
              </div>
              <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
              </div>
              </form>
              {
                registerError && <p className="text-red-700">{registerError}</p>
              }
              {
                success && <p className="text-green-700">{success}</p>
              }
            <p>New to this website Please <Link to="/register">Register</Link> </p>
          </div>
        </div>
      </div>
    );
};

export default Login;