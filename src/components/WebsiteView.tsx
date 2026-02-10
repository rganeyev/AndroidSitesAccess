import React from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet, Platform } from 'react-native';

interface WebsiteViewProps {
  url: string;
}

const WebsiteView: React.FC<WebsiteViewProps> = ({ url }) => {
  if (Platform.OS === 'web') {
    return (
      <iframe
        src={url}
        style={{ flex: 1, border: 'none', width: '100%', height: '100%' }}
        title="Website Content"
      />
    );
  } else {
    return <WebView source={{ uri: url }} style={styles.webview} />;
  }
};

const styles = StyleSheet.create({
  webview: {
    flex: 1,
  },
});

export default WebsiteView;
