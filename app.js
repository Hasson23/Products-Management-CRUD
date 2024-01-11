let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mood = "create";
let tmp;
// console.log(title,price,taxes,ads,discount,total,category,count,submit)



// get total 

function getTotal(){
    if(price.value != ''){
        let result = (+price.value + +ads.value + +taxes.value) - (+discount.value)
        total.innerHTML = +result
        total.style.backgroundColor="seagreen"
    } else {
        total.innerHTML = ""
        total.style.backgroundColor="#a00d02"
    }
}
// create Product

let dataPro

if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product)
} else{
    dataPro = []
}

submit.onclick = function(){
    let newPro = {
        title:title.value.toLowerCase(),
        price:price.value,
        ads:ads.value,
        taxes:taxes.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }

    if(title.value != "" && category.value != "" && price.value != "" && newPro.count < 50){
        if(mood === "create"){
            if(newPro.count > 1){
                for(let i = 0; i < newPro.count; i++){
                    dataPro.push(newPro)
                } 
            }else{
                dataPro.push(newPro)
            }
        }else{
            dataPro[tmp]=newPro
            mood = "create";
            submit.innerHTML="Create"
            count.style.display="block"
        }
    } else{
        alert("Title, Price and Category fields is requared and Count must be less than 50 Products!!")
    }
    

    // Save To Loacal Storage
    localStorage.setItem(`product`, JSON.stringify(dataPro))
    console.log(dataPro)

    clearData()
    readData()
}


// Clear Inputs

function clearData(){
        title.value = ""
        ads.value = ""
        taxes.value = ""
        discount.value = ""
        count.value = "",
        category.value = ""
        price.value = ""
        total.innerHTML = ""
}


// Read

function readData() {
    let table = "";
    for (i = 0; i < dataPro.length; i++) {
      table += `
      <tr>
                <td>${i + 1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updatePro(${i})" id="update"><i class="fa-solid fa-pen-to-square"></i></button></td>
                <td><button onclick="deletePro(${i})" id="delete"><i class="fa-solid fa-trash"></i></button></td>
              </tr>
      `;
    }
    document.getElementById("tbody").innerHTML = table;
    let btnDelete = document.getElementById("deleteAll");
    if (dataPro.length > 0) {
      btnDelete.innerHTML = `<button onclick="deleteAll()">Delete All (${dataPro.length})</button>`;
    } else {
      btnDelete.innerHTML = ``;
    }
    getTotal();
  }
readData()


// Delete


function deletePro(i){
    let con = confirm("Are You Sure to delete "+ dataPro[i].title+" From The Products Table?")
    if(con){
        dataPro.splice(i,1)
        localStorage.product = JSON.stringify(dataPro)
        readData()
    }
}


function deleteAll(){
    let con = confirm("Are You Sure to delete All Data?")
    if(con){
    localStorage.clear()
    dataPro.splice(0)
    readData()
    }
}

// Count



// Update

function updatePro(i){
    title.value = dataPro[i].title
    price.value = dataPro[i].price
    taxes.value = dataPro[i].taxes
    ads.value = dataPro[i].ads
    discount.value = dataPro[i].discount
    count.style.display ="none"
    category.value = dataPro[i].category
    total.innerHTML = dataPro[i].total
    total.style.backgroundColor="seagreen"
    submit.innerHTML="Update"
    mood = "update";
    tmp = i;
    scroll({
        top:0,
        behavior:"smooth"
    })

    // console.log(dataPro[i].title)
}

// Search 

let searchMood = 'title';

function getSearchMood(id){
    let search = document.getElementById("search")
    if(id == "searchTitle"){
     searchMood = 'title';
     search.placeholder ="Search By Title"
    } else{
     searchMood = 'category';    
     search.placeholder ="Search By Category"   
    }
    search.focus()
    search.value = ""
    readData()
}

function searchData(value){
    let table=''

    if(searchMood == "title"){
        for(let i = 0; i<dataPro.length; i++){
            if(dataPro[i].title.includes(value.toLowerCase())){
                table += `
            <tr>
                <td>${i + 1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updatePro(${i})" id="update"><i class="fa-solid fa-pen-to-square"></i></button></td>
                <td><button onclick="deletePro(${i})" id="delete"><i class="fa-solid fa-trash"></i></button></td>
              </tr>
      `;
            }
        }

    } else{
        for(let i = 0; i<dataPro.length; i++){
            if(dataPro[i].category.includes(value.toLowerCase())){
                table += `
            <tr>
                <td>${i + 1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updatePro(${i})" id="update"><i class="fa-solid fa-pen-to-square"></i></button></td>
                <td><button onclick="deletePro(${i})" id="delete"><i class="fa-solid fa-trash"></i></button></td>
              </tr>
      `;
            }
        }
    }
    document.getElementById("tbody").innerHTML = table;

}

// Validation