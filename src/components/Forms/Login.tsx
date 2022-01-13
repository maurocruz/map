import { useContext, useEffect, useState } from 'react'
import { setCookie } from 'nookies'

import styles from './forms.module.scss'
import { AppContext } from '@contexts/AppContext'
import { useApi } from '@hooks/useApi'
import { ContainerContext } from '@contexts/ContainerContext'

const Login = () => {   

    const { setUser } = useContext(AppContext)

    const { toogleModal } = useContext(ContainerContext)

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
                setUser({
                    name: response.data[0].name
                })
                toogleModal(false)
            }
        }
    },[response])

    
    async function submitForm(e: any) {
        setRequest({
            method: 'post',
            type: 'login',
            values: {
                email: e.target.elements.email.value,
                password: e.target.elements.password.value
            }
        })
        e.preventDefault()
    }

    function handleForgotPassword() {
        
    }

    function handleCreateAnAccount() {
        console.log('create account')        
    }

    return (
            <div className={styles.login}>
                <form onSubmit={submitForm} method='post'>
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