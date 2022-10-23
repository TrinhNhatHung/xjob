import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axiosRequiredAuthor from "../../api/axiosRequiredAuthor";
import Post from "../../components/Post/Post";
import "./clientDashboard.css";
import FileIcon from '../../images/file_icon.svg';
import {BusinessConst} from '../../constant/BusinessConst';

function ClientDashboard() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  useEffect(() => {
    axiosRequiredAuthor
      .get(`/job/job-by-author?limit=2&page=${page}`)
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

  const calInfoOfPost = (post)=> {
    let result = "";
    let hourPerWeek = post.hourPerWeek;
    let paymentKind = post.paymentKind;
    let termClass = post.termClass;
    let termFrom = post.termFrom;
    let termTo = post.termTo;
    let price = post.price;
    if (paymentKind === BusinessConst.PAYMENT_KIND_FIXED_PRICE){
      result += "Fixed-price";
      result += ` - Est. Budget:$${price}`;
    } else {
      result += `Hourly:${price}`;
      let duration = "days";
      if (termClass === BusinessConst.TERM_CLASS_YEAR){
        duration = "years";
      } else if (termClass === BusinessConst.TERM_CLASS_MONTH){
        duration = "months";
      } else if (termClass === BusinessConst.TERM_CLASS_WEEK){
        duration = "weeks";
      }
      result += ` - Est. Time:${termFrom} to ${termTo} ${duration}, Less than ${hourPerWeek} hrs/week`;
    }
    return result;
  }

  const renderYourPosts = () => {
    if (posts.length > 0) {
      return (
        <div className="yourPosts">
          <div className="yourPostsTitle">Your Postings</div>
          {posts.map((post,index) => {
            return (
              <Post key={index}
                title={post.title}
                info={
                  calInfoOfPost(post)
                }
                jd={post.detail}
                skills={post.skills}
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
