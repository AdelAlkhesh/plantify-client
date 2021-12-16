import React from "react";
import { Link} from "react-router-dom";
import Button from "@mui/material/Button";


export default function PlantList(props) {
  const { userPlants } = props;

  return (
    <div>
      <div className="mainContainer">
        {userPlants.map((ele) => {
          return (
            <div className="container1">
              <div className="innerContainer">
                <Link className='plantName' to={`plantFamily/${ele._id}`}>{ele.nickname}</Link>
                <p>{ele.scientific_name}</p>
              </div>
            </div>
          );
        })}
        <Button
          className="addbutton"
          variant="contained"
          
          sx={{ mt: 3, mb: 2 }}
        >
          <Link className='addlink' to="/addplant"> Add a Plant </Link>
        </Button>
      </div>
    </div>
  );
}
