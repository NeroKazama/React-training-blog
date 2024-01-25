import { useState, useEffect } from "react";

const useFetch = (url) => {

  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {

    const abortCont = new AbortController();

    fetch(url, { signal: abortCont.signal})
      .then((res) => {
        if (!res.ok) {
          throw Error("Error, something happened");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setIsPending(false);
        setError(false);
      })
      .catch((err) => {
        if(err.name === 'AbortError') {
          console.log("aborted")
        } else {
          setIsPending(false);
          setError(err);
        }

      });

      return () => abortCont.abort();
  }, [url]);

  return {data, isPending, error}
};

export default useFetch;