import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface QuizOption {
  text: string;
  isCorrect: boolean;
}

interface QuizQuestion {
  question: string;
  options: QuizOption[];
  explanation: string;
}

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent {
  Math = Math;

  currentQuestionIndex = 0;
  score = 0;
  selectedAnswerIndex: number | null = null;
  answerSelected = false;
  quizCompleted = false;

  questions: QuizQuestion[] = [
    {
      question:
        'What percentage of women in Canada will experience intimate partner violence in their lifetime?',
      options: [
        { text: 'A) more than 30%', isCorrect: true },
        { text: 'B) less than 30%', isCorrect: false },
      ],
      explanation:
        'Statistics shows that 44% of women and girls who had ever been in an intimate partner relationship reported experiencing some kind of psychological, physical, or sexual abuse in the context of an intimate relationship in their lifetime (since the age of 15)',
    },
    {
      question:
        'In 2019, what percentage of people who had experienced IPV did not report it to the police',
      options: [
        { text: 'A) more than 50%', isCorrect: true },
        { text: 'B) less than 50%', isCorrect: false },
      ],
      explanation:
        'Statistics that in 2019, 80% of people who had experienced IPV did not report it to the police (women reported 22% of the time, and men 14% of the timeFootnote4 ).',
    },
    {
      question:
        'What is the most dangerous time for a survivor of domestic violence?',
      options: [
        { text: 'A) During the relationship', isCorrect: false },
        { text: 'B) When they first seek help', isCorrect: false },
        { text: 'C) When leaving or shortly after leaving', isCorrect: true },
        { text: 'D) Years after the relationship ends', isCorrect: false },
      ],
      explanation:
        'Research shows that the most dangerous time for a survivor is when leaving an abusive relationship or shortly after. This is why organizations like Shield of Athena provide emergency shelter and safety planning.',
    },
    {
      question:
        'In what percentage of cases, people who have experienced IPV don’t speak to anyone about the violence that they experienced, let alone report it.',
      options: [
        { text: 'A) More than 30%', isCorrect: true },
        { text: 'B) Less than 30%', isCorrect: false },
      ],
      explanation:
        'The most common reasons provided by victims/survivors for not reporting their experience of intimate partner violence to the police are: the belief that abuse is a private or personal matter, and the perception that the incident is not important enough to report.',
    },
  ];

  selectAnswer(index: number): void {
    if (this.answerSelected) return;

    this.selectedAnswerIndex = index;
    this.answerSelected = true;

    if (this.questions[this.currentQuestionIndex].options[index].isCorrect) {
      this.score++;
    }
  }

  nextQuestion(): void {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.selectedAnswerIndex = null;
      this.answerSelected = false;
    }
  }

  previousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.selectedAnswerIndex = null;
      this.answerSelected = false;
      // Note: This doesn't restore previous answers - can be enhanced
    }
  }

  completeQuiz(): void {
    this.quizCompleted = true;
  }

  restartQuiz(): void {
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.selectedAnswerIndex = null;
    this.answerSelected = false;
    this.quizCompleted = false;
  }

  getResultEmoji(): string {
    const percentage = (this.score / this.questions.length) * 100;
    if (percentage === 100) return '🌟';
    if (percentage >= 80) return '🎓';
    if (percentage >= 60) return '📚';
    if (percentage >= 40) return '💡';
    return '🧠';
  }

  getResultMessage(): string {
    const percentage = (this.score / this.questions.length) * 100;

    if (percentage === 100) {
      return "🌟 Perfect! You're very knowledgeable about family violence issues. Your awareness can help save lives by recognizing warning signs and supporting survivors.";
    } else if (percentage >= 80) {
      return '👏 Great job! You have a good understanding of family violence. Consider sharing this knowledge with friends and family to help create safer communities.';
    } else if (percentage >= 60) {
      return "📚 You're learning! Family violence is a complex issue. Your donation will help fund education programs that spread this important knowledge.";
    } else {
      return '💡 Thank you for taking the quiz! Every question teaches us something new. Your support helps fund education programs that can prevent violence before it starts.';
    }
  }

  getEmotionalMessage(): string {
    const emotionalMessages = [
      'Every statistic represents a real person with hopes, dreams, and a right to live without fear. Your awareness can be the light that guides someone to safety.',
      'Behind every form of abuse is a person struggling in silence. Understanding these different faces of violence helps us recognize when someone needs our help.',
      'Leaving takes immense courage. Survivors need our compassion, not judgment. Your support during this critical time can literally save a life.',
      'Children carry these invisible scars into adulthood. But with proper support and love, healing is possible. Every child deserves to grow up feeling safe.',
      "Sometimes the most powerful thing we can do is simply listen and believe. Your compassion can be the first step in someone's journey to freedom and healing.",
    ];

    return (
      emotionalMessages[this.currentQuestionIndex] ||
      "Your knowledge and compassion can make a real difference in someone's life."
    );
  }
}
