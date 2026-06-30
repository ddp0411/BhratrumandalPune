import SwiftUI

struct SplashView: View {
    @EnvironmentObject var authVM: AuthViewModel
    @State private var showLogin = false

    var body: some View {
        ZStack {
            AppColors.primary.ignoresSafeArea()
            Text("Bhratrumandal Pune")
                .font(.largeTitle)
                .foregroundColor(.white)
                .opacity(showLogin ? 0 : 1)
        }
       .onAppear {
            DispatchQueue.main.asyncAfter(deadline: .now() + 2) {
                showLogin = true
                authVM.isLoggedIn = false
            }
        }
        .fullScreenCover(isPresented: $showLogin) {
            LoginView()
        }
    }
}
