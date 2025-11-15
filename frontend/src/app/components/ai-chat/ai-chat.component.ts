import { Component, ElementRef, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

interface ChatMessage {
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

@Component({
  selector: 'app-ai-chat',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './ai-chat.component.html',
  styleUrls: ['./ai-chat.component.css']
})
export class AiChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('messagesContainer') private messagesContainer?: ElementRef;
  @ViewChild('messageInput') private messageInput?: ElementRef;

  selectedOption: 'phone' | 'online' | null = null;
  userInput = '';
  messages: ChatMessage[] = [];
  isTyping = false;
  private shouldScrollToBottom = false;

  private aiResponses: Record<string, string> = {
    'hello': 'Hello! I\'m Athena, your AI assistant. I can help you with donations, volunteer opportunities, item donations, and answer questions about family violence support. What would you like to know?',
    'help': 'I can help you with:\n• Making donations (one-time or monthly)\n• Volunteer opportunities\n• Donating items or goods\n• Professional services\n• Understanding our programs\n• General questions about family violence\n\nWhat interests you most?',
    'volunteer': 'We have many volunteer opportunities:\n• Childcare & activities for children\n• Peer counseling support\n• Administrative help\n• Event planning\n• Transportation assistance\n• Education workshops\n\nWould you like to fill out our volunteer form?',
    'donate': 'Great! You can make a one-time donation or set up monthly giving. Our most popular amounts are $25, $50, and $100. Even $15/month can provide therapy sessions for children. What feels right for you?',
    'items': 'We accept donations of:\n• Clothing for all ages\n• Furniture in good condition\n• Household items\n• Toys and games\n• Electronics\n• Personal care items\n\nWould you like to submit an item donation form?',
    'monthly': 'Monthly giving is amazing! It provides steady support for families. Our monthly options are:\n• $15/month - 1 therapy session\n• $25/month - 2 shelter nights\n• $50/month - 2 prevention workshops\n• $100/month - Comprehensive support\n\nWould you like to set one up?',
    'programs': 'We have three main programs:\n🏠 Immediate Safety - Emergency shelter and crisis counseling\n🌱 Healing & Recovery - Therapy and healing programs\n🌳 Prevention - Education and breaking cycles of violence\n\nWhich would you like to learn more about?',
    'crisis': 'If you or someone you know needs immediate help, please call our 24/7 crisis line: 1-800-ATHENA-1. For life-threatening emergencies, call 911. Our AI assistant can help with general questions, but human counselors are available for crisis support.',
    'phone': 'You can call our AI voice assistant at 1-800-ATHENA-1 (1-800-284-3621). It\'s available 24/7 and can help with donations, volunteer questions, and general information. For crisis support, you\'ll be transferred to a human counselor.',
    'skills': 'We welcome professional volunteers in:\n• Legal services\n• Medical/healthcare\n• Counseling/therapy\n• Financial planning\n• Technology/IT\n• Marketing/communications\n\nWould you like to submit a professional skills form?',
    'default': 'I\'m here to help with donations, volunteering, item donations, and questions about our programs. You can also ask about our AI voice line at 1-800-ATHENA-1. How can I assist you today?'
  };

  ngOnInit(): void {
    // Initial bot message when chat is opened
    this.addBotMessage(
      'Hi! I\'m Athena, your AI assistant. I can help you with donations, program information, volunteer opportunities, and answer questions about family violence support. How can I help you today?'
    );
  }

  ngAfterViewChecked(): void {
    if (this.shouldScrollToBottom) {
      this.scrollToBottom();
      this.shouldScrollToBottom = false;
    }
  }

  selectOption(option: 'phone' | 'online'): void {
    this.selectedOption = option;

    if (option === 'online') {
      // Focus on input after a short delay to ensure the view has updated
      setTimeout(() => {
        this.messageInput?.nativeElement?.focus();
      }, 100);
    }
  }

  goBack(): void {
    this.selectedOption = null;
  }

  closeChat(): void {
    // Emit close event or handle close logic
    console.log('Chat closed');
  }

  sendMessage(): void {
    const message = this.userInput.trim();
    if (!message) return;

    // Add user message
    this.messages.push({
      text: message,
      sender: 'user',
      timestamp: new Date()
    });

    this.userInput = '';
    this.shouldScrollToBottom = true;

    // Simulate bot typing
    this.isTyping = true;

    setTimeout(() => {
      const response = this.generateResponse(message);
      this.addBotMessage(response);
      this.isTyping = false;
      this.shouldScrollToBottom = true;
    }, 800);
  }

  private addBotMessage(text: string): void {
    this.messages.push({
      text,
      sender: 'bot',
      timestamp: new Date()
    });
  }

  private generateResponse(message: string): string {
    const lowerMessage = message.toLowerCase();

    for (const [key, response] of Object.entries(this.aiResponses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }

    return this.aiResponses['default'];
  }

  private scrollToBottom(): void {
    try {
      if (this.messagesContainer) {
        this.messagesContainer.nativeElement.scrollTop =
          this.messagesContainer.nativeElement.scrollHeight;
      }
    } catch (err) {
      console.error('Error scrolling to bottom:', err);
    }
  }
}
