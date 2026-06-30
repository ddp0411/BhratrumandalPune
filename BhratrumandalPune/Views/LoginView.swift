import SwiftUI

struct LoginView: View {
    @EnvironmentObject var authVM: AuthViewModel
    
    var body: some View {
        VStack(spacing: 20) {
            Text("Welcome Back")
                .font(.largeTitle)
                .padding(.top, 40)
            
            TextField("Enter Mobile Number", text: $authVM.phone)
             .padding()
             .keyboardType(.numberPad)
             .background(Color(.secondarySystemBackground))
             .cornerRadius(10)
             
             Button(action: {
             authVM.sendOTP()
             }) {
             Text("Send OTP")
             .foregroundColor(.white)
             .padding()
             .frame(maxWidth: .infinity)
             .background(authVM.phone.count == 10 ? Color.red : Color.gray)
             .cornerRadius(10)
             }
             .disabled(authVM.phone.count != 10)
             
             Spacer()
             }
             .padding()
             .fullScreenCover(isPresented: $authVM.isOTPSent) {
             OTPView()
             .environmentObject(authVM)
             }
        }
    }
}
