
import { useContext } from "react";
import { UserContext } from "../context/app.context";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

function AddPlant(props) {
  const { handleSubmit } = props;
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
            onSubmit={handleSubmit}
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
              autoFocus
            />
            <TextField
              margin="normal"
              fullWidth
              name="scientific_name"
              label="Scientific Name"
              id="outlined-basic"
            />
            <TextField
              margin="normal"
              fullWidth
              name="price"
              label="Price"
              id="outlined-basic"
              type="number"
            />
            <TextField
              margin="normal"
              fullWidth
              name="details"
              label="Care Routine/Details"
              id="outlined-basic"
              multiline
              rows={4}c
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

export default AddPlant;
