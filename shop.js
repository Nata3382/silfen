const urlParams = new URLSearchParams(window.location.search);
const cat = urlParams.get("cat");

fetch("https://kea21-ed2b.restdb.io/rest/bags/_meta", {
  method: "GET",
  headers: {
    "x-apikey": "606d5e92f553500431007501",
  },
})
  .then((res) => res.json())
  .then((response) => {
    buildNav(response);
  })
  .catch((err) => {
    console.error(err);
  });

function buildNav(data) {
  console.log(data);
  console.log(data.fields[6].properties.option_list);
  const categories = data.fields[6].properties.option_list.split(","); //lacj til nr. 6
  categories.forEach((bagtype) => {
    //lacj
    bagtype = bagtype.trim(); //lacj
    console.log(bagtype);
    const templateLi = document.querySelector(".navLi").content;
    const copyLi = templateLi.cloneNode(true);

    const aEl = copyLi.querySelector("a");
    aEl.href += `?cat=${bagtype}`;
    aEl.textContent = bagtype;
    //lacj
    document.querySelector(".nav_links ul").appendChild(copyLi);
  });
  loadProducts();
}

function loadProducts() {
  let url;
  if (cat) {
    url = `https://kea21-ed2b.restdb.io/rest/bags?q={"type" : {"$in" : ["${cat}"]}}`; //lacj
  } else {
    url = `https://kea21-ed2b.restdb.io/rest/bags`;
  }

  fetch(url, {
    method: "GET",
    headers: {
      "x-apikey": "606d5e92f553500431007501",
    },
  })
    .then((res) => res.json())
    .then((response) => {
      showProducts(response);
    })
    .catch((err) => {
      console.error(err);
    });

  function showProducts(products) {
    console.log(products);
    const template = document.querySelector("#bag_template").content;
    products.forEach((product) => {
      const copy = template.cloneNode(true);
      copy.querySelector("a").href += `?id=${product._id}`;
      copy.querySelector(".img_wrapper a img").src = `${product.image}`;
      copy.querySelector("h2.bag_title").textContent = product.name;
      copy.querySelector("p span").textContent = product.price;
      const parent = document.querySelector(".products");
      parent.appendChild(copy);
    });
  }
}
