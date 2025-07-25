import React from "react";

const Loading = () => {
  return (
    <div>
      <div className="flex absolute m-auto items-center justify-center h-full w-full">
        <div className="animate-spin rounded-full h-15 w-15 border-t-4 border-b-4 border-orange-800"></div>
      </div>
    </div>
  );
};

export default Loading;
