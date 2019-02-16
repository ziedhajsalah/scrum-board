import React from 'react';
import { Story, addSubtask } from './App';

export function AddSubtask({
  stories,
  story,
  storyIndex,
  dispatch
}: {
  stories: Story[];
  story: Story;
  storyIndex: number;
  dispatch: React.Dispatch<any>;
}) {
  const [SubtaskName, setSubtaskName] = React.useState('');
  return (
    <div className="row">
      <input
        value={SubtaskName}
        onChange={(e: React.FormEvent<HTMLInputElement>) => {
          setSubtaskName(e.currentTarget.value);
        }}
      />
      <button
        onClick={() => {
          if (SubtaskName === '') {
            return;
          }
          dispatch({
            type: addSubtask,
            story,
            SubtaskName,
            storyIndex
          });
          setSubtaskName('');
        }}
      >
        Add Subtask
      </button>
    </div>
  );
}
