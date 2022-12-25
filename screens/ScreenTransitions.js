import { Animated } from 'react-native';
export const miscellaneousanim = ({ current,next }) => {
  const opacity = Animated.add(
      current.progress,
      next ? next.progress : 0
    ).interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0, 1, 0],
    });
    return {
      cardStyle:{
          opacity: opacity
      }
    };
};

export const shopanim = ({ current, next, inverted, layouts: { screen } }) => {
  const progress = Animated.add(
      current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      }),
      next
        ? next.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolate: 'clamp',
          })
        : 0
    );
  return {
      cardStyle: {
          transform: [
          {
              translateX: progress.interpolate({
                  inputRange: [0, 1, 2],
                  outputRange: [screen.width, 0, -screen.width],
              }),
          },
          ],
      },
  };
};

export const leaderboardanim = ({ current, next, inverted, layouts: { screen } }) => {
  const progress = Animated.add(
      current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      }),
      next
        ? next.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolate: 'clamp',
          })
        : 0
    );
  return {
      cardStyle: {
          transform: [
          {
              translateY: progress.interpolate({
                  inputRange: [0, 1, 2],
                  outputRange: [screen.height, 0, -screen.height],
              }),
          },
          ],
      },
  };
};

export const playanim = ({ current, next, inverted, layouts: { screen } }) => {
  const progress = Animated.add(
      current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      }),
      next
        ? next.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolate: 'clamp',
          })
        : 0
    );
  return {
      cardStyle: {
          transform: [
          {
              translateY: progress.interpolate({
                  inputRange: [0, 1, 2],
                  outputRange: [-screen.height, 0, screen.height],
              }),
          },
          ],
      },
  };
};