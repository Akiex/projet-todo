let url = "https://dummyjson.com/todos?limit=12"

async function info() {
    let url = "https://dummyjson.com/todos?limit=12"
    let response = await fetch(url);

    let data = await response.json()

    return data;


}