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

const wardListReducer = (
  state = {
    wards: [],
  },
  action
) => {
  switch (action.type) {
    case WARD_LIST_REQUEST:
      return { loading: true, wards: [] };
    case WARD_LIST_SUCCESS:
      return { loading: false, wards: action.payload };
    case WARD_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const addWardReducer = (state = { ward: {} }, action) => {
  switch (action.type) {
    case WARD_ADD_REQUEST:
      return { loading: true };
    case WARD_ADD_SUCCESS:
      return { loading: false, success: true, ward: action.payload };
    case WARD_ADD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const deleteWardReducer = (
  state = {
    ward: {},
  },
  action
) => {
  switch (action.type) {
    case WARD_DELETE_REQUEST:
      return { loading: true };
    case WARD_DELETE_SUCCESS:
      return { loading: false, success: true, ward: action.payload };
    case WARD_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export { wardListReducer, addWardReducer, deleteWardReducer };
