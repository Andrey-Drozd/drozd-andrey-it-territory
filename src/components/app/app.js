import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

import { TodoList } from "../todo-list";
import { AppHeader } from "../app-header";
import { SearchPanel } from "../search-panel";

import { ItemAddForm } from "../item-add-form";
import { apiGetTodoList } from "../../services/requests/api-get-todo-list";

import "./app.css";

function App() {
  const cancelRequest = useRef(null);
  const maxId = useRef(100);

  const [state, setState] = useState({
    todoData: [],
    searchInput: "",
    filter: "All",
  });

  useEffect(() => {
    if (cancelRequest.current == null) {
      cancelRequest.current = axios.CancelToken.source();
    }
    getTodoList();

    return () => {
      cancelRequest.current.cancel();
    };
  }, []);

  const getTodoList = () => {
    apiGetTodoList()
      .then((res) => {
        let data = res.data.filter((item) => item.userId === 1);
        data.forEach((item) => {
          item.edit = false;
        });

        setState((state) => {
          return {
            ...state,
            todoData: data,
          };
        });
      })
      .catch((e) => console.log(e));
  };

  const onMove = (srcI, desI) => {
    let arr = JSON.parse(JSON.stringify(state.todoData));

    if (desI >= 0) {
      arr.splice(desI, 0, arr.splice(srcI, 1)[0]);

      setState((state) => {
        return {
          ...state,
          todoData: arr,
        };
      });
    }
  };

  const deleteItem = (item) => {
    const todoDataNew = state.todoData.filter((el) => {
      return el.id !== item.id;
    });

    setState((state) => {
      return {
        ...state,
        todoData: todoDataNew,
      };
    });
  };

  const addItem = (text) => {
    const newItem = {
      title: text,
      id: ++maxId.current,
      completed: false,
      edit: false,
    };

    const newTodoData = [newItem, ...state.todoData];

    setState((state) => {
      return {
        ...state,
        todoData: newTodoData,
      };
    });
  };

  const editItem = (id) => {
    let data = JSON.parse(JSON.stringify(state.todoData));

    data.forEach((item) => {
      if (item.id === id) {
        item.edit = !item.edit;
      }
    });

    setState((state) => {
      return {
        ...state,
        todoData: data,
      };
    });
  };

  const saveTitle = (id, title) => {
    let data = JSON.parse(JSON.stringify(state.todoData));
    data.forEach((item) => {
      if (item.id === id) {
        item.edit = !item.edit;
        item.title = title;
      }
    });

    setState((state) => {
      return {
        ...state,
        todoData: data,
      };
    });
  };

  const onToggleDone = (item) => {
    const newArr = JSON.parse(JSON.stringify(state.todoData));
    const indx = newArr.findIndex((el) => el.id === item);
    newArr[indx].completed = !newArr[indx].completed;

    setState((state) => {
      return {
        ...state,
        todoData: newArr,
      };
    });
  };

  const searchOnChange = (searchInput) => {
    setState((state) => {
      return {
        ...state,
        searchInput: searchInput,
      };
    });
  };

  const search = (todoData, searchInput) => {
    if (searchInput.length === 0) {
      return todoData;
    }

    return todoData.filter((item) => {
      return item.title.toLowerCase().indexOf(searchInput.toLowerCase()) > -1;
    });
  };

  const filter = (filter) => {
    setState((state) => {
      return {
        ...state,
        filter: filter,
      };
    });
  };

  const filterStatus = (arr, status) => {
    switch (status) {
      case "All":
        return arr;
      case "Active":
        return arr.filter((el) => !el.completed);
      case "Done":
        return arr.filter((el) => el.completed);
      default:
        return arr;
    }
  };

  // вывод информации о строках
  const countDone = state.todoData.filter((el) => el.completed).length;
  const countAll = state.todoData.filter((el) => el).length;
  const countToDO = countAll - countDone;

  // реализация поиска по карточкам
  const visibleItems = filterStatus(
    search(state.todoData, state.searchInput),
    state.filter
  );

  return (
    <div className="todo-app">
      <AppHeader todo={countToDO} done={countDone} />

      <SearchPanel
        searchOnChange={searchOnChange}
        filter={filter}
        stateStatus={state.filter}
      />

      <ItemAddForm addItem={addItem} />

      <TodoList
        todos={visibleItems}
        onMove={onMove}
        onDeleted={deleteItem}
        onEdit={editItem}
        onToggleDone={onToggleDone}
        onSave={saveTitle}
      />
    </div>
  );
}

export { App };
