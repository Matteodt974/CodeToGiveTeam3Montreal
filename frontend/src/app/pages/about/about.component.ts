import { Component } from '@angular/core';
import { PageComponent } from '../../components/page/page.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [PageComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {}
