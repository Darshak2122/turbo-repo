import { Button } from "@mui/material";
import Link from "next/link";
import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";


const backButton = ({ href }: any) => {
  console.log("href", href);
  return (
    <div>
      <Button
        variant="outlined"
        sx={{
          borderRadius: "10px",
          marginBottom: "20px",
          color: "wheat",
          border: "1px solid wheat",
          marginTop: "40px",
        }}
      >
        <Link href={href}>
          <ArrowBackIcon sx={{ display: "flex", justifyContent: "center" }} />
        </Link>
      </Button>
    </div>
  );
};

export default backButton;
