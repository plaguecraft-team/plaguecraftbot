const fetch = require('node-fetch');
const base = "http://localhost:1338";

async function isAuth(id) {
    const d = await fetch(base + "/auth/@me?id=" + id, {
        method: 'get',
        headers: {
            'content-type': 'application/json'
        }
    })

    if (d.status == 200) return true;
    else return false;
}

async function fetchUsername(id) {
    const d = await fetch(base + "/auth/@me?id=" + id, {
        method: 'get',
        headers: {
            'content-type':'application/json'
        }
    })
    const j = await d.json();
    if (j.status == 200) return j.user.ign
    else return false;
}

async function linkUser(id, token, ign) {
    const d = await fetch(base + `/auth?id=${id}&token=${token}&ign=${ign}`, {
        method: 'post'
    })

    if (d.status == 200) return true;
    else return false;
}

async function unlinkUser(id) {
    const d = await fetch(base + "/auth?id=" + id, {
        method: 'delete'
    })

    if (d.status == 200) return true;
    else return false;
}

async function fetchGameData(game, ign) {
    if (game.toLowerCase() == "bridges") {
        const d = await fetch(base + "/bridges?username=" + ign, {
            method: 'get',
            headers: {
                'content-type': 'application/json'
            }
        })

        if (d.status == 200) return await d.json();
        else return false;
    } else if (game.toLowerCase() == "tntrun") {
        const d = await fetch(base + "/tntrun?username=" + ign, {
            method: 'get',
            headers: {
                'content-type': 'application/json'
            }
        })

        if (d.status == 200) return await d.json();
        else return false;
    }
}

async function updateInventory(obj, id) {
    const d = await fetch(base + "/bridges/itemData", {
        method: 'post',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(obj)
    })

    if(d.status == 200) return true;
    else return false;
}

module.exports = {isAuth,fetchUsername,linkUser,unlinkUser,fetchGameData,updateInventory}