async function getRepository(userName = "benna100") {
  const url = new URL("https://api.github.com/search/repositories");
  const params = { q: "user:" + userName };
  Object.keys(params).forEach((key) => {
    url.searchParams.append(key, params[key]);
  });
  const response = await fetch(url);
  return await response.json();
}

function renderRepository(repoDetails, userName) {
  console.log(userName, repoDetails);
  const ulElement = document.getElementById("repo-ul");
  const liUser = document.createElement("li");
  liUser.innerHTML = `Repositories of ${userName}`;
  const ulRepo = document.createElement("ul");

  repoDetails.items.forEach((repo) => {
    const liRepo = document.createElement("li");
    liRepo.innerHTML = `${repo.name}  ${repo.url}`;
    ulRepo.appendChild(liRepo);
  });
  liUser.appendChild(ulRepo);
  ulElement.appendChild(liUser);
}

function showRepositoryDetails() {
  const gitUsers = ["27ManishaPatel", "andrii1", "RZhyvitskyi"];
  const promiseArray = [];

  gitUsers.forEach((user) => promiseArray.push(getRepository(user)));
  Promise.all(promiseArray).then((responseJson) => {
    console.log(responseJson);
    responseJson.forEach((oneRepository, index) => {
      renderRepository(oneRepository, gitUsers[index]);
    });
  });
}

showRepositoryDetails();
