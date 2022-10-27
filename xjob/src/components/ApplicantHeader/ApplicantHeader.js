import React from 'react';
import { useLocation } from 'react-router';
import './applicantHeader.css';

function ApplicantHeader(props) {
    const location = useLocation();

    return (
        <div id="applicantHeader">
            <ul className="tabs d-flex flex-row justify-content-around">
                <li className="tab"><a className={location.pathname === `/applicants/${props.jobId}/job-detail` ? "active" : ""} href={`/applicants/${props.jobId}/job-detail`}>VIEW JOB POST</a></li>
                <li className="tab"><a className={location.pathname === `/applicants/${props.jobId}/applicants` ? "active" : ""} href={`/applicants/${props.jobId}/applicants`}>REVIEW PROPOSAL</a></li>
                <li className="tab"><a className={location.pathname === `/applicants/${props.jobId}/hired` ? "active" : ""} href={`/applicants/${props.jobId}/hired`}>HIRE</a></li>
            </ul>
        </div>
    );
}

export default ApplicantHeader;