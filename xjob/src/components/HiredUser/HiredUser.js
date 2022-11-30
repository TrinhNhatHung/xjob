import { Avatar, Chip } from '@material-ui/core';
import React from 'react';
import {htmlToInlineText} from "../../util/HtmlTagUtil";
import { useNavigate } from 'react-router';

function HiredUser(props) {
    const avatarStr = props.proposal.firstName.charAt(0) + props.proposal.lastName.charAt(0);
    var letter = "";
    if (props.proposal.letter !== null && props.proposal.letter !== undefined){
        letter = htmlToInlineText(props.proposal.letter);
    }

    const navigate = useNavigate();
    const redirectToApplicantProfile = (event,uid)=> {
        event.preventDefault();
        navigate(`/applicant-profile/${uid}`);
    }
    return (
        <div id="proposal" className="d-flex flex-row">
            <Avatar className="proposalAvatar">{avatarStr}</Avatar>
            <div className="proposalInfo">
                <div className="d-flex flex-row justify-content-between">
                    <span className="proposalName">
                        <a 
                            href={`/applicant-profile/${props.proposal.uid}`} 
                            onClick={(event)=> redirectToApplicantProfile(event,props.proposal.uid)}
                        >
                            {props.proposal.firstName + " " + props.proposal.lastName}
                        </a>
                    </span>
                    <div className="btnGroup">
                        <button className="button btnMessage">Nhắn tin</button>
                    </div>
                </div>
                <div className="skills">
                    {
                        props.proposal.skills.map((skill,index)=> {
                            return <Chip key={index} className="skill" label={skill.skillName} component="a" href="#chip" clickable />
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default HiredUser;