import React from "react";

export const PageTitle = ({
  title,
  image,
}: {
  title: string;
  image: string;
}) => {
  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center mb-0">
        <h2 className="text-[#ffffff] text-[30px] font-bold text-left mb-20">
          {title}
        </h2>
        <div
          className="flex flex-row gap-0 w-full h-[200px]"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      </div>
    </div>
  );
};
