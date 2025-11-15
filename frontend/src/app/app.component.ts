import { Component } from '@angular/core';
import { QuizGameComponent } from './quiz-game/quiz-game.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [QuizGameComponent],
  template: `
    <div style="padding: 20px;">
      <app-quiz-game></app-quiz-game>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
}
