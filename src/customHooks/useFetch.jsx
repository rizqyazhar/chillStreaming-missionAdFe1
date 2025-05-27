import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(url)
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Sorry something went wrong");
        setLoading(false);
      });
  }, [url]);
  return { users, error, loading };
};

export default useFetch;
