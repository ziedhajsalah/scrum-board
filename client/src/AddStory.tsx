import React from 'react';

import { Story, addStory } from './App';

export function AddStory({
  stories,
  dispatch
}: {
  stories: Story[];
  dispatch: React.Dispatch<any>;
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
          dispatch({ type: addStory, name: storyName });
          setStoryName('');
        }}
      >
        Add Story
      </button>
    </div>
  );
}
