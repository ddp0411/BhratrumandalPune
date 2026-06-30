import Foundation

struct ProfileModel: Identifiable {
    let id = UUID()
    let name: String
    let age: Int
    let religion: String
    let occupation: String
    let city: String
    let image: String
}
