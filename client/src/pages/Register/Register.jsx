import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
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

  const { user } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/')
      }, 3000)
    }

  }, [user, navigate])

  const [values, setValues] = useState(initialState);

  const { isLoading, showAlert, displayErrorAlert, displaySuccessAlert, clearAlert, registerUser } = useAppContext();

  //global state and useNavigate

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      displayErrorAlert();
      clearAlert();
    }
    else if (email && password && isMember) {
      displaySuccessAlert();
      clearAlert();
    }

    const currentUser = { name, email, password };
    if (currentUser) {
      console.log('already a member');
    }
    else {
      registerUser(currentUser);
    }

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
            <button type='submit' className='btn btn-block' disabled={isLoading}>
              submit
            </button>
            <p>Not a member yet ?
              <button type='button' onClick={toggleMember} className='member-btn'>Register</button>
            </p>
          </> :
          <>
            <FormRow name="name" type="text" value={values.name} text="Name" handleChange={handleChange} />
            <FormRow name="email" type="email" value={values.email} text="Email" handleChange={handleChange} />
            <FormRow name="password" type="password" value={values.password} text="Password" handleChange={handleChange} />
            <button type='submit' className='btn btn-block' disabled={isLoading}>
              submit
            </button>
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