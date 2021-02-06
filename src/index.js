let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});


const URL = 'http://localhost:3000/toys'

let toyCollection = document.querySelector("#toy-collection") //.getElementById('toy-collection'
let submitToyForm = document.querySelector("body > div.container > form")


let nameInput = document.querySelector("body > div.container > form > input:nth-child(2)")
let imageInput = document.querySelector("body > div.container > form > input:nth-child(4)") 

submitToyForm.addEventListener('submit', (event) => {
// let nameInput = event.target.children[1].value;
// let imageInput = event.target.children[3].value;

let submitData = {
  name: nameInput,
  image: imageInput,
  likes: 0
};

fetch(URL, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  body: JSON.stringify(submitData) 
  .then(res => res.json())
    .then((obj_toy) => {
      let new_toy = renderToys(obj_toy)
      divCollect.append(new_toy)
    })
})
})



function renderItems(arg){
  const items = arg["data"]
  items.forEach(element => {
      renderItem(element)
  })
}

function showToys(toy){
  let h2 = document.createElement('h2')
  h2.innerText = toy.name
}

function likes(e) {
  e.preventDefault()
  let more = parseInt(e.target.previousElementSibling.innerText) + 1

  fetch(`http://localhost:3000/toys/${e.target.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"

      },
      body: JSON.stringify({
        "likes": more
      })
    })
    .then(res => res.json())
    .then((like_obj => {
      e.target.previousElementSibling.innerText = `${more} likes`;
    }))
}

// fetch("http://localhost:3000/toys", toyObj)
// .then(function(response) {
//   return response.json();
// })
// .then(function(object) {
//   console.log(object);
// })
// .catch(function(error) {
//   alert("That's not a toy!");
//   console.log(error.message);
// }); 
