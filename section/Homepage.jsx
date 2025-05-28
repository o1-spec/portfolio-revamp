import React from "react";

function Homepage({ showNextSection }) {
  return (
    <>
      {showNextSection && (

        <div className="absolute inset-0 bg-white slide-in-section">
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-black space-y-6">
              <h1 className="text-6xl font-bold mb-4 animate-fade-in-up">
                Welcome
              </h1>
              <p className="text-xl opacity-80 animate-fade-in-up-delay">
                Your portfolio experience begins now
              </p>
              <div className="w-24 h-1 bg-white mx-auto animate-scale-in"></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Homepage;
