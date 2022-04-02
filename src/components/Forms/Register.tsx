import { ContainerContext } from "@contexts/ContainerContext";
import useUser from "@hooks/useUser/useUser";
import { useContext, useEffect, useState } from "react";

const Register = () => {

  const { toogleModal } = useContext(ContainerContext);

  const { login, register, responseApi } = useUser();

  const [ message, setMessage ] = useState(null);
  const [ email, setEmail ] = useState();
  const [ password, setPassword ] = useState();

  useEffect(()=>{
    if (responseApi) {
      if (responseApi.status == "error" || responseApi.status == 'fail') {
        setMessage(responseApi.message);

      } else if (responseApi && responseApi.status == "success") {
        setMessage(null);
        login(email, password);
        toogleModal(false)
      }
    }

    return () => {
    }

  },[responseApi]);  

  function _onSubmit(e) 
  {
    const email = e.target.elements.email.value;
    const name = e.target.elements.name.value;
    const password = e.target.elements.password.value;
    const repeatPassword = e.target.elements.repeatPassword.value;

    setEmail(email);
    setPassword(password);

    register(email, name, password, repeatPassword);

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
