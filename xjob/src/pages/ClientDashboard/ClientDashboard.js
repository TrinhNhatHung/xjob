import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axiosRequiredAuthor from "../../api/axiosRequiredAuthor";
import "./clientDashboard.css";
import FileIcon from '../../images/file_icon.svg';
import YourPost from "../../components/YourPost/YourPost";

function ClientDashboard() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  useEffect(() => {
    axiosRequiredAuthor
      .get(`/job/job-by-author?limit=10&page=${page}`)
      .then((response) => {
        let newPost = [];
        newPost = newPost.concat(posts);
        newPost = newPost.concat(response.data.jobs);
        setPosts(newPost);
      })
      .catch((error) => {
        if (error.response.status === 403) {
          navigate("/login");
        }
      });
  }, [navigate, page]);

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const postJob = ()=> {

  }

  const renderYourPosts = () => {
    if (posts.length > 0) {
      return (
        <div className="yourPosts">
          <div className="yourPostsTitle">Your Postings</div>
          {posts.map((post,index) => {
            return (
              <YourPost key={index}
                post={post}
              />
            );
          })}
          <button onClick={handleLoadMore} className="loadMoreBtn">
            Load More Jobs
          </button>
        </div>
      );
    } else {
      return (
        <div className="yourPosts d-flex flex-column">
          <div className="yourPostsTitle noPost">Your Postings</div>
          <img className="emptyFileIcon" src={FileIcon} alt="" />
          <span className="text1">No active job posts</span>
          <span className="text2">Post a job to the marketplace and let talent come to you.</span>
          <button className="btn postJobBtn" onClick={postJob}>Post a Job</button>
        </div>
      );
    }
  };
  return (
    <div id="clientDashboardPage">
      <div className="title">Your Dashboard</div>
      {renderYourPosts()}
    </div>
  );
}

export default ClientDashboard;
