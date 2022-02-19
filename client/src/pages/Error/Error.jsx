import { Link } from "react-router-dom"
import errorImg from "../../assets/images/not-found.svg";
import Wrapper from "../../assets/wrappers/ErrorPage";
const Error = ({text}) => {
  return (
    <Wrapper className="full-page">
        <div>
            <img src={errorImg} alt="error"/>
            <h3>Ohh! Page Not Found</h3>
            <p>{text}</p>
            <Link to="/">Back home</Link>
        </div>
    </Wrapper>
  )
}

export default Error