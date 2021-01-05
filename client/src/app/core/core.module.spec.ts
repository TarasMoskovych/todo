import { CoreModule } from './core.module';

describe('CoreModule', () => {

  it('should create module without error', () => {
    expect(new CoreModule(null)).toBeTruthy();
  });

  it('should create module with error', () => {
    let module: CoreModule;

    try {
      module = new CoreModule({});
    } catch(e) {}

    expect(module).toBeUndefined();
  });
});
