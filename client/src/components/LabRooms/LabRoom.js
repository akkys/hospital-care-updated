import React from "react";

const LabRoom = (props) => {
  const { room, openModal, deleteHandler } = props;

  return (
    <tbody>
      <tr style={{ textAlign: "center" }}>
        <td>
          <i
            onClick={() => openModal(room)}
            className="fa fa-square-o"
            style={{ cursor: "pointer" }}
          />
        </td>
        <td>{room.num}</td>
        <td>{room.name}</td>
        <td>{room.groups}</td>
        <td>{room.capacity}</td>
        <td>
          {room.fromTime} - {room.toTime}
        </td>
        <td>
          <i
            onClick={() => deleteHandler(room)}
            className="fa fa-trash fa-lg text-danger"
          />
        </td>
      </tr>
    </tbody>
  );
};

export default LabRoom;
