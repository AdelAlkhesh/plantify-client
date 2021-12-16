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
export default function EditBlog(props) {
  const { blogId } = useParams();
  const [blogDetail, setblogDetail] = useState(null);
  const { handleEditBlog } = props;

  // This will run just ONCE after the component has mounted
  useEffect(() => {
    const getData = async () => {
      // Fetching info for a single todo
      let response = await axios.get(`${API_URL}/blogs/${blogId}`, {
        withCredentials: true,
      });
      setblogDetail(response.data);
      console.log(blogDetail)
    };
    getData();
  }, []);

  if (!blogDetail) {
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
            Edit
          </Typography>
          <Box
            component="form"
            onSubmit={(event) => {
              handleEditBlog(event, blogDetail._id);
            }}
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
              defaultValue={blogDetail.title}
              autoFocus
            />
            <TextField
              margin="normal"
              fullWidth
              name="body"
              label="Body"
              defaultValue={blogDetail.body}
              multiline
              rows={4}
              id="outlined-basic"
            />

            <TextField
              margin="normal"
              fullWidth
              name="tags"
              label="Tags"
              defaultValue={blogDetail.tags}
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
