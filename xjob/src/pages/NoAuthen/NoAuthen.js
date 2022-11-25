import React from 'react';
import "./noAuthen.css";
import NoAuthenIcon from "../../images/no_authen.svg";

function NoAuthen() {
    return (
        <div id="noAuthenPage">
            <img className="noAuthenIcon" src={NoAuthenIcon} alt="" />
            <div className="text1">Hiện tại bạn không có quyền truy cập vào trang này</div>
            <div className="text2">Nếu có một tài khoản khác, hãy đổi tài khoản để tiếp tục.<br/>
                Hoặc bạn có thể trở về trang chủ của chúng tôi.</div>
        </div>
    );
}

export default NoAuthen;