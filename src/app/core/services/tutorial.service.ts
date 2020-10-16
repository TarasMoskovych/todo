import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';

import * as introJs from 'intro.js/intro.js';
import { Constants } from 'src/app/shared/classes';
import { CoreModule } from '../core.module';

@Injectable({
  providedIn: CoreModule,
})
export class TutorialService {
  private renderer: Renderer2;
  private introJs = introJs();

  constructor(@Inject(DOCUMENT) private document, rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  start() {
    this.introJs.setOptions({
      showProgress: true,
      showBullets: false,
      showStepNumbers: false,
      disableInteraction: true,
      steps: Constants.TUTORIAL_STEPS,
    });

    this.introJs.start();
    this.introJs.onexit(() => this.toggleBodyOverflow(false));
    this.toggleBodyOverflow(true);
  }

  private toggleBodyOverflow(toggler: boolean) {
    this.renderer[toggler ? 'addClass' : 'removeClass'](this.document.body, 'overflow-hidden');
  }
}
