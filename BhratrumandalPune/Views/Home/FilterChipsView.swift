import SwiftUI

struct FilterChipsView: View {
    let filters = ["New Matches", "Nearby", "Community", "Profession", "Active"]

    var body: some View {
        ScrollView(.horizontal, showsIndicators: false) {
            HStack {
                ForEach(filters, id: \.self) { item in
                    Text(item)
                        .padding(.horizontal, 14)
                        .padding(.vertical, 8)
                        .background(Color(.secondarySystemBackground))
                        .cornerRadius(20)
                }
            }
            .padding(.horizontal)
        }
    }
}
