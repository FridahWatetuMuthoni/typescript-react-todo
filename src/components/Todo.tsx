import { useState, useEffect } from "react";
import { MdAutoDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

interface Task {
  id: string;
  text: string;
  isCompleted: boolean;
  createAt: string;
}

function Todo() {
  const [todos, setTodos] = useState<Task[]>(() => {
    let todos = localStorage.getItem("todos");
    if (todos) {
      return JSON.parse(todos);
    }
    return [];
  });
  const [newTodo, setNewTodo] = useState("");
  const [editingID, setEditingID] = useState<string | null>(null);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [dropPosition, setDropPosition] = useState<number | null>(null);

  //save the items to localstorage everytime it changes

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  //Sets draggingIndex to the index of the task you’re starting to drag.
  const handleDragStart = (id: number) => {
    setDraggingIndex(id);
  };
  const handleDragOver = (e: React.DragEvent<HTMLLIElement>, index: number) => {
    e.preventDefault(); // Prevent default to allow dropping
    if (draggingIndex != null && draggingIndex !== index) {
      setDropPosition(index);
    }
  };

  const handleDrop = () => {
    if (
      draggingIndex !== null &&
      dropPosition !== null &&
      draggingIndex !== dropPosition
    ) {
      const updatedTodos = [...todos];
      const [draggedTodo] = updatedTodos.splice(draggingIndex, 1);
      updatedTodos.splice(dropPosition, 0, draggedTodo); // Insert it at the new position
      setTodos(updatedTodos);
    }
    setDraggingIndex(null);
    setDropPosition(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTodo != "") {
      let date = new Date();
      let id = date.getTime();
      let created = `${date.getDay()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`;

      if (editingID) {
        setTodos((prevTodos) =>
          prevTodos.map((item) =>
            item.id === editingID ? { ...item, text: newTodo } : item
          )
        );
        setEditingID(null);
      } else {
        let task: Task = {
          id: `${id}`,
          text: newTodo,
          isCompleted: false,
          createAt: created,
        };
        setTodos((prev) => [...prev, task]);
      }
      setNewTodo("");
    }
  };

  const handleCompleted = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const handleDelete = (id: string) => {
    let tasks = todos.filter((item) => item.id !== id);
    setTodos([...tasks]);
  };

  const handleUpdate = (id: string) => {
    let taskToEdit = todos.find((item) => item.id === id);

    if (taskToEdit) {
      setEditingID(taskToEdit.id);
      setNewTodo(taskToEdit.text);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-16">
      <div className="px-4 py-2">
        <h1 className="text-gray-800 font-bold text-2xl uppercase text-center">
          To-Do List
        </h1>
      </div>
      <form
        className="w-full max-w-sm mx-auto px-4 py-2"
        onSubmit={handleSubmit}>
        <div className="flex items-center border-b-2 border-teal-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Add a task"
            value={newTodo}
            onChange={handleChange}
          />
          <button
            className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="submit">
            Add
          </button>
        </div>
      </form>
      <ul className="divide-y divide-gray-200 p-4">
        {todos.map((todo, index) => (
          <li
            className="py-4 flex items-center justify-between shadow gap-4 rounded px-3"
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={handleDrop}>
            <div className="flex items-center">
              <input
                id="completed"
                name="completed"
                checked={todo.isCompleted}
                onChange={() => handleCompleted(todo.id)}
                type="checkbox"
                className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
              />
              <label htmlFor="todo1" className="ml-3 block text-gray-900">
                <span
                  className={`text-lg font-medium ${
                    todo.isCompleted ? "line-through" : ""
                  }`}>
                  {todo.text}
                </span>
                <span className="text-sm font-light text-gray-500 ml-2">
                  {todo.createAt}
                </span>
              </label>
            </div>
            <section className="flex items-center justify-center gap-5">
              <FaEdit
                className="text-lg font-medium"
                onClick={() => handleUpdate(todo.id)}
              />
              <MdAutoDelete
                className="text-lg font-medium"
                onClick={() => handleDelete(todo.id)}
              />
            </section>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
