export async function getHTTPrequest(url: string) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("there is an error fetching data in the res.ok");
  }
  // Could use a 3rd-party called "zod" to validate data and get automatic type inference
  // You get more type safety if you use unknown for the data
  const data = (await res.json()) as unknown;
  console.log(data);
  return data;
}
