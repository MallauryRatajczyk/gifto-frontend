const BACKEND_ADDRESS = "http://192.168.86.114:3000"

async function kiEnvoiKi(token, obj) {
    const fetched = await fetch(`${BACKEND_ADDRESS}/users/${token}`);
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
