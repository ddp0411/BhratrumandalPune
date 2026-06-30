import { Profile } from '../types';

// Mock feed data — mirrors HomeViewModel.swift, with a few extra profiles
// so the feed scrolls. Replace with a real API call from Services/ later.
export const mockProfiles: Profile[] = [
  {
    id: '1',
    name: 'Sneha Patil',
    age: 25,
    religion: 'Hindu',
    occupation: 'Software Engineer',
    city: 'Pune',
    image: 'girl1',
  },
  {
    id: '2',
    name: 'Rohit Kulkarni',
    age: 28,
    religion: 'Hindu',
    occupation: 'Architect',
    city: 'Pune',
    image: 'boy1',
  },
  {
    id: '3',
    name: 'Priya Deshmukh',
    age: 26,
    religion: 'Hindu',
    occupation: 'Doctor',
    city: 'Pune',
    image: 'girl2',
  },
  {
    id: '4',
    name: 'Amol Joshi',
    age: 30,
    religion: 'Hindu',
    occupation: 'Chartered Accountant',
    city: 'Pune',
    image: 'boy2',
  },
  {
    id: '5',
    name: 'Aarti Shinde',
    age: 24,
    religion: 'Hindu',
    occupation: 'Teacher',
    city: 'Pune',
    image: 'girl3',
  },
];
