import { useContext, useEffect, useState } from 'react'

import { ContainerContext } from '@contexts/ContainerContext'
import useUser from '@hooks/useUser/useUser'

import styles from './forms.module.scss'

const Login = () => {

  const { toogleModal, setModalName } = useContext(ContainerContext)

  const { login, responseApi } = useUser();

  const [ message, setMessage ] = useState('')

  useEffect(()=>{
    if (responseApi) {
      if (responseApi.status == 'fail') {
        setMessage(responseApi.message)
      } else if (responseApi.status == "success") {
        setMessage('')
        toogleModal(false)
      }
    }
  },[responseApi])

  function submitForm(e: any) {
    login(e.target.elements.email.value, e.target.elements.password.value)
    e.preventDefault()
  }

  function handleForgotPassword() {
    setModalName('forgotPassword')        
  }

  function handleRegister() {
    setModalName('register');
  }

  return (
    <div className={styles.login}>
      <form onSubmit={submitForm} method='post' className={styles.loginForm}>
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
