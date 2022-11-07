let url="https://makeup-api.herokuapp.com/api/v1/products.json"
let products;
var currentPageId=1

async function getProductsData()
{
    let data = await fetch(url)
    products = await data.json()
    showProducts(products,currentPageId)
    showPagination(products)

}
getProductsData()

let mainProductsDiv=document.getElementById("mainProductsDiv")
function showProducts(products,pageNo)
{
  console.log(pageNo)
  mainProductsDiv.innerHTML = "";
  console.log(products.length);
  var start = (pageNo-1)*100
  var end = (pageNo)*100
  if(end > products.length)
  {
    end = products.length
  }
  var products1=products.slice(start,end)
  products1.map((element) => {
    var productDiv = document.createElement("div");
    productDiv.classList.add("col", "product");
    console.log(element);
    productDiv.innerHTML = `       
        <div class="card h-100">
        <img src=${element.image_link}     
        alt="">
        <div class="card-body m-1 p-0">
            <h5 class="card-title p-1 w-100 text-center ">${element.name}</h5>
            <h6 class="card-subtitle mb-2"> Brand : ${element.brand}</h6>
            <h6 class="card-subtitle mb-2"><span >${element.price_sign + element.price}</span></h6>
            <a href=${element.product_link} target="_blank" class="card-link">${element.name}</a>
            <p class="card-text overflow">${element.description}</p>
        </div>
      </div>
        
        `
        mainProductsDiv.append(productDiv)
  });

}

function showPagination(products) {
  var noOfPages = Math.ceil(products.length / 100)
  var paginationDiv = document.getElementById("paginationDiv")
  var previous = document.getElementById("previous")
  var pageList = "";
  for (var pageNo = 1; pageNo <= noOfPages; pageNo++) {
    pageList = pageList + `<li class="page-item"><button type="button" class="btn btn-link" onclick="getProductsByPageNo(${pageNo})">${pageNo}</button></li>`
  }
  var previousStatus = ""
  if (currentPageId == 1) {
    previousStatus = "disabled"
  }
  var nextStatus = ""
  if (currentPageId == noOfPages) {
    nextStatus = "disabled"
  }
  paginationDiv.innerHTML = `
          <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
              <li class="page-item "><button type="button" class="btn btn-link ${previousStatus}" onclick="getProductsByPageNo(${currentPageId - 1})">Previous</button></li>
              ${pageList}
              <li class="page-item "><button type="button" class="btn btn-link ${nextStatus}" onclick="getProductsByPageNo(${currentPageId + 1})">Next</button></li>
            </ul>
          </nav>
  `
}

function getProductsByPageNo(pageNo)
{
  currentPageId=pageNo
  showProducts(products,pageNo)
  showPagination(products)
}