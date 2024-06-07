import { Component } from '@angular/core';
import { SidebarComponent } from "../../sidebar/sidebar/sidebar.component";

@Component({
    selector: 'app-dashboard-visual',
    standalone: true,
    templateUrl: './dashboard-visual.component.html',
    styleUrl: './dashboard-visual.component.css',
    imports: [SidebarComponent]
})
export class DashboardVisualComponent {

}
