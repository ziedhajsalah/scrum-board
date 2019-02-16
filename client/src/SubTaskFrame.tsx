import React from 'react';

import { SubTask, Status } from './App';
import { Droppable, Draggable } from 'react-beautiful-dnd';

export function SubTaskFrame({
  subTasks,
  status
}: {
  subTasks: SubTask[];
  status: Status;
}) {
  return (
    <Droppable droppableId={status}>
      {(provided, snapshot) => (
        <div
          className="col-sm-3"
          ref={provided.innerRef}
          style={((isDraggingOver) => ({
            backgroundColor: isDraggingOver ? 'lightblue' : 'lightgrey',
            border: '1px solid lightblue',
            padding: '16px'
          }))(snapshot.isDraggingOver)}
        >
          {subTasks
            .filter((subTask) => subTask.status === status)
            .map((subTask, index) => (
              <Draggable
                key={subTask._id}
                draggableId={subTask._id!}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    className="card"
                    key={subTask._id}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {subTask.name}
                  </div>
                )}
              </Draggable>
            ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
