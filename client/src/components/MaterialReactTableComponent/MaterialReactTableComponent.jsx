import React from "react";
import MaterialReactTable from "material-react-table";
import Spinner from "../Spinner/Spinner";

const MaterialReactTableComponent = ({ columns, data, loading }) => {
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <MaterialReactTable
          columns={columns}
          data={data}
          initialState={{ pagination: { pageSize: 10 } }}
        />
      )}
    </>
  );
};

export default MaterialReactTableComponent;
