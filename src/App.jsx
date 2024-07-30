import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenToSquare, faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import todoImg from './Image/to-do-list.png'
import { FaGithub } from "react-icons/fa";

const getLocalItems = () => {
  let list = localStorage.getItem('lists');
  if (list) {
    return JSON.parse(localStorage.getItem('lists'));
  } else {
    return [];
  }
}

function App() {
  const [inputValue, setInputValue] = useState('')
  const [todos, setTodos] = useState(getLocalItems());
  const [editMode, setEditmode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(todos));
  }, [todos])

  const AddTodo = () => {
    if (inputValue.trim() === '') {
      setErrorMessage('Input field cannot be empty');
      return;
    }
    const newTodo = {
      id: new Date().getTime(),
      text: inputValue,
    }
    setTodos([...todos, newTodo]);
    setInputValue('');
    setErrorMessage('');
  }

  const deleteTodo = (id) => {
    const updateTodo = todos.filter((todo) => todo.id !== id);
    setTodos(updateTodo);
  }

  const editTodo = (id, text) => {
    setEditmode(true);
    setEditId(id);
    setEditValue(text);
  }

  const updateTodo = () => {
    if (editValue.trim() === '') {
      setErrorMessage('Input field cannot be empty');
      return;
    }
    const updateTodos = todos.map((todo) => {
      if (todo.id === editId) {
        return { ...todo, text: editValue }
      }
      return todo
    })
    setTodos(updateTodos);
    setEditmode(false);
    setEditId(null);
    setEditValue('');
    setErrorMessage('');
  }

  const handleKeyPress = (e, action) => {
    if (e.key === 'Enter') {
      action();
    }
  }

  return (
    <>
      <div className='bg-slate-900 w-full h-[96.5vh] text-white flex flex-col items-center p-8'>
        <h2 className='text-4xl mb-3 font-medium font-pacifico flex items-center'><img src={todoImg} alt='error' className='w-16'></img>Todo List</h2>
        <div className='flex items-center gap-2 font-medium p-2 flex-col'>
          {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
          {
            editMode ? (
              <div className='flex gap-2'>
                <input type='text' value={editValue} onChange={(e) => setEditValue(e.target.value)} onKeyPress={(e) => handleKeyPress(e, updateTodo)} className='rounded-sm p-2 text-black hover:border-green-400 border-2 outline-none sm:w-80'></input>
                <button onClick={updateTodo} className='bg-red-700 p-1 rounded-md hover:bg-green-400 hover:text-black px-3'><FontAwesomeIcon icon={faPenToSquare} className='w-8 h-7' /></button>
              </div>
            ) :
              (
                <div className='flex gap-2'>
                  <input type='text' onChange={(e) => setInputValue(e.target.value)} value={inputValue} onKeyPress={(e) => handleKeyPress(e, AddTodo)} className='rounded-sm p-2 text-black hover:border-green-400 border-2 outline-none sm:w-80'></input>
                  <button onClick={AddTodo} className='bg-red-700 p-1 rounded-md hover:bg-green-400 hover:text-black px-3 '><FontAwesomeIcon icon={faCirclePlus} className='w-8 h-7' /></button>
                </div>
              )
          }
        </div>
        <div className='w-90 flex justify-center items-center sm:w-full mt-4'>
          <ul className='flex flex-col justify-around p-1 gap-1 items-center max-h-80 overflow-x-hidden overflow-y-scroll no-scrollbar'>
            {
              todos.map((todo, index) => (
                <li key={index} className='p-3 rounded-sm flex w-80  gap-1 items-center justify-center sm:w-[30rem] md:w-[35rem]'>
                  <img src={todoImg} className='w-10'></img>
                  <div className='  sm:min-w-96 md:w-[30rem] w-64'>
                  <div className='bg-blue-950 flex p-2  hover:bg-slate-700 items-center justify-between h-12 '>
                    <p className='w-36 sm:w-48 capitalize truncate '> {todo.text}</p>
                    <div className='gap-5 flex'>
                      <button onClick={() => deleteTodo(todo.id)} className='hover:text-red-600'><FontAwesomeIcon icon={faTrash} /></button>
                      <button onClick={() => editTodo(todo.id, todo.text)} className='hover:text-green-600'><FontAwesomeIcon icon={faPenToSquare} /></button>
                    </div>
                    </div>
                  </div>
                </li>
              ))
            }
          </ul>
        </div>
        
      </div>
      <p className='bg-slate-500 text-white w-full flex text-center py-0 bottom-0 p-1 gap-1 items-center justify-center'>Copyright  <a href='https://github.com/Kalyan190' className='' target='_blank'><FaGithub className='text-white bg-black rounded-full cursor-pointer'  /></a> @Kalyanam</p>
      
    </>
  )
}

export default App
