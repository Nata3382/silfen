const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const url = "https://kea21-ed2b.restdb.io/rest/bags/" + id;
console.log(url);
fetch(url, {
  method: "GET",
  headers: {
    "x-apikey": "606d5e92f553500431007501",
  },
})
  .then((res) => res.json())
  .then((response) => {
    console.log(response);
    showSingleProduct(response);
  })
  .catch((err) => {
    console.error(err);
  });

function showSingleProduct(product) {
  console.log(product);

  document.querySelector(".gallery img").src = `${product.image}`;
  document.querySelector("h1").textContent = product.name;
  document.querySelector("h2").textContent = product.price + " DKK";
  document.querySelector("p").textContent = product.description;
}
