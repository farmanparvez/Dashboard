import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { useRef } from "react";
import { axiosRequest } from "../../../utils/request";
import LoadingButton from "@mui/lab/LoadingButton";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify"
import { useParams } from "react-router-dom";
import { url } from "../../../utils/url";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ open, setOpen, handleGetIngredent }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const dishRef = useRef();
  const { id } = useParams();


  const handleCreateIngredent = async () => {
    console.log(dishRef?.current?.value);
    try {
      setIsLoading(true);
      const res = await axiosRequest(`${url}api/ingredent`, "post", {
        ingredent: dishRef?.current?.value,
        dishId: id
      });
      handleGetIngredent()
      toast(res.message);
      setOpen(false);
    } catch (error) {
      const message =
        error?.response?.data?.message || error?.message || error.toString();
      toast(message);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create Ingredent
          </Typography>
          {isLoading && (
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <CircularProgress />
            </Grid>
          )}
          {!isLoading && (
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Grid
                container
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
              >
                <TextField
                  inputRef={dishRef}
                  id="outlined-basic"
                  label="Ingredent Name"
                  variant="outlined"
                />
                <Button
                  loading={isLoading}
                  loadingPosition="start"
                  onClick={handleCreateIngredent}
                  variant="contained"
                >
                  Create
                </Button>
              </Grid>
            </Typography>
          )}
        </Box>
      </Modal>
    </div>
  );
}
