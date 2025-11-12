import React from "react";
import { useTheme } from "../context/ThemeProvider";

const LoadingSpinner = ({ size = 80, message = "Loading...", speed = 1.2 }) => {
  const { isDark } = useTheme();

  const spinnerStyle = {
    "--spinner-size": `${size}px`,
    "--spinner-color": isDark ? "#9ECFD4" : "#016B61",
    "--animation-speed": `${speed}s`,
  };

  return (
    <div className="loading-spinner-wrapper" style={spinnerStyle}>
      <div className="spinner-container">
        <div className="orbit-ring"></div>
        <div className="core-spinner"></div>
        <div className="inner-pulse"></div>
        <div className="particle p1"></div>
        <div className="particle p2"></div>
        <div className="particle p3"></div>
      </div>
      <p
        className={`spinner-message ${
          isDark ? "text-[#9ECFD4]" : "text-[#016B61]"
        }`}
      >
        {message}
      </p>

      <style jsx>{`
        .loading-spinner-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          padding: 2rem;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          min-height: 50vh;
          background: ${isDark ? "transparent" : "transparent"};
        }
        .spinner-container {
          position: relative;
          width: var(--spinner-size);
          height: var(--spinner-size);
          border-radius: 50%;
          animation: float 3s ease-in-out infinite;
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-12px);
          }
        }
        .orbit-ring {
          position: absolute;
          inset: -20px;
          border: 2px dashed
            ${isDark ? "rgba(158, 207, 212, 0.3)" : "rgba(1, 107, 97, 0.3)"};
          border-radius: 50%;
          animation: spin calc(var(--animation-speed) * 3.3) linear infinite;
        }
        .core-spinner {
          position: relative;
          width: calc(var(--spinner-size) * 0.7);
          height: calc(var(--spinner-size) * 0.7);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border: 6px solid var(--spinner-color);
          border-right-color: transparent;
          border-radius: 50%;
          animation: spin var(--animation-speed) cubic-bezier(0.4, 0, 0.2, 1)
            infinite;
          box-shadow: 0 0 30px var(--spinner-color),
            inset 0 0 20px
              ${isDark ? "rgba(158, 207, 212, 0.3)" : "rgba(1, 107, 97, 0.3)"};
        }
        @keyframes spin {
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
        .inner-pulse {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 30%;
          height: 30%;
          background: ${isDark
            ? "radial- linear(circle, #9ECFD4, #70B2B2)"
            : "radial- linear(circle, #016B61, #70B2B2)"};
          border-radius: 50%;
          transform: translate(-50%, -50%);
          animation: pulse calc(var(--animation-speed) * 1.25) ease-in-out
            infinite;
          box-shadow: 0 0 20px var(--spinner-color);
        }
        @keyframes pulse {
          0%,
          100% {
            transform: translate(-50%, -50%) scale(0.8);
            opacity: 0.7;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 1;
          }
        }
        .particle {
          position: absolute;
          width: 8px;
          height: 8px;
          background: ${isDark ? "#70B2B2" : "#016B61"};
          border-radius: 50%;
          box-shadow: 0 0 15px ${isDark ? "#70B2B2" : "#016B61"};
          animation: orbit calc(var(--animation-speed) * 1.6) linear infinite;
        }
        .p1 {
          top: 10%;
          left: 10%;
          animation-delay: 0s;
        }
        .p2 {
          top: 20%;
          right: 15%;
          animation-delay: calc(var(--animation-speed) * 0.4);
        }
        .p3 {
          bottom: 15%;
          left: 20%;
          animation-delay: calc(var(--animation-speed) * 0.8);
        }
        @keyframes orbit {
          0% {
            transform: translate(0, 0) rotate(0deg);
          }
          100% {
            transform: translate(140px, 0) rotate(360deg);
          }
        }
        .spinner-message {
          color: var(--spinner-color);
          font-size: 1rem;
          font-weight: 500;
          letter-spacing: 0.5px;
          text-align: center;
          animation: fade 2s ease-in-out infinite;
          margin: 0;
        }
        @keyframes fade {
          0%,
          100% {
            opacity: 0.7;
          }
          50% {
            opacity: 1;
          }
        }
        @media (max-width: 480px) {
          .spinner-message {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
