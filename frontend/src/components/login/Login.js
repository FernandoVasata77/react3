import { useState } from "react"

// components
import ErrorMessage from "./ErrorMessage"
import Loading from "../Loading"

// Constants
import Constants from "../Constants"
import { connectBackend } from "../connectBackend"
import Connection from "../connection/Connection"

const Login = (props) => {
  // Initialize the initial state and its modifier function
  const [loginData, setLoginData] = useState({
    showPasswordInput: false,
    showError: false,
    username: "",
    password: "",
    errorMessage: "Incorrect Credentials",
    showLoading: false,
  })

  // instantiate the Constants
  const allConstants = Constants()

  // handle when the username / password field is updated
  const handleOnChange = (e) => {
    // update the corresponding state values
    setLoginData({ ...loginData, [e.target.name]: e.target.value })
  }
  const showErrorComponent = () => {
    // show the error message component
    setLoginData({ ...loginData, showError: true })

    // hide the error message component after 3sec
    setTimeout(() => {
      setLoginData({ ...loginData, showError: false })
    }, 2000)
  }

  const {
    showError,
    showPasswordInput,
    showLoading,
    errorMessage,
    username,
    password,
  } = loginData
  return (
    <div className="login">
      <div className="login-form">
        <div className="login-title">Login</div>
        {showError == true && <ErrorMessage message={errorMessage} />}
          <input
            type="text"
            placeholder="Enter username"
            onChange={handleOnChange}
			/*onKeyPress={handleKeyPress}*/
            name="username"
            value='a'
          />
          <input
            type="password"
            placeholder="Enter password"
            onChange={handleOnChange}
            /*onKeyPress={handleKeyPress}*/
            name="password"
            value='a'
          />
		  <Connection/>
		  
      </div>
    </div>
  )
}

export default Login
