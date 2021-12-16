import { useContext } from "react";
import { UserContext } from "../context/app.context";
import { Link, useParams } from "react-router-dom";
import Button from "@mui/material/Button";

export default function BlogDetails(props) {
  const { handleDeleteBlog } = props;
  const { blogs } = useContext(UserContext);
  const blogId = useParams();

  const selectedBlog = blogs.filter((ele) => {
    return ele._id === blogId.blogId;
  });

  return (
    <div className="detailsPage">
      <div className="detailsCard">
        <h1>{selectedBlog[0].title}</h1>
        <p>{selectedBlog[0].body} euros</p>
        <p>{selectedBlog[0].tags}</p>
        <div className="detailsButtons">
          <Button variant="contained" sx={{ mt: 3, mb: 2 }}>
            <Link className='addlink' to={`/blog/${selectedBlog[0]._id}/edit`}> Edit</Link>
          </Button>
          <Button
            onClick={() => {
              handleDeleteBlog(selectedBlog[0]._id);
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
