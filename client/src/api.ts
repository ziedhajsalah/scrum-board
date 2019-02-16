import { Story } from './App';

export function getStories(): Promise<Story[]> {
  return new Promise((resolve) => {
    resolve(JSON.parse(localStorage.getItem('stories') || '[]'));
  });
}

export function updateStories(stories: Story[]): Promise<Story[]> {
  return new Promise((resolve) => {
    localStorage.setItem('stories', JSON.stringify(stories));
    resolve(stories);
  });
}
