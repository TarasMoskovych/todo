import { Debounce } from './debounce.decorator';

class Test {
  @Debounce()
  static defaultTimeout() {}

  @Debounce(150)
  static customTimeout() {}
}

describe('Debounce decorator', () => {
  beforeEach(() => {
    spyOn(window, 'setTimeout');
  });

  it('should call setTimeout with default 500ms', () => {
    Test.defaultTimeout();
    expect(window.setTimeout).toHaveBeenCalledWith(jasmine.any(Function), 500);
  });

  it('should call setTimeout with custom 150ms', () => {
    Test.customTimeout();
    expect(window.setTimeout).toHaveBeenCalledWith(jasmine.any(Function), 150);
  });
});
