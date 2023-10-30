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

function printPlaceName(place) {
    ``
}

function handleFormSubmission(e) {
    e.preventDefault();
    const placeName = document.getElementById("placeName").value;
    const address = document.getElementById("address").value;
    const category = document.getElementById("category").value;
    const season = document.getElementById("season").value;
    const notes = document.getElementById("notes").value;
    const imageURL = document.getElementById("imageURL").value;
    const place = new Place(placeName, address, category, season, notes, imageURL);
    portland.addPlace(place);
    printPlaceName(place);
}

function pageInteractive() {
    
    const form = document.getElementById("form");
    form.addEventListener("submit", handleFormSubmission);
};

window.addEventListener("load", pageInteractive);