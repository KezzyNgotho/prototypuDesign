import React, { useState, useEffect } from "react";
import Chip from "@mui/material/Chip";
import AdminLogOut from "../AdminLogOut";
import { useNavigate } from "react-router-dom";
import DeleteChipModal from "./DeleteCategoryModal";
import { getTags } from "../../../api/hackathons/hackathons";
import { LinearProgress, Typography } from "@mui/material";
export default function Category() {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [loading, setLoading] = useState(true);
  const fetchCategories = () => {
    getTags().then((res) => {
      setCategories(res.data);
      setLoading(false);
    });
  };

  const handleDelete = (id) => {
    setCategoryId(id);
    setModalOpen(true);
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="bg-white p-8 right-side min-h-screen min-w-full ">
      <div className="ml-60">
        <div className="flex justify-end">
          <AdminLogOut />
        </div>
        <h1 className="text-[20px] font-bold text-gray-600">
          Hackathon Category Actions
        </h1>
        <button
          onClick={() => navigate("createcategory")}
          className="bg-custom-blue w-[150px] rounded-md py-3 px-2 text-white font-semibold mt-5 hover:bg-white hover:text-custom-blue hover:border-custom-blue hover:border mb-4"
        >
          New Category
        </button>
        <div className="p-4 rounded-lg shadow-md  items-center border border-gray-100 w-[600px]  ">
          <h1 className=" text-[15px] text-center mb-3  font-bold mt-6">
            Configured Categories
          </h1>
          <div className=" flex flex-wrap gap-4 mt-6 ">
            {loading && (
              <>
                <LinearProgress />
                <Typography>Fetching categories data...</Typography>
              </>
            )}
            {!loading &&
              categories.length > 0 &&
              categories.map((field, index) => (
                <Chip
                  label={field.category}
                  color="primary"
                  variant="outlined"
                  onDelete={() => handleDelete(field.id)}
                  sx={{ mr: 1 }}
                />
              ))}
          </div>
        </div>
      </div>
      <DeleteChipModal
        openModal={isModalOpen}
        closeModal={() => setModalOpen(false)}
        category={categoryId}
      />
    </div>
  );
}
