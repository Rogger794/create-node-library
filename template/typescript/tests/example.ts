import Example from '../src';

export default (): void => {
  describe('Example', () => {
    it("don't throw an error", () => {
      expect(() => new Example('test')).not.toThrow();
    });
  });
};
