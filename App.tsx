import React from 'react';


import { WebView } from 'react-native-webview';



export default class App extends React.Component {

  render() {

    return <WebView source={{ uri: 'https://instagram.com/'}} style={{ marginTop: 24 }} />;

  }
}