import { Injectable } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Observable, of } from 'rxjs';
import { CoreModule } from '../core.module';

@Injectable({
  providedIn: CoreModule
})
export class DeviceService {

  constructor(private deviceService: DeviceDetectorService) { }

  isMobile(): boolean {
    return this.deviceService.isMobile();
  }
}
