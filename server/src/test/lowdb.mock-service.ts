export abstract class AbstractLowdbGetMock<T> {
  private item: T;
  private notFound: boolean;

  constructor(private items: T[]) {}

  value(): T | T[] {
    let result: T | T[] = this.items;

    if (this.item) {
      result = this.item;
    } else if (this.notFound) {
      result = null;
    }
    this.notFound = null;
    return result;
  }

  find(obj: Object): AbstractLowdbGetMock<T> {
    const key = Object.keys(obj)[0];
    this.item = this.items.find((item: T) => item[key] === obj[key]);
    this.notFound = !this.item;
    return this;
  }

  assign(payload: T): AbstractLowdbGetMock<T> {
    const idx = this.items.findIndex((item: T) => payload['id'] === item['id']);

    if (idx > -1) {
      this.items.splice(idx, 1, payload);
    }
    return this;
  }

  push(payload: T): AbstractLowdbGetMock<T> {
    this.items.push(payload);
    return this;
  }

  remove(obj: Object): AbstractLowdbGetMock<T> {
    const key = Object.keys(obj)[0];
    const idx = this.items.findIndex((item: T) => obj[key] === item[key]);

    if (idx > -1) {
      this.items.splice(idx, 1);
    }

    return this;
  }

  write(): void {
    this.item = null;
  }
}
