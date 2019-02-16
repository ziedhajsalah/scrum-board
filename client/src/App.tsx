import React from 'react';

import { ScrumBoard } from './ScrumBoard';
import { getStories, updateStories } from './api';

export type Status = 'notStarted' | 'inProgress' | 'done';

export type SubTask = {
  id: string;
  name: string;
  status: Status;
};

export type Story = {
  id: string;
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
      return [
        ...state,
        {
          name: action.name as string,
          id: Date.now().toString(),
          subTasks: []
        }
      ];
    case addSubtask:
      return [
        ...state.slice(0, action.storyIndex),
        {
          ...action.story,
          subTasks: [
            ...action.story.subTasks,
            {
              name: action.SubtaskName,
              id: Date.now().toString(),
              status: 'notStarted'
            }
          ]
        },
        ...state.slice(action.storyIndex + 1)
      ];
    case moveSubtask: {
      const { source, destination, draggableId, story, storyIndex } = action;
      if (!destination) {
        return state;
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
        return state;
      }

      const updatedStory = { ...story };
      const draggedSubTaskIdx = updatedStory.subTasks.findIndex(
        (st: SubTask) => st.id === draggableId
      );
      const draggedSubTask = updatedStory.subTasks[draggedSubTaskIdx];

      return [
        ...state.slice(0, storyIndex),
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
        ...state.slice(storyIndex + 1)
      ];
    }
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

  React.useEffect(() => {
    updateStories(stories);
  }, [stories]);

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
        dispatch({
          type: moveSubtask,
          source,
          destination,
          draggableId,
          story,
          storyIndex
        });
      }}
      addSubTask={(story: Story, SubtaskName: string, storyIndex: number) => {
        dispatch({
          type: addSubtask,
          story,
          SubtaskName,
          storyIndex
        });
      }}
      addStory={(storyName: string) => {
        dispatch({ type: addStory, name: storyName });
      }}
    />
  );
}
