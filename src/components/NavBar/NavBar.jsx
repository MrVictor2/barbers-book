import { Link, useNavigate } from "react-router-dom";
import * as userService from "../../utilities/users-service";

export default function NavBar({ user, setUser }) {
  const navigate = useNavigate();

  function handleLogOut() {
    userService.logOut();
    setUser(null);
    // Redirect to the login page
    navigate("/login");
  }

  return (
    <nav>
      <span className="welcome">Welcome, {user.name}</span>
      <Link to="/appointments">My Appointments</Link>
      &nbsp;&nbsp;
      {user.type === "customer" && <Link to="/barbers">Barbers List</Link>}
      &nbsp;&nbsp; &nbsp;&nbsp;
      <Link to="" onClick={handleLogOut}>
        Log Out
      </Link>
    </nav>
  );
}
