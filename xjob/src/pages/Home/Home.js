import React from 'react';
import './home.css';

function Home() {
    return (
        <div>
            <div id="banner" className="row d-flex">
                <div className="col bannerText d-flex flex-column">
                    <span className="bannerSlogan">Hire freelance Dev and IT experts to help you scale</span>
                    <span className="bannerSloganDetail">Hire independent professionals to shorten development cycles, bury backlogs, and drive product growth.</span>
                    <div className="buttonGroup">
                        <button className="findTalent btn">Find Talent</button>
                        <button className="findWork btn">Find Work</button>
                    </div>
                </div>
                <div className=" col bannerImage"/>
            </div>
        </div>
    );
}

export default Home;