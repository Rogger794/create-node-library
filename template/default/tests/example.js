import Example from '../src';

export default () => {
  describe('Example', () => {
    it("don't throw an error", () => {
      expect(() => new Example('test')).not.toThrow();
    });
  });
};
