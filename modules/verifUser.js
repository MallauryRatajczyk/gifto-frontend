async function getId(token) {
    const fetchedID = await fetch(`http://192.168.1.81:3000/users/token/${token}`)
    const responseId = await fetchedID.json()
    console.log("id", responseId)
    return (responseId)
}

async function getUsername(id) {
    const fetchedID = await fetch(`http://192.168.1.81:3000/users/${id}`)
    const responseId = await fetchedID.json()
    console.log("id", responseId.user.username)
    return (responseId.user.username)
}

async function kiEnvoiKi(token, obj) {
    const fetched = await fetch(`http://192.168.1.81:3000/users/${token}`);
    const response = await fetched.json()
    let info = {}
    if (response.result) {
        if (response.user.id === obj.expediteur) {

        }
    }
}

export default function lastMessage(arr) {
    return (arr[arr.length - 1]);
}

module.exports = { getId, getUsername };