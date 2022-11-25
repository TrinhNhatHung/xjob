import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axiosRequiredAuthor from "../../api/axiosRequiredAuthor";
import Post from "../../components/Post/Post";
import "./findWork.css";
import FileIcon from '../../images/file_icon.svg';
import {BusinessConst} from '../../constant/BusinessConst';

function FindWork() {
    const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  useEffect(() => {
    axiosRequiredAuthor
      .get(`/job/jobs?limit=10&page=${page}`)
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

  const calInfoOfPost = (post)=> {
    let result = "";
    let hourPerWeek = post.hourPerWeek;
    let paymentKind = post.paymentKind;
    let termClass = post.termClass;
    let termFrom = post.termFrom;
    let termTo = post.termTo;
    let price = post.price;
    if (paymentKind === BusinessConst.PAYMENT_KIND_FIXED_PRICE){
      result += "Giá cố định";
      result += ` - Est. Ngân sách:${price} VND`;
    } else {
      result += `Giá theo giờ:${price} VND`;
      let duration = "ngày";
      if (termClass === BusinessConst.TERM_CLASS_YEAR){
        duration = "năm";
      } else if (termClass === BusinessConst.TERM_CLASS_MONTH){
        duration = "tháng";
      } else if (termClass === BusinessConst.TERM_CLASS_WEEK){
        duration = "tuần";
      }
      result += ` - Est. Thời gian:${termFrom} tới ${termTo} ${duration}, Khoảng ${hourPerWeek} giờ/tuần`;
    }
    return result;
  }

  const renderYourPosts = () => {
    if (posts.length > 0) {
      return (
        <div className="jobs">
          <div className="jobsTitle">Công việc phù hợp với bạn</div>
          {posts.map((post,index) => {
            return (
              <Post key={index}
                title={post.title}
                info={
                  calInfoOfPost(post)
                }
                detail={post.detail}
                skills={post.skills}
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
        <div className="jobs d-flex flex-column">
          <div className="jobsTitle noPost">Công việc phù hợp với bạn</div>
          <img className="emptyFileIcon" src={FileIcon} alt="" />
          <span className="text1">Không có công việc nào</span>
        </div>
      );
    }
  };
    return (
        <div id="findWorkPage">
            {/* <div className="title">To do</div> */}
            {renderYourPosts()}
        </div>
    );
}

export default FindWork;