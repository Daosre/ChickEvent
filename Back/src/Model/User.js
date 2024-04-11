class User {
    constructor(firstName, lastName, email, password, gdpr, createAt, role) {
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.password = password
        this.gdpr = gdpr
        this.createAt = createAt
        this.role = role
    }
}

module.exports = {
    User
}