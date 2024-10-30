function dateRequired() {
    const today = new Date()
    const dateMini = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate())
    return dateMini
}

module.exports = { dateRequired };

