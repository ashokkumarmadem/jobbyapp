import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const EachJob = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails
  //console.log(jobDetails)
  return (
    <Link to={`/jobs/${id}`} className="link-item">
      <li className="each-job-item-container">
        <div className="each-job-profile-container">
          <img
            src={companyLogoUrl}
            className="company-logo-img"
            alt="company logo"
          />
          <div className="job-details-container">
            <h1 className="job-title">{title}</h1>
            <div className="star-container">
              <FaStar className="star-icon" />
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
        <h1 className="desc-text">Description</h1>
        <p className="job-desc-text">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default EachJob
