import React, { useState, useEffect } from "react"
import mockUser from "./mockData.js/mockUser"
import mockRepos from "./mockData.js/mockRepos"
import mockFollowers from "./mockData.js/mockFollowers"
import axios from "axios"

const rootUrl = "https://api.github.com"

const GithubContext = React.createContext()

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser)
  const [repos, setRepos] = useState(mockRepos)
  const [followers, setFollowers] = useState(mockFollowers)

  const [requests, setRequests] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const [error, setError] = useState({ show: false, msg: "" })

  const searchGithubUser = async (user) => {
    toggleError()
    setIsLoading(true)

    const response = await axios(`${rootUrl}/users/${user}`).catch((err) =>
      console.log(err)
    )

    if (response) {
      setGithubUser(response.data)
    } else {
      toggleError(true, "there is no user with that username")
    }
    checkRequest()
    setIsLoading(false)
  }

  const checkRequest = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data
        setRequests(remaining)
        if (remaining === 0) {
          toggleError(true, "sorry you have exceeded")
        }
      })
      .catch((err) => console.log(err))
  }

  function toggleError(show = false, msg = "") {
    setError({ show, msg })
  }

  useEffect(checkRequest, [])
  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        requests,
        error,
        searchGithubUser,
        isLoading,
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}
export { GithubProvider, GithubContext }
