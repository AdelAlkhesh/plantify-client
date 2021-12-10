import { useEffect, useState, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MyNav from "./components/MyNav";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import axios from "axios";
import { UserContext } from "./context/app.context";
import { API_URL } from "./config";
import Profile from "./components/Profile";
import AddPlant from "./components/AddPlant";

export default function App() {
  const { user, setUser } = useContext(UserContext);
  let [error, setError] = useState(null);
  const [plantFamily, setPlantFamily] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      // we make the user requst here to know if the user is logged in or not
      try {
        let userResponse = await axios.get(`${API_URL}/user`, {
          withCredentials: true,
        });
        setUser(userResponse.data);

        const plantResponse = await axios.get(`${API_URL}/plantFamily`, {
          withCredentials: true,
        });
        setPlantFamily(plantResponse.data);
      } catch (err) {
        // the request will fail if the user is not logged in
      }
      // -----------------------------------------------
    };

    getData();
  }, []);



  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      let newUser = {
        email: e.target.email.value,
        password: e.target.password.value,
      };

      let response = await axios.post(`${API_URL}/signin`, newUser, {
        withCredentials: true,
      });
      setUser(response.data);
      console.log(user);
      navigate("/");
    } catch (err) {
      console.log(err.response.data.error);
      setError(err.response.data.error);
    }
  };

  const handleLogout = async () => {
    await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
    setUser(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newPlant = {
      nickname: e.target.nickname.value,
      price: e.target.price.value,
    };
    let response = await axios.post(`${API_URL}/plantFamily/add`, newPlant, {
      withCredentials: true,
    });
  };

  return (
    <div>
      <MyNav handleLogout={handleLogout} />
      <Routes>
        <Route
          path="/signin"
          element={<SignIn handleSignin={handleSignin} error={error} />}
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile plantFamily={plantFamily} />} />
        <Route
          path="/addplant"
          element={<AddPlant handleSubmit={handleSubmit} />}
        />
      </Routes>
    </div>
  );
}
