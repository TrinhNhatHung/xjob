import React from 'react';
import "./noAuthen.css";
import NoAuthenIcon from "../../images/no_authen.svg";

function NoAuthen() {
    return (
        <div id="noAuthenPage">
            <img className="noAuthenIcon" src={NoAuthenIcon} alt="" />
            <div className="text1">You don't currently have access to this page</div>
            <div className="text2">If you have another account, switch to it and try again.<br/>
                Or you can visit our home page.</div>
        </div>
    );
}

export default NoAuthen;