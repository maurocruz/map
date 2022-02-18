import { useContext, useEffect, useState } from 'react'
import { setCookie } from 'nookies'

import styles from './forms.module.scss'
import { useApi } from '@hooks/useApi'
import { ContainerContext } from '@contexts/ContainerContext'
import { AppContext } from '@contexts/AppContext'

const Login = () => {   

    const { setToken } = useContext(AppContext)

    const { toogleModal, setModalName } = useContext(ContainerContext)

    const { setRequest, response } = useApi()

    const [ message, setMessage ] = useState('')

    // IF SEND DATA TO API
    useEffect(()=>{
        if (response) {
            if (response.status == 'fail') {
                setMessage(response.message)
            }

            if (response.status == "success") {
                setMessage('')
                setCookie(undefined, 'plinctmap.token', response.token, {
                    maxAge: 60 * 60 * 1
                })
                setToken(response);

                toogleModal(false)
            }
        }
    },[response])

    
    async function submitForm(e: any) {
        setRequest({
            method: 'post',
            type: 'auth/login',
            values: {
                email: e.target.elements.email.value,
                password: e.target.elements.password.value
            }
        })
        e.preventDefault()
    }

    function handleForgotPassword() {
        setModalName('forgotPassword')        
    }

    function handleCreateAnAccount() {
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

                <button onClick={handleForgotPassword}>Forgot password?</button>

                <button type='button' onClick={handleCreateAnAccount}>Create an account</button>

            </div>
    )
}

export default Login
