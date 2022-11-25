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
    navigate("/job-post");
  }

  const renderYourPosts = () => {
    if (posts.length > 0) {
      return (
        <div className="yourPosts">
          <div className="yourPostsTitle">Bài đăng của bạn</div>
          {posts.map((post,index) => {
            return (
              <YourPost key={index}
                post={post}
              />
            );
          })}
          <button onClick={handleLoadMore} className="loadMoreBtn">
            Xem thêm
          </button>
        </div>
      );
    } else {
      return (
        <div className="yourPosts d-flex flex-column">
          <div className="yourPostsTitle noPost">Bài đăng của bạn</div>
          <img className="emptyFileIcon" src={FileIcon} alt="" />
          <span className="text1">Không có công việc nào</span>
          <span className="text2">Hãy đăng một công việc và tìm kiếm một ứng viên cho bạn.</span>
          <button className="btn postJobBtn" onClick={postJob}>Đăng công việc</button>
        </div>
      );
    }
  };
  return (
    <div id="clientDashboardPage">
      <div className="title d-flex flex-row justify-content-between">
        <span>Dashboard của bạn</span>
        <button className="btn postJobBtn" onClick={postJob}>Đăng công việc</button>
      </div>
      {renderYourPosts()}
    </div>
  );
}

export default ClientDashboard;
