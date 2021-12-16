import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/app.context";
import { Navigate } from "react-router-dom";
import PlantList from "./PlantList";
import UserBlogs from "./UserBlogs";
import axios from 'axios'


export default function Profile() {
  const { user, plantFamily, blogs } = useContext(UserContext);
  const [showPlants, setShowplants] = useState(false);









  useEffect(() => {
    const userPlants = plantFamily.filter((ele) => {
      return ele.author === user._id;
    });

    const userBlogs = blogs.filter((ele) => {
      return ele.author === user._id;
    });
  }, [user, plantFamily, blogs]);



  const userPlants = plantFamily.filter((ele) => {
    return ele.author === user._id;
  });

  const userBlogs = blogs.filter((ele) => {
    return ele.author === user._id;
  });

  const handleBlogs = () => {
    setShowplants(false);
  };

  const handlePlants = () => {
    setShowplants(true);
  };
 
  if (!user) {
    return <Navigate to="/signin" />;
  }

  return (
    <div>
      <div className="tabs">
      
        <div className="profilecontent">
          <div className="buttons">
            <button className="contentButton" onClick={handlePlants}>
              Plants
            </button>
            <button className="contentButton" onClick={handleBlogs}>
              Diary
            </button>
          </div>
          <div className="cards">
            {showPlants ? (
              <PlantList userPlants={userPlants} />
            ) : (
              <UserBlogs userBlogs={userBlogs} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
