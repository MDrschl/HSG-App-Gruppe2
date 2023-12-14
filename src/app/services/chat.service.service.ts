import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChatMessage } from 'src/shared/models/chat-message';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {

  private readonly baseUrl = 'http://localhost:3000/';

  public constructor(private httpClient: HttpClient) {}

  
  public getChatMessages(): Observable<ChatMessage[]> {
    return this.httpClient.get<ChatMessage[]>(`${this.baseUrl}history`);
    
  }
  public addToHistory(message: ChatMessage): Observable<ChatMessage[]> {
    return this.httpClient.post<ChatMessage[]>(`${this.baseUrl}history`, message);

}
public getAllNicknames(): Observable<string[]> {
  return this.getChatMessages().pipe(
    map((chatMessages: ChatMessage[]) => {
      
      const uniqueNicknames = [...new Set(chatMessages.map(message => message.nickname))];
      return uniqueNicknames;
    })
  );
}
}
