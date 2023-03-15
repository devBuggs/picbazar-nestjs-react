import { useState } from 'react';

export const SuccessAnimation = () => {
  const [success, setSuccess] = useState(false);
  return (
    <>
      <button onClick={() => setSuccess(true)}>animate success</button>
      <svg
        viewBox="0 0 37 37"
        xmlns="http://www.w3.org/2000/svg"
        className={`h-auto w-14 xs:right-4 xs:w-6 ${success && 'is-carting'}`}
      >
        <path
          fill="none"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2.3"
          d="M30.5 6.5h0c6.6 6.6 6.6 17.4 0 24h0c-6.6 6.6-17.4 6.6-24 0h0c-6.6-6.6-6.6-17.4 0-24h0c6.6-6.7 17.4-6.7 24 0z"
          className="circle path"
        />
        <path
          fill="none"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2.3"
          d="M11.6 20L15.9 24.2 26.4 13.8"
          className="tick path"
        />
      </svg>
    </>
  );
};

export const ErrorAnimation = () => {
  const [error, setError] = useState(false);
  return (
    <>
      <button onClick={() => setError(true)}>animate error</button>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 37 37"
        className={`h-auto w-14 xs:right-4 xs:w-6 ${error && 'is-carting'}`}
      >
        <g
          data-name="Group 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.3"
        >
          <g data-name="Ellipse 1" className="circle path">
            <circle cx="18.5" cy="18.5" r="18.5" stroke="none" />
            <circle cx="18.5" cy="18.5" r="17.35" />
          </g>
          <path
            data-name="Line 1"
            strokeLinecap="round"
            d="M9.5 18.5h18"
            className="tick path"
          />
        </g>
      </svg>
    </>
  );
};
