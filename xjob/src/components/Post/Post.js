import React from "react";
import "./post.css";
import Chip from "@material-ui/core/Chip";
import { useDispatch } from "react-redux";
import {openDrawer} from "../../reducer/detailJobDrawer";
import DrawerDetailJob from "../DrawerDetailJob/DrawerDetailJob";

function Post(props) {
  const dispatch = useDispatch();
  const toggleJobDetail = ()=> {
    dispatch(openDrawer({
      post: props.post
    }));
  }

  return (
    <div id="post" className="d-flex flex-column align-items-start" onClick={toggleJobDetail}>
      <span className="postTitle">{props.title}</span>
      <div className="info">{props.info}</div>
      <div className="jd" dangerouslySetInnerHTML={{__html:props.detail}}></div>
      <div className="skills">
        {
            props.skills.map((skill,index)=> {
                return <Chip key={index} className="skill" label={skill} component="a" href="#chip" clickable />
            })
        }
      </div>
      <DrawerDetailJob/>
    </div>
  );
}

export default Post;
