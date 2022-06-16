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

const roomListReducer = (
  state = {
    rooms: [],
  },
  action
) => {
  switch (action.type) {
    case ROOM_LIST_REQUEST:
      return { loading: true, rooms: [] };
    case ROOM_LIST_SUCCESS:
      return { loading: false, rooms: action.payload };
    case ROOM_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const addRoomReducer = (state = { room: {} }, action) => {
  switch (action.type) {
    case ROOM_ADD_REQUEST:
      return { loading: true };
    case ROOM_ADD_SUCCESS:
      return { loading: false, success: true, room: action.payload };
    case ROOM_ADD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const deleteRoomReducer = (
  state = {
    room: {},
  },
  action
) => {
  switch (action.type) {
    case ROOM_DELETE_REQUEST:
      return { loading: true };
    case ROOM_DELETE_SUCCESS:
      return { loading: false, success: true, room: action.payload };
    case ROOM_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export { roomListReducer, addRoomReducer, deleteRoomReducer };
