import Axios from "axios";
import {
  PATIENT_LIST_REQUEST,
  PATIENT_LIST_SUCCESS,
  PATIENT_LIST_FAIL,
  PATIENT_ADD_REQUEST,
  PATIENT_ADD_SUCCESS,
  PATIENT_ADD_FAIL,
  PATIENT_DELETE_REQUEST,
  PATIENT_DELETE_SUCCESS,
  PATIENT_DELETE_FAIL,
} from "../constants/PatientConstants";

const listPatients = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PATIENT_LIST_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.get("/patients/", {
      headers: {
        "x-auth-token": userInfo.token,
      },
    });
    dispatch({ type: PATIENT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PATIENT_LIST_FAIL, payload: error });
  }
};

const addPatient = (patient) => async (dispatch, getState) => {
  try {
    dispatch({ type: PATIENT_ADD_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    if (!patient._id) {
      const { data } = await Axios.post("/patients/add", patient, {
        headers: {
          "x-auth-token": userInfo.token,
        },
      });
      dispatch({ type: PATIENT_ADD_SUCCESS, payload: data });
    } else {
      const { data } = await Axios.post(
        "/patients/update/" + patient._id,
        patient,
        {
          headers: {
            "x-auth-token": userInfo.token,
          },
        }
      );
      dispatch({ type: PATIENT_ADD_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({ type: PATIENT_ADD_FAIL, payload: error.response.data.msg });
  }
};

const deletePatient = (patientId) => async (dispatch, getState) => {
  try {
    dispatch({ type: PATIENT_DELETE_REQUEST, payload: patientId });
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.delete("/patients/" + patientId, {
      headers: {
        "x-auth-token": userInfo.token,
      },
    });
    dispatch({ type: PATIENT_DELETE_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({ type: PATIENT_DELETE_FAIL, payload: error.message });
  }
};

export { listPatients, addPatient, deletePatient };
