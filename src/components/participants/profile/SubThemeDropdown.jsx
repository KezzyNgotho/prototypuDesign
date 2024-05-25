import React from "react";

const SubThemeDropdown = ({ theme, formData, onSubThemeChange }) => {
  const subThemes = {
    "Employment and Livelihoods Development": [
      "Entrepreneurship and MSME Development",
      "Skills Development and Training",
      "Rural Livelihood Development",
      "Economic Empowerment",
      "Financial Inclusion and Empowerment",
    ],
    "Emerging Technologies": [
      "Skills Development and Training",
      "Green Livelihoods Development",
      "Digital Inclusion and Skills",
      "Development",
      "Community and Social Impact",
    ],
    "Social Impact": [
      "Women and Youth Empowerment",
      "Community and Social Impact",
      "Cooperative Models and Social Enterprises",
      "Health and Sustainable Development Goals(SDGs)",
      "Inclusion of PWDs and Underserved Communities",
    ],
    "Climate Change - Green Livelihoods": [
      "Green Livelihoods Development",
      "Sustainble Development Goals(SDGs)",
      "Food Security and Systems",
    ],
    "Accessibility and Inclusion": [
      "Digital Inclusion and Skills Development",
      "Inclusion of PWDs and Underserved Communities",
    ],
  };
  const handleSubThemeChange = (selectedSubThemes) => {
    onSubThemeChange(selectedSubThemes);
  };

  return (
    <div>
      <span className="text-gray-700 text-xs">Select Hackathon Sub-Theme</span>
      <br />
      <select
        name="sub_themes"
        value={formData.sub_themes}
        onChange={(e) =>
          handleSubThemeChange(
            Array.from(e.target.selectedOptions, (option) => option.value)
          )
        }
        className="mt-1 p-2 w-[300px] mb-8 text-sm border  bg-inherit border-gray-400 rounded-md focus:outline-none focus:border-custom-blue"
      >
        <option value="">Select..</option>
        {subThemes[theme].map((subTheme) => (
          <option
            key={subTheme}
            value={subTheme}
            selected={formData.sub_themes.includes(subTheme)}
          >
            {subTheme}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SubThemeDropdown;
