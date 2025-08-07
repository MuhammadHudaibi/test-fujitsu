import React from "react";
import { useSelector } from "react-redux";
import Loader from "./Loader";

function TimeDisplay() {
  const { data: apiData, loading: apiLoading, error: apiError } = useSelector(
    (state) => state.api
  );

  return (
    <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-lg text-sm min-h-[50px] flex items-center justify-center">
      {apiLoading && <Loader small />}
      {apiError && `Error: ${apiError}`}
      {apiData && apiData.datetime ? (
        <div className="transition-opacity duration-500">
          Waktu di {apiData.timezone}: <strong>{apiData.datetime}</strong>
        </div>
      ) : (
        !apiLoading && <p>Gagal memuat data waktu.</p>
      )}
    </div>
  );
}

export default TimeDisplay;
