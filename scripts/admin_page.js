let display = document.querySelector(".display-main");
let bag = [];
let url = "https://6395eda290ac47c68077fa1c.mockapi.io/products/";
let cust_url="https://6395eda290ac47c68077fa1c.mockapi.io/users/";
let ord_url="https://6395eda290ac47c68077fa1c.mockapi.io/orders/";
let side_prod = document.querySelector(".nav-links li:nth-child(1)");
let side_add = document.querySelector(".nav-links li:nth-child(2)");
let side_cust = document.querySelector(".nav-links li:nth-child(3)");
let side_ord = document.querySelector(".nav-links li:nth-child(4)");
let search = document.querySelector(".search");
let searchbar = document.querySelector(".search-bar");




//----------------All addEventListeners-----------------//


window.addEventListener("load", () => {
  searchbar.style.visibility = "initial" ;
  fetchProducts(url);
});
side_prod.addEventListener("click", (e) => {
  e.preventDefault();
  searchbar.style.visibility = "initial" ;
  fetchProducts(url);
})
side_add.addEventListener("click", (e) => {
  e.preventDefault();
   searchbar.style.visibility = "initial" ;
  addForm();
  const form  = document.querySelector('.form-style-5 form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    let product_name = document.getElementById("title").value;
    let product_name2 = document.getElementById("name").value;
    let product_price = document.getElementById("price").value;
    let product_img = document.getElementById("img").value;
    let product_details = document.getElementById("details").value;
    let product_size = document.getElementById("size").value;
    let product_desc = document.getElementById("info").value;
    let product_color = document.getElementById("color").value;  
    addProducts(product_name,product_name2,product_price,product_img,product_details,product_size,product_desc,product_color,url);
});
})
side_cust.addEventListener("click", (e) => {
  e.preventDefault();
  searchbar.style.visibility = "hidden" ;
  fetchCutomers(cust_url);

})
side_ord.addEventListener("click", (e) => {
  e.preventDefault();
  searchbar.style.visibility = "hidden" ;
  console.log('orders')
  fetchOrders(ord_url);
})
search.addEventListener("keypress", (event) => {
  if (event.key == "Enter") {
    event.preventDefault();
    // console.log(serach.value);
    let x = search.value;
    console.log(bag);
    let sdata = bag.filter(ele => {
      console.log(ele.product_name2);
      return ele.product_name2.toLowerCase().includes(x.toLowerCase());
    })
    console.log(sdata);
    if (sdata.length == 0) {
      document.querySelector(".display-main").innerHTML = `<h2>No Matching Products</h2>`
      
    }
    else {
      renderTable(sdata);
    }
    return;
  }
});

//--------------Functions for fetching products and rendering to table-------------//


async function fetchProducts(url) {
  const response = await fetch(url);
  const data = await response.json();
  bag = data;
  renderTable(data);
}


function renderTable(data) {
  display.innerHTML = `<table class='productTable'>
  
    ${data.map((item, index) => {
    let name = item.product_name2;
    let price = item.product_price;
    let img = item.product_img;
    let id = item.id;
    return getasTd(img, name, price, id, index);
  }).join(" ")}
  </table>`


  let buttons = document.querySelectorAll(".display-main button")
  // console.log(buttons);
  for (let btn of buttons) {
    btn.addEventListener("click", (event) => {
      let data_id = btn.id;
      DeleteBtn(data_id);
    });
  }
}

async function DeleteBtn(id) {
  try {
    let delete_request = await fetch(`https://6395eda290ac47c68077fa1c.mockapi.io/products/${id}`, {
      method: "DELETE",
      headers: {
        'Content-type': 'application/json'
      }
    });
    if (delete_request.ok) {
      alert("Item Removed")
      fetchProducts(url);
    }

  }

  catch (error) {
    alert("Failed to delete")
  }
}

function getasTd(img, name, price, id, index) {
  // console.log(img,name,price,id)
  if (index == 0) {
    return `
    <tr class="productTr"><td><b>No.</b></td>
        <td ><b>Product Name</b></td>
        <td><b>Product Price(Rs)</b></td>
        <td><b>Remove Product</b></td>
    </tr>
    <tr class="productTr"><td>${index + 1}</td>
        <td class="prod"><img src=${img}> ${name}</td>
        <td>${price}</td>
        <td><button id=${id}>Remove</button></td>
    </tr>
    `
  }
  else {
    return `
  <tr class="productTr"><tr>
      <td>${index + 1}</td>
      <td class="prod"><img src=${img}> ${name}</td>
      <td>${price}</td>
      <td><button id=${id}>Remove</button></td>
  </tr>
  `}

}
//--------------Functions for fetching customers and rendering to table-------------//


async function fetchCutomers(url) {
  const cust_response = await fetch(url);
  const cust_data = await cust_response.json();
  renderTableCust(cust_data);
}


