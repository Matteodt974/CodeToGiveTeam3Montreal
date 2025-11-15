import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css'
})
export class PageComponent {
  @Input() fullWidth: boolean = false; // For full-width pages like home
  @Input() backgroundColor: string = '#f5f7fa';
}
