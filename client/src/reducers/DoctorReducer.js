import {
  DOCTOR_LIST_REQUEST,
  DOCTOR_LIST_SUCCESS,
  DOCTOR_LIST_FAIL,
  DOCTOR_ADD_REQUEST,
  DOCTOR_ADD_SUCCESS,
  DOCTOR_ADD_FAIL,
  DOCTOR_DELETE_REQUEST,
  DOCTOR_DELETE_SUCCESS,
  DOCTOR_DELETE_FAIL,
} from "../constants/DoctorConstants";

const doctorListReducer = (
  state = {
    doctors: [],
  },
  action
) => {
  switch (action.type) {
    case DOCTOR_LIST_REQUEST:
      return { loading: true, doctors: [] };
    case DOCTOR_LIST_SUCCESS:
      return { loading: false, doctors: action.payload };
    case DOCTOR_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const addDoctorReducer = (state = { doctor: {} }, action) => {
  switch (action.type) {
    case DOCTOR_ADD_REQUEST:
      return { loading: true };
    case DOCTOR_ADD_SUCCESS:
      return { loading: false, success: true, doctor: action.payload };
    case DOCTOR_ADD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const deleteDoctorReducer = (
  state = {
    doctor: {},
  },
  action
) => {
  switch (action.type) {
    case DOCTOR_DELETE_REQUEST:
      return { loading: true };
    case DOCTOR_DELETE_SUCCESS:
      return { loading: false, success: true, doctor: action.payload };
    case DOCTOR_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export { doctorListReducer, addDoctorReducer, deleteDoctorReducer };
