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

const initialStories: Story[] = [
  {
    id: '1',
    name: 'as a user I want to login',
    subTasks: [
      {
        id: '11',
        name: 'add api',
        status: 'notStarted'
      },
      {
        id: '12',
        name: 'add frontend',
        status: 'inProgress'
      },
      {
        id: '13',
        name: 'add unit tests',
        status: 'done'
      },
      {
        id: '14',
        name: 'add e2e tests',
        status: 'done'
      },
      {
        id: '15',
        name: 'password must be encrypted',
        status: 'notStarted'
      },
      {
        id: '16',
        name: 'add form validation',
        status: 'notStarted'
      }
    ]
  },
  {
    id: '2',
    name: 'as a user I want to logout',
    subTasks: [
      {
        id: '21',
        name: 'add api',
        status: 'notStarted'
      },
      {
        id: '22',
        name: 'add frontend',
        status: 'inProgress'
      },
      {
        id: '23',
        name: 'add unit tests',
        status: 'done'
      },
      {
        id: '24',
        name: 'add e2e tests',
        status: 'done'
      }
    ]
  }
];

export default function App() {
  const [stories, setStories] = React.useState(initialStories);
  return <ScrumBoard stories={stories} setStories={setStories} />;
}
