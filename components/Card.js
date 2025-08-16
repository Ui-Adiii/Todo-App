import React from "react";

const Card = ({ totalCount, completedCount, text, textColor }) => {
  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-sm">
      <div
        className={`text-2xl font-bold ${
          text === "Total Tasks"
            ? "text-gray-800"
            : text === "Completed"
            ? "text-green-600"
            : "text-blue-600"
        }`}
      >
        {text === "Total Tasks"
          ? totalCount
          : text === "Completed"
          ? completedCount
          : totalCount - completedCount}
      </div>
      <div className="text-gray-600">{text}</div>
    </div>
  );
};

export default Card;
