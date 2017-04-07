import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Easing,
  Animated 
} from 'react-native';

export default class RecordButton extends Component {
  constructor (props) {
    super(props);
    this.animatedValue = new Animated.Value(0)
  }

  animate () {
    if(this.props.recording) {
      this.animatedValue.setValue(0);
      Animated.timing(
        this.animatedValue,
        {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear
        }
      ).start(() => this.animate())
    }
  }

  componentDidUpdate() {
    if(this.props.recording) {
      this.animate(); 
    }
  }

  render() {
    const opacity = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 0, 1]
    });
    return (
      <View style={styles.container}>
        <Animated.View 
          style={{opacity, 
            backgroundColor: '#D0011B',
            height: 60,
            width: 60,
            borderRadius: 40}}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    height: 70,
    width: 70,
    borderColor: 'white',
    borderRadius: 40,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
  },
  record: {
    backgroundColor: '#D0011B',
    height: 60,
    width: 60,
    borderRadius: 40
  }
});

AppRegistry.registerComponent('RecordButton', () => VideoCamera);
