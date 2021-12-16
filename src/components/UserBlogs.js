import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

export default function PlantList(props) {
  const { userBlogs } = props;

  return (
    <div>
      <div className="mainContainer">
        {userBlogs.map((ele) => {
          return (
            <div className="container1">
              <div className="innerContainer">
                <Link className="plantName" to={`blogs/${ele._id}`}>
                  {ele.title}
                </Link>
                <p>#{ele.tags}</p>
              </div>
            </div>
          );
        })}
        <Button  variant="contained" sx={{ mt: 3, mb: 2 }}>
          <Link className='addlink' to="/createblog"> Create an entry</Link>
        </Button>
      </div>
    </div>
  );
}
