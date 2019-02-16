import React from 'react';

import { Story } from './App';

export function AddStory({
  stories,
  setStories
}: {
  stories: Story[];
  setStories: React.Dispatch<React.SetStateAction<Story[]>>;
}) {
  const [storyName, setStoryName] = React.useState('');
  return (
    <div className="row">
      <input
        value={storyName}
        onChange={(e: React.FormEvent<HTMLInputElement>) => {
          setStoryName(e.currentTarget.value);
        }}
      />
      <button
        onClick={() => {
          if (storyName === '') {
            return;
          }
          setStories([
            ...stories,
            {
              name: storyName,
              id: Date.now().toString(),
              subTasks: []
            }
          ]);
          setStoryName('');
        }}
      >
        Add Story
      </button>
    </div>
  );
}
