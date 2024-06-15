import React, { useState, useEffect } from "react";
import "./App.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsCheckLg } from "react-icons/bs";

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, SetNewDescription] = useState("");

  const handleAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription,
    };

    let updatedTodoArray = [...allTodos];
    updatedTodoArray.push(newTodoItem);
    setTodos(updatedTodoArray);
    localStorage.setItem("todolist", JSON.stringify(updatedTodoArray));
  };

  const handleDeleteTodo = (index) => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index);

    localStorage.setItem("todolist", JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
  };

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem("todolist"));
    if (savedTodo) {
      setTodos(savedTodo);
    }
  }, []);

  return (
    <div className="App">
      <h1>My To do's</h1>

      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              type="text"
              placeholder="Whats the title of the task?"
            />
          </div>

          <div className="todo-input-item">
            <label>Description</label>
            <input
              value={newDescription}
              onChange={(e) => SetNewDescription(e.target.value)}
              type="text"
              placeholder="Whats the Description?"
            />
          </div>

          <div className="todo-input-item">
            <button
              onClick={handleAddTodo}
              type="button"
              className="primaryBtn"
            >
              Add
            </button>
          </div>
        </div>
        <div>
          <div className="button-area">
            <button
              className={`secondaryButton ${
                isCompleteScreen === false && "active"
              }`}
              onClick={() => setIsCompleteScreen(false)}
            >
              ToDo
            </button>
            <button
              className={`secondaryButton ${
                isCompleteScreen === true && "active"
              }`}
              onClick={() => setIsCompleteScreen(true)}
            >
              Completed
            </button>
          </div>

          <div className="todo-list">
            {allTodos.map((item, index) => {
              return (
                <div className="todo-list-item" key={index}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                  <div>
                    <RiDeleteBin6Line
                      className="icon"
                      onClick={() => handleDeleteTodo(index)}
                      title="Delete?"
                    />
                    <BsCheckLg className="check-icon" title="Complete?" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
