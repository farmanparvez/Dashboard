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
import { url } from "../utils/url";
import Pagination from '@mui/material/Pagination';

export default function BasicList() {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [pagination, setPagination] = React.useState({ page: 1, limit: 6});
  const navigate = useNavigate()
  const count = Math.round(data?.count/6)
console.log(count)
  React.useEffect(() => {
    handleGetDish(pagination);
    return setPagination({ page: 1, limit: 6})
  }, []);

  const handleGetDish = async (pagination) => {
    try {
      setIsLoading(true);
      const res = await axiosRequest(`${url}api/dish?page=${pagination?.page}&limit=${pagination?.limit}`, "get");
      setData(res);
    } catch (error) {
      const message =
        error?.response?.data?.message || error?.message || error.toString();
      toast(message);
    }
    setIsLoading(false);
  };
  function handlePagination(_,page) {
    console.log(page)
    setPagination({ page, limit: 6 })
    handleGetDish({ page, limit: 6 });
  }

  return (
    <>
      <Box
        sx={{
          width: "100%",
          maxWidth: 360,
          minHeight: "92vh",
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
                data?.data?.map((res) => (
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
      <div >
        <Pagination onChange={handlePagination} count={count && count || 1} variant="outlined" shape="rounded" />
      </div>
      {open && <CreateDishModal open={open} setOpen={setOpen} handleGetDish={handleGetDish} pagination={pagination} />}
    </>
  );
}
