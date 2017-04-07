import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  NativeModules,
  DeviceEventEmitter,
  ActivityIndicator,
  Dimensions,
  Image,
  Modal,
  Animated,
  Easing
} from 'react-native';
import Camera from 'react-native-camera';
import RecordButton from '../components/RecordButton.js'
let RNUploader = NativeModules.RNUploader;

export default class VideoCamera extends Component {

  constructor(props) {
    super(props); 
    this.camera = null
    // also store the video on the camera roll
    this.state = {
      camera: {
        captureTarget: Camera.constants.CaptureTarget.cameraRoll,
        captureMode: Camera.constants.CaptureMode.video,
        type: Camera.constants.Type.back
      },
      isRecording: false,
      cancelled: false, 
      uploading: false,
      showUploadModal: false,
      uploadProgress: 0,
      uploadTotal: 0,
      uploadWritten: 0,
      front: '  🌳',
      back: '  😄',
      direction: '', 
      uploadStatus: undefined,
    }
    // initalize camera with rear-facing camera 
    this.state.direction = this.state.back; 
    this.takeVideo.bind(this); 
    this.processVideo.bind(this); 
  }

  componentDidMount() {
    DeviceEventEmitter.addListener('RNUploaderProgress', (data) => {
      let bytesWritten = data.totalBytesWritten;
      let bytesTotal   = data.totalBytesExpectedToWrite;
      let progress     = data.progress;
      this.setState({uploadProgress: progress, uploadTotal: bytesTotal, uploadWritten: bytesWritten});
    });
  }

  // Change camera direction 
  switchType() {
    let newType;
    const { back, front } = Camera.constants.Type;

    if (this.state.camera.type === back) {
      newType = front;
      this.setState({direction: this.state.front});
    } else if (this.state.camera.type === front) {
      newType = back;
      this.setState({direction: this.state.back});
    }

    this.setState({
      camera: {
        ...this.state.camera,
        type: newType,
      },
    });
  }

  // Upload to S3 Bucket 
  processVideo(data) {
    let file = {
      name: 'file',
      filename: this._generateUUID() + '.mov',
      filepath: data.path,
      filetype: 'video/mov',
    }

    let opts = {
      url: 'https://air-test-bucket.s3.amazonaws.com/',
      files: [file],
      method: 'POST',                             
      params: {
        name: 'air-app',
        key: 'uploads/' + file.filename
      }
    };

    this.setState({ uploading: true, showUploadModal: true });
    RNUploader.upload(opts, (err, res) => {
      if (err) {
        console.log(err);
        return;
      }

      let status = res.status;
      let responseString = res.data;

      this.setState({uploading: false, uploadStatus: status});
      // Move to complete screen in case of successful upload 
      if(this.state.uploadStatus == 204) {
        this.setState({uploadStatus: undefined, showUploadModal: false }); 
        this.props.navigator.push({
          name: 'Finish'
        });
      }
    });
  }

  _generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
  };

  uploadProgressModal() {
    let uploadProgress;

    if (this.state.uploading) {
      uploadProgress = (
        <View style={{ alignItems: 'center' }}>
          <Text style={[styles.title, {fontFamily: 'Gotham Rounded', color: 'white'}]}>Uploading Video</Text>
          <ActivityIndicator
            animating={this.state.animating}
            style={[styles.centering, {height: 100}]}
            color='white'
            size="large" />
          <Text style={{fontFamily: 'Gotham Rounded', color: 'white'}}>{ this.state.uploadProgress.toFixed(0) }%</Text>
          <Text style={{ fontSize: 11, color: 'white', marginTop: 5, fontFamily: 'Gotham Rounded' }}>
            { ( this.state.uploadWritten / 1024 ).toFixed(0) }/{ ( this.state.uploadTotal / 1024 ).toFixed(0) } KB
          </Text>
        </View>
      );
    } else {
      null
    }

    return uploadProgress;
  }

  takeVideo() {
    if(!this.state.uploading && !this.state.isRecording) {
      this.setState({isRecording: true}); 
      this.camera.capture({mode: Camera.constants.CaptureMode.video})
        .then((data) => this.processVideo(data))
        .catch(err => console.error(err));
    } else if (!this.state.uploading) {
      this.setState({isRecording: false}); 
      this.camera.stopCapture();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          type={this.state.camera.type}
          captureMode={this.state.camera.mode}
          captureTarget={this.state.camera.captureTarget}>          

          {this.state.uploading ? (
            <View style={styles.modal}>
              {this.uploadProgressModal()}
            </View>
          ) : (
            null
          )}

          <View>
            <TouchableOpacity onPress={() => this.switchType()}>
              <Text
                style={{
                  fontSize: 32,
                  marginBottom: 20,
                  backgroundColor: 'rgba(0,0,0,0)'
                }}
              >{this.state.direction}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.takeVideo()}>
              <RecordButton recording={this.state.isRecording}/>
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    width: 80, 
    height: 80,
    marginBottom: 25, 
    flex: 0
  },
  modal: {
    margin: 30,
    marginTop: 80,
    width: Dimensions.get('window').width/2,
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#BCA1FD',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

AppRegistry.registerComponent('VideoCamera', () => VideoCamera);
