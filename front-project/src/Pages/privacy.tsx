import "./privacy.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { faShieldAlt } from "@fortawesome/free-solid-svg-icons";
import { faCookie } from "@fortawesome/free-solid-svg-icons";
import Footer from "../component/footer";

function privacy() {
  return (
    <div className="titles">
      <h1 className="text-center   fw-bold  " style={{
        color:'#0071b8'
      }}>PRIVACY POLICY </h1>

      <div className="icone1">
        <Link className=" nav-link icone1" to="./login">
          <FontAwesomeIcon icon={faArrowLeft} className=" m-2   fs-6  icone2" />{" "}
          click to go back
        </Link>
      </div>
      <div className="    container-fluid fs-4 w-75 text-center ">
        <p className=" pt-4">
          <h1>
            Welcome to <span style={{}}> Streamify</span>!
          </h1>{" "}
          Your privacy is important to us. On this page, we provide you with all
          the necessary information on how we collect, use, disclose, and
          protect your personal information.
        </p>
      </div>
      <div className="     container-fluid text-center fs-4 w-75  ">
        <p className=" pt-4 mt-5">
          <FontAwesomeIcon icon={faInfoCircle} className="fs-1" />
          <h1>Collection of Information </h1>We collect information that you
          voluntarily provide when interacting with our website. This may
          include your name, email address, and other personal information you
          provide during registration or through forms on our site.
        </p>
      </div>
      <div className="diagonal-box">
        <div className="content fs-4 w-75 text-center  mt-5  position-relative top-25" style={{
          color: "#0071b8",
        }}
        >
          <h1> Use of Information</h1>
          The collected information is used to personalize your experience on
          our site, improve our services, and send you relevant information. We
          will never share your information with third parties without your
          consent.
          <p className="  pt-4 fs-4 mt-5">
            <FontAwesomeIcon icon={faShieldAlt} />
            <h1>Protection of Information </h1>We collect information that We
            take security measures to protect your personal information and
            ensure that it is treated securely and in compliance with applicable
            privacy laws.
          </p>
          <p className=" mt-5 fs-4">
          <FontAwesomeIcon icon={faCookie} />
          <h1 className="mt-5">Cookies</h1>
          Our site uses cookies to enhance your browsing experience. You can
          control cookie acceptance through your browser settings.
        </p>
        </div>
      </div>
      <div className=" container-fluid text-center fs-3 w-75  cook   mb-5">
          <p className= " fs-4"> 
          <h1 className="">tools</h1>
          Our site uses tools to enhance your browsing experience. You can
          control  settings  acceptance through your browser totally.
        </p>
      </div>
      <div className="container-fluid text-center fs-3 w-75  mb-5"  >
        <p className="fs-4">
          <h1 className=" "> Links to Third-Party </h1> <br /> Sites Our site may contain
          links to third-party websites. We are not responsible for the privacy
          practices of such sites, and we recommend reading their privacy
          policies. <br /> <h1>Changes to the Privacy Policy </h1> <br /> We
          reserve the right to make changes to this Privacy Policy. Changes will
          be posted on this page, so we encourage you to check it regularly.
          Contact Us For questions or clarifications about our Privacy Policy,{" "}
          <br /> Thank you for trusting our site!
        </p>
      </div>
      <Footer />
    </div>
  );
}
export default privacy;
