import { Component } from '@angular/core';
import { AuthServiceService } from './Services/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular-Project';
  constructor(private auth: AuthServiceService){
    const id = localStorage.getItem('userId')!;
    if(id !== null){
      auth.loadSavedUser(id);
    }
  }
}
