import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import HackathonMedia from "../../common/utils/HackathonMedia";
import { getOrganizerHackathons } from "../../../api/hackathons/hackathons";
import { selectCurrentOrganizerDetail } from "../../../features/organizer/organizerSlice";
import { CircularProgress } from "@mui/material";
import { setCurrentHackathonDetail } from "../../../features/hackathon/hackathonSlice";
const ViewHackathons = () => {
  const [loading, setLoading] = useState(true);
  const organizer = useSelector(selectCurrentOrganizerDetail);
  const organizer_id = organizer.id;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [organizerHackathons, setOrganizerHackathons] = useState([]);

  const fetchHackathons = () => {
    getOrganizerHackathons(organizer_id).then((res) => {
      if (res.status === 200) {
        setOrganizerHackathons(res.data);
        setLoading(false);
      }
    });
  };

  const handleViewhackathonDetails = (hackathonDetail) => {
    dispatch(
      setCurrentHackathonDetail({ currentHackathonDetail: hackathonDetail })
    );
    navigate("details");
  };

  useEffect(() => {
    fetchHackathons();
  }, []);

  return (
    <div className="bg-white right-side min-h-screen flex">
      <div className="ml-[300px]">
        <h1 className="text-gray-600 font-bold text-[24px] mb-5 mt-5">
          All active Hackathons
        </h1>
        {loading && (
          <div className="flex justify-center">
            <CircularProgress />
          </div>
        )}
        <div className="flex flex-row flex-wrap space-x-4 mt-5 ml-4">
          {organizerHackathons.length > 0 &&
            organizerHackathons.map((field, index) => (
              <div
                key={index}
                className="relative overflow-hidden border border-[#c7c7c7] rounded-[20px] shadow-xl mb-4 w-[300px] h-[400px] transition-transform transform hover:-translate-y-1"
              >
                <HackathonMedia
                  cover_image_url={field.cover_image_url}
                  avatar_url={field.avatar_url}
                />
                <div className="relative">
                  <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-white p-4 rounded-[20px] border-t border-gray-500">
                    <p className="text-sm font-bold mt-4">{field.title}</p>
                    <p className="text-sm text-gray-700">{field.highlight} </p>
                    <p className="text-xs text-gray-500  mt-2 w-[250px] h-[50px]">
                      {field.description}
                    </p>
                  </div>
                </div>
                <div className="flex gap-5 mt-[100px] ml-[22px]">
                  <button
                    onClick={() => handleViewhackathonDetails(field)}
                    className="border border-blue-500 rounded-md text-blue-500 w-[250px] text-xs mt-[50px] py-1 hover:bg-custom-blue mb-3 hover:text-white"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ViewHackathons;
