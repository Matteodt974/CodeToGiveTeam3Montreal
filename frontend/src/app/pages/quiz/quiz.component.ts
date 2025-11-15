import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from '../../components/page/page.component';
import { QuizGameComponent } from '../../quiz-game/quiz-game.component';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, PageComponent, QuizGameComponent],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent {}
