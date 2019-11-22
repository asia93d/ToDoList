//date
let date = new Date();
let day = date.getDate();
let month = date.getMonth()+1;
let year = date.getFullYear();
if (day<10) day ='0'+ day;
if (month<10) month = '0'+ month;
document.querySelector('#date').innerHTML = `${day}/${month}/${year}`;

//selected elements
const refresh = document.querySelector(".refresh");
const dateElement = document.getElementById("date");
const input = document.getElementById("input");
const tasksToDo = document.getElementById("tasksToDo");
let LIST, id;

//adding elements to list
const taskDone = "fa-check-square";
const taskUndone = "fa-check-square";
const crossOut = "lineThrough";

//localstorage data
let data = localStorage.getItem("TODO");
if(data){
	LIST = JSON.parse(data);
	id = LIST.length;
	loadList(LIST);
}else{
	LIST = [];
	id = 0;
}
function loadList(array){
	array.forEach(function(item){
		makeToDo(item.name, item.id, item.done, item.trash);
	});
}

//refresh
refresh.addEventListener("click", function(){
	localStorage.clear();
	location.reload();
});

//adding tasks 
function makeToDo(toDo,id,done,trash){
	if(trash){return; }
	const DONE = done ? taskDone : taskUndone;
	const LINE = done ? crossOut : "";
	const item = `<li class="item">
				<i class="far ${DONE} co" job="complete" id="${id}"></i>
				<p class="text ${LINE}">${toDo}</p>
				<i class="far fa-minus-square de" job="delete" id="${id}"></i>
				</li>`;
const position = "beforeend";
tasksToDo.insertAdjacentHTML(position,item);
}

//"Enter" function
document.addEventListener("keyup",function(even){
	if(event.keyCode == 13){
		const toDo = input.value;
		if(toDo){
			makeToDo(toDo,id,false,false);
			LIST.push({
				name: toDo,
				id: id,
				done: false,
				trash:false,
			});
			localStorage.setItem("TODO", JSON.stringify(LIST));
			id++;
		}
		input.value = "";
	}
});

//marking task as "completed"
function completedTask(element){
	element.classList.toggle(taskDone);
	element.classList.toggle(taskUndone);
	element.parentNode.querySelector(".text").classList.toggle(crossOut);
	LIST[element.id].done = LIST[element.id].done ? false : true;
}

//deleting tasks
function deleteToDo(element){
element.parentNode.parentNode.removeChild(element.parentNode);
LIST[element.id].trash = true;
}

//buttons
tasksToDo.addEventListener("click", function(event){
	const element = event.target;
	const elJob = element.attributes.job.value;
	if(elJob == "complete"){
		completedTask(element);
	}
	else if(elJob == "delete"){
		deleteToDo(element);
	}
});

//localstorage
localStorage.setItem("TODO", JSON.stringify(LIST));
