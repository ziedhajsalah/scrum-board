import React from 'react';

import { ScrumBoard } from './ScrumBoard';
import { getStories, updateStory, createStory } from './api';

export type Status = 'notStarted' | 'inProgress' | 'done';

export type SubTask = {
  _id?: string;
  name: string;
  status: Status;
};

export type Story = {
  _id?: string;
  name: string;
  subTasks: SubTask[];
};

export const addStory = 'addStory';
export const addSubtask = 'addSubtask';
export const moveSubtask = 'moveSubtask';
export const setStories = 'setStories';

function storiesReducer(state: Story[], action: any): Story[] {
  switch (action.type) {
    case addStory:
      return [...state, action.newStory];
    case addSubtask:
    case moveSubtask:
      return [
        ...state.slice(0, action.storyIndex),
        action.updatedStory,
        ...state.slice(action.storyIndex + 1)
      ];
    case setStories:
      return action.stories;
    default:
      return state;
  }
}

const initialStories: Story[] = [];

export default function App() {
  const [stories, dispatch] = React.useReducer(storiesReducer, initialStories);

  React.useEffect(() => {
    getStories().then((stories) => {
      dispatch({ type: setStories, stories });
    });
  }, []);

  return (
    <ScrumBoard
      stories={stories}
      moveSubTask={(
        source: any,
        destination: any,
        draggableId: any,
        story: any,
        storyIndex: any
      ) => {
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

        const draggedSubTaskIdx = story.subTasks.findIndex(
          (st: SubTask) => st._id === draggableId
        );
        const draggedSubTask = story.subTasks[draggedSubTaskIdx];
        const updatedStory = {
          ...story,
          subTasks: [
            ...story.subTasks.slice(0, draggedSubTaskIdx),
            {
              ...draggedSubTask,
              status: destination.droppableId as Status
            },
            ...story.subTasks.slice(draggedSubTaskIdx + 1)
          ]
        };

        updateStory(updatedStory).then((data) => {
          dispatch({
            type: moveSubtask,
            updatedStory: data,
            storyIndex
          });
        });
      }}
      addSubTask={(story: Story, SubtaskName: string, storyIndex: number) => {
        updateStory({
          ...story,
          subTasks: [
            ...story.subTasks,
            {
              name: SubtaskName,
              status: 'notStarted'
            }
          ]
        }).then((updatedStory) => {
          dispatch({
            type: addSubtask,
            updatedStory,
            storyIndex
          });
        });
      }}
      addStory={(storyName: string) => {
        createStory({ name: storyName, subTasks: [] }).then((newStory) => {
          dispatch({ type: addStory, newStory });
        });
      }}
    />
  );
}
