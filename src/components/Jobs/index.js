import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import EachJob from '../EachJob'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]
const locations = [
  {label:'hyderabad',
  location:'HYDERABAD'
  },
  {label:'banglore',
  location:'BANGLORE'
  },
  {label:'mumbai',
  location:'MUMBAI'
  },
  {label:'delhi',
  location:'DELHI'
  },
  {label:'chennai',
  location:'CHENNAI'
  },
  
]
const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
    profileDetails: [],
    checkboxInputs: [],
    radioInput: '',
    apiJobStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProfileDetails()
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiJobStatus: apiStatusConstants.inProgress})
    const {checkboxInputs, searchInput, radioInput} = this.state
    //console.log(searchInput)
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${checkboxInputs}&minimum_package=${radioInput}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const jobData = await response.json()
      const updatedJobData = jobData.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))

      this.setState({
        jobsList: updatedJobData,
        apiJobStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiJobStatus: apiStatusConstants.failure})
    }
  }

  getProfileDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const userProfileData = [await response.json()]
      const updatedProfileData = userProfileData.map(each => ({
        name: each.profile_details.name,
        profileImageUrl: each.profile_details.profile_image_url,
        shortBio: each.profile_details.short_bio,
      }))
      this.setState({
        profileDetails: updatedProfileData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  displayProfile = () => {
    const {profileDetails} = this.state
    //console.log(profileDetails)
    const {name, profileImageUrl, shortBio} = profileDetails[0]
    return (
      <div className="profile-container">
        <img src={profileImageUrl} className="profile-img" alt="profile" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-description">{shortBio}</p>
      </div>
    )
  }

  displayLoader = () => {
    return (
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    )
  }

  onClickProfileFailure = () => {
    this.getProfileDetails()
  }

  displayProfileFailure = () => {
    return (
      <div className="profile-failure">
        <button
          className="profile-failure-btn"
          onClick={this.onClickProfileFailure}
        >
          Retry
        </button>
      </div>
    )
  }

  onRenderProfileDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.displayProfile()
      case apiStatusConstants.inProgress:
        return this.displayLoader()
      case apiStatusConstants.failure:
        return this.displayProfileFailure()
      default:
        return null
    }
  }

  onChangeCheckBox = event => {
    const {checkboxInputs} = this.state
    const inputInList = checkboxInputs.filter(
      eachItem => eachItem === event.target.id,
    )
    if (inputInList.length === 0) {
      this.setState(
        prevState => ({
          checkboxInputs: [...prevState.checkboxInputs, event.target.id],
        }),
        this.getJobDetails,
      )
    } else {
      const filterData = checkboxInputs.filter(
        eachItem => eachItem !== event.target.id,
      )
      this.setState({checkboxInputs: filterData}, this.getJobDetails)
    }
  }

  renderCheckBoxDetails = each => {
    const {label} = each
    return (
      <li className="each-check-box">
        <input
          id={each.employmentTypeId}
          className="checkbox-input"
          type="checkbox"
          onChange={this.onChangeCheckBox}
        />
        <label className="checkbox-label-text" htmlFor={each.employmentTypeId}>
          {label}
        </label>
        <br />
      </li>
    )
  }

  onChangeRadio = event => {
    //console.log(event.target.id)
    this.setState({radioInput: event.target.id}, this.getJobDetails)
  }

  renderRadioButtonsDetails = each => {
    const {salaryRangeId, label} = each
    return (
      <li className="each-check-box">
        <input
          id={salaryRangeId}
          className="checkbox-input"
          type="radio"
          name="option"
          onChange={this.onChangeRadio}
        />
        <label className="checkbox-label-text" htmlFor={salaryRangeId}>
          {label}
        </label>
        <br />
      </li>
    )
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onEnterDetails = event => {
    if (event.key === 'Enter') {
      this.getJobDetails()
    }
  }

  onClickSearchButton = () => {
    this.getJobDetails()
  }

  showJobDetails = () => {
    const {jobsList} = this.state
    if (jobsList.length === 0) {
      return (
        <div className="no-jobs-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            className="no-jobs-img"
            alt="no jobs"
          />
          <h1>No Jobs Found</h1>
          <p>We could not found any jobs. Try other Jobs</p>
        </div>
      )
    } else {
      return jobsList.map(each => <EachJob key={each.id} jobDetails={each} />)
    }
  }

  onClickRetryJob = () => {
    this.getJobDetails()
  }

  showJobFailureError = () => {
    return (
      <div className="job-failure-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          className="failure-img"
          alt="failure view"
        />
        <h1 className="failure-heading">Oops! Something Went Wrong</h1>
        <p className="failure-desc">
          We cannot seem to find the page you are looking for
        </p>
        <button className="profile-failure-btn" onClick={this.onClickRetryJob}>
          Retry
        </button>
      </div>
    )
  }
  renderjobDetails = () => {
    const {apiJobStatus} = this.state
    switch (apiJobStatus) {
      case apiStatusConstants.success:
        return this.showJobDetails()
      case apiStatusConstants.inProgress:
        return this.displayLoader()
      case apiStatusConstants.failure:
        return this.showJobFailureError()

      default:
        return null
    }
  }

  render() {
    const {jobsList, apiStatus, searchInput} = this.state

    return (
      <>
        <Header />
        <div className="jobs-details-page-container">
          <div className="profie-search-container">
            <div className="search-container">
              <input
                type="search"
                placeholder="Search"
                value={searchInput}
                className="input-search"
                onChange={this.onChangeSearchInput}
                onKeyDown={this.onEnterDetails}
              />
              <button
                className="search-btn"
                type="button"
                onClick={this.onClickSearchButton}
                data-testid="searchButton"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <div className="suc-fail-pro-container">
              {this.onRenderProfileDetails()}
            </div>
            <hr className="line" />
            <p className="employement-heading">Type of Employment</p>
            <ul className="check-box-container">
              {employmentTypesList.map(each =>
                this.renderCheckBoxDetails(each),
              )}
            </ul>
            <hr className="line" />
            <p className="employement-heading">Salary Range</p>
            <ul className="check-box-container">
              {salaryRangesList.map(each =>
                this.renderRadioButtonsDetails(each),
              )}
            </ul>
            <hr className='line'/>
            <p className='employement-heading'>Location</p>

          </div>
          <div className="total-jobs-list-container">
            <div className="lg-search-container">
              <input
                type="search"
                placeholder="Search"
                value={searchInput}
                className="input-search"
                onChange={this.onChangeSearchInput}
                onKeyDown={this.onEnterDetails}
              />
              <button
                className="search-btn"
                type="button"
                onClick={this.onClickSearchButton}
                data-testid="searchButton"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <ul className="jobs-container">{this.renderjobDetails()}</ul>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
