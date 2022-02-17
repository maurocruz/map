export default function ForgotPassword() {

    function _onSubmit(e) {
        e.preventDefault();
    }
    return (
        <div>
            <form method="post" onSubmit={_onSubmit}>
                <h1>Forgot Password?</h1>
                <fieldset>
                    <legend>Email</legend>
                    <input type="email" name="email" required placeholder="Enter your email"/>
                </fieldset>
                <button type="submit">Send Email</button>
            </form>
        </div>
    )
}