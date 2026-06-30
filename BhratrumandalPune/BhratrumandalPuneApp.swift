import SwiftUI

@main
struct BhratrumandalPuneApp: App {
    @StateObject private var authVM = AuthViewModel()

    var body: some Scene {
        WindowGroup {
            if authVM.isLoggedIn {
                HomeView()
                    .environmentObject(authVM)
            } else {
                SplashView()
                    .environmentObject(authVM)
            }
        }
    }
}
