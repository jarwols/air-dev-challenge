## air-dev-challenge
iOS Development Challenge for Air exhibiting a basic camera app built in React Native. Allows for video recording and uploading to a remote AWS S3 bucket. For access to the S3 bucket, please reach out to Jared at **jaredwols@gmail.com**

## Getting Started

**Mostly automatic install for iOS**
1. ```git clone https://github.com/jarwols/air-dev-challenge.git```
2. ```npm install```
3. ```react-native run-ios```

![air gif](https://github.com/jarwols/air-dev-challenge/blob/master/assets/Air.gif?raw=true)
 
 **Recording Video**

```open ios/Air.xcodeproj```

 Due to the constraints posed by ```iOS Simulator```, I'd advise navigating into ```ios/Air.xcodeproj```, launching the Xcode project, and building the application on an iPhone 6 (or greater) of your choosing -- the current development target is 10.2.


 ## Contributions + Thanks 
 
 ❤️ to FlatIcon for the [Camera](http://www.flaticon.com/free-icon/video-camera_126806#term=video_camera&page=1&position=13) icon made by Freepik
 
 Thanks to @lwansbrough for the [react-native-camera](https://github.com/lwansbrough/react-native-camera) module that provided the core camera functionality and @aroth for the [react-native-uploader](https://github.com/aroth/react-native-uploader).

 Animations inspired by Nader Dabit's [React Native Training] (https://medium.com/react-native-training/react-native-animations-using-the-animated-api-ebe8e0669fae).