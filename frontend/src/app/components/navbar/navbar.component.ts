// File: frontend/src/app/components/navbar/navbar.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { N8nFormComponent } from '../n8n-form/n8n-form.component';
import { AuthModalService } from '../../services/auth-modal.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, N8nFormComponent],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit, OnDestroy {
  isMenuOpen = false;
  isLoggedIn = false; // État de connexion
  isLoginModalOpen = false;
  isSignupModalOpen = false;
  isAuthChoiceModalOpen = false;
  redirectToDonateAfterAuth = false; // Flag pour rediriger vers donate après auth

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

  private authModalSubscription: Subscription | null = null;

  constructor(
    private router: Router,
    private authModalService: AuthModalService
  ) {}

  ngOnInit(): void {
    // Subscribe to auth modal service
    this.authModalSubscription = this.authModalService.showAuthChoiceModal$.subscribe(
      (show) => {
        this.isAuthChoiceModalOpen = show;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.authModalSubscription) {
      this.authModalSubscription.unsubscribe();
    }
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  navigateToDonate(): void {
    this.closeMenu();
    if (this.isLoggedIn) {
      this.router.navigate(['/donate']);
    } else {
      this.openAuthChoiceModal();
    }
  }

  // Auth choice modal methods
  openAuthChoiceModal(): void {
    this.authModalService.openAuthChoiceModal();
  }

  closeAuthChoiceModal(): void {
    this.authModalService.closeAuthChoiceModal();
  }

  continueAsGuest(): void {
    const eventInfo = this.authModalService.getPendingEventInfo();
    this.authModalService.closeAuthChoiceModal();
    
    if (eventInfo.eventId && eventInfo.eventTitle) {
      // Navigate to donate with event info
      this.router.navigate(['/donate'], {
        queryParams: {
          eventId: eventInfo.eventId,
          eventTitle: eventInfo.eventTitle,
        },
      });
      this.authModalService.clearPendingEventInfo();
    } else {
      this.router.navigate(['/donate']);
    }
  }

  openLoginFromAuthChoice(): void {
    this.authModalService.closeAuthChoiceModal();
    this.redirectToDonateAfterAuth = true;
    this.openLoginModal();
  }

  openSignupFromAuthChoice(): void {
    this.authModalService.closeAuthChoiceModal();
    this.redirectToDonateAfterAuth = true;
    this.openSignupModal();
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

    // Rediriger vers donate si on vient du modal de choix
    if (this.redirectToDonateAfterAuth) {
      this.redirectToDonateAfterAuth = false;
      const eventInfo = this.authModalService.getPendingEventInfo();
      
      if (eventInfo.eventId && eventInfo.eventTitle) {
        this.router.navigate(['/donate'], {
          queryParams: {
            eventId: eventInfo.eventId,
            eventTitle: eventInfo.eventTitle,
          },
        });
        this.authModalService.clearPendingEventInfo();
      } else {
        this.router.navigate(['/donate']);
      }
    }
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

    // Rediriger vers donate si on vient du modal de choix
    if (this.redirectToDonateAfterAuth) {
      this.redirectToDonateAfterAuth = false;
      const eventInfo = this.authModalService.getPendingEventInfo();
      
      if (eventInfo.eventId && eventInfo.eventTitle) {
        this.router.navigate(['/donate'], {
          queryParams: {
            eventId: eventInfo.eventId,
            eventTitle: eventInfo.eventTitle,
          },
        });
        this.authModalService.clearPendingEventInfo();
      } else {
        this.router.navigate(['/donate']);
      }
    }
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
