
import "../styles/Footer.css";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa"; // Import icons

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="social-links">
          <a
            href="https://github.com/Debsnil24"
            className="social-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="social-icon" />
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/debsnil24samudra/"
            className="social-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="social-icon" />
            LinkedIn
          </a>

          <a
            href="mailto:debsnilsamudra@gmail.com"
            className="social-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaEnvelope className="social-icon" />
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;