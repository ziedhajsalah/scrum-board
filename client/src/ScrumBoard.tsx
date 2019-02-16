import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import { Story, Status } from './App';
import { SubTaskFrame } from './SubTaskFrame';
import { styles } from './styles';

export function ScrumBoard({
  stories,
  setStories
}: {
  stories: Story[];
  setStories: React.Dispatch<React.SetStateAction<Story[]>>;
}) {
  return (
    <div className="container">
      <div className="row" style={styles.header}>
        <div
          className="col-sm-3"
          style={{ ...styles.headerSections, ...styles.storySection }}
        >
          Stories
        </div>
        <div
          className="col-sm-3"
          style={{ ...styles.headerSections, ...styles.storySection }}
        >
          Not Started
        </div>
        <div
          className="col-sm-3"
          style={{ ...styles.headerSections, ...styles.storySection }}
        >
          In Progress
        </div>
        <div
          className="col-sm-3"
          style={{ ...styles.headerSections, ...styles.storySection }}
        >
          Done
        </div>
      </div>
      {stories.map((story, storyIndex) => (
        <div className="row" key={story.id}>
          <div className="col-sm-3" style={styles.storySection}>
            {story.name}
          </div>
          <DragDropContext
            onDragEnd={(result) => {
              const { source, destination, draggableId } = result;

              if (!destination) {
                return;
              }

              const fromInProgressToNotStarted =
                source.droppableId === 'inProgress' &&
                destination.droppableId === 'notStarted';

              const fromDoneToInProgress =
                source.droppableId === 'done' &&
                destination.droppableId === 'inProgress';

              const fromDoneToNotStarted =
                source.droppableId === 'done' &&
                destination.droppableId === 'notStarted';

              if (
                fromDoneToInProgress ||
                fromInProgressToNotStarted ||
                fromDoneToNotStarted
              ) {
                return;
              }

              const updatedStory = { ...story };
              const draggedSubTaskIdx = updatedStory.subTasks.findIndex(
                (st) => st.id === draggableId
              );
              const draggedSubTask = updatedStory.subTasks[draggedSubTaskIdx];

              const updatedStories = [
                ...stories.slice(0, storyIndex),
                {
                  ...updatedStory,
                  subTasks: [
                    ...updatedStory.subTasks.slice(0, draggedSubTaskIdx),
                    {
                      ...draggedSubTask,
                      status: destination.droppableId as Status
                    },
                    ...updatedStory.subTasks.slice(draggedSubTaskIdx + 1)
                  ]
                },
                ...stories.slice(storyIndex + 1)
              ];
              setStories(() => updatedStories);
            }}
          >
            <SubTaskFrame subTasks={story.subTasks} status="notStarted" />
            <SubTaskFrame subTasks={story.subTasks} status="inProgress" />
            <SubTaskFrame subTasks={story.subTasks} status="done" />
          </DragDropContext>
        </div>
      ))}
    </div>
  );
}
