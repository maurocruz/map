import { useEffect, useState } from "react";
import { useRegister } from "@hooks/useUser";
import useModal from "@hooks/useModal/useModal";

const Register = () => 
{
  const { closeModal } = useModal();

  const { requestApi, responseApi } = useRegister();

  const [ message, setMessage ] = useState(null);

  useEffect(()=>{
    if (responseApi) {
      if (responseApi.status == "error" || responseApi.status == 'fail') {
        setMessage(responseApi.message);

      } else if (responseApi && responseApi.status == "success") {
        setMessage(null);
        closeModal('register');
      }
    }

    return () => { return null; }

  },[responseApi]);

  function _onSubmit(e) 
  {
    const email = e.target.elements.email.value;
    const name = e.target.elements.name.value;
    const password = e.target.elements.password.value;
    const repeatPassword = e.target.elements.repeatPassword.value;

    requestApi(email, name, password, repeatPassword);

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
          {message && <p>{message}</p>}
          <button type="submit">Register</button>
        </form>
      </div>
  )
}

export default Register;
