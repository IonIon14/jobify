import Wrapper from "../../assets/wrappers/Navbar"
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa"
import { useAppContext } from "../../context/appContext"
import { Logo } from ".."
import logoImg from "../../assets/images/logo.svg"
import { Outlet } from "react-router-dom"
import { useState } from "react"
const Navbar = () => {

    const { user, toggleSidebar, logoutUser } = useAppContext();

    const [showLogout, setshowLogout] = useState(false);
    return (
        <Wrapper>
            <div className="nav-center">
                <button className="toggle-btn" onClick={toggleSidebar}>
                    <FaAlignLeft />
                </button>
                <div className="">
                    <Logo logo={logoImg} />
                    <h3 className="logo-text">Dashboard</h3>
                </div>
                <div className="btn-container">
                    <button type="button" className="btn" onClick={() => setshowLogout(!showLogout)}>
                        <FaUserCircle />
                        {user && user.name}
                        <FaCaretDown />
                    </button>
                    <div className={showLogout ? "dropdown show-dropdown" : 'dropdown'}>
                        <button type="button" className="dropdown-btn" onClick={logoutUser} >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}

export default Navbar