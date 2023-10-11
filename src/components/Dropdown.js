import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Arrow from "../images/arrow.svg";

export default function Dropdown({ isDarkMode }) {
  const [selectedFont, setSelectedFont] = React.useState("");

  const handleChange = (event) => {
    setSelectedFont(event.target.value);
  };

  React.useEffect(() => {
    const fontFamilies = {
      "": "monospace", // Use the default font for the "Mono" option
      10: "serif", // Change this to the actual font family you want for "Serif"
      20: "sans-serif", // Change this to the actual font family you want for "Sans Serif"
    };
    document.body.style.fontFamily = fontFamilies[selectedFont];
  }, [selectedFont]);

  return (
    <div>
      <div>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Select
            value={selectedFont}
            onChange={handleChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            IconComponent={() => (
              <img src={Arrow} alt="" style={{ marginRight: "1.3rem" }} />
            )}
            sx={{
              border: "none", // Remove the border
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none", // Remove the outline border
              },

              color: isDarkMode ? "white" : "black",
              fontWeight: "bold",

              fontFamily: "unset",
            }}
          >
            <MenuItem
              value=""
              sx={{ "&:hover": { color: "rgb(164, 69, 237)" } }}
            >
              <em>Mono</em>
            </MenuItem>
            <MenuItem
              value={10}
              sx={{ "&:hover": { color: "rgb(164, 69, 237)" } }}
            >
              Serif
            </MenuItem>
            <MenuItem
              value={20}
              sx={{ "&:hover": { color: "rgb(164, 69, 237)" } }}
            >
              Sans Serif
            </MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
}
