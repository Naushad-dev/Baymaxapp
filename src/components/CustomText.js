import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { RFValue } from "react-native-responsive-fontsize";
import { Colors } from "../utils/Constants";
const CustomText = ({
  varient = "body",

  children,
  fontFamily,
  fontSize,
  style,
  numberOfLines,
  onLayout,
  ...props
}) => {
  let computedFontSize;
  switch (varient) {
    case "h1":
      computedFontSize = RFValue(fontSize || 22);
      break;
    case "h2":
      computedFontSize = RFValue(fontSize || 20);
      break;
    case "h3":
      computedFontSize = RFValue(fontSize || 18);
      break;
    case "h4":
      computedFontSize = RFValue(fontSize || 16);
      break;
    case "h5":
      computedFontSize = RFValue(fontSize || 14);
      break;
    case "body":
      computedFontSize = RFValue(fontSize || 12);
      break;
  }

  return (
    <Text
      style={[
        styles,
        {
          color: Colors.text,
          fontSize: computedFontSize,
          fontFamily: fontFamily,
        },
      ]}
      numberOfLines={numberOfLines}
      {...props}
    >
      {children}
    </Text>
  );
};

export default CustomText;

const styles = StyleSheet.create({

});