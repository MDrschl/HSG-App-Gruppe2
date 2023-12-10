// chat-history.component.ts
import { Component, Input, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ChatMessage } from 'src/shared/models/chat-message';

@Component({
  selector: 'app-chat-history',
  templateUrl: './chat-history.component.html',
  styleUrls: ['./chat-history.component.css'],
})
export class ChatHistoryComponent implements AfterViewChecked {
  @Input() messages: ChatMessage[] = [];
  @ViewChild('chatHistoryBox', { static: false }) private chatHistoryBox!: ElementRef;

  constructor(private userService: UserService) {}

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      this.chatHistoryBox.nativeElement.scrollTop = this.chatHistoryBox.nativeElement.scrollHeight;
    } catch (err) {
      console.error(err);
    }
  }

  isDifferentUser(message: ChatMessage, index: number): boolean {
    return index === 0 || message.nickname !== this.messages[index -1].nickname;
  }
}


