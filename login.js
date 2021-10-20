async function login()
{
    let res = await fetch("https://reqres.in/api/login?page=2");
    let ids = await res.json();
    console.log(ids)
    
}
login();