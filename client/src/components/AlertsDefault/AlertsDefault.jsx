import React, { useEffect, useState } from "react";
import { Alert } from "@material-tailwind/react";

const AlertsDefault = ({ message }) => {
  return (
    <>
      {message && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mt-3 rounded relative"
          role="alert"
        >
          <span className="block sm:inline">{message}</span>
        </div>
      )}
    </>
  );
};

export default AlertsDefault;
