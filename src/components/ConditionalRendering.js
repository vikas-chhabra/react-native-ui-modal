export default function ConditionalRendering(props) {
  const { condition, positive, negative } = props;
  if (condition) return positive;
  else {
    return negative;
  }
}
