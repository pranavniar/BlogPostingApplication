import { useState, useEffect } from "react";
import axios from "axios";

const useAxiosFetch = (dataUrl) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const source = axios.CancelToken.source();

    const fetchData = async (url) => {
      try {
        setLoading(true);
        const response = await axios.get(url, {
          cancelToken: source.token,
        });
        if (isMounted) {
          setData(response.data);

          setFetchError(null);
        }
      } catch (error) {
        if (isMounted) {
          setFetchError(error.message);
          setData([]);
        }
      } finally {
        if (isMounted) {
          setTimeout(() => setLoading(false), 2000);
        }
      }
    };
    fetchData(dataUrl);

    return () => {
      isMounted = false;
      source.cancel("Cancelling in cleanup");
    };
  }, [dataUrl]);
  return { data, loading, fetchError };
};

export default useAxiosFetch;
