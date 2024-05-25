import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useNavigate } from "react-router-dom";
import { LinkedIn, YouTube } from "@mui/icons-material";

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="bg-white text-[#12141D]">
      <div className="text-center lg:text-3xl text-[16px] pt-11 font-semibold font-lexend-exa">
        Ignite innovation today - <br /> sign up now for the ultimate <br />{" "}
        hackathon experience
      </div>
      <div className="flex items-center justify-center mt-4">
        <button
          onClick={() => {
            scrollToTop();
          }}
          className="bg-[#089BD9] text-white p-[10px] md:p-[16px] text-center text-[10px] md:text-[18px] md:h-[55px] md:w-[192px] rounded-[5px] animate-text"
        >
          Get Started
        </button>
      </div>

      <div className="flex justify-between mt-[100px] md:mt-[200px] ml-[20px] md:ml-[40px] border-b-3 border-black">
        <img src="/assets/unitar-logo.svg" className="md:w-[200px] w-[100px]" />
        <div className="flex items-center space-x-4 mr-4 md:mr-20">
          <a
            href="https://www.facebook.com/UNITARHQ/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FacebookIcon className="text-gray-600 hover:text-yellow-500 cursor-pointer transition" />
          </a>{" "}
          <a
            href="https://www.linkedin.com/school/unitarhq"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedIn className="text-gray-600 hover:text-yellow-500 cursor-pointer transition" />
          </a>
          <a
            href="https://twitter.com/UNITAR"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TwitterIcon className="text-gray-600 hover:text-yellow-500 cursor-pointer transition" />
          </a>
          <a
            href="https://www.youtube.com/user/UNITARHQ"
            target="_blank"
            rel="noopener noreferrer"
          >
            <YouTube className="text-gray-600 hover:text-yellow-500 cursor-pointer transition" />
          </a>
        </div>
      </div>

      <div className="flex justify-between mt-5 mb-2 bg-[#2e4161] p-4">
        <p className="md:ml-11 ml-2 text-[8px] md:text-[12px] text-white">
          {" "}
          © Copyright {currentYear}, All Rights Reserved
        </p>

        <p className="md:mr-11  mr-2 md:text-[12px] text-[8px] mb-1 text-white">
          {" "}
          Privacy Policy Terms & Conditions
        </p>
      </div>
    </div>
  );
};

export default Footer;
