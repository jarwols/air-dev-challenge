import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  Easing,
  TouchableOpacity
} from 'react-native';

export default class Home extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      nav: this.props.navigator
    }
    this.animatedValue = new Animated.Value(0)
  }

  componentDidMount () {
    this.animate()
  }

  _navigate(){
    // navigate to camera on center press 
    this.props.navigator.push({
      name: 'Camera', 
    })
  }

  animate () {
    this.animatedValue.setValue(0)
    // 1.5s per oscillation of arrow 
    Animated.timing(
      this.animatedValue,
      {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear
      }
    ).start(() => this.animate())
  }

  render() {
    // create linear oscillating animation
    const movingMargin = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 30, 0]
    })
    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require('../assets/logo.png')}
        />
        <View>
          <TouchableOpacity onPress={() => this._navigate()}>
            <Image
              style={styles.recordIcon}
              source={require('../assets/record.png')}
            />
          </TouchableOpacity>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Animated.Image
              style={{
                height: 60,
                width: 50,
                transform: [{translateY: movingMargin}]}}
              source={require('../assets/arrow.png')}
            />
          </View>
          <Text style={styles.bodyText}>record a video</Text> 
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#BCA1FD',
  },
  bodyText: {
    fontFamily: 'Gotham Rounded',
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    marginTop: 40
  },
  recordIcon: {
    height: 150,
    width: 150
  },
  logo: {
    height: 70,
    width: 150, 
    marginBottom: 100
  }
});

AppRegistry.registerComponent('Home', () => Home);
