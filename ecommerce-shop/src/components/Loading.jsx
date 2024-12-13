import React from "react";

const Loading = () => {
  return (
    <section className="h-screen flex justify-center items-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
    </section>
  );
};

export default Loading;
