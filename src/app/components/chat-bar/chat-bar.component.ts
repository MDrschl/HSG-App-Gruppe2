import { Component } from '@angular/core';

@Component({
  selector: 'app-chat-bar',
  templateUrl: './chat-bar.component.html',
  styleUrls: ['./chat-bar.component.css']
})
export class ChatBarComponent {
  public chatMessage = '' ;

  public addMessage(message: string): void{


    if (message.trim() === ''){
      return;
    }
    else{
      console.log(message);
      alert(message);
    }
  }
}
