// // Write your code here
// import './index.css'

// const TodoItem = props => {
//   const {todoDetails, deleteUser} = props
//   const {id, title} = todoDetails

//   const onDelete = () => {
//     deleteUser(id)
//   }

//   return (
//     <li className="user-item">
//       <div className="item-details">
//         <p className="title">{title}</p>
//         <button className="btn" type="button" onClick={onDelete}>
//           Delete
//         </button>
//       </div>
//     </li>
//   )
// }
// export default TodoItem
import {Component} from 'react'
import './index.css'

class TodoItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editedText: props.todoDetails.title, // ✅ Fixed destructuring error
    }
  }

  handleChange = event => {
    this.setState({editedText: event.target.value})
  }

  handleSave = () => {
    const {updateTodo, todoDetails} = this.props
    const {editedText} = this.state // ✅ Destructure state before using
    updateTodo(todoDetails.id, editedText)
  }

  render() {
    const {todoDetails, deleteTodo, toggleEdit, toggleComplete} = this.props
    const {id, title, isEditing, isCompleted} = todoDetails
    const {editedText} = this.state

    return (
      <li className="todo-item">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={() => toggleComplete(id)}
        />
        {isEditing ? (
          <>
            <input
              type="text"
              value={editedText}
              onChange={this.handleChange}
            />
            <button type="button" onClick={this.handleSave}>
              Save
            </button>
          </>
        ) : (
          <>
            <p className={isCompleted ? 'completed' : ''}>{title}</p>
            <button type="button" onClick={() => toggleEdit(id)}>
              Edit
            </button>
          </>
        )}
        <button type="button" onClick={() => deleteTodo(id)}>
          Delete
        </button>
      </li>
    )
  }
}

export default TodoItem
