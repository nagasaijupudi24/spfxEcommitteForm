/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as React from "react";
// import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
// import { Button } from "@progress/kendo-react-buttons";

const FileAttatchmentTable = (props: any) => {
  //    const {fieldData} = props

  const gridData = props.data;

  // Function to handle removing a data item from the grid
  console.log(gridData);

  return (
    <div style={{ overflow: "auto" }}>
      <table style={{ minWidth: "800px", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th
              style={{
                width: "120px",
                border: "1px solid #ddd",
                padding: "8px",
              }}
            >
              Document link
            </th>
            <th
              style={{
                width: "120px",
                border: "1px solid #ddd",
                padding: "8px",
              }}
            >
              Attached By
            </th>
            <th
              style={{
                width: "120px",
                border: "1px solid #ddd",
                padding: "8px",
              }}
            >
              Attached Date
            </th>
          </tr>
        </thead>
        <tbody>
          {gridData.map((item:any, index:any) => (
            <tr key={index}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <a href={item.fileUrl} download>
                  {item.name}
                </a>
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {item.modifiedBy}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {item.createData}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FileAttatchmentTable;
