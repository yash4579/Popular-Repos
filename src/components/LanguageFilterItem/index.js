// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {eachLanguage, onClicktoSelectLanguage} = props
  const {id, language} = eachLanguage

  const onClickToSelect = () => {
    onClicktoSelectLanguage(id)
  }

  return (
    <li id="listId">
      <button onClick={onClickToSelect} className="btn">
        <p className="languages">{language}</p>
      </button>
    </li>
  )
}

export default LanguageFilterItem
