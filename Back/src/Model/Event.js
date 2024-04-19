//Création de l'objet Event.

class Event {
    constructor(title, description, image, category, userId, createAt,
    status, people, peoplemax) {
        this.title = title
        this.description = description
        this.image = image
        this.category = category
        this.userId = userId
        this.createAt = createAt
        this.status = status
        this.people = [people]
        this.peoplemax = peoplemax
    }
}

module.exports = {
    Event
}