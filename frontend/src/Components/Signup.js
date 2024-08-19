import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {zodResolver} from '@hookform/resolvers/zod'
import httpCommon from '../http-common';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const loginSchema = z.object({
  name: z.object({ 
    first_name: z.string().min(1, {message: 'Please enter your first name'}),
    last_name: z.string().min(1, {message: 'Please enter your last name'}),
  }),
    email: z.string().email({message: 'Invalid email address'}).min(1, {message: 'Email address is required'}),
    password: z.string().min(1, {message: 'Please enter your password'}).min(8, {message: 'password must be at least 8 characters'}),
  })


const Signup = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm({resolver: zodResolver(loginSchema)});

    const navigate = useNavigate();
    const to = "/login";

    const onSubmit = (data) => {
      registerUser(data)
      console.log(data);
    }
    const registerUser = async (data) => {
      try {
        const response = await httpCommon.post('/register', data, 
        {
          headers: { 'Content-Type': 'application/json'},
          withCredentials: true
        })
        navigate(to, {replace: true});
      } catch (err) {
        console.log(err)
      }
    }
  return (
    <div className="Signup">
        {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
      <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="signup-header">Create a new account</h1>
        {/* register your input into the hook by invoking the "register" function */}
        <div className="sf-item">
          <input className="place-holder-text auth-input" placeholder="First name" {...register("name.first_name")} autoFocus />
          {errors?.name?.['first_name'] && <span className='error-message'>{errors?.name?.['first_name'].message}</span>}
        </div>
        <div className="sf-item">
          <input className="place-holder-text auth-input" placeholder="Last name" {...register("name.last_name")} />
          {errors?.name?.['last_name'] && <span className='error-message'>{errors?.name?.['last_name'].message}</span>}
        </div>
        <div className="sf-item">
          <input className="place-holder-text auth-input" placeholder="email" {...register("email")} />
          {errors['email'] && <span className='error-message'>{errors['email'].message}</span>}
        </div>
        {/* include validation with required or other standard HTML validation rules */}
        <div className="sf-item">
          <input className="place-holder-text auth-input" type='password' placeholder="password" {...register("password")} />
          {/* errors will return when field validation fails  */}
          {errors['password'] && <span className='error-message'>{errors['password'].message}</span>}
        </div>
        <input className='primary-authBtn' type="submit" value='Sign Up!' />
        <span>Already have an account? <Link to='/login' className='' >Login!</Link></span>
      </form>
    </div>
  )
}

export default Signup