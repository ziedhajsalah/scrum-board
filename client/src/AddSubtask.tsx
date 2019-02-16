import React from 'react';
import { Story } from './App';

export function AddSubtask({
  stories,
  story,
  storyIndex,
  setStories
}: {
  stories: Story[];
  story: Story;
  storyIndex: number;
  setStories: React.Dispatch<React.SetStateAction<Story[]>>;
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
          setStories([
            ...stories.slice(0, storyIndex),
            {
              ...story,
              subTasks: [
                ...story.subTasks,
                {
                  name: SubtaskName,
                  id: Date.now().toString(),
                  status: 'notStarted'
                }
              ]
            },
            ...stories.slice(storyIndex + 1)
          ]);
          setSubtaskName('');
        }}
      >
        Add Subtask
      </button>
    </div>
  );
}
