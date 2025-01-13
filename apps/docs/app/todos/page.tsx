import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@mui/material";
import Link from "next/link";
import { TextFields } from "@repo/sheradcompo";

const TodoList = () => {
  return (
    <div>
      <Button
        variant="outlined"
        sx={{
          borderRadius: "10px",
          marginBottom: "20px",
          color: "wheat",
          border: "1px solid wheat",
          marginTop: "20px ",
        }}
      >
        <Link href="/">
          <ArrowBackIcon sx={{ display: "flex", justifyContent: "center" }} />
        </Link>
      </Button>
      <TextFields />
      <h1>Hello todos</h1>
    </div>
  );
};

export default TodoList;
