import React from 'react'

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
function CreateBlog(props) {
  const { handleSubmitBlog } = props
  

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
            Diary Entry
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmitBlog}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="outlined-basic"
              label="Title"
              name="title"
              autoFocus
            />
            <TextField
              margin="normal"
              fullWidth
              name="body"
              label="Body"
              multiline
              rows={4}
              id="outlined-basic"
            />
            
            <TextField
              margin="normal"
              fullWidth
              name="tags"
              label="Tags"
              id="outlined-basic"
              
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

export default CreateBlog;