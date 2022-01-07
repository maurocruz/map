import { ContainerOverlay } from '.'
import styles from './containerOverlay.module.scss'

const Login = () => {

    return (
        <ContainerOverlay key={'login'} >
            <div className={styles.login}>
                <h1>Sign in</h1>
                <form>
                    <fieldset>
                        <legend>Name</legend>
                        <input 
                            name='name' 
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
            </div>
        </ContainerOverlay>
    )
}

export default Login