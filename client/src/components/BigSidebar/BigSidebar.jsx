import Wrapper from "../../assets/wrappers/BigSidebar"
import { useAppContext } from '../../context/appContext'
import { Logo } from ".."
import logoImg from "../../assets/images/logo.svg";
import NavLinks from '../NavLinks/NavLinks'

const BigSidebar = () => {
    const { showSidebar } = useAppContext();
    return (
        <Wrapper>
            <div className={showSidebar ? "sidebar-container" : "sidebar-container show-sidebar"}>
                <div className="content">
                    <header>
                        <Logo logo={logoImg} />
                    </header>
                    <NavLinks />
                </div>
            </div>
        </Wrapper>
    )
}

export default BigSidebar