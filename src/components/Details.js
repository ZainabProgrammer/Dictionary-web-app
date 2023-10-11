import React from "react";
import playIcon from "../images/icon-play.svg";
import goIcon from "../images/icon-new-window.svg";
import { Box, CardContent, Container, Typography } from "@mui/material";
const Details = ({ data, playAudio, isDarkMode, audioArray }) => {
  return (
    <div>
      <Container
        maxWidth="sm"
        style={{
          width: "100%",
          height: "100vh",
          position: "relative",
        }}
      >
        {data.map((e, index) => {
          const hasAudio = audioArray[index] !== null;
          return (
            <CardContent key={index} sx={{ overflowX: "hidden" }}>
              {e.phonetic && hasAudio && (
                <Box
                  sx={{
                    position: "absolute",
                    top: "3%",
                    right: "7%",
                    cursor: "pointer",
                  }}
                  onClick={() => playAudio(index)}
                >
                  <img src={playIcon} width={48} alt="Play Icon" />
                </Box>
              )}

              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: 32,
                  color: isDarkMode ? "white" : " 2D2D2D",
                }}
                gutterBottom
              >
                {e.word}
              </Typography>
              <Typography
                variant="h5"
                style={{
                  color: "rgba(164, 69, 237, 1)",
                  marginTop: "-0.6rem",
                  fontSize: "18px",
                  letterSpacing: "1px",
                }}
                component="div"
              >
                {e.phonetic}
              </Typography>
              {e.meanings[0] && e.meanings[0].partOfSpeech && (
                <Typography
                  style={{
                    color: isDarkMode ? "white" : "rgba(45, 45, 45, 1)",
                    fontWeight: "bold",
                    margin: "1rem 0rem",
                    display: "flex",
                    width: "100%",
                    gap: 12,
                  }}
                  // variant="div"
                >
                  {e.meanings[0].partOfSpeech}
                  <Typography
                    id="line"
                    sx={{
                      width: "100%",
                      height: "1px",
                      marginTop: ".7rem",
                      background: "rgba(233, 233, 233, 1)",
                    }}
                    variant="div"
                  ></Typography>
                </Typography>
              )}

              <Typography
                sx={{
                  color: "rgba(117, 117, 117, 1)",
                }}
              >
                Meaning
              </Typography>
              <Typography
                sx={{
                  fontSize: "12px",
                }}
                className="list"
                variant="div"
              >
                <ul>
                  {e.meanings[0].definitions.map((definition, index) => (
                    <li
                      key={index}
                      style={{
                        color: isDarkMode ? "white" : "rgba(45, 45, 45, 1)",
                      }}
                    >
                      {definition.definition} <br />
                    </li>
                  ))}
                </ul>
              </Typography>
              {e.meanings[0].synonyms && e.meanings[0].synonyms.length > 0 ? (
                <Typography
                  sx={{
                    mb: 1.5,
                    color: "rgba(117, 117, 117, 1)",
                    display: "flex",
                    flexWrap: "wrap",
                  }}
                >
                  Synonyms{" "}
                  <Typography
                    variant="span"
                    sx={{
                      color: "rgba(164, 69, 237, 1)",
                      fontWeight: "bold",
                      paddingLeft: "1rem",
                      display: "flex",
                      gap: 3,
                      whiteSpace: "normal",
                      flexWrap: "wrap",
                    }}
                  >
                    {e.meanings[0].synonyms.map((synonym, index) => (
                      <span key={index}>{synonym}</span>
                    ))}
                  </Typography>
                </Typography>
              ) : (
                ""
              )}
              {e.meanings[1] && e.meanings[1].partOfSpeech && (
                <>
                  <Typography
                    style={{
                      color: isDarkMode ? "white" : "rgba(45, 45, 45, 1)",
                      fontWeight: "bold",
                      margin: "1rem 0rem",
                      display: "flex",
                      width: "100%",
                      gap: 12,
                    }}
                    variant="div"
                  >
                    {e.meanings[1].partOfSpeech}
                    <Typography
                      id="line"
                      sx={{
                        width: "100%",
                        height: "1px",
                        marginTop: ".7rem",
                        background: "rgba(233, 233, 233, 1)",
                      }}
                    ></Typography>
                  </Typography>
                  <Typography
                    sx={{
                      color: "rgba(117, 117, 117, 1)",
                    }}
                  >
                    Meaning
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "12px",
                      borderBottom: " 1px solid rgba(233, 233, 233, 1)",
                    }}
                    className="list"
                    variant="div"
                  >
                    <ul>
                      {e.meanings[1].definitions.map((definition, index) => (
                        <li
                          key={index}
                          style={{
                            color: isDarkMode ? "white" : "rgba(45, 45, 45, 1)",
                          }}
                        >
                          {definition.definition} <br />
                          {definition.example && (
                            <Typography
                              sx={{
                                color: "rgba(117, 117, 117, 1)",
                                fontSize: "14px",
                              }}
                            >
                              "{definition.example}"
                            </Typography>
                          )}
                        </li>
                      ))}
                    </ul>
                  </Typography>
                </>
              )}

              {/* Source */}
              <Box
                sx={{
                  color: "rgba(117, 117, 117, 1)",
                  marginTop: "2rem",
                }}
              >
                <Typography sx={{ textDecoration: "underline" }}>
                  Source
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    marginTop: ".5rem",
                    color: "rgba(45, 45, 45, 1)",
                    textDecoration: "underline",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    justifyContent: "start",
                    flexWrap: "wrap",
                  }}
                >
                  <a
                    href={e.sourceUrls}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      color: isDarkMode ? "white" : "rgba(45, 45, 45, 1)",
                      whiteSpace: "normal",
                    }}
                  >
                    {e.sourceUrls}
                  </a>
                  <Typography variant="div">
                    <img src={goIcon} alt="Go Icon" />
                  </Typography>
                  <br />
                </Typography>
              </Box>
            </CardContent>
          );
        })}
      </Container>
    </div>
  );
};

export default Details;
