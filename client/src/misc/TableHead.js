import React from "react";

const TableHead = ({ contents, data, style }) => {
  return (
    <>
      <table className="table table-responsive-lg">
        <thead className="thead-light">
          <tr style={{ textAlign: `${style}` }}>
            {contents.map((content, i) => (
              <th key={i} scope="col">
                {content}
              </th>
            ))}
          </tr>
        </thead>
        {data}
      </table>
    </>
  );
};

export default TableHead;
