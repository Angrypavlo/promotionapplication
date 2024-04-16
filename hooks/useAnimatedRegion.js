import { useCallback } from 'react';
import { MapMarker, MapMarkerProps } from 'react-native-maps';
import Animated, {
  Easing,
  EasingFn,
  EasingFunctionFactory,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export const useAnimatedRegion = (location) => {
  const latitute = useSharedValue(location.latitude);
  const longitude = useSharedValue(location.longitude);
  const latitudeDelta = useSharedValue(location.latitudeDelta);
  const longitudeDelta = useSharedValue(location.longitudeDelta);

  const animatedProps = useAnimatedProps(() => ({
    coordinate: {
      latitude: latitute.value ?? 0,
      longitude: longitude.value ?? 0,
      latitudeDelta: latitudeDelta.value ?? 0,
      longitudeDelta: longitudeDelta.value ?? 0,
    },
  }));

  const animate = useCallback(
    (options) => {
      const { duration = 500, easing = Easing.inOut(Easing.ease) } = options;

      const animateValue = (value, toValue,) => {
        if (!toValue) {
          return;
        }

        value.value = withTiming(toValue, {
          duration,
          easing,
        });
      };

      animateValue(latitute, options.latitude);
      animateValue(longitude, options.longitude);
      animateValue(latitudeDelta, options.latitudeDelta);
      animateValue(longitudeDelta, options.longitudeDelta);
    },
    [latitute, longitude, latitudeDelta, longitudeDelta],
  );

  return {
    props: animatedProps,
    animate,
  };
};


export const AnimatedMarker = Animated.createAnimatedComponent(
  MapMarker,
);