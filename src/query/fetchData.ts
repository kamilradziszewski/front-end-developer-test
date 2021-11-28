export const fetchData = async () => {
  const response = await fetch(
    "https://vitl-static-api.s3-eu-west-1.amazonaws.com/fe-test.json"
  );
  return response.json();
};
