import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from '../../components/page/page.component';
import { Router } from '@angular/router';
import { QuizGameComponent } from '../../quiz-game/quiz-game.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PageComponent, QuizGameComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  showQuiz = false;

  constructor(private router: Router) {}

  onDonateClick() {
    // Navigate to donation page or open donation form
    console.log('Donate button clicked!');
    // For now, just scroll to donation section or implement your logic
  }

  onTakeQuizClick() {
    this.showQuiz = true;
    // Scroll to quiz section after a short delay to ensure it's rendered
    setTimeout(() => {
      const quizElement = document.getElementById('quiz-section');
      if (quizElement) {
        // quizElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }
}
