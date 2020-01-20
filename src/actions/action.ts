export class Action<T> {
  public type: string;
  public payload: T;

  constructor(type: string, payload: T) {
    this.type = type;
    this.payload = payload;
  }
}