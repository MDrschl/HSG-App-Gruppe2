// chat-history.component.ts
import { Component, Input, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ChatMessage } from 'src/shared/models/chat-message';
import { EMPTY, Observable, catchError } from 'rxjs';
import { ChatServiceService } from 'src/app/services/chat.service.service';

@Component({
  selector: 'app-chat-history',
  templateUrl: './chat-history.component.html',
  styleUrls: ['./chat-history.component.css'],
})
export class ChatHistoryComponent implements AfterViewChecked {
  @Input() history = '';

  public errorMessage = '';
  public chatMessages$ = new Observable<ChatMessage[]>();
  @ViewChild('chatHistoryBox', { static: false }) private chatHistoryBox!: ElementRef;

  constructor(
    private userService: UserService,
    private chatService: ChatServiceService
  ) {}

  ngOnInit(): void {
    this.getHistory();

    setInterval(() => {
      this.getHistory();
    }, 2000);
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private getHistory(): void {
    this.chatMessages$ = this.chatService.getChatMessages().pipe(
      catchError((error: Error) => {
        this.errorMessage = error.message;

        return EMPTY;
      })
    );
  }

  private scrollToBottom(): void {
    try {
      this.chatHistoryBox.nativeElement.scrollTop = this.chatHistoryBox.nativeElement.scrollHeight;
    } catch (err) {
      console.error(err);
    }
  }
  

 // isDifferentUser(message: ChatMessage, index: number): boolean {
   // return index === 0 || message.nickname !== this.chatMessages$[index -1].nickname;
 // }
}


