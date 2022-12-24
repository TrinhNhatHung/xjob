import { Chip } from '@mui/material';
import React from 'react';
import "./myJobElement.css";
import {htmlToInlineText} from "../../util/HtmlTagUtil";

function MyJobElement(props) {

  const renderStatus = ()=> {
    if (props.job.status === "OPEN"){
      return <span className="jobStatus open">{props.job.status}</span>
    } else if (props.job.status === "COMPLETE"){
      return <span className="jobStatus complete">{props.job.status}</span>
    } else {
      return <span className="jobStatus close">{props.job.status}</span>
    }
  }

  return (
    <div id="myJob" className="d-flex flex-column align-items-start">
      <span className="postTitle">{props.job.title}</span>
      <div className="info">{props.info}</div>
      <div className="jd">
        {htmlToInlineText(props.job.detail)}
      </div>
      <div className="skills">
        {
            props.job.skills.map((skill,index)=> {
                return <Chip key={index} className="skill" label={skill} component="a" href="#chip" clickable />
            })
        }
      </div>
      {
        renderStatus()
      }
    </div>
  );
}

export default MyJobElement;