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
