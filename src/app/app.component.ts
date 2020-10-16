import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DeviceService } from './core/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isMobile: boolean = this.deviceService.isMobile();

  constructor(private deviceService: DeviceService) { }
}
