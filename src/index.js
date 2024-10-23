//3° passo

document.getElementById('btn-search').addEventListener('click', () => {         
    const userName = document.getElementById('input-search').value           
    getUserProfile(userName)
})

//4° passo
document.getElementById('input-search').addEventListener('keyup', (e) => {
    const userName = e.target.value
    const key = e.which || e.keyCode
    const isEnterKeyPressed = key === 13

    if (isEnterKeyPressed) {
        getUserProfile(userName)
    }
})

// 5° passo, buscando os repositorios no API 

async function repos(userName) {
    const response = await fetch(`https://api.github.com/users/${userName}/repos?per_page=10`)
    return await response.json()
}

//1°passo 
async function user(userName) {
    const response = await fetch(`https://api.github.com/users/${userName}`)
    return await response.json()
}

//console.log(await user())

//2°passo - pegar os dados no github/api
function getUserProfile(userName) {
    user(userName).then(userData => {  //console.log(userData);
        let userInfo = `<div class="info">
                            <img src="${userData.avatar_url}" alt="foto perfil do usuario" />
                            <div class="data">
                                <h1> ${userData.name ?? 'não possui nome cadastrado 😞'}</h1>
                                <p>  ${userData.bio ?? 'não possui bio cadastrada 😞'}</p>
                            </div>
                        </div>`

        document.querySelector('.profile-data').innerHTML = userInfo

        getUserRepositories(userName)
    })    
}
// getUserProfile('roberto-valezi'); movido para o inicio, no eventlisteneer

//------------//-----------

function getUserRepositories(userName) {
    repos(userName).then(reposData => {
        let repositoriesItens = ""
        //console.log(reposData)

        reposData.forEach(repo => {
             repositoriesItens += `<li> 
                                        <a href="${repo.html_url}" target="_blank"> ${repo.name}</a>   
                                    </li>`
            
            })
            //console.log(repositoriesItens);
            document.querySelector('.profile-data').innerHTML +=    `<div class="repositories section">
                                                                        <h2>Repositorios</h2>
                                                                        <ul>${repositoriesItens}</ul>
                                                                    </div>`

    })
}