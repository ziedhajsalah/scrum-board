import * as Axios from 'axios';
import { Story } from './App';

const baseUrl = 'http://localhost:3030';

export function getStories(): Promise<Story[]> {
  return Axios.default.get(`${baseUrl}/stories`).then((res) => res.data);
}

export function updateStories(stories: Story[]): Promise<Story[]> {
  return Axios.default
    .post(`${baseUrl}/stories`, { stories })
    .then((res) => res.data);
}
