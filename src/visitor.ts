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


function fetchEvents(){
    parseStringToEven(localStorage.getItem("eventsArray") as string)
}

fetchEvents();

displayEvents(localEvents)

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

    modal.classList = "gap-y-15 bg-gray-400 grid grid-cols-2 grid-rows-2 border-4 border-black shadow-black-200 shadow-2xs w-3xl h-96 p-3 text-lg hover:shadow-2xl rounded-2xl absolute top-20 left-90"
    const container : HTMLDivElement= document.getElementById("listing") as HTMLDivElement;
    container.classList.toggle("pointer-events-none")
    document.body.appendChild(modal);
}

function displayEvents(a : even[])
{
    const container : HTMLDivElement= document.getElementById("listing") as HTMLDivElement;
    container.innerHTML = ""
    let ev : any;
    for( ev of a)
    {
        const card : HTMLDivElement = document.createElement("div");
        const image : HTMLImageElement =  document.createElement("img");
        const cardTitle : HTMLParagraphElement = document.createElement("p");
        const cardDate : HTMLParagraphElement = document.createElement("p");
        const cardCategory : HTMLParagraphElement = document.createElement("p");

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

        card.appendChild(image);
        card.appendChild(cardTitle);
        card.appendChild(cardDate);
        card.appendChild(cardCategory);

        card.classList = "dark:border-[#00B900] dark:shadow-white dark:bg-gray-800 border-4 border-black shadow-black-200 shadow-2xs w-2xs h-80 p-3 text-lg hover:shadow-2xl rounded-2xl";
        card.addEventListener('click', (action) => {
        let a : even = findEvent(action.currentTarget as HTMLDivElement);
        displayModal(a)})
        container.appendChild(card);
    }
}


function filterCategory(c : HTMLOptionElement)
{
    const filteredList : even[] =  localEvents.filter((e) => (e.category == c.value))
    console.log(filteredList)
    displayEvents(filteredList)
}

const dropDown : HTMLSelectElement = document.getElementById("category") as HTMLSelectElement;
dropDown.addEventListener('click' , (object) => filterCategory(object.target as HTMLOptionElement))


function closeModal(modal : HTMLDivElement) {
   const container : HTMLDivElement= document.getElementById("listing") as HTMLDivElement;
    container.innerHTML = "";
    container.classList.toggle("pointer-events-none")
    document.body.removeChild(modal)
    displayEvents(localEvents);
}


const darkMode : HTMLButtonElement = document.getElementById("darkMode") as HTMLButtonElement;
darkMode.addEventListener("click", () => {
    document.body.classList.toggle("dark")
    darkMode.innerHTML = darkMode.innerHTML === "White Mode" ? "Dark Mode" : "White Mode"
})