import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  date = new Date();
  links = [
    {
      href: 'https://www.creative-tim.com',
      text: 'Creative Tim',
    },
    {
      href: 'https://creative-tim.com/presentation',
      text: 'About Us',
    },
    {
      href: 'http://blog.creative-tim.com',
      text: 'Blog',
    },
    {
      href: 'https://www.creative-tim.com/license',
      text: 'Licenses',
    },
  ]
}
