import SwiftUI

struct SignupView: View {
    @EnvironmentObject var authVM: AuthViewModel
    @State private var name = ""
    @State private var dob = ""
    @State private var gender = "Male"

    var body: some View {
        VStack(spacing: 16) {
            Text("Create Your Profile").font(.title).padding(.top)

            TextField("Full Name", text: $name)
                .padding()
                .background(Color(.secondarySystemBackground))
                .cornerRadius(8)

            TextField("Date of Birth", text: $dob)
                .padding()
                .background(Color(.secondarySystemBackground))
                .cornerRadius(8)

            Picker("Gender", selection: $gender) {
                Text("Male").tag("Male")
                Text("Female").tag("Female")
            }.pickerStyle(SegmentedPickerStyle())

           Button(action: {
                authVM.isLoggedIn = true
            }) {
                Text("Continue")
                    .foregroundColor(.white)
                    .padding()
                    .frame(maxWidth: .infinity)
                    .background(Color.red)
                    .cornerRadius(8)
            }

            Spacer()
        }
        .padding()
    }
}
