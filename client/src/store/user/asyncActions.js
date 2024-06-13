import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from "../../apis";

export const getCurrent = createAsyncThunk(
  "user/",
  async (data, { rejectWithValue }) => {
    const response = await apis.apiGetCurrent();
    console.log("responseresponseresponse: ", response);
    if (!response.success) {
      return rejectWithValue(response);
    }
    return response.rs;
  }
);
