import { useContext } from "react";
import { UserContext } from "../context/app.context";
import { useParams } from "react-router-dom";

import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

export default function PlantDetails(props) {
  const { handleDeletePlant } = props;
  const { user, plantFamily } = useContext(UserContext);
  const plantId = useParams();

  const selectedPlant = plantFamily.filter((ele) => {
    return ele._id === plantId.plantId;
  });

  return (
    <div className="detailsPage">
      <div className="detailsCard">
        <h1>{selectedPlant[0].nickname}</h1>
        <h3>{selectedPlant[0].scientific_name}</h3>
        <p>{selectedPlant[0].price} euros</p>
        <p>{selectedPlant[0].details}</p>
        <div className="detailsButtons">
          <Button variant="contained" sx={{ mt: 3, mb: 2 }}>
            <Link className='addlink' to={`/plant/${selectedPlant[0]._id}/edit`}> Edit</Link>
          </Button>
          <Button
            onClick={() => {
              handleDeletePlant(selectedPlant[0]._id);
            }}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
