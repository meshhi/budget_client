import ReactDOM from "react-dom";
import { MaterialReactTable } from "material-react-table";
import React, { useMemo, useEffect, useState, useCallback } from "react";
import {
  Box,
  Tooltip,
} from "@mui/material";
import Button from "../UI/Button";
import { BsPlus } from "react-icons/bs";

const TableMaterial = ({ data, callback }) => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [rowSelection, setRowSelection] = useState({});

  const columns = [
    {
      accessorKey: "id", //access nested data with dot notation
      header: "ID",
      size: 150,
    },
    {
      accessorKey: "title", //access nested data with dot notation
      header: "Название",
    },
    {
      accessorKey: "summary", //access nested data with dot notation
      header: "Сумма",
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
      header: "Доход",
    },
    {
      accessorKey: "createdAt", //access nested data with dot notation
      header: "Дата создания",
    },
  ];

  return (
    <MaterialReactTable
      displayColumnDefOptions={{
        "mrt-row-actions": {
          muiTableHeadCellProps: {
            align: "center",
          },

          size: 120,
        },
      }}
      renderRowActions={({ row, table }) => (
        <div sx={{ display: "flex", gap: "1rem" }}>
            <div onClick={() => {
                // table.setEditingRow(row)
                console.log(1)
              }
            }>
              Edit
            </div>

            <div onClick={() => {
                console.log(2)
              }}>
              Delete
            </div>
        </div>
      )}
      renderTopToolbarCustomActions={() => (
        <Button
          callback={callback}
          // title={<svg xmlns="http://www.w3.org/2000/svg" height="2rem" viewBox="0 0 640 512"><path fill="#fff" d="M535 41c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l64 64c4.5 4.5 7 10.6 7 17s-2.5 12.5-7 17l-64 64c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l23-23L384 112c-13.3 0-24-10.7-24-24s10.7-24 24-24l174.1 0L535 41zM105 377l-23 23L256 400c13.3 0 24 10.7 24 24s-10.7 24-24 24L81.9 448l23 23c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L7 441c-4.5-4.5-7-10.6-7-17s2.5-12.5 7-17l64-64c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9zM96 64H337.9c-3.7 7.2-5.9 15.3-5.9 24c0 28.7 23.3 52 52 52l117.4 0c-4 17 .6 35.5 13.8 48.8c20.3 20.3 53.2 20.3 73.5 0L608 169.5V384c0 35.3-28.7 64-64 64H302.1c3.7-7.2 5.9-15.3 5.9-24c0-28.7-23.3-52-52-52l-117.4 0c4-17-.6-35.5-13.8-48.8c-20.3-20.3-53.2-20.3-73.5 0L32 342.5V128c0-35.3 28.7-64 64-64zm64 64H96v64c35.3 0 64-28.7 64-64zM544 320c-35.3 0-64 28.7-64 64h64V320zM320 352a96 96 0 1 0 0-192 96 96 0 1 0 0 192z"/></svg>}
          title={<BsPlus size='2rem'></BsPlus>}
          success={true}
          customClass={'add_button'}
        >
        </Button>
      )}
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
            backgroundColor: row.original.isIncome ? "#65cccc" : "",
          },
        };
      }}
      state={{ rowSelection }}
      options={{
        rowStyle: (rowData) => {
          console.log(rowData);
          return { backgroundColor: "#FFFF00" };
        },
      }}
    />
  );
};

export default TableMaterial;
