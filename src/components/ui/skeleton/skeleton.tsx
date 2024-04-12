// ProductSkeleton.jsx
import React from "react";

const Skeleton = () => {
  return (
    <div className="animate-pulse flex flex-col items-center justify-center w-[300px] h-[350px] border rounded-lg relative">
      <div className="h-32 w-32 bg-gray-300 rounded-full mb-4"></div>
      <div className="h-4 w-40 bg-gray-300 mb-2"></div>
      <div className="h-4 w-24 bg-gray-300 mb-2"></div>
      <div className="h-8 w-32 bg-gray-300 rounded-full"></div>
    </div>
  );
};

export default Skeleton;
