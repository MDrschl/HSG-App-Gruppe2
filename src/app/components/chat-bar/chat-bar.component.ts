import { Component } from '@angular/core';

@Component({
  selector: 'app-chat-bar',
  templateUrl: './chat-bar.component.html',
  styleUrls: ['./chat-bar.component.css']
})
export class ChatBarComponent {
  public chatMessage = '' ;

  public addMessage(message: string): void{
    console.log(message);
    alert(message);

    if (message.trim() === ''){
      return;
    }
  }
}
