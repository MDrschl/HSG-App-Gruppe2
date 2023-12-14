// chat-bar.component.ts
import { Component, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ChatServiceService } from 'src/app/services/chat.service.service';
import { ChatMessage } from 'src/shared/models/chat-message';
import { Subject, finalize, takeUntil } from 'rxjs';
import { JokeService } from 'src/joke.service';

@Component({
  selector: 'app-chat-bar',
  templateUrl: './chat-bar.component.html',
  styleUrls: ['./chat-bar.component.css'],
})
export class ChatBarComponent {
  

  public chatMessage = '';
  public errorMessage = '';
  public disableInput = false;
  public saving = false;
  private destroyed = new Subject<void>();


  constructor(
    private userService: UserService,
    private chatService: ChatServiceService,
    private jokeService: JokeService
  ) {}

  sendRandomJoke(): void {
    
    this.jokeService.getRandomJoke().subscribe((response) => {
      const jokeMessage: ChatMessage = {
        nickname: 'JokeBot',  
        message: response.joke,
        createdAt: new Date(),
      };

      this.chatService.addToHistory(jokeMessage).subscribe(() => {

        
      });
    });
  }
  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

  public addMessage(message: string): void {
    if (!this.userService.userExists()) {
      this.errorMessage = 'Bitte erstellen Sie zuerst einen Benutzer!';
      return;
    }

    message = message.replace(/(\r\n|\r|\n)/, '');
    message = message.trim();

    if (!message) {
      this.errorMessage = 'Bitte fügen Sie eine Nachricht hinzu!';
      return;
    }

    if (message.length > 500) {
      this.errorMessage = 'Warnung: Die Nachricht überschreitet 500 Zeichen!';
      this.disableInput = true;
      return;
    } else {
      this.errorMessage = '';
      this.disableInput = false;
    }

    //const createdAt = new Date();
    const username = this.userService.getUsername() || '';
    const content = message;

    const messageToSend: ChatMessage = {message: content, nickname: username};
    
    
    
    this.chatService.addToHistory(messageToSend).pipe(
      finalize(() => (this.saving = false)),
      takeUntil(this.destroyed)
    ).subscribe(
      {
        next: () => {
          this.chatMessage = '';
          this.errorMessage = '';
        },
        error: (error: Error) => {
          this.errorMessage = error.message;
        },
      }
    );
    
  }

  public resetWarning(): void {
    this.errorMessage = '';
    this.disableInput = false;
  }
}


