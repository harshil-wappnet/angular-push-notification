import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FirebaseService } from './firebase.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private firebaseService = inject(FirebaseService);
  body: any;
  title: any;
  ngOnInit() {
    this.firebaseService.requestPermission();
    this.firebaseService.currentMessage.subscribe((message) => {
      if (message && message.notification) {
        this.body = message.notification['body'];
        this.title = message.notification['title'];
        alert(this.body);
      }
    });
  }
}
