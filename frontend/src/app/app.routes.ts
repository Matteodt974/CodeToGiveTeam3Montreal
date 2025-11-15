
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { DonnerBadgesComponent } from './pages/donner-badges/donner-badges.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { DonateComponent } from './pages/donate/donate.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'donner-badges', component: DonnerBadgesComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'donate', component: DonateComponent },
  { path: '**', redirectTo: '' }
];
