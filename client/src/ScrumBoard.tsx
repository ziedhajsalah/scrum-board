import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import { Story, Status, moveSubtask } from './App';
import { SubTaskFrame } from './SubTaskFrame';
import { AddStory } from './AddStory';
import { AddSubtask } from './AddSubtask';
import { styles } from './styles';

export function ScrumBoard({
  stories,
  dispatch
}: {
  stories: Story[];
  dispatch: React.Dispatch<any>;
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
            <div className="row">{story.name}</div>
            <AddSubtask
              stories={stories}
              story={story}
              storyIndex={storyIndex}
              dispatch={dispatch}
            />
          </div>
          <DragDropContext
            onDragEnd={(result) => {
              const { source, destination, draggableId } = result;
              dispatch({
                type: moveSubtask,
                source,
                destination,
                draggableId,
                story,
                storyIndex
              });
            }}
          >
            <SubTaskFrame subTasks={story.subTasks} status="notStarted" />
            <SubTaskFrame subTasks={story.subTasks} status="inProgress" />
            <SubTaskFrame subTasks={story.subTasks} status="done" />
          </DragDropContext>
        </div>
      ))}
      <AddStory stories={stories} dispatch={dispatch} />
    </div>
  );
}
