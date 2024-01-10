const githubForm = document.getElementById("github-form")

githubForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const submitSearch = document.getElementById("search").value;

    fetch("https://api.github.com/users/"+submitSearch)
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        
        document.getElementById("user-list").innerHTML = `
        <a target="_blank" href="https://www.github.com/users/mojombo">${data.url}</a>
        `
    })
    .then(repos())
});

const submit = document.getElementById("submit")

function repos() {
submit.addEventListener("click", function (e){
    fetch("https://api.github.com/users/mojombo/repos/")
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        document.getElementById("repos-list").innerHTML = data.repos_url
    })
}) 
}
