// Nomenclatura de variáveis

const githubUserCategoryList = [
  {
    title: "User",
    followers: 5,
  },
  {
    title: "Friendly",
    followers: 50,
  },
  {
    title: "Famous",
    followers: 500,
  },
  {
    title: "Super Star",
    followers: 1000,
  },
]

export default async function getUserDataFromGithub(request, response) {
  const githubUsernameParams = String(request.query.username)

  if (!githubUsernameParams) {
    return response.status(400).json({
      message: `Please provide an username to search on the github API`,
    })
  }

  const githubUserData = await fetch(
    `https://api.github.com/users/${githubUsernameParams}`
  )

  if (githubUserData.status === 404) {
    return response.status(400).json({
      message: `User with username "${githubUsernameParams}" not found`,
    })
  }

  const convertGithubUserDataInJson = await githubUserData.json()

  const sortGithubUserCategoryList = githubUserCategoryList.sort(
    (currentCategory, nextCategory) =>
      nextCategory.followers - currentCategory.followers
  )

  const githubUserCategory = sortGithubUserCategoryList.find(
    (category) => convertGithubUserDataInJson.followers > category.followers
  )

  const userDataWithCategory = {
    githubUsernameParams,
    category: githubUserCategory.title,
  }

  return userDataWithCategory
}

getUserDataFromGithub(
  {
    query: {
      username: "mateus-de-oliveira",
    },
  },
  {}
)
