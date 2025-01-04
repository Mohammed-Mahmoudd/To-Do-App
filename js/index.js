const inp = document.getElementById("inp");
const add = document.getElementById("addbtn")
const ul = document.getElementById("ul")
const delbtn = document.getElementById("deleteall")
const inputt = document.getElementById("inputt")
const header = document.getElementById("header")


let data;
if (localStorage.tasks) {
  data = JSON.parse(localStorage.tasks)
}else {
  data = []
  
}

add.addEventListener("click" , create)

function create() {
  
  if (inp.value != "") {
    
    data.push({
      name: inp.value,
      id: Date.now()
    })
    localStorage.setItem("tasks" , JSON.stringify(data))
    inp.value = ""
    show()
  }
  
}

function show() {
  if (data.length > 0) {
    ul.innerHTML= `<h2 class="text-start"><i class="fa-solid fa-tasks"></i></h2>`
    ul.style.backgroundColor = "#551790"
    data.forEach(object => {
      ul.innerHTML += `<li id="task-${object.id}" class="slide-in-right li d-flex mb-2">
      <div class="d-flex">
      <div class="checkbox-wrapper-31" >
      <input type="checkbox"  id="checkbox-${object.id}" onclick ="checke(${object.id})"/>
      <svg viewBox="0 0 35.6 35.6">
      <circle class="background" cx="17.8" cy="17.8" r="17.8"></circle>
      <circle class="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
      <polyline class="check" points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
      </svg>
      </div>                    
      <p class="peps" id ="result-${object.id}">${object.name}</p>
      
      </div>
      <div class="buttons" id="buttons-${object.id}">
      <button  id="delete-${object.id}" class="deletebtn"  onmouseover="hoverdel(${object.id})" onclick = "del(${object.id})">
      <i class="fa-solid fa-trash"></i>
      <span id="delspan-${object.id}">Delete</span>
      </button>
      <button class="editbtn" id="edit-${object.id}" onclick="edit(${object.id})" onmouseover="hoveredit(${object.id})">
      <i class="fa-solid fa-edit"></i>
      <span id="editspan-${object.id}">Edit</span>
      </button>
      </div>
      </li>`
      localStorage.setItem("tasks" , JSON.stringify(data))
      height()
    });
    
    if (data.length > 0) {
      delbtn.style.display = "block"
      inputt.style.borderBottom = "1px solid rgba(255, 255, 255, 0.137)"
    }else {
      delbtn.style.display = "none"
      inputt.style.borderBottom = "none"
    }
  }else {
    
    ul.innerHTML= ""
    ul.style.backgroundColor = ""
  }
  theme()
}


function edit(id) {
  data.forEach(object => {
    if (object.id === id) {
      
      object.name = prompt("Edit The Task")
      console.log(object)
      create()
      show()
    }
  });
  
}


function del(id) {
  if (data.length === 1) {
    deleteAll()
    create()
    show()
  }
  const task = document.getElementById(`task-${id}`)
  task.classList.add("fade-out");
  
  data.forEach(object => {
    if (object.id === id) {
      data = data.filter(object => object.id !== id)
      
      create()
      show()
      
    }
  });
  
}

function checke(id) {

    data.forEach(object => {
    if (object.id === id) {
        let index = data.findIndex(function () {
          object.id === id
        })
        const checkbox = document.getElementById(`checkbox-${object.id}`)
        if (checkbox.checked == true) {
          const p = document.getElementById(`result-${object.id}`)
          p.style.textDecoration = "line-through #9625ff"
          p.style.color = "gray"
          p.style.transition = "0.7s"
        }else {
          const p = document.getElementById(`result-${object.id}`)
          p.style.textDecoration = "none"
          p.style.color = "white"
          p.style.transition = "0.5s"

        }
      }
      })
      
  }




