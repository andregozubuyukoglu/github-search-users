import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import { GithubProvider } from "./context/context"
import { Auth0Provider } from "@auth0/auth0-react"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <GithubProvider>
      <App />
    </GithubProvider>
  </React.StrictMode>
)

serviceWorker.unregister()
