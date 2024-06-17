import {Link, withRouter} from 'react-router-dom'
import {MdHome} from 'react-icons/md'
import {RiSuitcaseFill} from 'react-icons/ri'
import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <ul className="header-container">
      <Link to="/" className="link-item">
        <li>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="header-logo-image"
            alt="website logo"
          />
        </li>
      </Link>
      <div className="mobile-view-container">
        <Link to="/" className="link-item">
          <li>
            <MdHome className="icon" />
          </li>
        </Link>
        <Link to="/jobs" className="link-item">
          <li>
            <RiSuitcaseFill className="icon" />
          </li>
        </Link>
        <FiLogOut className="icon" onClick={onClickLogout} />
      </div>
      <div className="home-job-container">
        <Link to="/" className="link-item">
          <p className="link-text">Home</p>
        </Link>
        <Link to="/jobs" className="link-item">
          <p className="link-text">Jobs</p>
        </Link>
      </div>
      <Link to="/jobs">
        <button type="button" className="logout-button" onClick={onClickLogout}>
          Logout
        </button>
      </Link>
    </ul>
  )
}

export default withRouter(Header)
