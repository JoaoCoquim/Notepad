let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let msg = document.getElementById("msg");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");

form.addEventListener('submit', (e) => {
    e.preventDefault(); //prevents default page update
    formValidation();
});

let formValidation = () => {
    if(textInput.value === ""){ //if the input value is blank
        console.log("failure");
        msg.innerHTML = "Task cannot be blank";
    } else {
    console.log("success");
    msg.innerHTML = "";
    acceptData();
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();

    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
    }
};

let data = [];

let acceptData = () => {
  data.push({
    text: textInput.value,
    date: dateInput.value,
    description: textarea.value,
  });

  localStorage.setItem("data", JSON.stringify(data)); //key, value

  console.log(data);
  createTasks();
};

let createTasks = () => {
    tasks.innerHTML = "";
    data.map((x, y) => {
      return (tasks.innerHTML += `
      <div id=${y}>
            <span class="fw-bold">${x.text}</span>
            <span class="small text-secondary">${x.date}</span>
            <p>${x.description}</p>
    
            <span class="options">
              <i onClick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
              <i onClick="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
            </span>
          </div>
      `);
    });
  
    resetForm();
  };  

let resetForm = () => {
    textInput.value = ""; //deletes the text written on the form, after being posted
    dateInput.value = ""; //deletes the date written on the form, after being posted
    textarea.value = ""; //deletes the description written on the form, after being posted
};

let deleteTask = (e) => { //invoked in the createTasks() above, within the "trash can" between arrow heads
    e.parentElement.parentElement.remove(); //removes the task by referring to the parent of the parent class
    data.splice(e.parentElement.parentElement.id, 1); //1st input: id number, 2nd input: number of items to remove
    localStorage.setItem("data", JSON.stringify(data));
    console.log(data);
    };

let editTask = (e) => {
    let selectedTask = e.parentElement.parentElement;

    textInput.value = selectedTask.children[0].innerHTML;
    dateInput.value = selectedTask.children[1].innerHTML;
    textarea.value = selectedTask.children[2].innerHTML;

    deleteTask(e);
};

(() => {
    data = JSON.parse(localStorage.getItem("data")) || [];
    console.log(data);
    createTasks();
})();