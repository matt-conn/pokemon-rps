document.querySelector('#pikachu').addEventListener('click', makeReq)
document.querySelector('#geodude').addEventListener('click', makeReq)
document.querySelector('#squirtle').addEventListener('click', makeReq)

async function makeReq(e){
    const userPick = e.target.id;
    const res = await fetch(`/api?pokemon=${userPick}`)
    const data = await res.json()

    console.log(data);
    document.querySelector("#game-throws").textContent = data.throwMessage;
    document.querySelector("#win-or-lose").textContent = data.winOrLoseMessage;
}