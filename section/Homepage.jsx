import React from "react";

function Homepage({ showNextSection }) {
  return (
    <>
      {showNextSection && (
        <div className="absolute inset-0 bg-white flex items-center justify-center">
          <div className="text-black text-4xl font-bold bounce-text">
            Welcome to the Portfolio
          </div>
        </div>
      )}
      <style jsx>
        {`
          @keyframes bounceText {
            0% {
              transform: translateY(0);
            }
            15% {
              transform: translateY(-20px);
            }
            30% {
              transform: translateY(0);
            }
            45% {
              transform: translateY(-15px);
            }
            60% {
              transform: translateY(0);
            }
            75% {
              transform: translateY(-10px);
            }
            90% {
              transform: translateY(0);
            }
            100% {
              transform: translateY(0);
            }
          }

          .bounce-text {
            animation: bounceText 1.2s ease-out 0.3s forwards;
          }
        `}
      </style>
    </>
  );
}

export default Homepage;
