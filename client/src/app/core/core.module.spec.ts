import { CoreModule } from './core.module';

describe('CoreModule', () => {

  it('should create module without error', () => {
    expect(new CoreModule(null)).toBeTruthy();
  });

  it('should create module with error', () => {
    expect(() => new CoreModule({})).toThrowError('CoreModule is already loaded. Import it in the AppModule only.');
  });
});
