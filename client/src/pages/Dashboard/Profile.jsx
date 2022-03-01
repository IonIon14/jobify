import { useEffect, useState } from "react"
import { useAppContext } from "../../context/appContext"
import { FormRow, Alert } from "../../components"
import Wrapper from "../../assets/wrappers/DashboardFormPage"

const Profile = () => {
    const { user, showAlert, displayErrorAlert, displaySuccessAlert, updateUser, isLoading, alertText } = useAppContext();
    const [name, setName] = useState(user?.name);
    const [email, setEmail] = useState(user?.email);
    const [lastName, setLastName] = useState(user?.lastName);
    const [location, setLocation] = useState(user?.location);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !lastName || !location) {
            displayErrorAlert();
            //updateUser({ name, email, lastName, location });
            return
        }
        updateUser({ name, email, lastName, location });

    }

    return (
        <Wrapper>
            <form className="form" onSubmit={handleSubmit}>
                <h3>Profile</h3>
                {showAlert && <Alert />}
                <div className="form-center">
                    <FormRow type="text" name="name" value={name} handleChange={(e) => setName(e.target.value)} />
                    <FormRow type="text" text="Last Name" name="lastName" value={lastName} handleChange={(e) => setLastName(e.target.value)} />
                    <FormRow type="email" name="email" value={email} handleChange={(e) => setEmail(e.target.value)} />
                    <FormRow type="text" name="location" value={location} handleChange={(e) => setLocation(e.target.value)} />
                    <button type="submit" disabled={isLoading} className="btn btn-block">
                        {isLoading ? "Please,wait!" : "Save changes"}
                    </button>
                </div>
            </form>
        </Wrapper>
    )
}

export default Profile