import "./Footer.scss";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-social-icons">
          <FacebookIcon />
          <InstagramIcon />
          <TwitterIcon />
          <YouTubeIcon />
        </div>
        <ul className="footer-links">
          <li><a href="#">FAQ</a></li>
          <li><a href="#">Help Center</a></li>
          <li><a href="#">Account</a></li>
          <li><a href="#">Media Center</a></li>
          <li><a href="#">Investor Relations</a></li>
          <li><a href="#">Jobs</a></li>
          <li><a href="#">Ways to Watch</a></li>
          <li><a href="#">Terms of Use</a></li>
          <li><a href="#">Privacy</a></li>
          <li><a href="#">Cookie Preferences</a></li>
          <li><a href="#">Corporate Information</a></li>
          <li><a href="#">Contact Us</a></li>
          <li><a href="#">Speed Test</a></li>
          <li><a href="#">Legal Notices</a></li>
          <li><a href="#">Only on Netflix</a></li>
        </ul>
        <p className="footer-text">
          &copy; 1997-2024 Netflix, Inc.
        </p>
        {/* Language selection dropdown could be added here if needed */}
      </div>
    </footer>
  );
}

export default Footer;
