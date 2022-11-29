import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axiosRequiredAuthor from "../../api/axiosRequiredAuthor";
import Post from "../../components/Post/Post";
import "./findWork.css";
import FileIcon from '../../images/file_icon.svg';
import SearchIcon from '@mui/icons-material/Search';
import {BusinessConst} from '../../constant/BusinessConst';

function FindWork() {
  const [posts, setPosts] = useState([]);
  const [pageOfRecentJob, setPageOfRecentJob] = useState(1);
  const [pageOfBestMatch, setPageOfBestMatch] = useState(1);
  const [kind, setKind] = useState("MATCH");
  const navigate = useNavigate();
  useEffect(() => {
    if (kind === "RECENT"){
      axiosRequiredAuthor
      .get(`/job/jobs?limit=10&page=${pageOfRecentJob}`)
      .then((response) => {
        setPosts(response.data.jobs);
      })
      .catch((error) => {
        if (error.response.status === 403) {
          navigate("/login");
        }
      });
    } else if (kind === "MATCH") {
      axiosRequiredAuthor
      .get(`/job/best-matchs?limit=10&page=${pageOfBestMatch}`)
      .then((response) => {
        setPosts(response.data.jobs);
      })
      .catch((error) => {
        if (error.response.status === 403) {
          navigate("/login");
        }
      });
    }
  }, [navigate,kind, pageOfBestMatch,pageOfRecentJob]);

  const changeKindToMatch = ()=> {
      setKind("MATCH");
  }

  const changeKindToRecent = ()=> {
    setKind("RECENT");
  } 

  const [searchInput, setSearchInput] = useState(null);
  const onChangeSearchInput  = (event)=> {
    let value = event.target.value;
    setSearchInput(value);
  }
  const searchJob = ()=> {
    if (searchInput !== null && searchInput !== undefined && searchInput !== ""){
      navigate(`/jobs/search?search=${searchInput}`);
    }
  }

  const handleLoadMore = () => {
    if (kind === "MATCH"){
      setPageOfBestMatch(pageOfBestMatch + 1);
    } else {
      setPageOfRecentJob(pageOfRecentJob + 1);
    }
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
          <div className="jobsTitle">Tìm công việc phù hợp với bạn</div>
          <div className="jobTabs">
            <span onClick={changeKindToMatch} className={"jobTab" + (kind === "MATCH" ? " active" : "")}>Phù hợp nhất</span>
            <span onClick={changeKindToRecent} className={"jobTab" + (kind === "RECENT" ? " active" : "")}>Đăng gần đây</span>
          </div>
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
          <div className="jobsTitle noPost">Tìm công việc phù hợp với bạn</div>
          <div className="jobTabs">
            <span onClick={changeKindToMatch} className={"jobTab" + (kind === "MATCH" ? " active" : "")}>Phù hợp nhất</span>
            <span onClick={changeKindToRecent} className={"jobTab" + (kind === "RECENT" ? " active" : "")}>Đăng gần đây</span>
          </div>
          <img className="emptyFileIcon" src={FileIcon} alt="" />
          <span className="text1">Không có công việc nào</span>
        </div>
      );
    }
  };
    return (
        <div id="findWorkPage">
          <div className="searchArea d-flex">
            <input 
              type="text" className="search" name="search" placeholder="Tìm kiếm công việc"
              value={searchInput}
              onChange={onChangeSearchInput}
            />
            <span className="searchIcon" onClick={searchJob}>
              <SearchIcon/>
            </span>
          </div>
          {/* <div className="title">To do</div> */}
          {renderYourPosts()}
        </div>
    );
}

export default FindWork;