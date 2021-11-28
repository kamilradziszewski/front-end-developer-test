import React from "react";
import { useQuery } from "react-query";
import { fetchData } from "query/fetchData";

function Home() {
  const { status, data, isFetching, error } = useQuery("data", fetchData);

  return (
    <div>
      {status}
      <br />
      {isFetching}
      <br />
      {error}
      <br />
      {JSON.stringify(data)}
    </div>
  );
}

export default Home;
