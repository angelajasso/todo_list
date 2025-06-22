const input = document.querySelector("input");
const button = document.querySelector("button");
const list = document.querySelector(".list");

addButton.addEventListener("click", function (event) {
  addTask(input.value);
  input.value = "";
});

function addTask(text) {
  const item = document.createElement("li");
  item.innerText = text;
  list.appendChild(item);
}

list.addEventListener("click", function (event) {
  markDone(event.target);
});

function markDone(task) {
  task.classList.toggle("marked");
}
