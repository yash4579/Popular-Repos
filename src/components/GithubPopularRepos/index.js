const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here
import {Component} from 'react'
import './index.css'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import Loader from 'react-loader-spinner'

const switchMethods = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class GithubPopularRepos extends Component {
  state = {
    popularLanguages: [],
    filterLanguage: 'ALL',
    succOrNot: switchMethods.loading,
  }
  componentDidMount() {
    this.getAllLanguages()
  }
  onClicktoSelectLanguage = id => {
    this.setState({filterLanguage: id}, this.getAllLanguages)
  }

  onResponseSuccess = data => {
    const updatedData = data.map(eachLanguage => ({
      avatarUrl: eachLanguage.avatar_url,
      forksCount: eachLanguage.forks_count,
      id: eachLanguage.id,
      issuesCount: eachLanguage.issues_count,
      name: eachLanguage.name,
      starsCount: eachLanguage.stars_count,
    }))
    this.setState({
      popularLanguages: updatedData,
      succOrNot: switchMethods.success,
    })
  }

  onResponseFailure = () => {
    this.setState({succOrNot: switchMethods.failure})
  }

  getAllLanguages = async () => {
    this.setState({succOrNot: switchMethods.loading})
    const {filterLanguage} = this.state
    const url = `https://apis.ccbp.in/popular-repos?language=${filterLanguage}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onResponseSuccess(data.popular_repos)
    } else {
      this.onResponseFailure()
    }
  }

  renderSuccessView = () => {
    const {popularLanguages} = this.state
    return (
      <ul className="repository-list-container">
        {popularLanguages.map(eachLanguageItem => {
          return (
            <RepositoryItem
              eachLanguageItem={eachLanguageItem}
              key={eachLanguageItem.id}
            />
          )
        })}
      </ul>
    )
  }

  renderFailureView = () => {
    return (
      <img
        className="failure-img"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
    )
  }

  renderLoadingView = () => {
    return (
      <div data-testid="loader">
        <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
      </div>
    )
  }

  render() {
    const {succOrNot} = this.state

    let currentView

    switch (succOrNot) {
      case switchMethods.success:
        currentView = this.renderSuccessView()
        break
      case switchMethods.failure:
        currentView = this.renderFailureView()
        break
      case switchMethods.loading:
      default:
        currentView = this.renderLoadingView()
    }

    return (
      <div className="page-container">
        <h1 className="heading">Popular</h1>
        <ul className="list-container">
          {languageFiltersData.map(eachLanguage => {
            return (
              <LanguageFilterItem
                eachLanguage={eachLanguage}
                onClicktoSelectLanguage={this.onClicktoSelectLanguage}
                key={eachLanguage.id}
              />
            )
          })}
        </ul>
        {currentView}
      </div>
    )
  }
}

export default GithubPopularRepos
