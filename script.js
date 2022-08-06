let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'Create';
let tmp;

// get total
function getTotal(){
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;      // add '+' before any string to change it to integer
        total.innerHTML = result;
        total.style.background = '#040';
    }else{
        total.innerHTML = '';
        total.style.background = '#a00d02';
    }
}


// create product
let dataPro;

if(localStorage.product != null){               // if localStorage hase element dont delete them
    dataPro = JSON.parse(localStorage.product)
}else{
    dataPro = [];
}

submit.onclick = function(){
    let newPro = {              // create object
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }

    if(title.value != '' && price.value !='' && category.value !='' && newPro.count <100){
        if(mood === 'Create'){
            // count
            if(newPro.count > 1){
                for(let i =0; i< newPro.count; i++){
                    dataPro.push(newPro)            //add new element (object) to array
                }
            }else{
                dataPro.push(newPro);
            }
        }else{
            dataPro[tmp] = newPro;
            mood ='Create';
            submit.innerHTML = 'Create';
            count.style.display='block';
        }
        clearData()
    }

    
    
    // save localstorage
    localStorage.setItem('product' ,JSON.stringify(dataPro))   // put array in localstorage and change them to string
                       // product : new item in localstorage 

    showData()
}


// clear inputs
function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}


// read
function showData(){
    let table = '';
    for(let i=0; i<dataPro.length; i++){
        table += `
        <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData( ${i} )" id="update">update</button></td>
            <td><button onclick="deleteData( ${i} )" id="delete">delete</button></td>       
        </tr>
        `;
    }
    document.getElementById('tbody').innerHTML = table;
    
    let btnDelete = document.getElementById('deleteAll');
    if(dataPro.length > 0){
        btnDelete.innerHTML = `
        <button onclick="deleteAll()"> delete All (${dataPro.length}) </button>
        `
    }else{
        btnDelete.innerHTML = '';
    }
getTotal()
}
showData()
 

// delete
function deleteData(i){     // i : index item
    dataPro.splice(i,1);    // delete 1 element from array
    localStorage.product = JSON.stringify(dataPro); // put the new array in localstorage
    showData()  // to refresh
}
function deleteAll(){
    localStorage.clear() // delete all from localStorage
    dataPro.splice(0)   // delete all items from array
    showData()  // to refresh
}



// update
function updateData(i){
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    category.value = dataPro[i].category;
    getTotal()
    count.style.display = 'none';
    submit.innerHTML = 'Update';
    mood = 'Update';
    tmp =i;
    scroll({
        top:0,
        behavior:'smooth',
    })
}


// search
let searchMood = 'title';

function getSearchMood(id){ // function get the mood of search
    let search = document.getElementById('search');
    if(id == 'searchTitle'){
        searchMood ='title';
        search.placeholder = 'search by title';
    }else{
        searchMood ='category';
        search.placeholder = 'search by category';
    }
    search.focus() // whene u click in any btn the search input hase focus 
    search.value = '';
    showData()
}

function searchData(value){
    let table='';
    if(searchMood == 'title')
    {
        for(let i = 0; i<dataPro.length; i++)
        {
            if(dataPro[i].title.includes(value.toLowerCase()))    //includes : search in string 
            {
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData( ${i} )" id="update">update</button></td>
                    <td><button onclick="deleteData( ${i} )" id="delete">delete</button></td>       
                </tr>
                `;
            }
        }
    }else{
        for(let i = 0; i<dataPro.length; i++)
        {
            if(dataPro[i].category.includes(value.toLowerCase()))    //includes : search in string 
            {
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData( ${i} )" id="update">update</button></td>
                    <td><button onclick="deleteData( ${i} )" id="delete">delete</button></td>       
                </tr>
                `;
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}


