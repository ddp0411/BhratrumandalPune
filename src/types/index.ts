// Ported from Models/UserModel.swift and Models/ProfileModel.swift

export interface User {
  id: string;
  name: string;
  phone: string;
}

export interface Profile {
  id: string;
  name: string;
  age: number;
  religion: string;
  occupation: string;
  city: string;
  image: string;
}
