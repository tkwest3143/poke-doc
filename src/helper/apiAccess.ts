export const apiAccess = async <responseType>(
  url: string,
  method: string,
  body?: string
) => {
  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });
  const data = await res.json();

  if (res.status !== 200) {
    console.log("error");
    throw new Error(data.message);
  }
  return data as responseType;
};
