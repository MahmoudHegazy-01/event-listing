interface even {
    title : string;
    date : Date;
    category : string;
    description : string;
    image : string;
}


const localEvents : even[] =  [];

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
    displayEvents()})

    btnClose.addEventListener("click", (object) => {
        object.preventDefault();
        closeAddForm();
    });
}

function closeAddForm()
{
    const form : HTMLFormElement = document.getElementById("formAdd") as HTMLFormElement;
    document.body.removeChild(form);
}

function closeEditForm()
{
    const form : HTMLFormElement = document.getElementById("formEdit") as HTMLFormElement;
    document.body.removeChild(form);
}

const add : HTMLButtonElement = document.getElementById("addEvent") as HTMLButtonElement;
add.addEventListener('click',displayForm);


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
closeAddForm();
}

function findEvent (container : HTMLDivElement) : even
{
    console.log("Container : "+container.innerHTML)
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

function findEventToBeEdited (title : string, container : HTMLDivElement) : even
{
    let a :even = localEvents.filter((e) => (e.title === title))[0]
    container.innerHTML = ""
    container.classList = ""
    return a;
}

function deleteEvent (container : HTMLDivElement){
    let start : number = container.innerHTML.search("<p>")
    let end : number = container.innerHTML.search("</p>")
    let title : string = container.innerHTML.substring(start+3,end)
    console.log(start)
    console.log(end);
    console.log(title);

    let a :even = localEvents.filter((e) => (e.title === title))[0]
    let n : number = localEvents.indexOf(a);
    localEvents.splice(n,1)

    container.innerHTML = ""
    container.classList = ""
}

function editEvent (a : even){
    const form : HTMLFormElement = document.getElementById("formEdit") as HTMLFormElement;

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

t ? a.title = t : a.title = a.title;
c ? a.category = c : a.category = a.category;
d ? a.description = d : a.description = a.description;
da ? a.date = new Date(da) : a.date = a.date;
i ? a.image = i : a.image = a.image;

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
    displayEvents()})

    btnClose.addEventListener("click", (object) => {
        object.preventDefault();
        closeEditForm();
    });
}

function closeModal() {
    const container : HTMLDivElement= document.getElementById("listing") as HTMLDivElement;
    container.innerHTML = "";
    displayEvents();
}

function displayModal(a : even)
{
    const modal : HTMLDivElement = document.createElement("div");
    const subContainer : HTMLDivElement = document.createElement("div")
    const image : HTMLImageElement =  document.createElement("img");
    const cardTitle : HTMLParagraphElement = document.createElement("p");
    const cardDate : HTMLParagraphElement = document.createElement("p");
    const cardCategory : HTMLParagraphElement = document.createElement("p");
    const description : HTMLParagraphElement = document.createElement("p");
       
    image.src = `src/${a.image}`
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

    modal.addEventListener('click', closeModal )

    modal.classList = "gap-y-15 bg-gray-400 grid grid-cols-2 grid-rows-2 border-4 border-black shadow-black-200 shadow-2xs w-3xl h-96 p-3 text-lg hover:shadow-2xl rounded-2xl relative top-20 left-90"
    const container : HTMLDivElement= document.getElementById("listing") as HTMLDivElement;
    container.appendChild(modal);

}

function displayEvents(){
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

        image.src = `src/${ev.imag}`
        image.classList = "w-2xs h-50";

        cardTitle.innerHTML = ev.title; 
        cardDate.innerHTML = `${ev.date.getDate()}/${ev.date.getMonth()}/${ev.date.getFullYear()}`; 
        cardCategory.innerHTML = ev.category;

        deleteButton.classList = "border-2 rounded-xl p-2 bg-amber-500 basis-full"
        deleteButton.innerHTML = "Delete";
        deleteButton.addEventListener('click',(action) => {
        deleteEvent(action.currentTarget as HTMLDivElement);
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


        card.classList = "border-4 border-black shadow-black-200 shadow-2xs w-2xs h-96 p-3 text-lg hover:shadow-2xl rounded-2xl";

         editButton.addEventListener('click',() => {
            console.log("EDIT BUTTON PRESSED")
        let a : even = findEventToBeEdited(editButton.id,card);
        displayEditForm(a);
        });

        card.addEventListener('click', (action) => {
        let a : even = findEvent(action.currentTarget as HTMLDivElement);
        displayModal(a)})

        container.appendChild(card);
    }
}