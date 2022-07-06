let addToy = false;

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

    toyFormContainer.addEventListener('submit', (event) => {
      e.preventDefault()
      postToy(event.target.name.value, event.target.image.value)
    })
  });

function getToys() {
  return fetch('http://localhost:3000/toys')
    .then(response => response.json())
  }

function renderToy(toy) {
  const toyCard = document.createElement('div')
  toyCard.setAttribute('class', 'card')
  const h2 = document.createElement('h2')
  h2.innerText = toy.name
  const img = document.createElement('img')
  img.setAttribute('class', 'toy-avatar')
  img.setAttribute('src', toy.image)
  const p = document.createElement('p')
  p.setAttribute('class', 'like')
  p.innerText = toy.likes
  const btn = document.createElement('button')
  btn.setAttribute('class', 'like-btn')
  btn.setAttribute('id', toy.id)
  btn.innerText = 'Like ❤️'
  btn.addEventListener('click', (e) => {
    increaseLikes(e)
  })
  const toyBox = document.getElementById("toy-collection")
  toyCard.append(h2, img, p, btn)
  toyBox.append(toyCard)
}

function postToy(name, url) {
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {

    "Content-Type": "application/json",
    Accept: "application/json"
  },

    body: JSON.stringify({
      "name": name,
      "image": url,
      "likes": 0
    })
  })
  .then(response => response.json())
  .then(data => renderToy(data))
}

function increaseLikes(event) {
  event.preventDefault()
  const likeButton = document.getElementsByClassName('like-btn')
  const newNumberOfLikes = parseInt(event.target.previousElementSibling.innerText) + 1
  console.log(newNumberOfLikes)
  fetch(`http://localhost:3000/toys/${event.target.id}`, {
    method: 'PATCH',
    headers:
{
  "Content-Type": "application/json",
  Accept: "application/json"
},

body: JSON.stringify({
  "likes": newNumberOfLikes
})
  })
.then(response => response.json())
.then(updatedToy => {
  event.target.previousElementSibling.innerText = `${updatedToy.likes}`
})
}

getToys().then(toys => {
  toys.forEach(toy => {
    renderToy(toy)
  })
})