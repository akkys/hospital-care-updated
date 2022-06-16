import Axios from "axios";
import {
  WARD_LIST_REQUEST,
  WARD_LIST_SUCCESS,
  WARD_LIST_FAIL,
  WARD_ADD_REQUEST,
  WARD_ADD_SUCCESS,
  WARD_ADD_FAIL,
  WARD_DELETE_REQUEST,
  WARD_DELETE_SUCCESS,
  WARD_DELETE_FAIL,
} from "../constants/WardConstants";

const listWards = () => async (dispatch) => {
  try {
    dispatch({ type: WARD_LIST_REQUEST });

    const { data } = await Axios.get("/wards/");
    dispatch({ type: WARD_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: WARD_LIST_FAIL, payload: error });
  }
};

const addWard = (ward) => async (dispatch, getState) => {
  try {
    dispatch({ type: WARD_ADD_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    if (!ward._id) {
      const { data } = await Axios.post("/wards/add", ward, {
        headers: {
          "x-auth-token": userInfo.token,
        },
      });
      dispatch({ type: WARD_ADD_SUCCESS, payload: data });
    } else {
      const { data } = await Axios.post("/wards/update/" + ward._id, ward, {
        headers: {
          "x-auth-token": userInfo.token,
        },
      });
      dispatch({ type: WARD_ADD_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({ type: WARD_ADD_FAIL, payload: error.response.data.msg });
  }
};

const deleteWard = (wardId) => async (dispatch, getState) => {
  try {
    dispatch({ type: WARD_DELETE_REQUEST, payload: wardId });
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.delete("/wards/" + wardId, {
      headers: {
        "x-auth-token": userInfo.token,
      },
    });
    dispatch({ type: WARD_DELETE_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({ type: WARD_DELETE_FAIL, payload: error.message });
  }
};

export { listWards, addWard, deleteWard };
