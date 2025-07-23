import footballImg from "./football.jpg"
import musicImg from "./music.jpg"
import techImg from "./tech.webp"

interface even {
    title : string;
    date : Date;
    category : string;
    description : string;
    image : string;
}

// const music1 : even = {
//     title : "Music 1" , 
//     date : new Date(2025,1,10,10,30) , 
//     category : "music" , 
//     description : "Music event #1" , 
//     image : "music.jpg"
// }



const localEvents : even[] =  [];
const storedArray : string[] = [];

// storedArray.push(JSON.stringify(music1))
// localStorage.setItem("eventsArray",storedArray.toString())

function fetchEvents(){
    if(localStorage.getItem("eventsArray") !== null)
    parseStringToEven(localStorage.getItem("eventsArray") as string)

}

function pushEvents(){
    localStorage.removeItem("eventsArray");
    parseEvenToString();
    localStorage.setItem("eventsArray",storedArray.toString())
}

fetchEvents();

displayOrganzizerEvents()

function findEvent (container : HTMLDivElement) : even
{
    let start : number = container.innerHTML.search("<p>")
    let end : number = container.innerHTML.search("</p>")
    let title : string = container.innerHTML.substring(start+3,end)
    console.log(start)
    console.log(end);
    console.log(title);

    let a :even = localEvents.filter((e) => (e.title === title))[0]
    container.innerHTML = ""
    container.classList = ""

    return a;
}


function displayModal(a : even)
{
    console.log("DISPLAYING MODAL")
    const modal : HTMLDivElement = document.createElement("div");
    const subContainer : HTMLDivElement = document.createElement("div")
    const image : HTMLImageElement =  document.createElement("img");
    const cardTitle : HTMLParagraphElement = document.createElement("p");
    const cardDate : HTMLParagraphElement = document.createElement("p");
    const cardCategory : HTMLParagraphElement = document.createElement("p");
    const description : HTMLParagraphElement = document.createElement("p");
       
    if(a.image === "football.jpg")
        {
            image.src = footballImg
        }
        else{
            if(a.image === "music.jpg")
            {
                image.src = musicImg;
            }
            else
            {
                if(a.image === "tech.webp")
                {
                    image.src = techImg
                }
            }
        }
    image.classList = "w-2xs h-50 col-start-1 col-end-2";

    cardTitle.innerHTML = a.title; 
    cardDate.innerHTML = `${a.date.getDate()}/${a.date.getMonth()}/${a.date.getFullYear()}`; 
    cardCategory.innerHTML = a.category; 
    description.innerHTML = a.description;

    subContainer.appendChild(cardTitle);
    subContainer.appendChild(cardDate);
    subContainer.appendChild(cardCategory);

    subContainer.classList = "col-start-1 col-end-2 row-start-2 row-end-3"
    modal.appendChild(image);
    modal.appendChild(subContainer);
    modal.appendChild(description)

    modal.addEventListener('click', () => {closeModal(modal)} )

    modal.classList = "dark:shadow-white gap-y-15 bg-gray-400 grid grid-cols-2 grid-rows-2 border-4 border-black shadow-black-200 shadow-2xs w-3xl h-96 p-3 text-lg hover:shadow-2xl rounded-2xl absolute top-23 left-90 z-2"
    const container : HTMLDivElement= document.getElementById("listing") as HTMLDivElement;
    container.classList.toggle("pointer-events-none")
    document.body.appendChild(modal);

}

