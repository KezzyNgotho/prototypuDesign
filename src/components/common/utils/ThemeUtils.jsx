const themes = [
  `Employment and Livelihoods Development`,
  `Emerging Technologies`,
  `Social Impact`,
  `Climate Change - Green Livelihoods`,
  `Accessibility and Inclusion`,
];

function getSubthemes(theme) {
  const themeMap = {
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
      "Digital Inclusion and Skills Development",
      "Community and Social Impact",
    ],
    "Social Impact": [
      "Women and Youth Empowerment",
      "Community and Social Impact",
      "Cooperative Models and Social Enterprises",
      "Health & Sustainable Development Goals (SDGs)",
      "Inclusion of PWDs and Underserved Communities",
    ],
    "Climate Change - Green Livelihoods": [
      "Green Livelihoods Development",
      "Sustainable Development Goals (SDGs)",
      "Food Security and Systems",
    ],
    "Accessibility and Inclusion": [
      "Digital Inclusion & Skills Development",
      "Inclusion of PWDs and Underserved Communities",
    ],
  };

  return themeMap[theme] || [];
}

export { themes, getSubthemes };
