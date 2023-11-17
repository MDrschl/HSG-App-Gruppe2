// chat-history.component.ts
import { Component, Input, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-chat-history',
  templateUrl: './chat-history.component.html',
  styleUrls: ['./chat-history.component.css'],
})
export class ChatHistoryComponent implements AfterViewChecked {
  @Input() history: string = '';
  @ViewChild('chatHistoryBox', { static: false }) private chatHistoryBox!: ElementRef;

  constructor(private userService: UserService) {}



  get messages(): Message[] {
    const messagesArray = this.history.split('<br>');
  
    return messagesArray.map(message => {
      const [timestampAndUsername, content] = message.split(' - ');
      const [timestamp, username] = timestampAndUsername.split(/, |: /);
  
      return { timestamp, username, content };
    }).filter(message => message.content !== undefined && message.content.trim() !== '');
  }

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
}

interface Message {
  timestamp: string;
  username: string;
  content: string;
}
