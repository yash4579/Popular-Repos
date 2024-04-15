// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {eachLanguageItem} = props
  const {id, avatarUrl, forksCount, issuesCount, name, starsCount} =
    eachLanguageItem

  return (
    <li className="list-item-repo">
      <img src={avatarUrl} className="avatar" alt="" />
      <h1 className="repo-name">{name}</h1>
      <div className="star-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          className="star-img"
          alt="stars"
        />
        <p>{starsCount}</p>
      </div>
      <div className="star-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          className="star-img"
          alt="forks"
        />
        <p>{forksCount}</p>
      </div>
      <div className="star-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          className="star-img"
          alt="open issues"
        />
        <p>{issuesCount}</p>
      </div>
    </li>
  )
}

export default RepositoryItem
