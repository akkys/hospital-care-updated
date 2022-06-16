import Axios from "axios";
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

const listBranches = () => async (dispatch) => {
  try {
    dispatch({ type: BRANCH_LIST_REQUEST });

    const { data } = await Axios.get("/branches/");
    dispatch({ type: BRANCH_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: BRANCH_LIST_FAIL, payload: error });
  }
};

const addBranch = (branch) => async (dispatch, getState) => {
  try {
    dispatch({ type: BRANCH_ADD_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    if (!branch._id) {
      const { data } = await Axios.post("/branches/add", branch, {
        headers: {
          "x-auth-token": userInfo.token,
        },
      });
      dispatch({ type: BRANCH_ADD_SUCCESS, payload: data });
    } else {
      const { data } = await Axios.post(
        "/branches/update/" + branch._id,
        branch,
        {
          headers: {
            "x-auth-token": userInfo.token,
          },
        }
      );
      dispatch({ type: BRANCH_ADD_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({ type: BRANCH_ADD_FAIL, payload: error.response.data.msg });
  }
};

const deleteBranch = (branchId) => async (dispatch, getState) => {
  try {
    dispatch({ type: BRANCH_DELETE_REQUEST, payload: branchId });
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.delete("/branches/" + branchId, {
      headers: {
        "x-auth-token": userInfo.token,
      },
    });
    dispatch({ type: BRANCH_DELETE_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({ type: BRANCH_DELETE_FAIL, payload: error.message });
  }
};

export { listBranches, addBranch, deleteBranch };
