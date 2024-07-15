export default interface Connection<T = any> {
  connect(): Promise<void>;
  getConnection(): T;
}
