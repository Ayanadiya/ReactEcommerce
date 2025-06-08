import { Button } from "react-bootstrap";
import AuthContext from "../../store/AuthContext";
import { useContext } from "react";

const Logout=()=>{
    const authctx=useContext(AuthContext);

    const logoutHandler=()=>{
        authctx.logout();
        window.location="/";
    }

    return <Button onClick={logoutHandler}>Logout</Button>
}

export default Logout;