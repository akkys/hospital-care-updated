import Axios from "axios";
import {
  ROOM_LIST_REQUEST,
  ROOM_LIST_SUCCESS,
  ROOM_LIST_FAIL,
  ROOM_ADD_REQUEST,
  ROOM_ADD_SUCCESS,
  ROOM_ADD_FAIL,
  ROOM_DELETE_REQUEST,
  ROOM_DELETE_SUCCESS,
  ROOM_DELETE_FAIL,
} from "../constants/RoomConstants";

const listRooms = () => async (dispatch) => {
  try {
    dispatch({ type: ROOM_LIST_REQUEST });

    const { data } = await Axios.get("/rooms/");
    dispatch({ type: ROOM_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ROOM_LIST_FAIL, payload: error });
  }
};

const addRoom = (room) => async (dispatch, getState) => {
  try {
    dispatch({ type: ROOM_ADD_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    if (!room._id) {
      const { data } = await Axios.post("/rooms/add", room, {
        headers: {
          "x-auth-token": userInfo.token,
        },
      });
      dispatch({ type: ROOM_ADD_SUCCESS, payload: data });
    } else {
      const { data } = await Axios.post("/rooms/update/" + room._id, room, {
        headers: {
          "x-auth-token": userInfo.token,
        },
      });
      dispatch({ type: ROOM_ADD_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({ type: ROOM_ADD_FAIL, payload: error.response.data.msg });
  }
};

const deleteRoom = (roomId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ROOM_DELETE_REQUEST, payload: roomId });
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.delete("/rooms/" + roomId, {
      headers: {
        "x-auth-token": userInfo.token,
      },
    });
    dispatch({ type: ROOM_DELETE_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({ type: ROOM_DELETE_FAIL, payload: error.message });
  }
};

export { listRooms, addRoom, deleteRoom };