function hoverdel(id) {
  data.forEach(object => {
    if (object.id === id) {
      const delbtn = document.getElementById(`delete-${object.id}`)
      delbtn.addEventListener("mouseover" , function () {
        const buttoncon = document.getElementById(`buttons-${object.id}`)
        const span = document.getElementById(`delspan-${object.id}`)
        buttoncon.style.width = "125px"
        
        span.style.display = "inline-block"
        
        buttoncon.style.transition = "1s"
        delbtn.style.transition = "1s"
        span.style.transition = "2s"
        delbtn.style.width = "90px"
        
        
      })
      delbtn.addEventListener("mouseout" , function () {
        const buttoncon = document.getElementById(`buttons-${object.id}`)
        const span = document.getElementById(`delspan-${object.id}`)
        span.style.display = "block"
        
        buttoncon.style.transition = "1s"
        delbtn.style.width = "34px"
        buttoncon.style.transition = "1s"
        delbtn.style.transition = "1s"
        span.style.transition = "2s"
        buttoncon.style.width = "75px"
        
        
      })
    }
  });
}
function hoveredit(id) {
  data.forEach(object => {
    if (object.id === id) {
      const editbtn = document.getElementById(`edit-${object.id}`)
      editbtn.addEventListener("mouseover" , function () {
        const buttoncon = document.getElementById(`buttons-${object.id}`)
        const span = document.getElementById(`editspan-${object.id}`)
        buttoncon.style.width = "125px"
        
        span.style.display = "inline-block"
        
        buttoncon.style.transition = "1s"
        editbtn.style.transition = "1s"
        span.style.transition = "2s"
        editbtn.style.width = "80px"
        
        
      })
      editbtn.addEventListener("mouseout" , function () {
        const buttoncon = document.getElementById(`buttons-${object.id}`)
        const span = document.getElementById(`editspan-${object.id}`)
        span.style.display = "block"
        
        buttoncon.style.transition = "1s"
        editbtn.style.width = "34px"
        buttoncon.style.transition = "1s"
        editbtn.style.transition = "1s"
        span.style.transition = "2s"
        buttoncon.style.width = "75px"
        
        
      })
    }
  });
}



function deleteAll() {
  localStorage.clear()
  data = []
  ul.innerHTML = ""
  inputt.style.borderBottom = "none"
  show()
  create()
  height()
  delbtn.style.display= "none"
  ul.style.backgroundColor = ""
}
inputt.style.border = "none"
delbtn.style.display= "none"
show()






function theme() {
  const theme = document.getElementById("themecontrol")
  if (theme.checked === true) {
    mood = "dark"
  }else if (theme.checked === false ) {
    mood = "light"
  }
  const body = document.querySelector("body")
  const h1 = document.querySelector("h1")
  const inp = document.getElementById("inp")
  const add = document.getElementById("addbtn")
  if (mood === "light") {
    body.style.transition = "1s"
    h1.style.transition = "1s"
    ul.style.transition = "1s"
    inp.style.transition = "1s"
    add.style.transition = "1s"
    body.style.backgroundColor = "#59238C"
    h1.style.color = "white"
    inp.style.backgroundColor = "#551790"
    ul.style.backgroundColor = "#551790"
    add.style.background = "#8552B6"
    header.style.backgroundColor = "#9128F6"
    
  }else if (mood === "dark") {
    body.style.transition = "1s"
    h1.style.transition = "1s"
    ul.style.transition = "1s"
    inp.style.transition = "1s"
    add.style.transition = "1s"
    body.style.backgroundColor = "#24233A"
    ul.style.backgroundColor = "#1B1D1F"
    h1.style.color = "#9128F6"
    inp.style.backgroundColor = ""
    add.style.background = "#551790"
    header.style.backgroundColor = "#100F10"
    
}


}
theme()
console.log(mood)


function height () {

  if (data == "") {
    header.style.height = "200px"
    header.style.transition = "1s"
  }else {
    result = 375 + (75 * (data.length - 1))
    header.style.transition = "1s"
    header.style.height = `${result}px`
  
  }
}
