import { useState, useEffect } from "react";
import { useParams} from "react-router-dom";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../config";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

export default function EditPlant(props) {
  const { plantId } = useParams();
  const [plantDetail, setPlantDetail] = useState(null);
  const { handleEditPlant } = props;

  // This will run just ONCE after the component has mounted
  useEffect(() => {
      const getData = async () => {
       
      // Fetching info for a single todo
      let response = await axios.get(`${API_URL}/plantFamily/${plantId}`, {
        withCredentials: true,
      });
        setPlantDetail(response.data);
        console.log(plantDetail)
    };
    getData();
  }, []);

  if (!plantDetail) {
    return <Spinner animation="grow" variant="dark" />;
  }
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Add a plant
          </Typography>
          <Box
            component="form"
            onSubmit={(event) => {
              handleEditPlant(event, plantDetail._id);
            }}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="outlined-basic"
              label="Nickname"
              name="nickname"
              defaultValue={plantDetail.nickname}
              autoFocus
            />
            <TextField
              margin="normal"
              fullWidth
              name="scientific_name"
              label="Scientific Name"
              defaultValue={plantDetail.scientific_name}
              id="outlined-basic"
            />
            <TextField
              margin="normal"
              fullWidth
              name="price"
              label="Price"
              defaultValue={plantDetail.price}
              id="outlined-basic"
              type="number"
            />
            <TextField
              margin="normal"
              fullWidth
              name="details"
              label="Care Routine/Details"
              defaultValue={plantDetail.details}
              id="outlined-basic"
              multiline
              rows={4}
              c
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Done
            </Button>
            <Grid container>
              <Grid item></Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
