import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Search from "./Search";
import CreateDishModal from "../Components/Model/CreateDishModal";
import { toast } from "react-toastify";
import { axiosRequest } from "../utils/request";
import CircularProgress from "@mui/material/CircularProgress";
import { Link, useNavigate } from "react-router-dom";

export default function BasicList() {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState([]);
  const navigate = useNavigate()

  React.useEffect(() => {
    handleGetDish();
  }, []);

  const handleGetDish = async () => {
    try {
      setIsLoading(true);
      const res = await axiosRequest("api/dish", "get");
      setData(res.data);
    } catch (error) {
      const message =
        error?.response?.data?.message || error?.message || error.toString();
      toast(message);
    }
    setIsLoading(false);
  };
  // function handleClick(id) {
  //   navigate('dish/' + id)
  // }

  return (
    <>
      <Box
        sx={{
          width: "100%",
          maxWidth: 360,
          minHeight: 100,
          bgcolor: "background.paper",
        }}
      >
        <Grid
          p
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          Dishes
          <Button
            onClick={() => setOpen(true)}
            variant="text"
            startIcon={<AddIcon />}
            variant="outlined"
          >
            Create
          </Button>
          <Search />
        </Grid>
        <Divider />
        <nav aria-label="secondary mailbox folders">
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <List>
              {isLoading && <CircularProgress />}
              {!isLoading &&
                data?.map((res) => (
                  <ListItem key={res._id} disablePadding>
                  <Link to={`dish/${res._id}`}>
                    <ListItemButton >
                      <ListItemText primary={res.dishName} />
                    </ListItemButton>
                  </Link>
                  </ListItem>
                ))}
            </List>
          </Grid>
        </nav>
      </Box>
      {open && <CreateDishModal open={open} setOpen={setOpen} handleGetDish={handleGetDish} />}
    </>
  );
}
