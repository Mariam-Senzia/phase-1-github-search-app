/**  
   1.A user can enter github username
   2.A user can see list of results based on username keyed in.
   3.A user can click on user and search result
   4.A user will be redirected to their github profile
**/

const repoList = document.getElementById("repos-list")

document.addEventListener("DOMContentLoaded", () => {
    const search = document.getElementById("search")
    const submit = document.getElementById("submit")
    const usersList = document.getElementById("user-list")

    submit.addEventListener("click", (e) => {
        e.preventDefault()
        const username = search.value

        ////Check if username is empty

        if (username === "") {
            alert("Github username is required")
        }

        ////make request to github API and fetch data
        fetchGithubUsername("GET",{username: username})
    })
    
})

const fetchGithubUsername = (method,data) => {
    const usernameUrl = `https://api.github.com/search/users?q=${data.username}`
    fetch(usernameUrl,{
        header: {
            "Accept": "application/vnd.github.v3+json"
        }
    })  
    .then((response) => {
        if (!response.ok) {
            throw new Error('API error')
        }

        return response.json();
    })
    .then((users) => {
        displayFoundUsers(users)
    })
    .catch((error) => {
        console.log("Error in fetching data",error.message)
        alert("An error occured")
    })
}

const displayFoundUsers = (usersList) => {
    //innerHTML
    console.log(usersList)
    repoList.innerHTML = ""

    usersList.items.forEach((user) => { 
    const li = document.createElement("li")
    const githubLink = document.createElement("a")

    githubLink.href = user.html_url
    githubLink.target = "_blank"
    githubLink.textContent = user.login
    
    li.appendChild(githubLink)
    repoList.appendChild(li)
})
}