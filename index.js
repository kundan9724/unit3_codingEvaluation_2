async function search()
{   let input = document.getElementById("input").value;
    let res = await fetch(`https://api.github.com/search/users?q=${input}&page=1&per_page=10`);
    let data = await res.json();
   console.log(data.items);
    displayGitProfiles(data.items);
}

function displayGitProfiles(data)
{
    
    let container = document.getElementById("container");
    container.innerHTML = "";
    
    for (let i = 0; i < data.length; i++)
    {
        let div = document.createElement("div");
        div.className="gitProfiles"
        let userName = document.createElement("h3");
        userName.innerHTML = data[i].login;
        let h3 = document.createElement("h3");
        let gitHubProfile = document.createElement("a");
        gitHubProfile.innerHTML = "github link";
        gitHubProfile.href = data[i].html_url;
        h3.append(gitHubProfile);
        div.append(userName, h3);
        container.append(div);
        }
}
const debounce = function (fn, delay)
{
    let timer;
    return function ()
    {
        let context = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(context, args)
        }, delay)
        }
}
const debounceFunction = debounce(search, 500);

let input = document.getElementById("input");
input.onkeyup = debounceFunction;
