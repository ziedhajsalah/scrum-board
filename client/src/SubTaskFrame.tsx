import React from 'react';

import { SubTask, Status } from './App';

export function SubTaskFrame({
  subTasks,
  status
}: {
  subTasks: SubTask[];
  status: Status;
}) {
  return (
    <div className="col-sm-3">
      {subTasks
        .filter((subTask) => subTask.status === status)
        .map((subTask) => (
          <div className="card" key={subTask.id}>
            {subTask.name}
          </div>
        ))}
    </div>
  );
}
