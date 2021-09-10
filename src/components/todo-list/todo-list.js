import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { TodoListItem } from "../todo-list-item/todo-list-item";
import "./todo-list.css";

const TodoList = (props) => {
  const elements = props.todos.map((item, index) => {
    return (
      <Draggable
        key={item.id}
        draggableId={"draggable-" + item.id}
        index={index}
      >
        {(provided, snapshot) => (
          <li
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              ...provided.draggableProps.style,
              boxShadow: snapshot.isDragging ? "0 0 .4rem #666" : "none",
            }}
            key={item.id}
            className="list-group-item tasks__item"
          >
            <TodoListItem
              label={item.title}
              display={item.edit}
              done={item.completed}
              onDeleted={() => props.onDeleted(item)}
              onToggleDone={() => props.onToggleDone(item.id)}
              onEdit={() => props.onEdit(item.id)}
              onSave={(name) => props.onSave(item.id, name)}
            />
          </li>
        )}
      </Draggable>
    );
  });

  return (
    <div className="todo-list">
      <DragDropContext
        onDragEnd={(param) => {
          const srcI = param.source?.index;
          const desI = param.destination?.index;

          props.onMove(srcI, desI);
        }}
      >
        <Droppable droppableId="droppable-1">
          {(provided, snapshot) => (
            <ul
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{
                backgroundColor: snapshot.isDraggingOver ? "blue" : "grey",
              }}
              className="list-group todo-list tasks__list"
            >
              {elements}

              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export { TodoList };
