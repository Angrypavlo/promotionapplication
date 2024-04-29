import { useState, useEffect, useRef } from "react";
import * as Location from "expo-location";
import { useAuth } from "../AuthContext";
import haversine from "haversine";

export const useLocationTracker = () => {
  const [isTracking, setIsTracking] = useState(false);
  const [region, setRegion] = useState(null);
  const [path, setPath] = useState([]);
  const [speed, setSpeed] = useState(0);
  const [timer, setTimer] = useState(0);
  const locationSubscription = useRef(null);
  const [totalDistance, setTotalDistance] = useState(0);
  const timerInterval = useRef(null);

  const [totalTimeRan, setTotalTimeRan] = useState(0);
  const { coinCount, updateCoinCount } = useAuth();
  const speedRange = { min: 2, max: 10 };

  useEffect(() => {
    const startWatching = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      if(isTracking){
        setTotalDistance(0);
        setTotalTimeRan(0);
      }

      locationSubscription.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Highest,
          timeInterval: 1000,
          distanceInterval: 1,
        },
        (locationUpdate) => {
          const {
            latitude,
            longitude,
            speed: updatedSpeed,
          } = locationUpdate.coords;
          setRegion({
            latitude,
            longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
          setSpeed(updatedSpeed);
          if (isTracking) {
            setPath((currentPath) => {
              const newPoint = { latitude, longitude };
              if (currentPath.length > 0) {
                const lastPoint = currentPath[currentPath.length - 1];
                const incrementalDistance =
                  haversine(lastPoint, newPoint, { unit: "meter" }) / 1000; // Convert to kilometers
                setTotalDistance(
                  (prevDistance) => prevDistance + incrementalDistance
                );
              }
              return [...currentPath, newPoint];
            });
          }
        }
      );
    };

    startWatching();

    return () => {
      if (locationSubscription.current) {
        locationSubscription.current.remove();
      }
    };
  }, [isTracking]); // Depend on isTracking to restart watchPositionAsync if needed

  const startTracking = () => {
    setPath([]);
    setIsTracking(true);
    let startTime = Date.now();
    clearInterval(timerInterval.current); // Clear any existing timer interval
    timerInterval.current = setInterval(() => {
      setTimer(Date.now() - startTime);
    }, 1000);
  };

  const stopTracking = () => {
    setIsTracking(false);
    clearInterval(timerInterval.current);
    setTimer(0); // Reset timer
  };

  const toggleTracking = () => {
    if (!isTracking) {
      startTracking();
    } else {
      stopTracking();
    }
  };

  useEffect(() => {
    const collectCoins = () => {
      if (isTracking && speed >= speedRange.min && speed <= speedRange.max) {
        setTotalTimeRan((prevTime) => prevTime + 1);
      }
    };

    const collectCoinInterval = setInterval(collectCoins, 1000);

    return () => {
      clearInterval(collectCoinInterval);
    };
  }, [isTracking, speed]);

  useEffect(() => {
    const coinsPerSecond = 1;
    const newCoinCount = Math.floor(totalTimeRan / coinsPerSecond);
    updateCoinCount(newCoinCount);
  }, [totalTimeRan, updateCoinCount]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerInterval.current) {
        clearInterval(timerInterval.current);
      }
    };
  }, []);

  return {
    isTracking,
    setIsTracking,
    region,
    path,
    speed,
    timer,
    totalDistance,
    toggleTracking,
    coinCount,
    totalTimeRan,
  };
};
