import React from "react";
import moment from "moment";
import { selectCurrentHackathonDetail } from "../../../features/hackathon/hackathonSlice";
import AdminProfile from "../AdminLogOut";
import { useSelector } from "react-redux";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BookIcon from "@mui/icons-material/Book";
import { ChevronRight } from "@mui/icons-material";
import { Chip } from "@mui/material";

const ViewHackDetail = ({ hackathonId }) => {
  const hackathon = useSelector(selectCurrentHackathonDetail);
  return (
    <div className="bg-[#FAF9F6] p-8  min-h-screen right-side">
      <div className="flex justify-between">
        <div className="ml-60 mb-2">
          {" "}
          <h1 className="mt-0 text-gray-600 font-bold  text-[20px] relative ">
            Hackathon
          </h1>
        </div>
        <div>
          {" "}
          <AdminProfile />
        </div>
      </div>
      <p className="text-xs text-gray-500  flex flex-row mb-10 ml-60">
        <span className="mt-[2px]">Hackathons</span>
        <ChevronRight sx={{ width: "20px", height: "20px" }} />
        <span className="mt-[2px]">{hackathon.title}</span>
      </p>
      <div className="ml-60">
        <h1 className="mb-4 font-semibold text-gray-700">{hackathon.title}</h1>
        <div className="shadow-md bg-white p-8  border rounded-md">
          <div className="flex flex-row gap-[100px] ">
            <div className="relative">
              {" "}
              <img
                src={
                  hackathon.cover_image_url
                    ? hackathon.cover_image_url
                    : "/assets/noImage1.jpg"
                }
                alt=""
                style={{
                  width: "600px",
                  height: "250px",
                  objectFit: "cover",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "20px",
                  left: "20px",
                  borderRadius: "50%",
                  border: "2px solid #fff",
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                }}
              >
                <img
                  src={
                    hackathon.avatar_url
                      ? hackathon.avatar_url
                      : "/assets/noImage2.jpg"
                  }
                  alt=""
                  style={{
                    borderRadius: "50%",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col w-[500px] ">
              <div>
                <p className="text-[16px]  font-semibold mt-5 ">Highlights</p>
                <p className="text-xs mt-5">{hackathon.highlight}</p>
              </div>
              <div>
                <p className="text-[16px] font-semibold mt-5">Description</p>
                <p className="text-xs mt-5">{hackathon.description}</p>
              </div>
              <div>
                <p className="text-[16px]  font-semibold mt-5">Deliverables</p>
                <p className="text-xs mt-5">{hackathon.deliverables}</p>
              </div>
              <div>
                <p className=" font-semibold mt-5 text-[16px]">Goals</p>
                <p className="mt-2 text-xs">{hackathon.goals}</p>
              </div>
            </div>
          </div>
          <div className="border-gray-300 w-[500px] border rounded-md px-3 py-2 flex flex-row gap-10">
            <div className="flex-col">
              <p className="font-semibold  text-[15px] ">Hackathon Theme</p>
              <p className="mt-2 text-sm text-gray-500">
                {hackathon.hackathon_theme}
              </p>
            </div>
          </div>
          <div className="mt-[80px] ml-[30px]">
            <div className="flex flex-row gap-[150px]">
              <div className="border-custom-blue  w-[450px] h-[250px] border rounded-md  gap-10 px-5">
                <p className="font-semibold  text-[16px] mb-2 mt-4">
                  Hackathon Sub-Thematic Concerns
                </p>
                {hackathon.sub_themes &&
                  hackathon.sub_themes.map((field, index) => (
                    <Chip
                      key={index}
                      label={field}
                      sx={{
                        width: "200px",
                        backgroundColor: "#E2EDF1",
                        marginTop: "8px",
                        marginRight: "4px",
                        color: "#009edb",
                        transition: "width 0.3s",
                        "&:hover": {
                          width: "100%",
                        },
                      }}
                    />
                  ))}
              </div>
              <div className="flex flex-col gap-5">
                <div className="border-custom-blue w-[200px] h-[80px] border rounded-md px-3 py-2 flex flex-row gap-10">
                  <div className="flex items-center">
                    {" "}
                    <LocationOnIcon
                      style={{
                        color: "#089BD9",
                        width: "30px",
                        height: "30px",
                      }}
                    />
                  </div>
                  <div className="flex-col">
                    <p className="font-semibold  text-[15px] ">Location</p>
                    <p className="mt-2 text-sm">{hackathon.location}</p>
                  </div>
                </div>
                <div className="border-custom-blue w-[200px] h-[80px] border rounded-md px-3 py-2 flex flex-row gap-10">
                  <div className="flex items-center">
                    <BookIcon
                      style={{
                        color: "#089BD9",
                        width: "30px",
                        height: "30px",
                      }}
                    />
                  </div>
                  <div className="flex-col">
                    <p className="font-semibold  text-[15px] ">Status</p>
                    <p className="mt-2 text-xs text-green-500">
                      {hackathon.status}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-col">
              <p className="font-semibold  text-[18px] mt-8">Timelines</p>
              <div className="flex row gap-[50px]">
                <p className="text-xs mt-2 font-bold w-[80px]">Activity</p>
                <p className="text-xs mt-2 font-bold ">Deadline</p>
              </div>
              <div className="mb-5 gap-5">
                {hackathon.timelines &&
                  hackathon.timelines.map((field, index) => (
                    <div className="flex flex-row gap-10">
                      <span className="text-xs mt-2 w-[80px]">
                        {" "}
                        {field.period_name}
                      </span>
                      <span className="text-xs mt-2">
                        {moment(field.start_date).format("Do MMM YYYY")}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
    </div>
  );
};

export default ViewHackDetail;
