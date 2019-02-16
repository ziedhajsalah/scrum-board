import React from 'react';
import { Story } from './App';

export type addSubTaskFn = (
  story: Story,
  SubtaskName: string,
  storyIndex: number
) => void;

export function AddSubtask({
  story,
  storyIndex,
  addSubTask
}: {
  story: Story;
  storyIndex: number;
  addSubTask: addSubTaskFn;
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
          addSubTask(story, SubtaskName, storyIndex);
          setSubtaskName('');
        }}
      >
        Add Subtask
      </button>
    </div>
  );
}
