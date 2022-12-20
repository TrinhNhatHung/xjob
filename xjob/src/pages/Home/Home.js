import React from 'react';
import { useNavigate } from 'react-router';
import './home.css';

function Home() {
    const navigate = useNavigate();
    const  redirectToClient = ()=> {
        navigate("/client/dashboard");
    }

    const redirectToFreelancer = ()=> {
        navigate("/find-work");
    }

    return (
        <div>
            <div id="banner" className="row d-flex">
                <div className="col bannerText d-flex flex-column">
                    <span className="bannerSlogan">Tìm kiếm những lập trình viên tự do tài năng</span>
                    <span className="bannerSloganDetail">Thuê các chuyên gia tự do để rút ngắn quá trình phát triển, giải quyết các công việc tồn đọng và thúc đẩy sản phẩm phát triển.</span>
                    <div className="buttonGroup">
                        <button className="findTalent btn" onClick={redirectToClient}>Tìm ứng viên</button>
                        <button className="findWork btn" onClick={redirectToFreelancer}>Tìm công việc</button>
                    </div>
                </div>
                <div className=" col bannerImage"/>
            </div>
        </div>
    );
}

export default Home;