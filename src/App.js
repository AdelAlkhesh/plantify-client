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
import CreateBlog from "./components/CreateBlog";
import PlantDetails from "./components/PlantDetails";
import BlogDetails from "./components/BlogDetails";
import EditBlog from "./components/EditBlog";
import EditPlant from "./components/EditPlant";

export default function App() {
  const {
    user,
    setUser,
    plantFamily,
    setPlantFamily,
    blogs,
    setBlogs,
    error,
    setError,
  } = useContext(UserContext);
  const [fetchingUser, setFetchingUser] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      // we make the user requst here to know if the user is logged in or not
      try {
        let userResponse = await axios.get(`${API_URL}/user`, {
          withCredentials: true,
        });

        setUser(userResponse.data);
        setFetchingUser(false);
      } catch (err) {
        setError(err.response.data.error);
        setFetchingUser(false);
      }
      try {
        const plantResponse = await axios.get(`${API_URL}/plantFamily`, {
          withCredentials: true,
        });
        setPlantFamily(plantResponse.data);

        const blogResponse = await axios.get(`${API_URL}/blogs`, {
          withCredentials: true,
        });
        setBlogs(blogResponse.data);
      } catch (err) {
        setError(err.response.data.error);
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
      navigate("/profile");
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  const handleLogout = async () => {
    await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
    navigate("/signin");
    setUser(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newPlant = {
      nickname: e.target.nickname.value,
      price: e.target.price.value,
      scientific_name: e.target.scientific_name.value,
      details: e.target.details.value,
    };
    let response = await axios.post(`${API_URL}/plantFamily/add`, newPlant, {
      withCredentials: true,
    });
    setPlantFamily([response.data, ...plantFamily]);
    navigate("/profile");
  };

  const handleSubmitBlog = async (e) => {
    e.preventDefault();
    let newBlog = {
      title: e.target.title.value,
      body: e.target.body.value,
      tags: e.target.tags.value,
    };
    let response = await axios.post(`${API_URL}/blogs/add`, newBlog, {
      withCredentials: true,
    });
    setBlogs([response.data, ...blogs]);
    navigate("/profile");
  };

  const handleEditBlog = async (e, id) => {
    e.preventDefault();
    const editedBlog = {
      title: e.target.title.value,
      body: e.target.body.value,
      tags: e.target.tags.value,
    };

    let response = await axios.patch(`${API_URL}/blogs/${id}`, editedBlog, {
      withCredentials: true,
    });

    let updatedBlog = blogs.map((ele) => {
      if (ele._id === id) {
        ele.title = response.data.title;
        ele.body = response.data.body;
        ele.tags = response.data.tags;
      }
      return ele;
    });

    setBlogs(updatedBlog);
    navigate("/profile");
  };

    const handleEditPlant = async (e, id) => {
      e.preventDefault();
      const editedPlant = {
        nickname: e.target.nickname.value,
        scientific_name: e.target.scientific_name.value,
        price: e.target.price.value,
        details: e.target.details.value,
      };

      let response = await axios.patch(`${API_URL}/plantFamily/${id}`, editedPlant, {
        withCredentials: true,
      });

      let updatedPlant = plantFamily.map((ele) => {
        if (ele._id === id) {
          ele.nickname = response.data.nickname;
          ele.scientific_name = response.data.scientific_name;
          ele.price = response.data.price;
          ele.details = response.data.details
        }
        return ele;
      });

      setPlantFamily(updatedPlant);
      navigate("/profile");
    };
  
  
  const handleDeletePlant = async (id) => {
    // make a request to the server to delete it from the database
    await axios.delete(`${API_URL}/plantFamily/${id}`);

    // Update your state 'todos' and remove the todo that was deleted
    let response = await axios.get(`${API_URL}/plantFamily`, {withCredentials:true})
    setPlantFamily(response.data)
    navigate('/profile')
  };

  if (fetchingUser) {
    return <p>Loading...</p>;
  }
   
  const handleDeleteBlog = async (id) => {
    // make a request to the server to delete it from the database
    await axios.delete(`${API_URL}/blogs/${id}`)

    // Update your state 'todos' and remove the todo that was deleted
    let filteredBlogs = blogs.filter((elem) => {
      return elem._id !== id
    })
  }

  if (fetchingUser) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <MyNav handleLogout={handleLogout} />
      <Routes>
        <Route
          path="/signin"
          element={<SignIn handleSignin={handleSignin} error={error} />}
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/addplant"
          element={<AddPlant handleSubmit={handleSubmit} />}
        />
        <Route
          path="/createblog"
          element={<CreateBlog handleSubmitBlog={handleSubmitBlog} />}
        />
        <Route
          path="/profile/plantfamily/:plantId"
          element={<PlantDetails handleDeletePlant={handleDeletePlant} />}
        />
        <Route
          path="/profile/blogs/:blogId"
          element={<BlogDetails handleDeleteBlog={handleDeleteBlog} />}
        />

        <Route
          path="/blog/:blogId/edit"
          element={<EditBlog handleEditBlog={handleEditBlog} />}
        />

        <Route
          path="/plant/:plantId/edit"
          element={<EditPlant handleEditPlant={handleEditPlant} />}
        />
      </Routes>
    </div>
  );
}
