import SwiftUI

struct ProfileCardView: View {
    var profile: ProfileModel
    
    var body: some View {
        VStack(alignment: .leading) {
            Rectangle()
                .fill(Color.gray)
                .frame(height: 180)
                .overlay(
                    Text("Photo Placeholder")
                        .foregroundColor(.white)
                        .font(.headline)
                )
                .cornerRadius(12)

            Text("\(profile.name), \(profile.age)")
                .font(.headline)

            Text("\(profile.religion) • \(profile.occupation)")
                .foregroundColor(.gray)

            Text(profile.city)
                .foregroundColor(.gray)

            HStack {
                Button("Like") {}
                Spacer()
                Button("Shortlist") {}
            }
            .padding(.vertical, 5)
        }
        .padding()
        .background(Color(.secondarySystemBackground))
        .cornerRadius(12)
    }
}
