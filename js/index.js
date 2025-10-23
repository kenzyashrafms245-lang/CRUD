var productName = document.getElementById("productName")
var productPrice = document.getElementById("productPrice")
var productCategory = document.getElementById("productCat")
var productImg = document.getElementById("productImg")

var addBtn = document.getElementById("addBtn")
var updateBtn = document.getElementById("updateBtn")



var products = []
var temp;

var regex = {
        productName : {
            value:/^[A-Z][a-z]{2,10}$/,
            isValid: false

        },
        productPrice:{
            value : /^([1-9][0-9]|100)$/,
            isValid :false
        },
        productCat: {
            value :/^(tv|mobile|screen|laptop)$/ ,
            isValid : false
        },

    }

if (localStorage.getItem("productList") !== null) {
    products = JSON.parse(localStorage.getItem("productList"))
    displayProduct(products)
}

function addProduct() {
    var product = {
        name: productName.value,
        price: productPrice.value,
        category: productCategory.value,
        img: productImg.files[0]?.name
    }
    products.push(product)
    displayProduct(products)
    localStorage.setItem("productList", JSON.stringify(products))

    clearForm()
}
function displayProduct(list) {
    var cartona = ''
    for (var i = 0; i < list.length; i++) {
        cartona += `
        <tr>
            <th scope="row">${i + 1}</th>
            <td><img src="imgs/${list[i].img ? list[i].img : "not found.png"}" style=" width:50px" alt=""></td>
            <td>${list[i].name}</td>
            <td>${list[i].price}</td>
            <td>${list[i].category}</td>
             <td>
                <button class="btn btn-danger" onclick="deleteproduct(${i})">Delete</button>
                <button class="btn btn-success" onclick="fillUpdateInput(${i})">Update</button>
            </td>
        </tr>
        `
    }

    document.getElementById("tableBody").innerHTML = cartona
}


function deleteproduct(index) {
    products.splice(index, 1)
    displayProduct(products)
    localStorage.setItem("productList", JSON.stringify(products))

}

function fillUpdateInput(index) {
    temp = index
    console.log(products[index].name);
    productName.value = products[index].name
    productPrice.value = products[index].price
    productCategory.value = products[index].category


    addBtn.classList.add("d-none")
    updateBtn.classList.replace("d-none", "d-block")

}

function updateInput() {
    products[temp].name = productName.value
    products[temp].price = productPrice.value
    products[temp].category = productCategory.value
    products[temp].img = productImg.files[0]?.name

    displayProduct(products)
    localStorage.setItem("productList", JSON.stringify(products))


    addBtn.classList.replace("d-none", "d-block")
    updateBtn.classList.replace("d-block", "d-none")
    clearForm()


}
function clearForm() {
    productName.value = ''
    productPrice.value = ''
    productCategory.value = ''
    productImg.value = ''
    productName.classList.remove("is-valid")
    productPrice.classList.remove("is-valid")
    productCategory.classList.remove("is-valid")
    addBtn.disabled = true
}

function searchProduct(term) {
    var searchItems = []
    for (var i = 0; i < products.length; i++) {
        if (products[i].name.toLowerCase().includes(term.toLowerCase())) {
            searchItems.push(products[i])
        }
    }

    displayProduct(searchItems)
}

// function validation() {
//     var regex = /^[A-Z][a-z]{2,10}$/

//     if (regex.test(productName.value)) {
//         productName.classList.add("is-valid")
//         productName.classList.remove("is-invalid")
//     } else {
//         productName.classList.add("is-invalid")
//         productName.classList.remove("is-valid")
//     }


//     if (productName.value == "") {
//         productName.classList.remove("is-invalid")

//     }
// }

function validation(element) {
    if (regex[element.id].value.test(element.value)) {
        element.classList.add("is-valid")
        element.classList.remove("is-invalid")
        regex[element.id].isValid = true
    }else {
        element.classList.add("is-invalid")
        element.classList.remove("is-valid")
         regex[element.id].isValid = false
    }

    if (element.value == "") {
        element.classList.remove("is-invalid")

    }
    toggleAddButton()
}

function toggleAddButton(){

    if(regex.productName.isValid == true 
        &&regex.productPrice.isValid == true
         &&regex.productCat.isValid == true 
    ){
        addBtn.disabled = false

    }else{
        addBtn.disabled = true
    }

}