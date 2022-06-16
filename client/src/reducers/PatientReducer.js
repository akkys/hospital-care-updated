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

const patientListReducer = (
  state = {
    patients: [],
  },
  action
) => {
  switch (action.type) {
    case PATIENT_LIST_REQUEST:
      return { loading: true, patients: [] };
    case PATIENT_LIST_SUCCESS:
      return { loading: false, patients: action.payload };
    case PATIENT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const addPatientReducer = (state = { patient: {} }, action) => {
  switch (action.type) {
    case PATIENT_ADD_REQUEST:
      return { loading: true };
    case PATIENT_ADD_SUCCESS:
      return { loading: false, success: true, patient: action.payload };
    case PATIENT_ADD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const deletePatientReducer = (
  state = {
    patient: {},
  },
  action
) => {
  switch (action.type) {
    case PATIENT_DELETE_REQUEST:
      return { loading: true };
    case PATIENT_DELETE_SUCCESS:
      return { loading: false, success: true, patient: action.payload };
    case PATIENT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export { patientListReducer, addPatientReducer, deletePatientReducer };
