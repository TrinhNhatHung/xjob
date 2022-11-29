import React, { useEffect, useState } from "react";
import "./jobSearch.css";
import { useNavigate } from "react-router";
import axiosRequiredAuthor from "../../api/axiosRequiredAuthor";
import Post from "../../components/Post/Post";
import FileIcon from "../../images/file_icon.svg";
import SearchIcon from "@mui/icons-material/Search";
import { BusinessConst } from "../../constant/BusinessConst";

function JobSearch() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    var queryString = window.location.search;
    var searchValue = "";
    console.log(queryString);
    if (queryString !== "") {
      queryString = queryString.substring(1);
      let arr = queryString.split("&");
      arr.forEach((item) => {
        let itemArr = item.split("=");
        if (itemArr[0] === "search") {
          searchValue = itemArr[1];
        }
      });
    }
    setSearchInput(searchValue);
    axiosRequiredAuthor
      .get(`/job/search?search=${searchValue}&page=${page}&limit=10`)
      .then((response) => {
        setPosts(response.data.jobs);
      })
      .catch((error) => {
        if (error.response.status === 403) {
          navigate("/login");
        }
      });
  }, [navigate, page]);

  const [searchInput, setSearchInput] = useState(null);
  const onChangeSearchInput = (event) => {
    let value = event.target.value;
    setSearchInput(value);
  };
  const searchJob = () => {
    window.location.href = `/jobs/search?search=${searchInput}`;
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const calInfoOfPost = (post) => {
    let result = "";
    let hourPerWeek = post.hourPerWeek;
    let paymentKind = post.paymentKind;
    let termClass = post.termClass;
    let termFrom = post.termFrom;
    let termTo = post.termTo;
    let price = post.price;
    if (paymentKind === BusinessConst.PAYMENT_KIND_FIXED_PRICE) {
      result += "Giá cố định";
      result += ` - Est. Ngân sách:${price} VND`;
    } else {
      result += `Giá theo giờ:${price} VND`;
      let duration = "ngày";
      if (termClass === BusinessConst.TERM_CLASS_YEAR) {
        duration = "năm";
      } else if (termClass === BusinessConst.TERM_CLASS_MONTH) {
        duration = "tháng";
      } else if (termClass === BusinessConst.TERM_CLASS_WEEK) {
        duration = "tuần";
      }
      result += ` - Est. Thời gian:${termFrom} tới ${termTo} ${duration}, Khoảng ${hourPerWeek} giờ/tuần`;
    }
    return result;
  };

  const renderYourPosts = () => {
    if (posts.length > 0) {
      return (
        <div className="jobs">
          <div className="jobsTitle">Tìm công việc phù hợp với bạn</div>
          {posts.map((post, index) => {
            return (
              <Post
                key={index}
                title={post.title}
                info={calInfoOfPost(post)}
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
          <img className="emptyFileIcon" src={FileIcon} alt="" />
          <span className="text1">Không có công việc nào</span>
        </div>
      );
    }
  };
  return (
    <div id="jobSearchPage">
      <div className="searchArea d-flex">
        <input
          type="text"
          className="search"
          name="search"
          placeholder="Tìm kiếm công việc"
          value={searchInput}
          onChange={onChangeSearchInput}
        />
        <span className="searchIcon" onClick={searchJob}>
          <SearchIcon />
        </span>
      </div>
      {renderYourPosts()}
    </div>
  );
}

export default JobSearch;
