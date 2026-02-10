import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import MainScreen from './screens/MainScreen';
import CustomSidebar, { CustomSidebarProps } from './components/CustomSidebar';

import { useFonts, Nunito_700Bold, Nunito_400Regular } from '@expo-google-fonts/nunito';
import { View, Text } from 'react-native';
import { WebsitesProvider } from './contexts/WebsitesContext';

const Drawer = createDrawerNavigator();

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    Nunito_700Bold,
    Nunito_400Regular,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Loading Fonts...</Text>
      </View>
    );
  }

  return (
    <WebsitesProvider>
      <NavigationContainer>
        <Drawer.Navigator
          id={undefined} // not sure why this is needed, but it removes a TS warning
          drawerContent={(props: CustomSidebarProps) => <CustomSidebar {...props} />}
          screenOptions={{
            headerShown: false,
            drawerStyle: {
              backgroundColor: 'transparent',
              width: 320, // Width for tablets
            },
            drawerType: 'front',
          }}
        >
          <Drawer.Screen name="Main" component={MainScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </WebsitesProvider>
  );
};

export default App;
