// app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { DonationComponent } from './pages/donation/donation.component';

import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'donate', component: DonationComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '**', redirectTo: '' }
];
