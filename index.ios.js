import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';
import VideoCamera from './components/Camera.js'
import Home from './components/Home.js' 
import Complete from './components/Complete.js' 

export default class Air extends Component {

  // Router for Air Application
  renderScene(route, navigator) {
     if(route.name == 'Home') {
       return <Home navigator={navigator} />
     }
     if(route.name == 'Camera') {
       return <VideoCamera navigator={navigator} />
     }
     if(route.name == 'Finish') { // Upload Complete
       return <Complete navigator={navigator} />
     }
  }

  render() {
    return (
      <Navigator
        initialRoute={{name: 'Home', index: 0}}
        renderScene={ this.renderScene }
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  }
});

AppRegistry.registerComponent('Air', () => Air);
