// HomeViewModel.swift
import SwiftUI
import Combine
  

final class HomeViewModel: ObservableObject {
    @Published var profiles: [ProfileModel] = [
        ProfileModel(name: "Sneha Patil", age: 25, religion: "Hindu", occupation: "Software Engineer", city: "Pune", image: "girl1"),
        ProfileModel(name: "Rohit Kulkarni", age: 28, religion: "Hindu", occupation: "Architect", city: "Pune", image: "boy1")
    ]

    // explicit initializer (optional but safe)
    init() { }
}
