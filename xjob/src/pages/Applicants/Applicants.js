import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ApplicantHeader from '../../components/ApplicantHeader/ApplicantHeader';
import Proposal from '../../components/Proposal/Proposal';
import axiosRequireAuthor from "../../api/axiosRequiredAuthor";
import './applicants.css';

function Applicants() {
    const {jobId} = useParams();
    const [proposals, setProposal] = useState([]);
    useEffect(()=> {
        axiosRequireAuthor.get(`/proposal/applicants?jobId=${jobId}`)
        .then((response)=> {
            setProposal(response.proposals);
        })
        .catch(()=> {})
    },[jobId]);
    return (
        <div id="applicantsPage">
            <ApplicantHeader jobId={jobId}/>
            <div className="proposals">
                {
                    proposals.map((proposal, index)=>{
                        return <Proposal key={index} proposal={proposal}/>
                    })
                }
            </div>
        </div>
    );
}

export default Applicants;