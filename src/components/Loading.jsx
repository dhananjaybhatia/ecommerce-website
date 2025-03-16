import React from "react";

const Loading = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-100">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-900"></div>
    </div>
  );
};

export default Loading;
