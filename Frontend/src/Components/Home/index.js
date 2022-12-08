import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import CreateIngredentModal from "./Modal/CreateModal";
import { axiosRequest } from "../../utils/request";
import { toast } from "react-toastify";
import { url } from "../../utils/url";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import EditIngredent from "./Modal/EditIngredent";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Index() {
  const { id } = useParams();
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState({ open: false, data: "" });
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
    <div style={{ background: "whiteSmoke", minHeight: "97vh" }}>
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
        {!isLoading && (
          <Box sx={{ flexGrow: 1, p: 3, textAlign: "start" }}>
            <Grid container spacing={1} height="97vh">
              <Grid container direction="column" spacing={5}>
                <Grid item >
                  {ingredent?.map((res) => (
                    <Item key={res._id} style={{margin: '10px 0'}}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: '0 20px',
                         
                        }}
                      >
                        <div >{res.ingredent}</div>
                        <div>
                          <ModeEditOutlineIcon
                            onClick={() =>
                              setOpenEdit({ open: true, data: res })
                            }
                          />
                        </div>
                      </div>
                    </Item>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Box>
        )}
      </Grid>
      {open && (
        <CreateIngredentModal
          open={open}
          setOpen={setOpen}
          handleGetIngredent={handleGetIngredent}
        />
      )}
      {openEdit.open && (
        <EditIngredent
          open={openEdit}
          setOpen={setOpenEdit}
          handleGetIngredent={handleGetIngredent}
        />
      )}
    </div>
  );
}

export default Index;
