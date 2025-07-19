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

    formContainer.classList = "flex flex-col w-xs border-4 bg-linear-to-t from-green-300 to-amber-300  border-amber-300 p-6 rounded-2xl gap-y-2 relative top-15 left-150";
    formContainer.innerHTML = ` <label for="image"> Image</label>
        <input type="text" name="image" id="image" class="border-2 rounded-xl p-2"/>
        <label for="title">Title</label>
        <input type="text" name="title" id="title" class="border-2 rounded-xl p-2"/>
        <label for="category">Category</label>
        <input type="text" name="category" id="category" class="border-2 rounded-xl p-2"/>
        <label for="description">Description</label>
        <input type="text" name="description" id="description" class="border-2 rounded-xl p-2"/>
        <label for = "date">Date</label>
        <input type="date" name="date" id="date" class="border-2 rounded-xl p-2"/>
        <button  type="submit" class="border-2 rounded-xl p-2 bg-green-300 hover:shadow-2xl hover:bg-green-500">Submit</button> `

    const page = document.body;
    page.appendChild(formContainer);

    const btnAdd : HTMLButtonElement = formContainer.children.item(10) as HTMLButtonElement;
    console.log("BUTTON : " + btnAdd)

    btnAdd.addEventListener("click", (object) => {
    object.preventDefault();
    console.log("BUTTON CLICKED")
    addEvent()})
}


const add : HTMLButtonElement = document.getElementById("addEvent") as HTMLButtonElement;
add.addEventListener('click',displayForm);


function addEvent(){
const form : HTMLFormElement = document.getElementById("formAdd") as HTMLFormElement;

console.log(form.children)

let title : HTMLInputElement = form.children.item(3) as HTMLInputElement;
let category : HTMLInputElement = form.children.item(5) as HTMLInputElement;
let description : HTMLInputElement = form.children.item(7) as HTMLInputElement;
let date : HTMLInputElement = form.children.item(9) as HTMLInputElement;
let image : HTMLInputElement = form.children.item(1) as HTMLInputElement;

let t : string = title.value as string;
let c : string = category.value;
let d : string = description.value;
let da : string = date.value;
let i : string = image.value;


let e : even = { title : t, date : new Date(da), category: c, description : d, image: i}
localEvents.push(e)
}

