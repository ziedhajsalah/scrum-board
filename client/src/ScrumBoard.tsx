import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import { Story } from './App';
import { SubTaskFrame } from './SubTaskFrame';
import { AddStory, addStoryFn } from './AddStory';
import { AddSubtask, addSubTaskFn } from './AddSubtask';
import { styles } from './styles';

type moveSubTaskFn = (
  source: any,
  destination: any,
  draggableId: any,
  story: any,
  storyIndex: any
) => void;

export function ScrumBoard({
  stories,
  moveSubTask,
  addSubTask,
  addStory
}: {
  stories: Story[];
  moveSubTask: moveSubTaskFn;
  addSubTask: addSubTaskFn;
  addStory: addStoryFn;
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
              story={story}
              storyIndex={storyIndex}
              addSubTask={addSubTask}
            />
          </div>
          <DragDropContext
            onDragEnd={(result) => {
              const { source, destination, draggableId } = result;
              moveSubTask(source, destination, draggableId, story, storyIndex);
            }}
          >
            <SubTaskFrame subTasks={story.subTasks} status="notStarted" />
            <SubTaskFrame subTasks={story.subTasks} status="inProgress" />
            <SubTaskFrame subTasks={story.subTasks} status="done" />
          </DragDropContext>
        </div>
      ))}
      <AddStory addStory={addStory} />
    </div>
  );
}
