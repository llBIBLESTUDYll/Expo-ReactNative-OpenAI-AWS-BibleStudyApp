import React, { useEffect, useRef } from "react";
import { View, Animated } from "react-native";
import Svg, { Path } from "react-native-svg";

const CROSS_PATH = "M20 5 H30 V15 H40 V25 H30 V45 H20 V25 H10 V15 H20 V4 Z";
const PATH_LENGTH = 180; // The total length of your path

const AnimatedPath = Animated.createAnimatedComponent(Path);

const SplashScreen = ({ navigation }) => {
  const length = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const sequence = Animated.sequence([
      Animated.timing(length, {
        toValue: 1,
        duration: 150,
        useNativeDriver: false,
      }),
      Animated.timing(length, {
        toValue: 0,
        duration: 150,
        useNativeDriver: false,
      }),
    ]);

    sequence.start(({ finished }) => {
      if (finished) {
        sequence.reset();
        sequence.start(({ finished }) => {
          if (finished) {
            sequence.reset();
            sequence.start(({ finished }) => {
              if (finished) {
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Auth" }],
                });
              }
            });
          }
        });
      }
    });
  }, [navigation, length]);

  const strokeDashoffset = length.interpolate({
    inputRange: [0, 1],
    outputRange: [PATH_LENGTH, 0],
  });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
      collapsable="false"
    >
      <Svg width="50%" height="50%" viewBox="0 0 50 50" collapsable="false">
        <AnimatedPath
          d={CROSS_PATH}
          stroke="black"
          strokeWidth="2"
          fill="none"
          collapsable="false"
          strokeDasharray={PATH_LENGTH}
          strokeDashoffset={strokeDashoffset}
        />
      </Svg>
    </View>
  );
};

export default SplashScreen;
