let url = "https://dummyjson.com/todos?limit=12";

async function info() {
  let url = "https://dummyjson.com/todos?limit=12";
  let response = await fetch(url);

  // JE FAIS UN TEST

  // Je fais un 2ème test
  let data = await response.json();

  return data;
}
