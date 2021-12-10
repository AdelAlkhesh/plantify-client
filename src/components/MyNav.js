import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/app.context";

function MyNav(props) {
  const { user } = useContext(UserContext);
  return (
    <Navbar bg="light" expand="lg">
      {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {user ? (
            <>
              <button onClick={props.handleLogout}>Logout</button>
              <Link style={{ marginLeft: "10px" }} to="/profile">
                Profile
              </Link>
            </>
          ) : (
            <>
              <Link style={{ marginLeft: "10px" }} to="/signin">
                SignIn
              </Link>
              <Link style={{ marginLeft: "10px" }} to="/signup">
                SignUp
              </Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
export default MyNav;
