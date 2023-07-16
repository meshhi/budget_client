import ReactDOM from "react-dom";
import { MaterialReactTable } from "material-react-table";
import React, { useMemo, useEffect, useState } from "react";

const TableMaterial = ({data}) => {
  console.log(data[0])
  const columns = [
    {
      accessorKey: 'id', //access nested data with dot notation
      header: 'ID',
      size: 150,
    },
    {
      accessorKey: 'title', //access nested data with dot notation
      header: 'Title',
    },
    {
      accessorKey: 'summary', //access nested data with dot notation
      header: 'summary',
    },
    {
      accessorKey: 'isIncome', //access nested data with dot notation
      header: 'isIncome',
    },
    {
      accessorKey: 'createdAt', //access nested data with dot notation
      header: 'createdAt',
    },
  ]

  return <MaterialReactTable columns={columns} data={data} />;
};

export default TableMaterial;
