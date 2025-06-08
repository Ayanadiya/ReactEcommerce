import PasswordForm from "../User/PasswordForm"
import Logout from "../User/Logout";
import classes from './Profile.module.css'
const Profile=()=>{
    return (
        <div className={classes.container}>
            <div className={classes.logout}>
                <Logout/>
            </div>
            <PasswordForm />
        </div>
    )
}

export default Profile;