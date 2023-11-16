import { Component, Input, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'app-chat-history',
  templateUrl: './chat-history.component.html',
  styleUrls: ['./chat-history.component.css'],
})
export class ChatHistoryComponent implements AfterViewChecked {
  @Input() history: string = '';
  @ViewChild('chatHistoryBox', { static: false }) private chatHistoryBox!: ElementRef;

  get messages(): Message[] {
    const messagesArray = this.history.split('<br>');

    return messagesArray.map(message => {
      const [timestamp, content] = message.split(' - ');
      return { timestamp, content };
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
  content: string;
}
