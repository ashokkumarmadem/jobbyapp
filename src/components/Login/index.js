import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import {Component} from 'react'

import './index.css'

class LoginPage extends Component {
  state = {username: '', password: '', showErrorMsg: false, errorMsg: ''}

  getSucessDetails = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  getFailureDetails = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  onSubmitDetails = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    const userDetails = {
      username,
      password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.getSucessDetails(data.jwt_token)
    } else {
      this.getFailureDetails(data.error_msg)
    }
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  render() {
    const {username, password, showErrorMsg, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <div className="login-page-card-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="logo-image"
            alt="website logo"
          />
          <form className="form-container" onSubmit={this.onSubmitDetails}>
            <div className="username-container">
              <label htmlFor="name" className="label-element">
                USERNAME
              </label>{' '}
              <br />
              <input
                id="name"
                type="text"
                placeholder="Username"
                className="input-element"
                value={username}
                onChange={this.onChangeUsername}
              />
            </div>
            <div className="password-container">
              <label htmlFor="password" className="label-element">
                PASSWORD
              </label>{' '}
              <br />
              <input
                id="password"
                type="password"
                placeholder="Password"
                className="input-element"
                value={password}
                onChange={this.onChangePassword}
              />
            </div>
            <button className="submit-btn" type="submit">
              Login
            </button>
            {showErrorMsg ? <p className="error-msg">*{errorMsg}</p> : ''}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginPage
