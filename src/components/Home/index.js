import Header from '../Header'

import './index.css'

const Home = props => {
  const onClickFindJobs = () => {
    const {history} = props
    history.replace('/jobs')
  }
  return (
    <div className="home-container">
      <Header />
      <div className="text-container">
        <h1 className="home-heading-text">Find The Job That Fits Your Life</h1>
        <p className="home-description-text">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential
        </p>
        <button className="find-jobs-btn" onClick={onClickFindJobs}>
          Find Jobs
        </button>
      </div>
    </div>
  )
}

export default Home
