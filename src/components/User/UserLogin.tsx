import { useEffect, useState } from 'react'
import { useLogin } from '@hooks/useUser';
import useModal from '@hooks/useModal/useModal';


const Login = () => 
{
  const { openModal, closeModal } = useModal();
  const { responseApi, login } = useLogin();

  const [ message, setMessage ] = useState('')
  
  useEffect(()=>{
    if (responseApi) {
      if (responseApi.status == 'fail') {
        setMessage(responseApi.message)
      } else if (responseApi.status == "success") {
        setMessage('');
        closeModal('login');
      }
    }
  },[responseApi]);

  function submitForm(e: any) {
    login(e.target.elements.email.value, e.target.elements.password.value);
    e.preventDefault()
  }

  function handleForgotPassword() {
    openModal('forgotPassword')        
  }

  function handleRegister() {
    closeModal('login');
    openModal('register');
  }

  return (
      <div>
        <form onSubmit={submitForm} method='post' className="loginForm">
          <h1>Sign in</h1>
          <fieldset>
            <legend>Name</legend>
            <input 
              name='email' 
              type='email'
              autoComplete='email'
              required
              placeholder='Email address'
            />
          </fieldset>
          <fieldset>
            <legend>Password</legend>
            <input
              name='password'
              type='password'
              autoComplete='current-password'
              required
              placeholder='Password'
            />
          </fieldset> 
          <button type='submit'>Sign in</button>    
        </form>      

        <p>{message}</p>         

        {/*<button onClick={handleForgotPassword}>Forgot password?</button>*/}

        <button type='button' onClick={handleRegister}>Create an account</button>

      </div>
  )
}

export default Login
