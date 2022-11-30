import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axiosRequiredAuthor from '../../api/axiosRequiredAuthor';
import ApplicantHeader from '../../components/ApplicantHeader/ApplicantHeader';
import HiredUser from '../../components/HiredUser/HiredUser';
import "./hired.css";

function Hired() {
    const {jobId} = useParams();
    const [users, setUsers] = useState([]);
    useEffect(()=> {
        axiosRequiredAuthor.get(`/job/hirings?jobId=${jobId}`)
        .then((response)=> {
            setUsers(response.users);
        })
        .catch(()=> {})
    },[jobId]);
    return (
        <div id="applicantsPage">
            <ApplicantHeader jobId={jobId}/>
            <div className="proposals">
                {
                    users.map((user, index)=>{
                        return <HiredUser key={index} proposal={user}/>
                    })
                }
            </div>
        </div>
    );
}

export default Hired;