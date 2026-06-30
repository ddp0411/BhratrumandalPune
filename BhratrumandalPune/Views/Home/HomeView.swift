import SwiftUI

struct HomeView: View {
    @StateObject var homeVM = HomeViewModel()
    
    var body: some View {
        NavigationView {
            VStack(alignment: .leading) {
                
                // Header
                HStack {
                    Circle()
                        .fill(Color.gray.opacity(0.3))
                        .frame(width: 40, height: 40)
                    
                    Spacer()
                    Image(systemName: "bell")
                    Image(systemName: "heart")
                }
                .font(.title3)
                .padding(.horizontal)
                .padding(.top)

                // Filters
                FilterChipsView()

                // List of Profiles
                ScrollView {
                    VStack(spacing: 20) {
                        ForEach(homeVM.profiles) { profile in
                            ProfileCardView(profile: profile)
                        }
                    }
                    .padding()
                }
            }
            .navigationBarHidden(true)
        }
    }
}
