import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/app.context";
import { Link, Navigate } from "react-router-dom";
import PlantList from "./PlantList";
import BlogList from "./BlogList";



export default function Profile(props) {
  const { plantFamily } = props;
    const { user } = useContext(UserContext);
    const [showPlants, setShowplants] = useState(false)

  useEffect(() => {}, [user, plantFamily]);

  const userPlants = plantFamily.filter((ele) => {
    return ele.author === user._id;
  });
    
    const handleBlogs = () => {
        setShowplants(false)
    }
    
    const handlePlants = () => {
        setShowplants(true)
    }
    


  if (!user) {
    return <Navigate to="/signin" />;
  }

  return (
    <div>
      <div className='tabs'>
              <button onClick={handlePlants}>Plants</button>
              <button onClick={handleBlogs}>Blogs</button>
              {
                  showPlants ?
                      <PlantList userPlants={userPlants} />
                      :
                      <BlogList />
              }
      </div>
    </div>
  );
}
