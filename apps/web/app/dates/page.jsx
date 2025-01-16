import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { useState, useCallback } from "react";
import Snackbar from "@mui/material/Snackbar";
import { Button, CircularProgress } from "@mui/material";

const ProductList = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // Fetch paginated posts
  const postQuery = useQuery({
    queryKey: ["posts", page],
    queryFn: async () => {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${pageSize}`
      );
      return response.data;
    },
    placeholderData: keepPreviousData, // Keep old data while fetching new page data
  });

  // Set up the delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const response = await axios.delete(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      return response;
    },
    onSuccess: (id) => {
      queryClient.invalidateQueries(["posts"]);
      queryClient.setQueryData(["posts",page],(currentElem) => {
        return currentElem.filter((post)=> post.id !== id)
      })
    },
  });

  const deleteTask = useCallback((id) => {
    deleteMutation.mutate(id);
    setOpen(true);
  }, [deleteMutation]);

  const handleClose = useCallback((event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  }, []);

  const nextPage = () => setPage((old) => old + 1);
  const prevPage = () => setPage((old) => (old > 1 ? old - 1 : old));

  if (postQuery.isLoading) return <CircularProgress color="white" />;

  return (
    <div>
      <h1 style={{ textDecoration: "underline", marginBottom: "30px" }}>Product List</h1>

      {postQuery.data.length < pageSize && (
        <>
          <h2 style={{ color: "red" }}>⚠︎ No Data Found ⚠︎</h2>
          <h3 style={{ color: "wheat" }}>Please Go To Previous Page...</h3>
        </>
      )}

      {postQuery.data.map((item) => (
        <div key={item.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
          <h3 style={{ overflow: "hidden", marginRight: "30px" }}>
            {item.id}) {item.title}
          </h3>
          <Button
            sx={{ border: "1px solid wheat", color: "wheat" }}
            onClick={() => deleteTask(item.id)}
            disabled={deleteMutation.isLoading}
          >
            {deleteMutation.isLoading ? "Deleting..." : "Delete"}
          </Button>
        </div>
      ))}

      {/* Pagination controls */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px", alignItems: "center" }}>
        {page > 1 && (
          <Button onClick={prevPage} sx={{ border: "1px solid wheat", color: "wheat" }}>
            Previous
          </Button>
        )}
        {postQuery.data.length >= pageSize && (
          <>
            <h2 style={{ marginLeft: "10px", marginRight: "10px" }}>{page}</h2>
            <Button onClick={nextPage} sx={{ border: "1px solid wheat", color: "wheat" }}>
              Next
            </Button>
          </>
        )}
      </div>

      <Snackbar
        open={open}
        onClose={handleClose}
        autoHideDuration={2000}
        message="Delete Successfully!"
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        ContentProps={{
          sx: {
            border: "1px solid black",
            borderRadius: "40px",
            color: "black",
            bgcolor: "lightgreen",
            fontWeight: "bold",
            textAlign: "center",
            width: "100%",
            "& .MuiSnackbarContent-message": {
              width: "inherit",
              textAlign: "center",
              fontSize: "large",
            },
          },
        }}
      />
    </div>
  );
};

export default ProductList;
