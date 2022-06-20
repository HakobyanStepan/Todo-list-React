import React from 'react';

import TodoListItem from '../todo-list-item';

import './todo-list.css';


const TodoList = ({todos, onDeleted,
                  onToggleImportant,
                  onToggleDone}) => {
  const elemetns = todos.map((item)=>{

    const{id, ...itemPtops} = item
  return(
        <li key = {id} className='list-group-item'>
        <TodoListItem
         {...itemPtops}
        onDeleted = {() => onDeleted(id) }
        onToggleImportant= {()=>onToggleImportant(id)}
        onToggleDone = {()=> onToggleDone(id)}
        />
        </li>
  )
    });

return(
    <ul className='list-group todo-list'>
        {elemetns}
    </ul>
)
};

export default TodoList;