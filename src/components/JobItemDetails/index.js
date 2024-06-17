import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill, BsStarFill} from 'react-icons/bs'
import {BiLinkExternal} from 'react-icons/bi'
import Header from '../Header'
import SimilarJob from '../SimilarJob'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'failure',
}

class JobItemDetails extends Component {
  state = {
    jobData: {},
    similarJobsData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getFormattedData = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    title: data.title,
    lifeAtCompany: {
      description: data.life_at_company.description,
      imageUrl: data.life_at_company.image_url,
    },
    location: data.location,
    packagePerAnnum: data.package_per_annum,
    rating: data.rating,
    skills: data.skills.map(each => ({
      imageUrl: each.image_url,
      name: each.name,
    })),
  })

  getFormattedSimilarData = data => ({
    similarJobs: data.map(each => ({
      companyLogoUrl: each.company_logo_url,
      employmentType: each.employment_type,
      id: each.id,
      jobDescription: each.job_description,
      location: each.location,
      rating: each.rating,
      title: each.title,
    })),
  })

  getJobItemDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedJobDetails = this.getFormattedData(fetchedData.job_details)
      const updateSimilarData = this.getFormattedSimilarData(
        fetchedData.similar_jobs,
      )
      this.setState({
        jobData: updatedJobDetails,
        similarJobsData: updateSimilarData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  displayIJobDetails = () => {
    const {jobData, similarJobsData} = this.state

    console.log(jobData)
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      title,
      skills,
    } = jobData
    return (
      <div>
        <div className="each-job-item-container">
          <div className="each-job-profile-container">
            <img
              src={companyLogoUrl}
              className="company-logo-img"
              alt="job details company logo"
            />
            <div className="job-details-container">
              <h1 className="job-title">{title}</h1>
              <div className="star-container">
                <BsStarFill className="star-icon" />
                <p className="star-number">{rating}</p>
              </div>
            </div>
          </div>
          <div className="job-loc-pack-container">
            <div className="job-location-container">
              <div className="locat">
                <IoLocationSharp className="location-icon" />
                <p className="location-text">{location}</p>
              </div>
              <div className="locat">
                <BsFillBriefcaseFill className="location-icon" />
                <p className="location-text">{employmentType}</p>
              </div>
            </div>
            <p className="salary-text">{packagePerAnnum}</p>
          </div>
          <hr />
          <div className="desc-container">
            <h1 className="desc-text">Description</h1>
            <a href={companyWebsiteUrl} className="li">
              <p className="link-visit">
                Visit <BiLinkExternal className="visit-icon" />
              </p>
            </a>
          </div>
          <p className="job-desc-text">{jobDescription}</p>
          <div className="skills-container">
            <h1 className="skills-text">Skills</h1>
            <ul className="skill-list-container">
              {skills.map(each => (
                <li key={each.id} className="skill-item">
                  <img
                    src={each.imageUrl}
                    className="skill-image"
                    alt={each.name}
                  />
                  <p className="skill-name">{each.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <h1 className="life-text">Life at Company</h1>
          <div className="bottom-container">
            <p className="bottom-desc">{lifeAtCompany.description}</p>
            <img
              src={lifeAtCompany.imageUrl}
              className="bottom-img"
              alt="life at company"
            />
          </div>
        </div>
        <div className="similar-jobs-container">
          <h1 className="similar-job-text">Similar Jobs</h1>
          <ul className="similar-job-list-container">
            {similarJobsData.similarJobs.map(each => (
              <SimilarJob key={each.id} details={each} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderiJobDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.displayIJobDetails()
      case apiStatusConstants.failure:
        return this.displayIFailureDetails()
      case apiStatusConstants.inProgress:
        return this.getLoader()
      default:
        return null
    }
  }

  getLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onClickRetryJob = () => {
    this.getJobItemDetails()
  }

  displayIFailureDetails = () => (
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
      <button
        type="button"
        className="profile-failure-btn"
        onClick={this.onClickRetryJob}
      >
        Retry
      </button>
    </div>
  )

  render() {
    return (
      <>
        <Header />
        <div className="i-job-container">{this.renderiJobDetails()}</div>
      </>
    )
  }
}

export default JobItemDetails