function renderTableCust(data) {
  display.innerHTML = `<table class="customerTable">
  
    ${data.map((item, index) => {
    let user_name = item.name;
    let email = item.email;
    let user_id = item.id;
    return getasTdCust(email, user_name, user_id, index);
  }).join(" ")}
  </table>`


  let buttons = document.querySelectorAll(".display-main button")
  for (let btn of buttons) {
    btn.addEventListener("click", (event) => {
      let data_id = btn.id;
      console.log(data_id);
      DeleteBtnUser(data_id);
    });
  }
}

async function DeleteBtnUser(data_id) {
  try {
    let delete_request = await fetch(`https://6395eda290ac47c68077fa1c.mockapi.io/users/${data_id}`, {
      method: "DELETE",
      headers: {
        'Content-type': 'application/json'
      }
    });
    if (delete_request.ok) {
      alert("User Removed")
      fetchCutomers(cust_url);
    }

  }

  catch (error) {
    alert("Failed To Delete")
  }
}

function getasTdCust(email, user_name, user_id, index) {
  // console.log(img,name,price,id)
  if (index == 0) {
    return `
    <tr class="customerTr"><td><b>No.</b></td>
        <td><b>User Name</b></td>
        <td><b>User E-mail</b></td>
        <td><b>Remove User</b></td>
    </tr>
    `
  }
  else {
    return `
  <tr class="customerTr"><tr>
      <td>${index}</td>
      <td> ${user_name}</td>
      <td>${email}</td>
      <td><button id=${user_id}>Remove</button></td>
  </tr>
  `}

}

//--------------Functions for fetching orders and rendiring to table-------------//

async function fetchOrders(url) {
  const order_response = await fetch(url);
  const order_data = await order_response.json();
  renderTableOrders(order_data);
}


function renderTableOrders(data) {
  display.innerHTML = `<table class="orderTable>
  
    ${data.map((item, index) => {
    let userName = item.user_name;
    let totalProd = item.total_products;
    let totalPrice = item.id;
    let userEmail = item.user_email
    let orderId=item.id;
    return getasTdOrd(userName, totalProd, totalPrice,userEmail,orderId,index);
  }).join(" ")}
  </table>`


  let buttons = document.querySelectorAll(".display-main button")
  for (let btn of buttons) {
    btn.addEventListener("click", (event) => {
      let data_id = btn.id;
      DeleteBtnOrder(data_id);
    });
  }
}

async function DeleteBtnOrder(data_id) {
  try {
    let delete_request = await fetch(`https://6395eda290ac47c68077fa1c.mockapi.io/orders/${data_id}`, {
      method: "DELETE",
      headers: {
        'Content-type': 'application/json'
      }
    });
    if (delete_request.ok) {
      alert("order Deleted")
      fetchOrders(ord_url);
    }
  }
  catch (error) {
    alert("Failed To Delete")
  }
}

function getasTdOrd(userName, totalProd, totalPrice,userEmail,orderId,index) {
  if (index == 0) {
    return `
    <tr class="orderTr">
        <td><b>No.</b></td>
        <td><b>User Name</b></td>
        <td><b>User E-mail</b></td>
        <td><b>Total Products Ordered</b></td>
        <td><b>Total Price</b></td>
        <td><b>Delete Oder</b></td>

    </tr>
    `
  }
  else {
    return `
  <tr class="orderTr"><tr>
      <td>${index}</td>
      <td>${userName}</td>
      <td>${userEmail}</td>
      <td>${totalProd}</td>
      <td>${totalPrice}</td>
      <td><button id=${orderId}>delete</button></td>
  </tr>
  `}

}
// ----------------------------Functions to add products-----------------------//

function addForm() {
  display.innerHTML = `
  <div class="form-style-5">
<form>
<fieldset>
<legend><span class="number">+</span> Fill in the details</legend>
<input type="text" id="title" name="field1" placeholder="Product Title *" required>
<input type="text" id="name" name="field2" placeholder="Product Name *" required>
<input type="url" id="img" name="field3" placeholder="Image Link *" required>
<input type="text" id="price" name="field4" placeholder="Product Price*" required> 
<input type="text" id="color" name="field5" placeholder="Product Color*" required>
<input type="text" id="size" name="field5" placeholder="Product Size*" required>
<input type="text" id="details" name="field6" placeholder="Product Details*" required> 
<input type="text" id="info" name="field7" placeholder="Additional Info*" required>  
</fieldset>
<input type="submit" value="Add" />
</form>
</div>
  `
}

async function addProducts(product_name,product_name2,product_price,product_img,product_details,product_size,product_desc,product_color,url){
	try {
		
		let productObj = {
			product_name : product_name,
      product_name2 :product_name2 ,
      product_price :product_price ,
      product_img :product_img ,
      product_details :product_details ,
      product_size :product_size ,
      product_desc :product_desc ,
      product_color :product_color  
		}
    console.log(productObj)

		let post_request = await fetch(url,{
			method : "POST",
			headers : {
				"Content-Type": "application/json"
			},
			body : JSON.stringify(productObj)
		})

		if(post_request.ok){
			alert("Product Added")
			addForm();
		}
	} 
	
	catch (error) {
		alert("Something went wrong. Not able to Post your data.")	
	}
}

