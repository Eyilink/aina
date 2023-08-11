import React from 'react';
import { View, StyleSheet } from 'react-native';

const Clinimeter = () => {
  const circles = [];

  for (let i = 0; i < 10; i++) {
    const radius = (10 - i) * 10; // Vary the radius from 100% to 0% in increments of 10%
    const bRadius = 300*(i+1);
    circles.push(
      <View key={i} style={[styles.circle, { width: `${radius}%`, height: `${radius}%`,borderRadius: bRadius }]} />
    );
  }

  return <View style={styles.container}>{circles}</View>;
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1,
  },
  circle: {
    position: 'absolute',
    
    
    borderWidth: 1,
  },
});

export default Clinimeter;
