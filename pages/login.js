

import * as styles from '../styles/login.module.scss'

export default function login() {
    return <div className={styles.container}>
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
}