/*export type Props = { text: string };

export default class ExampleComponent extends Component<Props> {
  render() {
    const { text } = this.props;

    return <div className={styles.test}>Example Component: {text}</div>;
  }
}
*/

export default class Example {
  private readonly attribute: string;

  constructor(attribute: string) {
    this.attribute = attribute;
  }

  parameter(): string {
    return this.attribute;
  }
}
