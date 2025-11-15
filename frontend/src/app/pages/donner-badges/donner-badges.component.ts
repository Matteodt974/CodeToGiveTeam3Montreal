import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from '../../components/page/page.component';
import { Badge } from '../../models/badge';

@Component({
  selector: 'app-donner-badges',
  templateUrl: './donner-badges.component.html',
  styleUrls: ['./donner-badges.component.css'],
  standalone: true,
  imports: [CommonModule, PageComponent],
})
export class DonnerBadgesComponent implements OnInit {
  userDonationCount = 12;

  earnedBadges: Badge[] = [
    {
      id: 'novice',
      name: 'Novice',
      minDonations: 1,
      icon: '🌱',
      color: '#90EE90',
      description: 'Votre première donation - Merci!',
    },
    {
      id: 'supporter',
      name: 'Supporter',
      minDonations: 5,
      icon: '⭐',
      color: '#FFD700',
      description: '5 donations - Vous êtes un grand supporter!',
    },
    {
      id: 'champion',
      name: 'Champion',
      minDonations: 10,
      icon: '🏆',
      color: '#FFA500',
      description: '10 donations - Vous êtes un champion!',
    },
  ];
  ngOnInit() {
    console.log('DonnerBadgesComponent loaded');
  }
}
