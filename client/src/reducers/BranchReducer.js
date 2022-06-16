import {
  BRANCH_LIST_REQUEST,
  BRANCH_LIST_SUCCESS,
  BRANCH_LIST_FAIL,
  BRANCH_ADD_REQUEST,
  BRANCH_ADD_SUCCESS,
  BRANCH_ADD_FAIL,
  BRANCH_DELETE_REQUEST,
  BRANCH_DELETE_SUCCESS,
  BRANCH_DELETE_FAIL,
} from "../constants/BranchConstants";

const branchListReducer = (
  state = {
    branches: [],
  },
  action
) => {
  switch (action.type) {
    case BRANCH_LIST_REQUEST:
      return { loading: true, branches: [] };
    case BRANCH_LIST_SUCCESS:
      return { loading: false, branches: action.payload };
    case BRANCH_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const addBranchReducer = (state = { branch: {} }, action) => {
  switch (action.type) {
    case BRANCH_ADD_REQUEST:
      return { loading: true };
    case BRANCH_ADD_SUCCESS:
      return { loading: false, success: true, branch: action.payload };
    case BRANCH_ADD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const deleteBranchReducer = (
  state = {
    branch: {},
  },
  action
) => {
  switch (action.type) {
    case BRANCH_DELETE_REQUEST:
      return { loading: true };
    case BRANCH_DELETE_SUCCESS:
      return { loading: false, success: true, branch: action.payload };
    case BRANCH_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export { branchListReducer, addBranchReducer, deleteBranchReducer };
