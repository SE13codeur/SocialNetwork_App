import React, { useState } from "react"
import axios from "axios"
import SignInForm from "./SignInForm"

const SignUpForm = () => {
  const [formSubmit, setFormSubmit] = useState(false)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [controlPassword, setControlPassword] = useState("")

  const handleRegister = async (e) => {
    e.preventDefault()
    const terms = document.getElementById("terms")
    const usernameError = document.querySelector(".username.error")
    const emailError = document.querySelector(".email.error")
    const passwordError = document.querySelector(".password.error")
    const passwordConfirmError = document.querySelector(
      ".password-confirm.error"
    )
    const termsError = document.querySelector(".terms.error")

    passwordConfirmError.innerHTML = ""
    termsError.innerHTML = ""

    if (password !== controlPassword || !terms.checked) {
      if (password !== controlPassword)
        passwordConfirmError.innerHTML =
          "Passwords do not match !"

      if (!terms.checked)
        termsError.innerHTML = "Please accept the Terms and Conditions :)"
    } else {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/user/register`,
        data: {
          username,
          email,
          password,
        },
      })
        .then((res) => {
          console.log(res)
          if (res.data.errors) {
            usernameError.innerHTML = res.data.errors.username
            emailError.innerHTML = res.data.errors.email
            passwordError.innerHTML = res.data.errors.password
          } else {
            setFormSubmit(true)
          }
        })
        .catch((err) => console.log(err))
    }
  }

  return (
    <>
      {formSubmit ? (
        <>
          <SignInForm />
          <span></span>
          <h4 className="success">
          Successful registration :) Please log in ...
          </h4>
        </>
      ) : (
        <form action="" onSubmit={handleRegister} id="sign-up-form">
          <label htmlFor="username">username</label>
          <br />
          <input
            type="text"
            name="username"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <div className="username error"></div>
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="text"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <div className="email error"></div>
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <div className="password error"></div>
          <br />
          <label htmlFor="password-conf">Confirm password</label>
          <br/>
          <input
            type="password"
            name="password"
            id="password-conf"
            onChange={(e) => setControlPassword(e.target.value)}
            value={controlPassword}
          />
          <div className="password-confirm error"></div>
          <br />
          <input type="checkbox" id="terms" />
          <label htmlFor="terms">
            I accept {" "}
            <a href="/" target="_blank" rel="noopener noreferrer">
            Terms and Conditions
            </a>
          </label>
          <div className="terms error"></div>
          <br />
          <input type="submit" value="Confirm registration" />
        </form>
      )}
    </>
  )
}

export default SignUpForm
