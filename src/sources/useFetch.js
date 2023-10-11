import axios from "axios";
import { useState } from "react";

const useFetch = () => {
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(false);
  const [error404, seterror404] = useState(false);

  const fetchData = async (query) => {
    try {
      setloading(true);
      const response = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${query}`
      );

      setdata(response.data);
      setloading(false);
    } catch (error) {
      setloading(false);
      if (error.message === "Request failed with status code 404") {
        seterror404(true);
        setloading(false);
        setdata([]);
      }
    }
  };

  return [data, fetchData, setdata, loading, setloading, error404];
};

export default useFetch;
