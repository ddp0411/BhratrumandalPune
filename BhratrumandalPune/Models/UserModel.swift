import Foundation

struct UserModel: Identifiable {
    let id = UUID()
    var name: String
    var phone: String
}
