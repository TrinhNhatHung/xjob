import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import axiosRequiredAuthor from '../../api/axiosRequiredAuthor';
import NotifyToast from "../../components/NotifyToast/NotifyToast";
import queryString from 'query-string';


function VerifySuccess() {
    const [notify, setNotify] = useState({
        display: false,
        kind: null,
        message: null
    });

    const location = useLocation();
    let queryParam = queryString.parse(location.search);

    useEffect(()=> {
        axiosRequiredAuthor.post("/user/verify-email", null, {
            params:{
                verifyCode: queryParam.verifyCode
            }
        }).then((response)=> {
            if (response.data.isVerified){
                setNotify({
                    display:true,
                    kind: "success",
                    message: "Verify email successfully"
                })
                
            }
        }).catch(()=> {})
    },[queryParam.verifyCode]);

    return (
        <div id="verifySuccessPage">
            {
                notify.display ? <NotifyToast kind={notify.kind} message={notify.message} setNotify={setNotify} /> : <React.Fragment/>
            }
        </div>
    );
}

export default VerifySuccess;