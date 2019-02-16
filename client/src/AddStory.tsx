import React from 'react';

export type addStoryFn = (storyName: string) => void;

export function AddStory({ addStory }: { addStory: addStoryFn }) {
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
          addStory(storyName);
          setStoryName('');
        }}
      >
        Add Story
      </button>
    </div>
  );
}
