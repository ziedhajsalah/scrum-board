import React from 'react';

import { ScrumBoard } from './ScrumBoard';

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

const initialStories: Story[] = [];

export default function App() {
  const [stories, setStories] = React.useState(initialStories);
  return <ScrumBoard stories={stories} setStories={setStories} />;
}
