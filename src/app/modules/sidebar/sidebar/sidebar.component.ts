import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule,RouterLink ],
})
export class SidebarComponent {
  sidebarOpen = false;
  router: any;
  location: any;

  w3_open() {
    this.sidebarOpen = true;
  }

  w3_close() {
    this.sidebarOpen = false;
  }

  goBack() {
    this.location.back(); 
  }

}

