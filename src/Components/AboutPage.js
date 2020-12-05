import React from 'react';
import MailIcon from '../assets/mail_icon.png'
import GithubIcon from '../assets/github_icon.png'
import LinkedInIcon from '../assets/linkedin_logo.png'

export default function AboutPage(props) {
    return (
        <div style={{ 'font-size': '20px' }}>
            <h1>Movie DB</h1>
            <p>
                <strong style={{ 'font-size': '24px' }}>About the project</strong><br />
                The Movie DB is a non-profit project created by an individual developer solely for educational
                purposes.
                This website/project is in no way affiliated with any organisation whatsoever.The entire purpose of
                building this project
                is for the developer to practice and showcase his skills.<br />
                The entire project code is open source.
                You can view it here - <br />
                <a href={"https://github.com/tarunluthra123/MovieDB-React"} target={"_blank"}
                    className={"btn btn-info"}>
                    Project repository
                </a>
            </p>
            <br />
            <p>
                <strong style={{ 'font-size': '24px' }}>Info</strong><br />
                All information about movies displayed on the website is fetched from TMDB API (<a
                    href="https://www.themoviedb.org/" target={"_blank"}>https://www.themoviedb.org/</a>). For any
                disrepancies, directly contact TMDB staff.
                The developer for this project is in no way responsible for any inconsistencies or disrepancies
                regarding the movie data.<br />
                <a href="https://www.themoviedb.org/" target={"_blank"}>
                    <img
                        src={"https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_1-8ba2ac31f354005783fab473602c34c3f4fd207150182061e425d366e4f34596.svg"}
                        alt={"TMDb Logo"} className="movieDbOrgLogo" width={500} />
                </a>
            </p>
            <br />
            <p>
                <strong style={{ 'font-size': '24px' }}>Contact the Developer</strong><br />
                Feel free to drop any suggestions or queries.<br />
                <img src={MailIcon} alt={"Mail"} width={30} />
                <a href={"mailto:tarunluthra987@gmail.com"} target={"_blank"}>
                    tarunluthra987 @gmail.com
                </a>
                <br />

                <img src={GithubIcon} alt={"Github"} width={30} />
                <a href={"https://github.com/tarunluthra123"} target={"_blank"}>
                                    tarunluthra123
                </a>
                <br />

                <img src={LinkedInIcon} alt={"LinkedIn"} width={28} />
                <a href={"https://www.linkedin.com/in/tarunluthra123/"} target={"_blank"}>
                    tarunluthra123
                </a>

            </p>
        </div>
    );
}
