function getDate(Date) {
    let date = new Date(Date)
}

function formatDateToUserReadable(date) {
    if (!(date instanceof Date)) {
        throw new Error("L'argument doit être une instance de Date.");
    }

    const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
    const optionsTime = { hour: '2-digit', minute: '2-digit', hour12: false };

    const formattedDate = date.toLocaleDateString('fr-FR', optionsDate);
    const formattedTime = date.toLocaleTimeString('fr-FR', optionsTime);

    return `${formattedDate} à ${formattedTime}`;
}

module.exports = { formatDateToUserReadable };