import * as React from "react";
import { Animated } from "react-native";

interface IProps {
  toggleBlink?: boolean;
  style?: any;
  children?: any;
}

const BlinkBox = ({ ...props }: IProps) => {
  const [fadeAnim] = React.useState(new Animated.Value(1)); // Initial value for opacity: 0

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 0.5,
      duration: 500,
      useNativeDriver: true,
    }).start(({ finished }) => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    });
  }, [props.toggleBlink]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}>
      {props.children}
    </Animated.View>
  );
};

export default BlinkBox;
