import {FaStar} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const SimilarJob = props => {
  const {details} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    rating,
    title,
  } = details

  return (
    <li className="each-job-item-container">
      <div className="each-job-profile-container">
        <img
          src={companyLogoUrl}
          className="company-logo-img"
          alt="similar job company logo"
        />
        <div className="job-details-container">
          <h1 className="job-title">{title}</h1>
          <div className='star-container'>
            <FaStar className="star-icon" />
            <p className="star-number">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="desc-text">Description</h1>
      <p className="job-desc-text">{jobDescription}</p>
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
      </div>
    </li>
  )
}

export default SimilarJob
