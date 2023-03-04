// @flow

import * as React from "react";
import {
  Animated,
  Dimensions,
  Easing,
  I18nManager,
  Platform,
} from "react-native";

import Confetti from "./Confettie";
import { randomValue, randomColor } from "../utils";

export const TOP_MIN = 0.7;
export const DEFAULT_COLORS = [
  "#e67e22",
  "#2ecc71",
  "#3498db",
  "#84AAC2",
  "#E6D68D",
  "#F67933",
  "#42A858",
  "#4F50A2",
  "#A86BB7",
  "#e74c3c",
  "#1abc9c",
];
export const DEFAULT_EXPLOSION_SPEED = 350;
export const DEFAULT_FALL_SPEED = 3000;

class Explosion extends React.PureComponent {
  props;
  state = {
    items: [],
  };
  start;
  resume;
  stop;
  sequence;
  items = [];
  animation = new Animated.Value(0);

  constructor(props) {
    super(props);

    const { colors = DEFAULT_COLORS } = props;

    this.start = this.start.bind(this);
    this.resume = this.resume.bind(this);
    this.stop = this.stop.bind(this);

    this.state.items = this.getItems(colors);
  }

  componentDidMount = () => {
    const { autoStart = true, autoStartDelay = 0 } = this.props;

    if (autoStart) {
      setTimeout(this.start, autoStartDelay);
    }
  };

  componentDidUpdate = ({
    count: prevCount,
    colors: prevColors = DEFAULT_COLORS,
  }) => {
    const { count, colors = DEFAULT_COLORS } = this.props;

    if (count !== prevCount || colors !== prevColors) {
      this.setState({
        items: this.getItems(prevColors),
      });
    }
  };

  getItems = (prevColors) => {
    const { count, colors = DEFAULT_COLORS } = this.props;
    const { items } = this.state;

    const difference = items.length < count ? count - items.length : 0;

    const newItems = Array(difference)
      .fill()
      .map(() => ({
        leftDelta: randomValue(0, 1),
        topDelta: randomValue(TOP_MIN, 1),
        swingDelta: randomValue(0.2, 1),
        speedDelta: {
          rotateX: randomValue(0.3, 1),
          rotateY: randomValue(0.3, 1),
          rotateZ: randomValue(0.3, 1),
        },
        color: randomColor(colors),
      }));

    return items
      .slice(0, count)
      .concat(newItems)
      .map((item) => ({
        ...item,
        color: prevColors !== colors ? randomColor(colors) : item.color,
      }));
  };

  start = (resume = false) => {
    const {
      explosionSpeed = DEFAULT_EXPLOSION_SPEED,
      fallSpeed = DEFAULT_FALL_SPEED,
      onAnimationStart,
      onAnimationResume,
      onAnimationEnd,
    } = this.props;

    if (resume) {
      onAnimationResume && onAnimationResume();
    } else {
      this.sequence = Animated.sequence([
        Animated.timing(this.animation, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
        Animated.timing(this.animation, {
          toValue: 1,
          duration: explosionSpeed,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(this.animation, {
          toValue: 2,
          duration: fallSpeed,
          easing: Easing.quad,
          useNativeDriver: true,
        }),
      ]);

      onAnimationStart && onAnimationStart();
    }

    this.sequence &&
      this.sequence.start(({ finished }) => {
        if (finished) {
          onAnimationEnd && onAnimationEnd();
        }
      });
  };

  resume = () => this.start(true);

  stop = () => {
    const { onAnimationStop } = this.props;

    onAnimationStop && onAnimationStop();

    this.sequence && this.sequence.stop();
  };

  render() {
    const { origin, fadeOut } = this.props;
    const { items } = this.state;
    const { height, width } = Dimensions.get("window");
    const directionalityFactor = I18nManager.isRTL ? -1 : 1;

    return (
      <React.Fragment>
        {items.map((item, index) => {
          const left = this.animation.interpolate({
            inputRange: [0, 1, 2],
            outputRange: [
              directionalityFactor * origin.x,
              directionalityFactor * item.leftDelta * width,
              directionalityFactor * item.leftDelta * width,
            ],
          });
          const top = this.animation.interpolate({
            inputRange: [0, 1, 1 + item.topDelta, 2],
            outputRange: [-origin.y, -item.topDelta * height, 0, 0],
          });
          const rotateX = this.animation.interpolate({
            inputRange: [0, 2],
            outputRange: ["0deg", `${item.speedDelta.rotateX * 360 * 10}deg`],
          });
          const rotateY = this.animation.interpolate({
            inputRange: [0, 2],
            outputRange: ["0deg", `${item.speedDelta.rotateY * 360 * 5}deg`],
          });
          const rotateZ = this.animation.interpolate({
            inputRange: [0, 2],
            outputRange: ["0deg", `${item.speedDelta.rotateZ * 360 * 2}deg`],
          });
          const translateX = this.animation.interpolate({
            inputRange: [0, 0.4, 1.2, 2],
            outputRange: [0, -(item.swingDelta * 30), item.swingDelta * 30, 0],
          });
          const opacity = this.animation.interpolate({
            inputRange: [0, 1, 1.8, 2],
            outputRange: [1, 1, 1, fadeOut ? 0 : 1],
          });
          const containerTransform = [
            { translateX: left },
            { translateY: top },
          ];
          const transform = [
            { rotateX },
            { rotateY },
            { rotate: rotateZ },
            { translateX },
          ];

          if (Platform.OS === "android") {
            transform.push({ perspective: 100 });
          }

          return (
            <Confetti
              color={item.color}
              containerTransform={containerTransform}
              transform={transform}
              opacity={opacity}
              key={index}
              testID={`confetti-${index + 1}`}
            />
          );
        })}
      </React.Fragment>
    );
  }
}

export default Explosion;
