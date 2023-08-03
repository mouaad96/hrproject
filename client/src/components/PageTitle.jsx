import React from "react";

const PageTitle = ({ title, icon: IconComponent }) => {
  return (
    <div className="py-4 flex justify-center gap-1 items-center">
      <h1 className="relative with-underline py-1">{title}</h1>
      {IconComponent && <IconComponent className="text-3xl text-blue-500" />}
    </div>
  );
};

export default PageTitle;
