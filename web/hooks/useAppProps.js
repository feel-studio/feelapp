import { useState, useEffect } from "react";
import { getAppProps } from "@/lib/get";

function useFetch(queries, queryParams) {
  const [data, setData] = useState({});

  async function fetchUrl() {
    const res = await getAppProps(queries, queryParams, false);

    setData(res);
  }
  useEffect(() => {
    fetchUrl();
  }, []);

  return data;
}
export default useFetch;
