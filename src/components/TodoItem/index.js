// Write your code here
import './index.css'

const TodoItem = props => {
  const {todoDetails, deleteUser} = props
  const {id, title} = todoDetails

  const onDelete = () => {
    deleteUser(id)
  }

  return (
    <li className="user-item">
      <div className="item-details">
        <p className="title">{title}</p>
        <button className="btn" type="button" onClick={onDelete}>
          Delete
        </button>
      </div>
    </li>
  )
}
export default TodoItem
