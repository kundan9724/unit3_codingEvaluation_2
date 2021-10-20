
let currentPage = 1;
async function search()
{   let input = document.getElementById("input").value;
    let res = await fetch(`https://api.github.com/search/users?q=${input}&page=${currentPage}&per_page=10`);
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
 function createPagination() {
        const div = document.getElementById("pagination");
        pagination.innerHTML = "";
        const prev = document.createElement("button");
        prev.textContent = "Previous";
        prev.name = currentPage - 1;
        if (currentPage == 1) {
          prev.disabled = true;
        }
        const current = document.createElement("button");
        current.textContent = currentPage;
        current.name = currentPage;

        const next = document.createElement("button");
        next.textContent = "Next";
        next.name = currentPage + 1;
        div.append(prev, current, next);
      }

      async function handlePageChange() {
        try {
          const pageNumber = parseInt(event.target.name);
          currentPage = pageNumber;
          search();
          createPagination();
        } catch (err) {}
      }

window.addEventListener("load", function () {
         let input = document.getElementById("input");
input.onkeyup = debounceFunction;
        createPagination();
        const pagination = document.getElementById("pagination");
  pagination.addEventListener("click", handlePageChange, false);
 
});
      const debounceFunction = debounce(search, 500);


