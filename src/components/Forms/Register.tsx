const Register = () => {

    function _onSubmit(e) {
        e.preventDefault();
    }

    return (
        <div>
            <form method="post" onSubmit={_onSubmit}>
                <h1>Create an account</h1>
                <fieldset>
                    <legend>Name</legend>
                    <input type="text" name="name" required placeholder="Enter your name"/>
                </fieldset>
                <fieldset>
                    <legend>Email</legend>
                    <input type="email" name="email" required placeholder="Enter your email"/>
                </fieldset>
                <fieldset>
                    <legend>Password</legend>
                    <input type="password" name="password" required placeholder="Enter your password"/>
                </fieldset>
                <fieldset>
                    <legend>Repeat Password</legend>
                    <input type="password" name="repeatPassword" required placeholder="Repeat password"/>
                </fieldset>
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default Register