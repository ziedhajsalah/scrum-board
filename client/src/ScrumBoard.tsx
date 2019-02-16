import React from 'react';

import { Story } from './App';
import { SubTaskFrame } from './SubTaskFrame';
import { styles } from './styles';

export function ScrumBoard({ stories }: { stories: Story[] }) {
  return (
    <div className="container">
      <div className="row" style={styles.header}>
        <div className="col-sm-3" style={styles.headerSections}>
          Stories
        </div>
        <div className="col-sm-3" style={styles.headerSections}>
          Not Started
        </div>
        <div className="col-sm-3" style={styles.headerSections}>
          In Progress
        </div>
        <div className="col-sm-3" style={styles.headerSections}>
          Done
        </div>
      </div>
      {stories.map((story) => (
        <div className="row" key={story.id}>
          <div className="col-sm-3">{story.name}</div>
          <SubTaskFrame subTasks={story.subTasks} status="notStarted" />
          <SubTaskFrame subTasks={story.subTasks} status="inProgress" />
          <SubTaskFrame subTasks={story.subTasks} status="done" />
        </div>
      ))}
    </div>
  );
}