function displayOrganzizerEvents(){
    const container : HTMLDivElement= document.getElementById("listing") as HTMLDivElement;
    container.innerHTML = ""
    let ev : any;
    for( ev of localEvents)
    {
        const card : HTMLDivElement = document.createElement("div");
        const image : HTMLImageElement =  document.createElement("img");
        const cardTitle : HTMLParagraphElement = document.createElement("p");
        const cardDate : HTMLParagraphElement = document.createElement("p");
        const cardCategory : HTMLParagraphElement = document.createElement("p");

        const btnContainer : HTMLDivElement = document.createElement("div");
        const deleteButton : HTMLButtonElement = document.createElement("button");
        const editButton : HTMLButtonElement = document.createElement("button");

        if(ev.image === "football.jpg")
        {
            image.src = footballImg
        }
        else{
            if(ev.image === "music.jpg")
            {
                image.src = musicImg;
            }
            else
            {
                if(ev.image === "tech.webp")
                {
                    image.src = techImg
                }
            }
        }
        
        image.classList = "w-2xs h-50";

        cardTitle.innerHTML = ev.title; 
        cardDate.innerHTML = `${ev.date.getDate()}/${ev.date.getMonth()}/${ev.date.getFullYear()}`; 
        cardCategory.innerHTML = ev.category;

        deleteButton.classList = "border-2 rounded-xl p-2 bg-amber-500 basis-full"
        deleteButton.id = ev.title;
        deleteButton.innerHTML = "Delete";
        deleteButton.addEventListener('click',(action) => {
        action.stopPropagation();
        deleteEvent(deleteButton.id, card );
        });

        editButton.id = ev.title;
        editButton.classList = "border-2 rounded-xl p-2 bg-amber-200 basis-full"
        editButton.innerHTML = "Edit";
       

        btnContainer.classList = "flex gap-1 justify-between"
        btnContainer.appendChild(deleteButton);
        btnContainer.appendChild(editButton);

        card.appendChild(image);
        card.appendChild(cardTitle);
        card.appendChild(cardDate);
        card.appendChild(cardCategory);
        card.appendChild(btnContainer)


        card.classList = "dark:border-[#00B900] dark:shadow-white dark:bg-gray-800 border-4 border-black shadow-black-200 shadow-2xs w-2xs h-96 p-3 text-lg hover:shadow-2xl rounded-2xl";

         editButton.addEventListener('click',(action) => {
        action.stopPropagation();
        let a : even = findEventToBeEdited(editButton.id,card);
        displayEditForm(a);
        });

        card.addEventListener('click', (action) => {
        let a : even = findEvent(action.currentTarget as HTMLDivElement);
        displayModal(a)})

        container.appendChild(card);
    }
}


function closeAddForm()
{
    const form : HTMLFormElement = document.getElementById("formAdd") as HTMLFormElement;
    document.body.removeChild(form);
    displayOrganzizerEvents();
}

function closeEditForm()
{
    const form : HTMLFormElement = document.getElementById("formEdit") as HTMLFormElement;
    document.body.removeChild(form);
    displayOrganzizerEvents();
}

const add : HTMLButtonElement = document.getElementById("addEvent") as HTMLButtonElement;
add.addEventListener('click',displayForm);

function displayForm(){
    const formContainer : HTMLFormElement = document.createElement("form");
    formContainer.id = "formAdd"

    formContainer.classList = "flex flex-col w-xs border-4 bg-linear-to-t from-green-300 to-amber-300  border-amber-300 p-6 rounded-2xl gap-y-2 absolute top-15 left-150";
    formContainer.innerHTML = `
        <button class = "border-2 rounded-xl p-2 bg-amber-600 hover:bg-amber-700 w-15 justify-end"> Close </button>  
        <label for="image"> Image</label>
        <input type="text" name="image" id="image" class="border-2 rounded-xl p-2"/>
        <label for="title">Title</label>
        <input type="text" name="title" id="title" class="border-2 rounded-xl p-2"/>
        <label for="category">Category</label>
        <input type="text" name="category" id="category" class="border-2 rounded-xl p-2"/>
        <label for="description">Description</label>
        <input type="text" name="description" id="description" class="border-2 rounded-xl p-2"/>
        <label for = "date">Date</label>
        <input type="date" name="date" id="date" class="border-2 rounded-xl p-2"/>
        <button  type="submit" class="border-2 rounded-xl p-2 bg-green-300 hover:shadow-2xl hover:bg-green-500">Submit</button>`

    const page = document.body;
    page.appendChild(formContainer);

    const btnAdd : HTMLButtonElement = formContainer.children.item(11) as HTMLButtonElement;
    const btnClose : HTMLButtonElement = formContainer.children.item(0) as HTMLButtonElement;
    console.log("BUTTON : " + btnAdd)

    btnAdd.addEventListener("click", (object) => {
    object.preventDefault();
    addEvent();
    displayOrganzizerEvents()})

    btnClose.addEventListener("click", (object) => {
        object.preventDefault();
        closeAddForm();
    });
}



function addEvent(){
const form : HTMLFormElement = document.getElementById("formAdd") as HTMLFormElement;

console.log(form.children)

let title : HTMLInputElement = form.children.item(4) as HTMLInputElement;
let category : HTMLInputElement = form.children.item(6) as HTMLInputElement;
let description : HTMLInputElement = form.children.item(8) as HTMLInputElement;
let date : HTMLInputElement = form.children.item(10) as HTMLInputElement;
let image : HTMLInputElement = form.children.item(2) as HTMLInputElement;

let t : string = title.value as string;
let c : string = category.value;
let d : string = description.value;
let da : string = date.value;
let i : string = image.value;

let e : even = { title : t, date : new Date(da), category: c, description : d, image: i}
localEvents.push(e)

pushEvents();

closeAddForm();
}

function parseEvenToString()
{
    storedArray.splice(0)
    let ev : even
    for(ev of localEvents)
    {
        let temp : string = JSON.stringify(ev)
        storedArray.push(temp);
    }
}

