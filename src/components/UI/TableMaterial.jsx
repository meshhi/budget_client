import ReactDOM from "react-dom";
import { MaterialReactTable } from "material-react-table";
import React, { useMemo, useEffect, useState } from "react";

const TableMaterial = ({ data }) => {
  const [rowSelection, setRowSelection] = useState({});
  const columns = [
    {
      accessorKey: "id", //access nested data with dot notation
      header: "ID",
      size: 150,
    },
    {
      accessorKey: "title", //access nested data with dot notation
      header: "Title",
    },
    {
      accessorKey: "summary", //access nested data with dot notation
      header: "summary",
    },
    {
      accessorFn: (row) => {
        return row.isIncome ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 448 512"
          >
            <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 384 512"
          >
            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
          </svg>
        );
      },
      accessorKey: "isIncome", //access nested data with dot notation
      header: "isIncome",
    },
    {
      accessorKey: "createdAt", //access nested data with dot notation
      header: "createdAt",
    },
  ];

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableColumnOrdering
      enablePinning
      muiTableBodyCellProps={({ cell }) => ({
        onClick: (event) => {
          console.info(cell.getValue());
        },
        sx: {
          cursor: "pointer", //you might want to change the cursor too when adding an onClick
        },
      })}
      muiTableBodyRowProps={({ row }) => {
        console.log(row)
        return {
        //implement row selection click events manually
        onClick: () =>
          setRowSelection((prev) => ({
            ...prev,
            [row.id]: !prev[row.id],
          })),
        selected: rowSelection[row.id],
        sx: {
          cursor: "pointer",
          backgroundColor: row.original.isIncome ? '#65cccc' : ''
        },
      }}}
      state={{ rowSelection }}
      options={{
        rowStyle: rowData => {
          console.log(rowData)
          return {backgroundColor: '#FFFF00'};
        }}
      }
    />
  );
};

export default TableMaterial;
