import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import WebsiteView from '../components/WebsiteView';
import { StyleSheet } from 'react-native';

interface MainScreenProps {
  route: {
    params?: {
      url?: string;
    };
  };
  navigation: {
    openDrawer: () => void;
  };
}

const MainScreen: React.FC<MainScreenProps> = ({ route, navigation }) => {
  const [currentUrl, setCurrentUrl] = useState<string>('https://chehmet.github.io/EminGames/');

  useEffect(() => {
    if (route.params?.url) {
      setCurrentUrl(route.params.url);
    }
  }, [route.params?.url]);

  return (
    <SafeAreaView style={styles.container}>
      <WebsiteView url={currentUrl} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#82c9e3',
  },
});

export default MainScreen;
