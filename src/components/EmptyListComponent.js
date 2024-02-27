import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const EmptyListComponent = () => {
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No favorite movies found.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default EmptyListComponent;
