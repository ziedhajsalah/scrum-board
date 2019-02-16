import * as Axios from 'axios';
import { Story } from './App';

const baseUrl = 'http://localhost:3030';

export function getStories(): Promise<Story[]> {
  return Axios.default.get(`${baseUrl}/stories`).then((res) => res.data);
}

export function createStory(story: Story): Promise<Story> {
  return Axios.default
    .post(`${baseUrl}/stories`, { story })
    .then((res) => res.data);
}

export function updateStory(story: Story): Promise<Story> {
  return Axios.default
    .put(`${baseUrl}/stories/${story._id}`, { story })
    .then((res) => res.data);
}
