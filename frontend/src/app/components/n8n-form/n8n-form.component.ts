import { Component, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-n8n-form',
  templateUrl: './n8n-form.component.html',
  styleUrls: ['./n8n-form.component.css']
})
export class N8nFormComponent implements OnDestroy {
  open = false;
  iframeSrc: SafeResourceUrl | null = null;
  private rawUrl = 'https://matte0des.app.n8n.cloud/form/voice-call-request';

  constructor(private sanitizer: DomSanitizer) {}

  openForm() {
    // add query params if needed (e.g. embedded mode)
    const url = this.rawUrl + '?embedded=true';
    this.iframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    this.open = true;
    window.addEventListener('message', this.receiveMessage);
  }

  closeForm() {
    this.open = false;
    this.iframeSrc = null;
    window.removeEventListener('message', this.receiveMessage);
  }

  // use arrow function to keep `this`
  private receiveMessage = (event: MessageEvent) => {
    // security: check origin
    if (event.origin !== 'https://matte0des.app.n8n.cloud') return;
    // accepted payloads: simple string or object
    if (event.data === 'close' || event.data?.type === 'close-n8n-form') {
      this.closeForm();
    }
  }

  ngOnDestroy() {
    window.removeEventListener('message', this.receiveMessage);
  }
}
