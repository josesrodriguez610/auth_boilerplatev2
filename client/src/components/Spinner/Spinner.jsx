import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {},
});

export default function Spinner() {
  const classes = useStyles();

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <CircularProgress size={35} className={classes.root} />
    </Box>
  );
}
