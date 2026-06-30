import SwiftUI

struct OTPView: View {
    @EnvironmentObject var authVM: AuthViewModel

    var body: some View {
        VStack(spacing: 20) {
            Text("Enter OTP")
                .font(.largeTitle)
                .padding(.top, 40)

           TextField("6-digit OTP", text: $authVM.otp)
                .padding()
                .keyboardType(.numberPad)
                .background(Color(.secondarySystemBackground))
                .cornerRadius(10)

            Button(action: {
                authVM.verifyOTP()
            }) {
                Text("Verify OTP")
                    .foregroundColor(.white)
                    .padding()
                    .frame(maxWidth: .infinity)
                    .background(Color.red)
                    .cornerRadius(10)
            }

            Spacer()
        }
        .padding()
    }
}
