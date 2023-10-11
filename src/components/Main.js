import React from "react";
import {
  Box,
  Button,
  Container,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import Spinner from "./Spinner";

import useFetch from "../sources/useFetch";
import search from "../images/icon-search.svg";
import Details from "./Details";
const Main = ({ isDarkMode }) => {
  const [inputError, setInputError] = useState(false);
  const [initial, setinitial] = useState(true);
  const [query, setQuery] = useState("");

  const [data, fetchData, error404, loading] = useFetch(query);

  const handleChange = (e) => {
    setQuery(e.target.value);
    setInputError(false);
  };

  const handleSearch = () => {
    if (query) {
      fetchData(query);
    } else {
      setInputError("Whoops, can't be empty...");
    }
    setinitial(false);
  };

  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioArray, setAudioArray] = useState(Array(data.length).fill(null));

  const createAudioObjects = () => {
    const audioArray = data.flatMap((item) => {
      const phonetics = item.phonetics || [];
      return phonetics.map((phonetic) => {
        if (phonetic.audio) {
          const audio = new Audio(phonetic.audio);
          return audio;
        }
        return null;
      });
    });
    setAudioArray(audioArray);
  };

  // Load audio objects when data changes
  useEffect(() => {
    if (data.length > 0) {
      createAudioObjects();
    }
  }, [data]);

  // Function to play audio
  const playAudio = (index) => {
    if (audioArray[index] !== undefined && audioArray[index] !== null) {
      const audio = audioArray[index];
      if (!audioPlaying) {
        audio.play();
        setAudioPlaying(true);
        audio.addEventListener("ended", () => {
          setAudioPlaying(false);
        });
      } else {
        audio.pause();
        audio.currentTime = 0; // Reset audio to the beginning
        setAudioPlaying(false);
      }
    }
  };

  return (
    <div>
      <Box>
        {/* Search Input */}
        <Container maxWidth="sm" sx={{ marginTop: "2rem" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TextField
              id="outlined-basic"
              variant="outlined"
              placeholder="Search for any word"
              sx={{
                background: isDarkMode ? "rgb(31, 31, 31)" : "white",
                width: "100%",
                borderRadius: "50px",
                fontWeight: "bold",
                border: "1px solid #7772",
                fontSize: "20px",
                caretColor: "rgb(164, 69, 237)",
                "& .MuiOutlinedInput-root": {
                  border: `1px solid ${
                    inputError ? "rgba(255, 82, 82, 1)" : "#7772"
                  }`,
                  color: isDarkMode ? "white" : "black",
                  fontWeight: "bold",
                  borderRadius: "50px",
                  fieldset: {
                    border: "none",
                  },
                },

                "& .Mui-focused": {
                  border: "1px solid rgba(164, 69, 237, 1)",
                },
              }}
              value={query}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      onClick={handleSearch}
                      sx={{ borderRadius: "50px", padding: "1rem" }}
                    >
                      <img src={search} alt="Search Icon" />
                    </Button>
                  </InputAdornment>
                ),
                sx: {
                  "& .MuiOutlinedInput-root": {
                    border: "none",
                    fieldset: {
                      border: "none",
                    },
                  },
                },
              }}
            />
          </Box>

          {loading && <Spinner />}
          <Typography
            sx={{
              marginLeft: "1rem",
              marginTop: ".6rem",
              color: "rgba(255, 82, 82, 1)",
            }}
          >
            {inputError}
          </Typography>
        </Container>
        {initial ? (
          " "
        ) : (
          <Box>
            {!loading && error404 && data.length < 1 ? (
              <Container maxWidth="sm" sx={{ marginTop: "6rem" }}>
                <>
                  <Box
                    sx={{
                      fontSize: "5rem",
                      textAlign: "center",
                      marginBottom: "1rem",
                    }}
                  >
                    😕
                  </Box>

                  <Typography
                    variant="h5"
                    sx={{
                      color: isDarkMode ? "white" : "rgb(45, 45, 45)",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    No Definitions Found
                  </Typography>
                  <Typography
                    sx={{
                      textAlign: "center",
                      color: "rgba(117, 117, 117)",
                      marginTop: "1rem",
                    }}
                  >
                    Sorry pal, we couldn't find definitions for the word you
                    were looking for. You can try the search again at a later
                    time or head to the web instead.
                  </Typography>
                </>
              </Container>
            ) : (
              // Display Word Details

              <>
                {data.length > 0 && (
                  <>
                    <Details
                      data={data}
                      playAudio={playAudio}
                      isDarkMode={isDarkMode}
                      audioArray={audioArray}
                    />
                  </>
                )}
              </>
            )}
          </Box>
        )}
      </Box>
    </div>
  );
};

export default Main;
