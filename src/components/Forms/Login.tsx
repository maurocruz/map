import { useEffect, useState } from 'react'
import useApi from 'src/hooks/useApi/useApi'
import styles from './forms.module.scss'

const Login = () => {   

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
            }
        }
    },[response])

    
    function submitForm(e: any) {
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