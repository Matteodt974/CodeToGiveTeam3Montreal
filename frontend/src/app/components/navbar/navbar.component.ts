// File: frontend/src/app/components/navbar/navbar.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  isMenuOpen = false;
  isLoggedIn = false; // État de connexion
  isLoginModalOpen = false;
  isSignupModalOpen = false;

  // Login form data
  loginEmail = '';
  loginPassword = '';

  // Signup form data
  signupName = '';
  signupEmail = '';
  signupPassword = '';
  signupConfirmPassword = '';
  signupPhone = '';
  signupAddress = '';
  signupCity = '';
  signupPostalCode = '';
  signupCountry = '';

  constructor(private router: Router) {}

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  navigateToDonate(): void {
    this.closeMenu();
    this.router.navigate(['/donate']);
  }

  // Login modal methods
  openLoginModal(): void {
    this.isLoginModalOpen = true;
    this.closeMenu();
  }

  closeLoginModal(): void {
    this.isLoginModalOpen = false;
    this.resetLoginForm();
  }

  resetLoginForm(): void {
    this.loginEmail = '';
    this.loginPassword = '';
  }

  handleLogin(): void {
    console.log('Login attempt:', { email: this.loginEmail, password: this.loginPassword });
    // Simuler la connexion réussie
    this.isLoggedIn = true;
    this.closeLoginModal();
  }

  // Signup modal methods
  openSignupModal(): void {
    this.isSignupModalOpen = true;
    this.closeMenu();
  }

  closeSignupModal(): void {
    this.isSignupModalOpen = false;
    this.resetSignupForm();
  }

  resetSignupForm(): void {
    this.signupName = '';
    this.signupEmail = '';
    this.signupPassword = '';
    this.signupConfirmPassword = '';
    this.signupPhone = '';
    this.signupAddress = '';
    this.signupCity = '';
    this.signupPostalCode = '';
    this.signupCountry = '';
  }

  handleSignup(): void {
    console.log('Signup attempt:', { 
      name: this.signupName, 
      email: this.signupEmail, 
      password: this.signupPassword,
      phone: this.signupPhone,
      address: this.signupAddress,
      city: this.signupCity,
      postalCode: this.signupPostalCode,
      country: this.signupCountry
    });
    // Simuler l'inscription réussie
    this.isLoggedIn = true;
    this.closeSignupModal();
  }

  // Switch between modals
  switchToSignup(): void {
    this.closeLoginModal();
    this.openSignupModal();
  }

  switchToLogin(): void {
    this.closeSignupModal();
    this.openLoginModal();
  }

  // Logout method
  handleLogout(): void {
    console.log('User logged out');
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }
}
