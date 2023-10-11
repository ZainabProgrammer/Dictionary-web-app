import { Button, TextField } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";

const Search = () => {
  return (
    <div>
      <Container maxWidth="md">
        <TextField
          id="outlined-basic"
          label="Search here"
          variant="outlined"
          value={query}
          onChange={handleChange}
        />
        <Button onClick={handleSearch}>Search</Button>
      </Container>
    </div>
  );
};

export default Search;
