import React from "react";

const Loading = () => {
  return (
    <section className="h-screen flex justify-center items-center bg-white">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary mb-4"></div>
        <p className="text-primary text-lg font-semibold">Loading...</p>
      </div>
    </section>
  );
};

export default Loading;
