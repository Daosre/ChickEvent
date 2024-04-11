class User {
    constructor(firstName, lastName, email, password, gdpr, createAt, isActive) {
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.password = password
        this.gdpr = gdpr
        this.createAt = createAt
        this.isActive = isActive
    }
}

module.exports = {
    User
}