// import React, { useState } from 'react';
// import { 
//   View, 
//   Text, 
//   TouchableOpacity, 
//   StyleSheet, 
//   Dimensions 
// } from 'react-native';
// import Svg, { 
//   Circle, 
//   Path, 
//   G 
// } from 'react-native-svg';
// import Animated, { 
//   useSharedValue, 
//   useAnimatedProps, 
//   withTiming,
//   interpolate,
//   Extrapolate
// } from 'react-native-reanimated';

// // Convert Animated.View to work with SVG
// const AnimatedPath = Animated.createAnimatedComponent(Path);

// const DashedCircularProgressBar = () => {
//   // Screen dimensions
//   const { width } = Dimensions.get('window');
  
//   // Circle properties
//   const RADIUS = 150;
//   const STROKE_WIDTH = 30;
//   const TOTAL_DASHES = 12;
  
//   // State to track progress
//   const [progress, setProgress] = useState(0);
  
//   // Animated value for progress
//   const progressValue = useSharedValue(0);
  
//   // Calculate circle geometry
//   const centerX = RADIUS;
//   const centerY = RADIUS;
//   const circumference = 2 * Math.PI * (RADIUS - STROKE_WIDTH / 2);
  
//   // Generate dash paths
//   const generateDashPaths = () => {
//     const dashPaths = [];
//     const anglePerDash = 360 / TOTAL_DASHES;
    
//     for (let i = 0; i < TOTAL_DASHES; i++) {
//       const startAngle = i * anglePerDash;
//       const endAngle = startAngle + anglePerDash - 10; // Small gap between dashes
      
//       // Convert degrees to radians
//       const startRad = (startAngle - 90) * (Math.PI / 180);
//       const endRad = (endAngle - 90) * (Math.PI / 180);
      
//       // Calculate path for each dash
//       const x1 = centerX + (RADIUS - STROKE_WIDTH / 2) * Math.cos(startRad);
//       const y1 = centerY + (RADIUS - STROKE_WIDTH / 2) * Math.sin(startRad);
//       const x2 = centerX + (RADIUS - STROKE_WIDTH / 2) * Math.cos(endRad);
//       const y2 = centerY + (RADIUS - STROKE_WIDTH / 2) * Math.sin(endRad);
      
//       const path = `
//         M ${x1} ${y1}
//         A ${RADIUS - STROKE_WIDTH / 2} ${RADIUS - STROKE_WIDTH / 2} 0 0 1 ${x2} ${y2}
//       `;
      
//       dashPaths.push(path);
//     }
    
//     return dashPaths;
//   };
  
//   // Generate dash paths
//   const dashPaths = generateDashPaths();
  
//   // Increase progress on button press
//   const handleProgressIncrease = () => {
//     if (progress < TOTAL_DASHES) {
//       const newProgress = progress + 1;
//       setProgress(newProgress);
      
//       // Animate the progress
//       progressValue.value = withTiming(newProgress / TOTAL_DASHES, {
//         duration: 500
//       });
//     }
//   };
  
//   // Reset progress
//   const handleReset = () => {
//     setProgress(0);
//     progressValue.value = withTiming(0, { duration: 500 });
//   };
  
//   return (
//     <View style={styles.container}>
//       <Svg 
//         width={RADIUS * 2} 
//         height={RADIUS * 2} 
//         viewBox={`0 0 ${RADIUS * 2} ${RADIUS * 2}`}
//       >
//         {/* Background Circle */}
//         <Circle
//           cx={RADIUS}
//           cy={RADIUS}
//           r={RADIUS - STROKE_WIDTH / 2}
//           fill="transparent"
//           stroke="#E0E0E0"
//           strokeWidth={STROKE_WIDTH}
//         />
        
//         {/* Animated Dashes */}
//         <G>
//           {dashPaths.map((path, index) => (
//             <Path
//               key={index}
//               d={path}
//               fill="transparent"
//               stroke={index < progress ? "#4CAF50" : "#E0E0E0"}
//               strokeWidth={STROKE_WIDTH}
//               strokeLinecap="round"
//             />
//           ))}
//         </G>
//       </Svg>
      
//       {/* Progress Information */}
//       <View style={styles.progressInfo}>
//         <Text style={styles.progressText}>
//           Progress: {progress} / {TOTAL_DASHES}
//         </Text>
        
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity 
//             style={styles.button} 
//             onPress={handleProgressIncrease}
//             disabled={progress >= TOTAL_DASHES}
//           >
//             <Text style={styles.buttonText}>Increase Progress</Text>
//           </TouchableOpacity>
          
//           <TouchableOpacity 
//             style={styles.resetButton} 
//             onPress={handleReset}
//           >
//             <Text style={styles.buttonText}>Reset</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   progressInfo: {
//     marginTop: 20,
//     alignItems: 'center',
//   },
//   progressText: {
//     fontSize: 18,
//     marginBottom: 15,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%',
//   },
//   button: {
//     backgroundColor: '#2196F3',
//     padding: 10,
//     borderRadius: 5,
//     marginHorizontal: 10,
//   },
//   resetButton: {
//     backgroundColor: '#F44336',
//     padding: 10,
//     borderRadius: 5,
//     marginHorizontal: 10,
//   },
//   buttonText: {
//     color: 'white',
//     textAlign: 'center',
//   },
// });

// export default DashedCircularProgressBar;