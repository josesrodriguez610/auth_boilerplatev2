import React from "react";
import Button from "@mui/material/Button";
import Spinner from "../Spinner/Spinner";

const ButtonDefault = ({ title, loading }) => {
  return (
    <>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        {loading ? <Spinner /> : title}
      </Button>
    </>
  );
};

export default ButtonDefault;
