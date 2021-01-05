import { DOCUMENT } from '@angular/common';
import { Renderer2, RendererFactory2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Constants } from 'src/app/shared/classes';

import { TutorialService } from './tutorial.service';

class MockDocument {}

describe('TutorialService', () => {
  let service: TutorialService;
  let renderer: Renderer2;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TutorialService,
        { provide: DOCUMENT, useClass: MockDocument }
      ],
    });
    service = TestBed.inject(TutorialService);
    renderer = TestBed.inject(RendererFactory2).createRenderer(null, null);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should init', () => {
    spyOn(service['introJs'], 'setOptions');
    spyOn(service['introJs'], 'start');
    spyOn(service['introJs'], 'onexit').and.callThrough();
    spyOn(renderer, 'addClass');
    spyOn(renderer, 'removeClass');

    service.start();
    service['introJs'].exit();

    expect(service['introJs'].setOptions).toHaveBeenCalledWith({
      showProgress: true,
      showBullets: false,
      showStepNumbers: false,
      disableInteraction: true,
      steps: Constants.TUTORIAL_STEPS,
    });
    expect(service['introJs'].start).toHaveBeenCalledTimes(1);
    expect(service['introJs'].onexit).toHaveBeenCalledTimes(1);
    expect(renderer.addClass).toHaveBeenCalledTimes(1);
    expect(renderer.removeClass).toHaveBeenCalledTimes(1);
  });
});
