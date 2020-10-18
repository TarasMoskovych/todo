import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Constants } from '../../classes';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  date = new Date();
  links = Constants.FOOTER_LINKS;
}
