// Database
const portland = new CityIndex();

// Portland Logic
function CityIndex() {
    this.places = {};
    this.currentId = 0;
}

CityIndex.prototype.assignId = function() {
    this.currentId +=1;
    return this.currentId;
};

CityIndex.prototype.addPlace = function(place) {
    place.id = this.assignId();
    this.places[place.id] = place;
};

CityIndex.prototype.deletePlace = function(id) {
    if (this.places[id] === undefined) {
        return false;
    }
    delete this.places[id];
    return true;
}
CityIndex.prototype.findPlace = function(id) {
    if (this.places[id] !== undefined) {
        return this.places[id];
    }
    return false;
};
// Place Logic
function Place(title, address, category, season, notes, imageURL) {
    this.title = title;
    this.address = address;
    this.category = category;
    this.season = season;
    this.notes = notes;
    this.imageURL = imageURL;
}

// UI Logic

function showMe(e) {
    document.getElementById("places").innerHTML = null;
    const id = e.target.getAttribute("value");
    const placeObject = portland.places[id]
    const place = document.getElementById("places")
    const div = document.createElement("div");
    const divRow = document.createElement("div");
    divRow.setAttribute("class", "row")
    const divRow1 = document.createElement("div");
    divRow1.setAttribute("class", "col");
    const div2 = document.createElement("div")
    div2.setAttribute("class", "col")
    const div3 = document.createElement("div")
    div3.setAttribute("class", "col")
    const h2 = document.createElement("h2");
    const img = document.createElement("img");
    
    div.setAttribute("class", "container col border rounded p-2")
    h2.append(placeObject.title)
    divRow1.append(h2)
    
    divRow.append(div2)
    divRow.append(div3)
    div.append(divRow1)
    div.append(divRow)
    if (placeObject.imageURL.trim() !== "") {
    img.setAttribute("class", "img-fluid")
    img.setAttribute("alt", placeObject.title)
    img.setAttribute("src", placeObject.imageURL)
    div2.append(img)
    }
    place.append(div)
    const ul = document.createElement("ul");
    div3.append(ul);
    let liAddress = document.createElement("li");
    liAddress.append(placeObject.address);
    ul.append(liAddress);
    let liCategory = document.createElement("li");
    liCategory.append(placeObject.category);
    ul.append(liCategory);
    let liSeason = document.createElement("li");
    liSeason.append(placeObject.season);
    ul.append(liSeason);
    let liNotes = document.createElement("li");
    liNotes.append(placeObject.notes);
    ul.append(liNotes);
    // for (const element of Object.values(placeObject)) {
    //     let li = document.createElement("li");
    //     li.append(element);
    //     ul.append(li);
    // };
}

function printPlaceName(id) {
    const mainDiv = document.getElementById("main-div")
    const name = portland.places[id].title
    const button = document.createElement("button")
    button.setAttribute("type", "button")
    button.setAttribute("id", "city")
    button.setAttribute("value", id)
    button.setAttribute("class", "btn btn-primary m-4")
    button.append(name)
    mainDiv.append(button) 
    button.addEventListener("click", showMe);
}

function handleFormSubmission(e) {
    e.preventDefault();
    const placeName = document.getElementById("placeName").value;
    const address = document.getElementById("address").value;
    const category = document.getElementById("category").value;
    const season = document.getElementById("season").value;
    const notes = document.getElementById("notes").value;
    const imageURL = document.getElementById("imageURL").value;
    if (placeName.trim().replace(/\W/g,"") !== "") {
        const place = new Place(placeName, address, category, season, notes, imageURL);
        portland.addPlace(place);
        printPlaceName(portland.currentId);
    }    
}

function pageInteractive() {
    const form = document.getElementById("form");
    form.addEventListener("submit", handleFormSubmission);
};

window.addEventListener("load", pageInteractive);