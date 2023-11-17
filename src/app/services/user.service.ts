// user.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private username: string | null = null;

  getUsername(): string | null {
    return this.username;
  }

  setUsername(username: string): void {
    this.username = username;
  }

  userExists(): boolean {
    return this.username !== null;
  }
}
