import React from 'react';
import { useLocation } from 'react-router';
import './applicantHeader.css';

function ApplicantHeader(props) {
    const location = useLocation();

    return (
        <div id="applicantHeader">
            <ul className="tabs d-flex flex-row justify-content-around">
                <li className="tab"><a className={location.pathname === `/applicants/${props.jobId}/job-detail` ? "active" : ""} href={`/applicants/${props.jobId}/job-detail`}>Xem bài đăng công việc</a></li>
                <li className="tab"><a className={location.pathname === `/applicants/${props.jobId}/applicants` ? "active" : ""} href={`/applicants/${props.jobId}/applicants`}>Xem yêu cầu ứng tuyển</a></li>
                <li className="tab"><a className={location.pathname === `/applicants/${props.jobId}/hired` ? "active" : ""} href={`/applicants/${props.jobId}/hired`}>Thuê</a></li>
            </ul>
        </div>
    );
}

export default ApplicantHeader;