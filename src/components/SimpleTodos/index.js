import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import TodoItem from '../TodoItem'

import './index.css'

const initialTodosList = [
  {
    id: 1,
    title: 'Book the ticket for today evening',
    isEditing: false,
  },
  {
    id: 2,
    title: 'Rent the movie for tomorrow movie night',
    isEditing: false,
  },
  {
    id: 3,
    title: 'Confirm the slot for the yoga session tomorrow morning',
    isEditing: false,
  },
  {
    id: 4,
    title: 'Drop the parcel at Bloomingdale',
    isEditing: false,
  },
  {
    id: 5,
    title: 'Order fruits on Big Basket',
    isEditing: false,
  },
  {
    id: 6,
    title: 'Fix the production issue',
    isEditing: false,
  },
  {
    id: 7,
    title: 'Confirm my slot for Saturday Night',
    isEditing: false,
  },
  {
    id: 8,
    title: 'Get essentials for Sunday car wash',
    isEditing: false,
  },
]

// Write your code here

class SimpleTodos extends Component {
  state = {
    todos: initialTodosList,
    newTodo: '',
  }

  addTodo = () => {
    const {newTodo, todos} = this.state
    if (newTodo.trim() === '') return

    const words = newTodo.split(' ')
    let count = 1
    let title = newTodo

    // Check if the last word is a number
    const lastWord = words[words.length - 1]
    if (!Number.isNaN(Number(lastWord))) {
      count = parseInt(lastWord, 10)
      title = words.slice(0, -1).join(' ') // Get title without number
    }

    const newTodos = Array.from({length: count}, () => ({
      id: uuidv4(),
      title,
      isEditing: false,
      isCompleted: false,
    }))

    this.setState({
      todos: [...todos, ...newTodos],
      newTodo: '',
    })
  }

  // Function to delete a todo
  deleteTodo = id => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== id),
    }))
  }

  // Function to toggle edit mode
  toggleEdit = id => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo =>
        todo.id === id ? {...todo, isEditing: !todo.isEditing} : todo,
      ),
    }))
  }

  // Function to update the todo title
  updateTodo = (id, newText) => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo =>
        todo.id === id ? {...todo, title: newText, isEditing: false} : todo,
      ),
    }))
  }

  // Function to mark todos as completed
  toggleComplete = id => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo =>
        todo.id === id ? {...todo, isCompleted: !todo.isCompleted} : todo,
      ),
    }))
  }

  render() {
    const {todos, newTodo} = this.state

    return (
      <div className="bg-container">
        <div className="card">
          <h1 className="heading">Simple Todos</h1>
          <div className="input-container">
            <input
              type="text"
              value={newTodo}
              onChange={e => this.setState({newTodo: e.target.value})}
              placeholder="Enter todo"
            />
            <button type="button" onClick={this.addTodo}>
              Add
            </button>
          </div>
          <ul className="list-container">
            {todos.map(eachItem => (
              <TodoItem
                key={eachItem.id}
                todoDetails={eachItem}
                deleteTodo={this.deleteTodo}
                toggleEdit={this.toggleEdit}
                updateTodo={this.updateTodo}
                toggleComplete={this.toggleComplete}
                // showEditButton={true}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default SimpleTodos
