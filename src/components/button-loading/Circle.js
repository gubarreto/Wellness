import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Animated, Easing } from 'react-native';
import CircularProgress from './CircularProgress';

const AnimatedProgress = Animated.createAnimatedComponent(CircularProgress);

const AnimatedCircularProgress = ({
  prefill,
  fill,
  duration,
  easing,
  onAnimationComplete,
  useNativeDriver,
  delay,
  tintColor,
  tintColorSecondary,
  ...other
}) => {
  const [fillAnimation] = useState(new Animated.Value(prefill));

  useEffect(() => {
    if (fill !== prefill) {
      animate();
    }
  }, [fill, prefill]);

  const reAnimate = (prefill, toVal, dur, ease) => {
    fillAnimation.setValue(prefill);
    animate(toVal, dur, ease);
  };

  const animate = (toVal = fill, dur = duration, ease = easing) => {
    const anim = Animated.timing(fillAnimation, {
      toValue: toVal,
      easing: ease,
      duration: dur,
      delay: delay,
      useNativeDriver: useNativeDriver,
    });
    anim.start(onAnimationComplete);

    return anim;
  };

  const animateColor = () => {
    if (!tintColorSecondary) {
      return tintColor;
    }

    const tintAnimation = fillAnimation.interpolate({
      inputRange: [0, 100],
      outputRange: [tintColor, tintColorSecondary],
    });

    return tintAnimation;
  };

  return (
    <AnimatedProgress
      {...other}
      fill={fillAnimation}
      tintColor={animateColor()}
    />
  );
};

AnimatedCircularProgress.propTypes = {
  ...CircularProgress.propTypes,
  prefill: PropTypes.number,
  duration: PropTypes.number,
  easing: PropTypes.func,
  onAnimationComplete: PropTypes.func,
  useNativeDriver: PropTypes.bool,
  delay: PropTypes.number,
};

AnimatedCircularProgress.defaultProps = {
  duration: 500,
  easing: Easing.out(Easing.ease),
  prefill: 0,
  useNativeDriver: false,
  delay: 0,
};

export default AnimatedCircularProgress;