function parseStringToEven(a : string){
    let temp = a.split('"');
    localEvents.splice(0);
    let e : even = {title : "" , date : new Date() , category: "", description : "", image : "" };
    for(let x = 0 ; x < temp.length ; x++)
    {
        
        switch(x%20)
        {
            case 3: e.title = temp[x]; break;
            case 7: e.date = new Date(temp[x]); break;
            case 11: e.category = temp[x]; break;
            case 15: e.description = temp[x]; break;
            case 19: e.image = temp[x]; break;
        }
        if(x%20 === 0 && x !== 0)
        {
            localEvents.push(e)
            e = {title : "" , date : new Date() , category: "", description : "", image : "" };
        }
    }
}

function findEventToBeEdited (title : string, container : HTMLDivElement) : even
{
    let a :even = localEvents.filter((e) => (e.title === title))[0]
    container.innerHTML = ""
    container.classList = ""
    return a;
}

function deleteEvent (title : string, container : HTMLDivElement){

    let a :even = localEvents.filter((e) => (e.title === title))[0]
    let n : number = localEvents.indexOf(a);
    localEvents.splice(n,1);

    pushEvents();

    container.innerHTML = ""
    container.classList = ""
}

function editEvent (a : even){
    const form : HTMLFormElement = document.getElementById("formEdit") as HTMLFormElement;

let title : HTMLInputElement = form.children.item(4) as HTMLInputElement;
let category : HTMLInputElement = form.children.item(6) as HTMLInputElement;
let description : HTMLInputElement = form.children.item(8) as HTMLInputElement;
let date : HTMLInputElement = form.children.item(10) as HTMLInputElement;
let image : HTMLInputElement = form.children.item(2) as HTMLInputElement;

let t : string = title.value as string;
let c : string = category.value;
let d : string = description.value;
let da : string = date.value;
let i : string = image.value;

t ? a.title = t : a.title = a.title;
c ? a.category = c : a.category = a.category;
d ? a.description = d : a.description = a.description;
da ? a.date = new Date(da) : a.date = a.date;
i ? a.image = i : a.image = a.image;

pushEvents();

closeEditForm();
}

function displayEditForm (a : even){
    const formContainer : HTMLFormElement = document.createElement("form");
    formContainer.id = "formEdit"

    formContainer.classList = "flex flex-col w-xs border-4 bg-linear-to-t from-green-300 to-amber-300  border-amber-300 p-6 rounded-2xl gap-y-2 absolute top-15 left-150";
    formContainer.innerHTML = `
        <button class = "border-2 rounded-xl p-2 bg-amber-600 hover:bg-amber-700 w-15 justify-end"> Close </button>  
        <label for="image"> Image : ${a.image}</label>
        <input type="text" name="image" id="image" class="border-2 rounded-xl p-2"/>
        <label for="title">Title : ${a.title}</label>
        <input type="text" name="title" id="title" class="border-2 rounded-xl p-2"/>
        <label for="category">Category : ${a.category}</label>
        <input type="text" name="category" id="category" class="border-2 rounded-xl p-2"/>
        <label for="description">Description : ${a.description}</label>
        <input type="text" name="description" id="description" class="border-2 rounded-xl p-2"/>
        <label for = "date">Date : ${a.date}</label>
        <input type="date" name="date" id="date" class="border-2 rounded-xl p-2"/>
        <button  type="submit" class="border-2 rounded-xl p-2 bg-green-300 hover:shadow-2xl hover:bg-green-500">Submit</button>`

    const page = document.body;
    page.appendChild(formContainer);

    const btnAdd : HTMLButtonElement = formContainer.children.item(11) as HTMLButtonElement;
    const btnClose : HTMLButtonElement = formContainer.children.item(0) as HTMLButtonElement;
    
    btnAdd.addEventListener("click", (object) => {
    object.preventDefault();
    editEvent(a);
    displayOrganzizerEvents()})

    btnClose.addEventListener("click", (object) => {
        object.preventDefault();
        closeEditForm();
    });
}

function closeModal(modal : HTMLDivElement) {
    const container : HTMLDivElement= document.getElementById("listing") as HTMLDivElement;
    container.innerHTML = "";
    container.classList.toggle("pointer-events-none")
    document.body.removeChild(modal)
    displayOrganzizerEvents();
}


const darkMode : HTMLButtonElement = document.getElementById("darkMode") as HTMLButtonElement;
darkMode.addEventListener("click", () => {
    document.body.classList.toggle("dark")
    darkMode.innerHTML = darkMode.innerHTML === "White Mode" ? "Dark Mode" : "White Mode"
})