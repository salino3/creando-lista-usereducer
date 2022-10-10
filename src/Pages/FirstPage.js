import React from 'react';
import {useReducer, useRef} from "react";

const FirstPage = () => {

  

  const inputRef = useRef();

  const [tasks, dispatch] = useReducer((state = [], action) => {
    // console.log(action);
    switch (action.type) {
      case "add_task": {
        return [...state, { id: state.length + 1, title: action.title }];
      }
      case "remove_task": {
        return [...state.filter((task, index) => index !== action.index)];
      }
      case "delete_all": {
        return [...state.filter((index) => index === action.index)];
      }

      default:
        return state;
    }
  });



  const Delete = () => {
    dispatch({
      type: "delete_all",
      title: inputRef.current.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({
      type: "add_task",
      title: inputRef.current.value,
    });

    inputRef.current.value = "";
  };

  return (
    <>
      <div>
        <h1>Lista de tareas</h1>
        <button className="myBoton" type="submit" onClick={Delete}>
          Eliminar Todo{" "}
        </button>{" "}
        &nbsp;
        <form id="idForm" onSubmit={handleSubmit}>
          <label>Tarea: </label>
          <input type="text" name="title" ref={inputRef} /> &nbsp;
          <input className="myBoton" type="submit" value="Enviar" />
        </form>
        <div className="divTasks">
          {tasks &&
            tasks.map((item, index) => (
              <div className="mytask" key={index}>
                <p>
                  &nbsp; {item.id}. &nbsp; {item.title} &nbsp;
                  <button
                    className="myBoton"
                    onClick={() =>
                      dispatch({ type: "remove_task", index: index })
                    }
                  >
                    Borrar
                  </button>
                </p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default FirstPage