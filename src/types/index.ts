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
  /** Caste / community shown on the profile card, e.g. "Maratha". */
  community: string;
  occupation: string;
  education: string;
  city: string;
  /** Asset key from the SwiftUI port — no bundled image yet, so cards render an
   *  initials-based placeholder tinted with `tint`. */
  image: string;
  verified: boolean;
  /** Soft background tint for the placeholder avatar. */
  tint: string;
}
