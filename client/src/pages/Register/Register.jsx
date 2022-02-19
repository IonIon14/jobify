import { useState, useEffect } from "react"
import Wrapper from "../../assets/wrappers/RegisterPage";
import { Logo, FormRow, Alert } from "../../components";
import mainLogo from "../../assets/images/logo.svg";
import { useAppContext } from "../../context/appContext";

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: false,

}

const Register = () => {

  const [values, setValues] = useState(initialState);

  const { isLoading, showAlert, displayErrorAlert, displaySuccessAlert } = useAppContext();


  //global state and useNavigate

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  }

  const handleChange = (e) => {
    console.log(e.target.value);
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log(values);

  };

  const handleSubmit = (e) => {

    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      displayErrorAlert();
      e.preventDefault();
    }
    else if (email && password && isMember) {
      displaySuccessAlert();
      e.preventDefault();
    }
    console.log(values);


  };
  return (
    <Wrapper className="full-page">
      <form onSubmit={handleSubmit} className='form'>
        <Logo logo={mainLogo} />
        <h3 >
          {values.isMember ? "Login" : "Register"}
        </h3>
        {showAlert && <Alert />}
        {values.isMember ?

          <>
            <FormRow name="email" type="email" value={values.email} text="Email" handleChange={handleChange} />
            <FormRow name="password" type="password" value={values.password} text="Password" handleChange={handleChange} />
            <button onSubmit={handleSubmit} className="btn btn-block">Submit</button>
            <p>Not a member yet ?
              <button type='button' onClick={toggleMember} className='member-btn'>Register</button>
            </p>
          </> :
          <>
            <FormRow name="name" type="text" value={values.name} text="Name" handleChange={handleChange} />
            <FormRow name="email" type="email" value={values.email} text="Email" handleChange={handleChange} />
            <FormRow name="password" type="password" value={values.password} text="Password" handleChange={handleChange} />
            <button onSubmit={handleSubmit} className="btn btn-block">Submit</button>
            <p>Already a member ?
              <button type='button' onClick={toggleMember} className='member-btn'>Login</button>
            </p>
          </>
        }
      </form>
    </Wrapper>
  );
}

export default Register