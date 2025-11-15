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
  styleUrls: ['./quiz.component.css']
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
      question: 'What percentage of women in Canada will experience intimate partner violence in their lifetime?',
      options: [
        { text: 'A) 1 in 10 (10%)', isCorrect: false },
        { text: 'B) 1 in 6 (17%)', isCorrect: false },
        { text: 'C) 1 in 4 (25%)', isCorrect: true },
        { text: 'D) 1 in 3 (33%)', isCorrect: false }
      ],
      explanation: 'Statistics show that 1 in 4 women in Canada will experience intimate partner violence in their lifetime. This highlights the widespread nature of this issue and the critical need for support services.'
    },
    {
      question: 'Which of the following is considered a form of domestic violence?',
      options: [
        { text: 'A) Physical abuse only', isCorrect: false },
        { text: 'B) Emotional, financial, and physical abuse', isCorrect: true },
        { text: 'C) Only violence that leaves visible marks', isCorrect: false },
        { text: 'D) Arguments between partners', isCorrect: false }
      ],
      explanation: 'Domestic violence takes many forms including physical, emotional, psychological, financial, and sexual abuse. It\'s about power and control, not just physical violence.'
    },
    {
      question: 'What is the most dangerous time for a survivor of domestic violence?',
      options: [
        { text: 'A) During the relationship', isCorrect: false },
        { text: 'B) When they first seek help', isCorrect: false },
        { text: 'C) When leaving or shortly after leaving', isCorrect: true },
        { text: 'D) Years after the relationship ends', isCorrect: false }
      ],
      explanation: 'Research shows that the most dangerous time for a survivor is when leaving an abusive relationship or shortly after. This is why organizations like Shield of Athena provide emergency shelter and safety planning.'
    },
    {
      question: 'How does witnessing domestic violence affect children?',
      options: [
        { text: 'A) Children are too young to understand', isCorrect: false },
        { text: 'B) It has no long-term effects', isCorrect: false },
        { text: 'C) It can cause trauma, behavioral issues, and affect development', isCorrect: true },
        { text: 'D) Only if they are directly harmed', isCorrect: false }
      ],
      explanation: 'Children who witness domestic violence can experience trauma, developmental delays, behavioral issues, and mental health challenges. Therapy and support services are crucial for their healing and recovery.'
    },
    {
      question: 'What is the best way to help someone experiencing domestic violence?',
      options: [
        { text: 'A) Tell them to leave immediately', isCorrect: false },
        { text: 'B) Confront the abuser directly', isCorrect: false },
        { text: 'C) Listen without judgment and provide resources', isCorrect: true },
        { text: 'D) Wait until they ask for help', isCorrect: false }
      ],
      explanation: 'The best way to help is to listen without judgment, believe them, and provide information about resources like hotlines and shelters. Every person\'s situation is unique, and they need to make decisions that are safe for them.'
    }
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
      return '🌟 Perfect! You\'re very knowledgeable about family violence issues. Your awareness can help save lives by recognizing warning signs and supporting survivors.';
    } else if (percentage >= 80) {
      return '👏 Great job! You have a good understanding of family violence. Consider sharing this knowledge with friends and family to help create safer communities.';
    } else if (percentage >= 60) {
      return '📚 You\'re learning! Family violence is a complex issue. Your donation will help fund education programs that spread this important knowledge.';
    } else {
      return '💡 Thank you for taking the quiz! Every question teaches us something new. Your support helps fund education programs that can prevent violence before it starts.';
    }
  }
}
