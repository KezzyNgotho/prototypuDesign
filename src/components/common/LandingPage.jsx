import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import BasicModal from "./SignUpModal";
import BannerVideo from "./BannerVideo";
import ImageCarousel from "./ImageCarousel";
import BannerItem from "./BannerItem";
import Footer from "./Footer";
const LandingPage = () => {
  const [openSignUpModal, setOpenSignUpModal] = useState(false);
  const openModal = () => setOpenSignUpModal(true);
  const closeModal = () => setOpenSignUpModal(false);
  const navigate = useNavigate();
  const orgSlides = [
    {
      image: "https://unitarmedia.blob.core.windows.net/data/carouselImg6c.jpg",
      title: " Tap into Talent",
      description: ` Discover the next generation of innovators. Post your hackathon
      on UNITAR and connect with a global pool of talent. Watch as
      diverse teams bring fresh perspectives to your challenges.`,
    },
    {
      image: "https://unitarmedia.blob.core.windows.net/data/carouselImg5c.jpg",
      title: " Drive Innovation",
      description: ` Challenge participants with real-world problems and witness
      groundbreaking solutions. Fuel innovation within your
      organization and be at the forefront of industry advancements.`,
    },
    {
      image: "https://unitarmedia.blob.core.windows.net/data/carouselImg1c.jpg",
      title: "Boost Your Brand",
      description: `   Associate your organization with innovation. Be a catalyst for
      change and join a community that values pushing the boundaries of
      what's possible.`,
    },
  ];
  const slides = [
    {
      image: "https://unitarmedia.blob.core.windows.net/data/carouselImg3c.jpg",
      title: " Unlock Your Potential",
      description: ` Dive into a world of endless possibilities. Browse through a
      diverse range of hackathons hosted by top-notch organizations.
      Whether you're a coding prodigy, a design virtuoso, or a
      problem-solving guru, there's a hackathon just for you.`,
    },
    {
      image: "https://unitarmedia.blob.core.windows.net/data/carouselImg2c.jpg",
      title: "Forge Connections",
      description: `Connect with diverse minds from around the globe. Form teams that
      blend expertise, creativity, and drive. Together, you'll redefine
      what's possible.`,
    },
    {
      image: "https://unitarmedia.blob.core.windows.net/data/carouselImg1c.jpg",
      title: "Fostering Diversity for Inclusive Solutions",
      description: `Explore the dynamic landscape of diversity in the tech industry, where varied perspectives drive innovation. Join us on a journey of building solutions that transcend barriers, creating meaningful impact for people around the globe. Together, let's shape a future where technology serves as a catalyst for positive change, improving the lives of individuals and communities worldwide.`,
    },
    {
      image: "https://unitarmedia.blob.core.windows.net/data/carouselImg4c.jpg",
      title: "Showcase Your Skills",
      description: ` Make your mark in the tech and innovation landscape. Showcase your
      talents through innovative solutions, and grab the attention of
      potential employers and collaborators.`,
    },
  ];

  return (
    <div>
      <Navbar openModal={openModal} />
      <BasicModal openModal={openSignUpModal} handleClose={closeModal} />
      <div className="w-full h-screen text-center">
        <div className="w-full text-center relative ">
          <div className=" mx-auto p-2 flex justify-center">
            <div className="md:mt-[60px] mt-5">
              <h1 className="text-[24px]   animate-text text-[#000] items-center text-center md:text-4xl  lg:text-6xl font-extrabold  tracking-wider px-3">
                Unleashing Innovation, <br />
                One Hackathon at a Time!
              </h1>
              <p className="text-[12px] mt-4  md:text-[18px] text-center md:w-[588px] md:mt-7 lg:ml-20 text-[#4d4d4d]">
                Join a global community of thinkers, dreamers, and doers.
                Whether you're here to conquer challenges or host groundbreaking
                hackathons, this is where innovation takes center stage.
              </p>
            </div>
          </div>
          <div className="flex gap-10 items-center justify-center md:w-full md:mt-[100px] mt-5">
            <button
              onClick={() => navigate("/part-signup")}
              className="px-3 py-2 bg-[#089BD9] rounded text-[13px] md:text-[18px]  text-white md:py-4 md:px-[20px] md:w-[239px]  transition-transform transform hover:-translate-y-1"
            >
              For Participants
            </button>

            <button
              onClick={() => navigate("/org-signup")}
              className="px-3 py-2 text-[13px] md:text-[18px] md:py-4 md:px-[20px] rounded  border-2 md:w-[239px] border-[#089BD9]  transition-transform transform hover:-translate-y-1"
            >
              For Organisers
            </button>
          </div>
          <div className="animate-text absolute hidden lg:block rounded-full  filter bottom-[180px]  right-[140px]  ">
            <img
              src="https://unitarmedia.blob.core.windows.net/data/avatar1.jpeg"
              className="rounded-full hidden lg:block border-[#b71079] border-2   w-[100px] h-[100px] "
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="animate-text absolute hidden lg:block left-[150px]  bottom-[80px] ">
            <img
              src="https://unitarmedia.blob.core.windows.net/data/avatar2.jpeg"
              className="rounded-full hidden lg:block border-[#db3b14] border-2 4 w-[100px] h-[100px] "
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
        <div className="mt-6">
          {" "}
          <BannerVideo />
        </div>
        <div className="bg-custom-blue w-[300px] md:w-[600px] flex justify-center mt-5">
          {" "}
          <p className="text-center text-white pb-2 md:text-[32px] mt-5 font-bold tracking-wider">
            FOR PARTICIPANTS
          </p>
        </div>
        <div>
          {" "}
          <ImageCarousel slides={slides} />
        </div>
        <div className="bg-custom-blue w-[300px] md:w-[600px] flex justify-center mt-5">
          <p className="text-center text-white pb-2 md:text-[32px] mt-5 font-bold tracking-wider">
            FOR ORGANIZERS
          </p>
        </div>
        <div>
          <ImageCarousel slides={orgSlides} />
        </div>
        <div>
          <p className="  text-custom-blue md:text-[32px] text-[18px] px-2  font-bold tracking-wider mt-5 mb-5 md:mb-10 md:mt-10">
            UNITAR HACKATHON THEMES
          </p>
        </div>
        <BannerItem />
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
