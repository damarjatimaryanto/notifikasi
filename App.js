import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Component} from 'react';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import firebase from '@react-native-firebase/app';

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      idToken: null,
      namaInput: null,
      aksiKlik: null,
    };
  }

  componentDidMount() {
    const firebaseConfig = {
      apiKey: 'AIzaSyBge5bkkV4yymV1PSSWnpqicWuje_84ZgQ',
      authDomain: 'ppmo-25974.firebaseapp.com',
      projectId: 'ppmo-25974',
      storageBucket: 'ppmo-25974.appspot.com',
      messagingSenderId: '250570576431',
      appId: '1:250570576431:web:62990e3dfa2c79317c6cda',
      measurementId: 'G-1RYQ40VR5J',
    };

    // Initialize Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    } else {
      firebase.app();
    }

    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      // onRegister: function (token) {
      //   console.log('TOKEN:', token);
      // },

      onRegister:(token)=>this.setState({idToken:token.token});

      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);

        // process the notification

        // (required) Called when a remote is received or opened, or local notification is opened
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
      onAction: function (notification) {
        console.log('ACTION:', notification.action);
        console.log('NOTIFICATION:', notification);

        // process the action
      },

      // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
      onRegistrationError: function (err) {
        console.error(err.message, err);
      },

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       * - if you are not using remote notification or do not have Firebase installed, use this:
       *     requestPermissions: Platform.OS === 'ios'
       */
      requestPermissions: true,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          onChangeText={text => this.setState({namaInput: text})}
          style={styles.input}
          placeholder="isikan namamu"
        />
        <TouchableOpacity style={styles.tombol} onPress={this.klikSimpan}>
          <Text style={styles.text}>Kirim Pesan</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 300,
    backgroundColor: 'grey',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
  },
  tombol: {
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'yellow',
    height: 50,
    marginVertical: 20,
  },
  text: {
    color: 'black',
  },
});
