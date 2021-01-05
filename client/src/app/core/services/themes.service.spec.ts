import { Renderer2, RendererFactory2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Color, Theme } from 'src/app/models';

import { ThemesService } from './themes.service';

describe('ThemesService', () => {
  const color: Color = { name: 'black', value: '#000' };
  const storageKey = 'todo:themes';
  let defaultTheme: Partial<Theme>;
  let service: ThemesService;
  let renderer: Renderer2;

  beforeEach(() => {
    let store = {};

    spyOn(localStorage, 'getItem').and.callFake((key: string): string => {
      return store[key] || null;
    });
    spyOn(localStorage, 'removeItem').and.callFake((key: string): void =>  {
      delete store[key];
    });
    spyOn(localStorage, 'setItem').and.callFake((key: string, value: string): string =>  {
      store[key] = <string>value;
      return store[key];
    });
    spyOn(localStorage, 'clear').and.callFake(() =>  {
      store = {};
    });

    TestBed.configureTestingModule({
      providers: [
        ThemesService,
      ],
    });
    service = TestBed.inject(ThemesService);
    renderer = TestBed.inject(RendererFactory2).createRenderer(null, null);
    defaultTheme = {
      color: {
        name: 'purple',
        value: 'purple'
      },
      image: 'sidebar-1.jpg',
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save "darkTheme"', () => {
    service.save('darkTheme', true);

    const result: Partial<Theme> = { ...defaultTheme, darkTheme: true };
    expect(localStorage.getItem(storageKey)).toBe(JSON.stringify(result));
  });

  it('should save "Color"', () => {
    service.save('color', color);

    const result: Partial<Theme> = { ...defaultTheme, color };
    expect(localStorage.getItem(storageKey)).toBe(JSON.stringify(result));
  });

  it('should get default Theme', () => {
    const result = service.get();
    expect(result).toEqual(defaultTheme as Theme);
  });

  it('should get custom Theme', () => {
    service.save('darkTheme', false);
    service.save('color', color);

    const result = service.get();
    expect(result).toEqual({ ...defaultTheme, color, darkTheme: false } as Theme);
  });

  it('should turn on darkTheme', () => {
    spyOn(renderer, 'addClass');
    service.toggleDarkTheme(true);

    expect(renderer.addClass).toHaveBeenCalledTimes(1);
  });

  it('should turn off darkTheme', () => {
    spyOn(renderer, 'removeClass');
    service.toggleDarkTheme(false);

    expect(renderer.removeClass).toHaveBeenCalledTimes(1);
  });

  it('should get empty object', () => {
    spyOn(service, 'get').and.returnValue(undefined);
    service.save('color', undefined);
    expect(localStorage.getItem(storageKey)).toBe(JSON.stringify({}));
  });
});
