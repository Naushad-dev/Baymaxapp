import { Animated, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef } from "react";
import { ScreenHight, ScreenWidth } from "../../utils/Scaling";
import { bigHero6Data } from "../../utils/data";
import Water from "./Options/Water";
import OptionItem from "./Options/OptionItem";

const BigHero6 = ({onPress}) => {
  // console.log("Screenwidth: " + ScreenWidth * 0.8);

  const animatedValue = useRef(
    [...Array(6)].map(() => new Animated.Value(0))
  ).current;
  const sangchiAnimation = () => {
    Animated.stagger(
      100,
      animatedValue.map((animValue, index) =>
        Animated.timing(animValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
          delay: index * 200,
        })
      )
    ).start();
  };

  useEffect(() => {
    sangchiAnimation();
  }, []);
  return (
    <View style={styles.circle}>
      {bigHero6Data.map((item, index) => {
        const angle = (index / 6) * 2 * Math.PI;
        const x = ScreenWidth * 0.38 * Math.cos(angle);
        const y = ScreenWidth * 0.38 * Math.sin(angle);

        const translateX = animatedValue[index].interpolate({
          inputRange: [0, 1],
          outputRange: [0, x],
        });

        const translateY = animatedValue[index].interpolate({
          inputRange: [0, 1],
          outputRange: [0, y],
        });
        return (
          <Animated.View
            key={index}
            style={[
              styles.item,
              {
                transform: [{ translateX }, { translateY }],
              },
            ]}
          >
            {item !== "water" && <OptionItem item={item} onPress={onPress}/>}
            {item === "water" && <Water/>}

          </Animated.View>
        );
      })}
    </View>
  );
};

export default BigHero6;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    width: ScreenWidth * 0.8,
    height: ScreenHight * 0.5,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  item: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 400,
  },
});