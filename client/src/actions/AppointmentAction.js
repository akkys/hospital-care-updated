import Axios from "axios";
import {
  APPOINTMENT_LIST_REQUEST,
  APPOINTMENT_LIST_SUCCESS,
  APPOINTMENT_LIST_FAIL,
  APPOINTMENT_ADD_REQUEST,
  APPOINTMENT_ADD_SUCCESS,
  APPOINTMENT_ADD_FAIL,
  APPOINTMENT_DELETE_REQUEST,
  APPOINTMENT_DELETE_SUCCESS,
  APPOINTMENT_DELETE_FAIL,
} from "../constants/AppointmentConstants";

const listAppointments = () => async (dispatch, getState) => {
  try {
    dispatch({ type: APPOINTMENT_LIST_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.get("/appointments/", {
      headers: {
        "x-auth-token": userInfo.token,
      },
    });
    dispatch({ type: APPOINTMENT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: APPOINTMENT_LIST_FAIL, payload: error });
  }
};

const addAppointment = (appointment) => async (dispatch, getState) => {
  try {
    dispatch({ type: APPOINTMENT_ADD_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    if (!appointment._id) {
      const { data } = await Axios.post("/appointments/add", appointment, {
        headers: {
          "x-auth-token": userInfo.token,
        },
      });
      dispatch({ type: APPOINTMENT_ADD_SUCCESS, payload: data });
    } else {
      const { data } = await Axios.post(
        "/appointments/update/" + appointment._id,
        appointment,
        {
          headers: {
            "x-auth-token": userInfo.token,
          },
        }
      );
      dispatch({ type: APPOINTMENT_ADD_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({ type: APPOINTMENT_ADD_FAIL, payload: error.response.data.msg });
  }
};

const deleteAppointment = (appointmentId) => async (dispatch, getState) => {
  try {
    dispatch({ type: APPOINTMENT_DELETE_REQUEST, payload: appointmentId });
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.delete("/appointments/" + appointmentId, {
      headers: {
        "x-auth-token": userInfo.token,
      },
    });
    dispatch({
      type: APPOINTMENT_DELETE_SUCCESS,
      payload: data,
      success: true,
    });
  } catch (error) {
    dispatch({ type: APPOINTMENT_DELETE_FAIL, payload: error.message });
  }
};

export { listAppointments, addAppointment, deleteAppointment };
