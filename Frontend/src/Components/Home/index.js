import React from "react";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";

function Index() {
  const { id } = useParams();
  return (
    <div style={{background: 'whiteSmoke'}}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        {/* {isLoading && <CircularProgress />} */}
        <div>{id}</div>
      </Grid>
    </div>
  );
}

export default Index;
