
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
function Place(title, address, category, timeToVisit, notes, imageURL) {
    this.title = title;
    this.address = address;
    this.category = category;
    this.timeToVisit = timeToVisit;
    this.notes = notes;
    this.imageURL = imageURL;
}

