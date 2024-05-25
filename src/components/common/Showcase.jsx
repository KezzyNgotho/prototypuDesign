import React from "react";
import { woman, karen, project, man } from "../../assets";
import FeatureBanner from "./FeatureBanner";
import BannerItem from "./BannerItem";
const Showcase = () => {
  return (
    <>
      <div className=" bg-[white]   ">
        <div className=" lg:flex items-center gap-10 bg-[#F9FAFE] lg:ml-[98px] rounded-3xl lg:mr-[98px]">
          <img
            src={woman}
            className="lg:w-[600px] w-full mt-11 lg:ml-11 rounded-lg"
          />
          <div>
            <h4 className="text-[#12141D] text-center lg:text-left lg:text-4xl font-lexend-exa mb-11  font-semibold ">
              Showcase Your <br /> Skills
            </h4>
            <p className="text-[#12141D] mr-1 text-[18px] mt-3 lg:text-left lg:w-[440px] text-center">
              Make your mark in the tech and innovation landscape. Showcase your
              talents through innovative solutions, and grab the attention of
              potential employers and collaborators.
            </p>
          </div>
        </div>

        <h2 className=" mt-11  text-[#12141D] text-center  lg:text-4xl font-lexend-exa   font-semibold ">
          For Organizers
        </h2>
        <div className="bg-[#F9FAFE] mt-[100px]">
          <div className="lg:flex items-center justify-center mt-11 ">
            <img src={karen} />
            <div className="lg:mt-[115px] mt-5 mr-[20px]">
              <h5 className="text-[#12141D] font-lexend-exa lg:text-[28px] lg:text-left text-[20px] text-center font-bold lg:ml-[100px]   ">
                Tap into Talent
              </h5>
              <p className="mt-5 text-[#12141D] text-center lg:text-left  text-[18px] lg:ml-[100px] ">
                Discover the next generation of innovators. Post your hackathon
                on UNITAR and connect with a global pool of talent. Watch as
                diverse teams bring fresh perspectives to your challenges.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 bg-white  w-full min-h-screen p-2 ">
          <div className=" lg:flex justify-center items-center ">
            <div className="lg:w-[494px] ">
              <h4 className="text-[#12141D] text-center lg:text-left lg:text-4xl font-lexend-exa  font-semibold ">
                Drive Innovation
              </h4>
              <p className="text-[#12141D] text-[18px] mt-3 lg:text-left text-center">
                Challenge participants with real-world problems and witness
                groundbreaking solutions. Fuel innovation within your
                organization and be at the forefront of industry advancements.
              </p>
            </div>
            <div>
              {" "}
              <img
                src={project}
                className=" w-full lg:w-[600px] mt-11 lg:ml-6"
              />{" "}
            </div>
          </div>
        </div>

        <div className=" lg:flex items-center gap-10 bg-[#F9FAFE] lg:ml-[98px] rounded-3xl lg:mr-[98px]">
          <img src={man} className="w-[600px] lg:mt-11 lg:ml-11 rounded-lg" />
          <div>
            <h4 className="text-[#12141D] text-center lg:text-left lg:text-4xl font-lexend-exa mb-11  font-semibold ">
              Boost Your Brand
            </h4>
            <p className="text-[#12141D] text-[18px] mt-3 lg:text-left lg:w-[440px] text-center">
              Associate your organization with innovation. Be a catalyst for
              change and join a community that values pushing the boundaries of
              what's possible.
            </p>
          </div>
        </div>
      </div>{" "}
      {/* <FeatureBanner /> */}
      <BannerItem />
    </>
  );
};

export default Showcase;
