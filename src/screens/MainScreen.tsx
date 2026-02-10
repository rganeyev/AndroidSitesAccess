import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image, Text, SafeAreaView } from 'react-native';
import WebsiteView from '../components/WebsiteView';
import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;

const menuIcon = require('../../assets/images/menu-icon.png');

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
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image source={menuIcon} style={styles.menuIcon} />
        </TouchableOpacity>
      </View>
      <WebsiteView url={currentUrl} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#82c9e3',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#82c9e3',
    paddingHorizontal: isTablet ? 25 : 15,
    paddingVertical: isTablet ? 20 : 12,
    paddingTop: isTablet ? 25 : 15,
    zIndex: 10,
  },
  menuIcon: {
    width: isTablet ? 40 : 30,
    height: isTablet ? 40 : 30,
    marginRight: isTablet ? 25 : 15,
    tintColor: '#FFFFFF',
  },

});

export default MainScreen;
