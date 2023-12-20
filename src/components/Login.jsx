import { useState } from "react";
import {useAuth} from "../context/authContext"
import {Link, useNavigate} from 'react-router-dom'
import Alert from "./Alert";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const {login, loginWithGoogle} = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState();

  const handleChange = ({target: {name, value}}) => {
    setUser ({...user, [name]: value})
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
       await login(user.email, user.password)
        navigate('/')
    } catch (error) {
        setError(error.message)
    }
  }

  const handleGoogleSignin = async () =>{
    try {
      
      await loginWithGoogle()
      navigate('/')
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className="w-full max-w-xs m-auto">

{error && <Alert message={error}/>
}

    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">

      <div className="mb-4">
      <label htmlFor="email">Email</label>
        <input
        type="email"
        name="email"
        placeholder="youremail@company.com"
        onChange={handleChange}
        className="input input-bordered w-full max-w-xs"
      />
      </div>

      <div className="mb-4">

        <label htmlFor="password">Password</label>
          <input type="password" name="password" onChange={handleChange}  className="input input-bordered w-full max-w-xs"/>
      </div>
      
     
      

      <button className="btn btn-outline btn-primary ">Login</button>
    </form>

    <p className="my-4 text-sm flex justify-between px-3">Don't have an Account <Link to='/register'>Register</Link></p>

    <button onClick={handleGoogleSignin} className="btn btn-outline btn-secondary w-full">Google</button>
    </div>
  );
};

export default Login;
