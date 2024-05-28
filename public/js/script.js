const AddBtn = document.querySelectorAll('.addCart')
const minusBtn = document.querySelectorAll('.minus')
const plusBtn = document.querySelectorAll('.plus')


Array.from(minusBtn).forEach((element) => {
    element.addEventListener('click', subtract)
})
Array.from(plusBtn).forEach((element) => {
    element.addEventListener('click', increment)
})
Array.from(AddBtn).forEach((element)=>{
    element.addEventListener('click', addItem)
})

async function subtract(id){
    try{
        const response = await fetch(`cart/delete/${id}`, {
            method: 'DELETE'
        })
        if(response.ok){
            location.reload()
        }else{
            console.log('failed to delete item')
        }

    } catch(error){
        console.log('error occurred:', error)
    }
}

async function increment(name, price, image){
    console.log(name, price, image)
    try{
        const response = await fetch(`cart/increment`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'name': name,
                'price': price,
                'image': image
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch(err){
        console.log(err)
    }
}

async function addItem(name, price, image){
    // console.log(name,price,image)
    try{
        const response = await fetch('cart', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'name': name,
                'price': price,
                'image': image
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch(err){
        console.log(err)
    }
}


// open and close tab


//function tht control Carsouel
function startCarousel(){
    let activeImage = 0
    const images = document.querySelectorAll('#carousel img')//return an arr 
    function cycleImages(){
        if(!images[activeImage]){//if there's nothing in images that have the active image tag, just exit the function and kill the function
            clearInterval(intervalId)
            return;
        }
        
        images[activeImage].classList.remove('active')
        activeImage = (activeImage + 1) % images.length
        images[activeImage].classList.add('active')
    }
    let intervalId = setInterval(cycleImages, 3000)

}

//Handle Edit Requests
function editItem(id, name, description){
    document.getElementById('updateId').value = id

    document.getElementById('updateName').value = name 
    document.getElementById('updateDescription').value = description
    
    document.getElementById('updateForm').action = `/item/update/${id}`
}

//Handle Delete Requests
async function deleteItem(id){
    try{
        const response = await fetch(`http://localhost:4500/item/delete/${id}`, {
            method: 'DELETE'
        })
        if(response.ok){
            location.reload()
        }else{
            console.log('failed to delete item')
        }

    } catch(error){
        console.log('error occurred:', error)
    }
}


//Handle Erros from server if unable to write data (optional)
function checkForError() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('error')) {
      alert("Validation failed. Name and description are required.");
    }
  }

  window.onload = function(){
    startCarousel();
    checkForError()
  }




  //add db
//   const addItem = document.querySelector('#add')

//   addItem.addEventListener('click', addObject)
//   async function addObject(){
//     try{
//         const response = await fetch('addobj', {
//             method: 'post',
//             headers: {'Content-Type': 'application/json'},
//           })
//         const data = await response.json()
//         console.log(data)
//         location.reload()

//     }catch(err){
//         console.log(err)
//     }
// }