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

const appointmentListReducer = (
  state = {
    appointments: [],
  },
  action
) => {
  switch (action.type) {
    case APPOINTMENT_LIST_REQUEST:
      return { loading: true, appointments: [] };
    case APPOINTMENT_LIST_SUCCESS:
      return { loading: false, appointments: action.payload };
    case APPOINTMENT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const addAppointmentReducer = (state = { appointment: {} }, action) => {
  switch (action.type) {
    case APPOINTMENT_ADD_REQUEST:
      return { loading: true };
    case APPOINTMENT_ADD_SUCCESS:
      return { loading: false, success: true, appointment: action.payload };
    case APPOINTMENT_ADD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const deleteAppointmentReducer = (
  state = {
    appointment: {},
  },
  action
) => {
  switch (action.type) {
    case APPOINTMENT_DELETE_REQUEST:
      return { loading: true };
    case APPOINTMENT_DELETE_SUCCESS:
      return { loading: false, success: true, appointment: action.payload };
    case APPOINTMENT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export {
  appointmentListReducer,
  addAppointmentReducer,
  deleteAppointmentReducer,
};
