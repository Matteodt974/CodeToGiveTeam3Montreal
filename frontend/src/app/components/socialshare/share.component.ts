import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-social-share',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css']
})
export class SocialShareComponent {
  @Input() url: string = '';
  @Input() title: string = '';
  @Input() description: string = '';

  ngOnInit() {
    // Use current page URL if not provided
    if (!this.url) {
      this.url = window.location.href;
    }

    // Use page title if not provided
    if (!this.title) {
      this.title = document.title;
    }
  }

  shareOnFacebook() {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.url)}`;
    this.openShareWindow(shareUrl);
  }

  shareOnTwitter() {
    const text = this.title ? `${this.title}` : '';
    const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(this.url)}&text=${encodeURIComponent(text)}`;
    this.openShareWindow(shareUrl);
  }

  shareOnLinkedIn() {
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(this.url)}`;
    this.openShareWindow(shareUrl);
  }

  shareOnWhatsApp() {
    const text = this.title ? `${this.title} ${this.url}` : this.url;
    const shareUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(shareUrl, '_blank');
  }

  shareViaEmail() {
    const subject = encodeURIComponent(this.title);
    const body = encodeURIComponent(`${this.description}\n\n${this.url}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  }

  private openShareWindow(rawUrl: string) {
    const url = new URL(rawUrl);
    url.searchParams.append('embedded', 'true');
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
