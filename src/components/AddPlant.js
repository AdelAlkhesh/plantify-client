import { Button } from "react-bootstrap";
import { useContext } from "react";
import { UserContext } from "../context/app.context";

function AddPlant(props) {
  


  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      
      <input name="nickname" type="text" placeholder="Enter name" />
      <input name="price" type="number" placeholder="Enter desc" />
      <input type="file" name="myImage" accept="image/png, image/jpg" />

      <Button type="submit">Submit</Button>
    </form>
  );
}

export default AddPlant;
