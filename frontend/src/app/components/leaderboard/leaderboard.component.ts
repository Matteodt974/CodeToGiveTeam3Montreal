import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import { MatIcon} from '@angular/material/icon';

interface Donor {
  name: string;
  amount: number;
  badge: string;
  avatar: string;
  time: string;
}

interface Tab {
  label: string;
  value: 'monthly' | 'alltime';
  icon: string;
}

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css'],
  imports: [
    NgForOf,
    MatIcon,
    NgClass,
    NgIf,
  ],
  animations: [
    trigger('listAnimation', [
      transition(':enter', [
        style({opacity: 0, transform: 'translateY(10px)'}),
        animate('300ms ease-out', style({opacity: 1, transform: 'translateY(0)'}))
      ])
    ])
  ]
})
export class LeaderboardComponent implements OnInit {
  @Output() joinLeaderboard = new EventEmitter<void>();

  activeTab: 'monthly' | 'alltime' = 'monthly';

  tabs: Tab[] = [
    { label: 'This Month', value: 'monthly', icon: 'calendar_today' },
    { label: 'All Time', value: 'alltime', icon: 'history' }
  ];

  monthlyLeaderboard: Donor[] = [
    { name: 'Sarah Chen', amount: 2500, badge: 'Guardian', avatar: 'SC', time: '2 hours ago' },
    { name: 'Michael Rodriguez', amount: 1800, badge: 'Champion', avatar: 'MR', time: '5 hours ago' },
    { name: 'Emma Thompson', amount: 1200, badge: 'Protector', avatar: 'ET', time: '1 day ago' },
    { name: 'David Kim', amount: 950, badge: 'Supporter', avatar: 'DK', time: '2 days ago' },
    { name: 'Lisa Johnson', amount: 750, badge: 'Advocate', avatar: 'LJ', time: '3 days ago' },
    { name: 'Anonymous', amount: 500, badge: 'Helper', avatar: '?', time: '4 days ago' },
    { name: 'James Wilson', amount: 400, badge: 'Friend', avatar: 'JW', time: '5 days ago' },
    { name: 'Maria Garcia', amount: 350, badge: 'Ally', avatar: 'MG', time: '1 week ago' }
  ];

  alltimeLeaderboard: Donor[] = [
    { name: 'Sarah Chen', amount: 15000, badge: 'Lifetime Guardian', avatar: 'SC', time: 'Member since 2020' },
    { name: 'The Morrison Family', amount: 12500, badge: 'Family Champions', avatar: 'MF', time: 'Member since 2019' },
    { name: 'Michael Rodriguez', amount: 8900, badge: 'Dedicated Supporter', avatar: 'MR', time: 'Member since 2021' },
    { name: 'Emma Thompson', amount: 7200, badge: 'Consistent Giver', avatar: 'ET', time: 'Member since 2022' },
    { name: 'Community Foundation', amount: 6500, badge: 'Corporate Partner', avatar: 'CF', time: 'Member since 2018' },
    { name: 'David Kim', amount: 4800, badge: 'Long-term Advocate', avatar: 'DK', time: 'Member since 2021' },
    { name: 'Lisa Johnson', amount: 3900, badge: 'Faithful Friend', avatar: 'LJ', time: 'Member since 2020' },
    { name: 'Anonymous Donor', amount: 3500, badge: 'Silent Guardian', avatar: '?', time: 'Member since 2019' }
  ];

  currentLeaderboard: Donor[] = [];
  totalDonors = 0;
  totalRaised = 0;
  familiesHelped = 0;

  ngOnInit(): void {
    this.switchTab('monthly');
    this.calculateStats();
  }

  switchTab(tab: 'monthly' | 'alltime'): void {
    this.activeTab = tab;
    this.currentLeaderboard = tab === 'monthly' ? this.monthlyLeaderboard : this.alltimeLeaderboard;
  }

  calculateStats(): void {
    this.totalDonors = this.alltimeLeaderboard.length;
    this.totalRaised = this.alltimeLeaderboard.reduce((sum, donor) => sum + donor.amount, 0);
    this.familiesHelped = Math.floor(this.totalRaised / 1875); // Assuming $1875 per family
  }

  onJoinLeaderboard(): void {
    this.joinLeaderboard.emit();
  }
}
