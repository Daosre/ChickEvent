class Event {
    constructor(title, description, image, category, userId, createAt,
    status) {
        this.title = title
        this.description = description
        this.image = image
        this.category = category
        this.userId = userId
        this.createAt = createAt
        this.status = status
    }
}

module.exports = {
    Event
}