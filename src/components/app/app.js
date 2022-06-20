import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';


import './app.css';
export default class App extends Component {

  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem('Hello World'),
      this.createTodoItem('Create React'),
    ],
    term: '',
    filter: "all"
  }
  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    }
  }
  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const indx = todoData.findIndex((el) => el.id === id)

      const newArray = [
        ...todoData.slice(0, indx),
        ...todoData.slice(indx + 1)
      ];
      return {
        todoData: newArray
      }
    })
  }
  addItem = (text) => {
    const newItem = this.createTodoItem(text)

    this.setState(({ todoData }) => {
      const newArray = [
        ...todoData,
        newItem
      ]
      return {
        todoData: newArray
      }
    })
  }


  toggleProperty(arr, id, propName) {
    const indx = arr.findIndex((el) => el.id === id)
    const oldItem = arr[indx]
    const newItem = {
      ...oldItem,
      [propName]: !oldItem[propName]
    }

    return [
      ...arr.slice(0, indx),
      newItem,
      ...arr.slice(indx + 1)
    ]

  }
  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "done")
      }
    })
  }
  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "important")
      }
    })
  }
  onSearchChange = (term) => {
    this.setState({ term })
  }
  onFilterChange = (filter) => {
    this.setState({ filter })
  }
  search(items, term) {
    if (term === 0) {
      return items;
    };
    return items.filter((item) => {
      return item.label
        .toLowerCase()
        .indexOf(term.toLowerCase()) > -1
    })
  }

  filter(items, filter) {

    switch (filter) {
      case "all":
        return items;
      case "active":
        return items.filter((item) => !item.done);
      case "done":
        return items.filter((item) => item.done)
      default:
        return items
    }
  }


  render() {
    const { todoData, term, filter } = this.state

    const visibleItems = this.filter(
      this.search(todoData, term), filter)

    const doneCount = todoData
      .filter((el) => el.done).length
    const todoCount = todoData.length - doneCount
    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel
            onSearchChange={this.onSearchChange} />
          <ItemStatusFilter
            filter={filter}
            onFilterChange={this.onFilterChange} />
        </div>

        <TodoList
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />

        <ItemAddForm
          onItemAdded={this.addItem} />
      </div>)
  }

}

