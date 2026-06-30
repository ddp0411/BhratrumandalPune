// AuthViewModel.swift
import Foundation
import SwiftUI
import Combine

final class AuthViewModel: ObservableObject {
    @Published var phone: String = ""
    @Published var otp: String = ""
    @Published var isLoggedIn: Bool = false
    @Published var isOTPSent: Bool = false
    @Published var isNewUser: Bool = false

    func sendOTP() {
        guard phone.count == 10 else { return }
        isOTPSent = true
    }

    func verifyOTP() {
        if otp == "123456" {
            isLoggedIn = true
        }
    }

    init() { }
}

