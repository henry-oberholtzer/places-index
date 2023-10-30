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
    const h2 = document.createElement("h2");
    const img = document.createElement("img");
    h2.append(portland.places[id].title)
    div.setAttribute("class", "container col border rounded")
    div.append(h2)
    if (placeObject.imageURL.trim() !== "") {
    img.setAttribute("class", "img-fluid")
    img.setAttribute("alt", placeObject.title)
    img.setAttribute("src", placeObject.imageURL)
    div.append(img)
    }
    place.append(div)
    const ul = document.createElement("ul");
    div.append(ul);
    for (const element of Object.values(placeObject)) {
        let li = document.createElement("li");
        li.append(element);
        ul.append(li);
    };
}

function printPlaceName(id) {
    const mainDiv = document.getElementById("main-div")
    const name = portland.places[id].title
    const button = document.createElement("button")
    button.setAttribute("type", "button")
    button.setAttribute("id", "city")
    button.setAttribute("value", id)
    button.setAttribute("class", "btn btn-primary m-1")
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