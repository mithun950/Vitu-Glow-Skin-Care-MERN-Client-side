import React from "react";
import { Children } from "react";

const Container = ({ Children }) => {
  return (
    <div>
      <div className="max-w-[1400px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
        {Children}
      </div>
    </div>
  );
};

export default Container;
