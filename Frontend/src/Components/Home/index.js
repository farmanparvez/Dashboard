import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import CreateIngredentModal from "./Modal/index";
import { axiosRequest } from "../../utils/request";
import { toast } from "react-toastify";
import { url } from "../../utils/url";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

function Index() {
  const { id } = useParams();
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [ingredent, setIngredent] = React.useState([]);
  console.log(ingredent);
  console.log(data);
  useEffect(() => {
    handleGetIngredent();
  }, [id]);

  const handleGetIngredent = async () => {
    try {
      setIsLoading(true);
      const ingredent = await axiosRequest(`${url}api/ingredent/` + id, "get");
      const dish = await axiosRequest(`${url}api/dish/` + id, "get");
      setIngredent(ingredent.data);
      setData(dish.data);
    } catch (error) {
      const message =
        error?.response?.data?.message || error?.message || error.toString();
      toast(message);
    }
    setIsLoading(false);
  };

  return (
    <div style={{ background: "whiteSmoke" , minHeight:"97vh" }}>
      <Grid
        p
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        
      >
        {data?.dishName}
        <Button
          onClick={() => setOpen(true)}
          variant="text"
          startIcon={<AddIcon />}
          variant="outlined"
        >
          Create ingredent
        </Button>
      </Grid>
      <Divider />
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        height="97vh"
      >
        {isLoading && <CircularProgress />}
        {!isLoading && ingredent?.map(res => <div key={res._id}>{res.ingredent}</div>)}
      </Grid>
      {open && (
        <CreateIngredentModal
          open={open}
          setOpen={setOpen}
          handleGetIngredent={handleGetIngredent}
        />
      )}
    </div>
  );
}

export default Index;
