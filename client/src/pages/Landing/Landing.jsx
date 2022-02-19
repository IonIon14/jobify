import { Logo } from "../../components";
import mainLogo from "../../assets/images/logo.svg";
import Main from "../../assets/images/main.svg";
import Wrapper from "../../assets/wrappers/LandingPage";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo logo={mainLogo} />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            Job <span>tracking</span>App
          </h1>
          <p>
            I'm baby cardigan biodiesel four loko humblebrag tumeric. Mlkshk
            kitsch put a bird on it, hot chicken cronut hammock godard
            succulents hell of selfies vinyl. Iceland pork belly air plant
            austin kale chips. Poutine prism banh mi health goth cardigan tacos.
          </p>
          <Link to="/register" className="btn btn-hero">
            Login/Register
          </Link>
        </div>
        <img src={Main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
