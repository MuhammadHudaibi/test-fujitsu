import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { fetchDataSuccess, fetchDataFailure } from "./externalApiSlice";

export function* fetchApiDataSaga() {
  try {
    const city = "Asia/Jakarta";
    const apiKey = import.meta.env.VITE_API_NINJAS_KEY;

    if (!apiKey) {
      throw new Error(
        "API Key for API-Ninjas is missing. Please check your .env file."
      );
    }

    const response = yield call(
      axios.get,
      `https://api.api-ninjas.com/v1/worldtime?timezone=${city}`,
      {
        headers: { "X-Api-Key": apiKey },
      }
    );

    const data = response.data;

    console.log("[SAGA] Data diterima dari API:", data);
    console.log("[SAGA] Akan melempar action fetchDataSuccess...");

    yield put(fetchDataSuccess(data));
  } catch (error) {
    const errorMessage = error.response
      ? `Error ${error.response.status}: ${error.response.data.error}`
      : error.message;
    console.error("[SAGA] Terjadi error:", errorMessage);
    yield put(fetchDataFailure(errorMessage));
  }
}

function* externalApiSaga() {
  yield takeLatest("api/fetchDataStart", fetchApiDataSaga);
}

export default externalApiSaga;
