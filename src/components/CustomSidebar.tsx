import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image,
  SafeAreaView,
} from 'react-native';

import { StyleSheet } from 'react-native';
import { ICONS, AVAILABLE_ICONS } from './IconLibrary';
import { useWebsites } from '../contexts/WebsitesContext';

export interface CustomSidebarProps {
  navigation: {
    navigate: (screen: string, params?: Record<string, unknown>) => void;
    closeDrawer: () => void;
  };
}

const CustomSidebar: React.FC<CustomSidebarProps> = ({ navigation }) => {
  const { websites, addWebsite, removeWebsite } = useWebsites();
  const [newUrl, setNewUrl] = useState<string>('');
  const [selectedIcon, setSelectedIcon] = useState<string>(AVAILABLE_ICONS[0]);

  const handleIconPress = (url: string) => {
    navigation.navigate('Main', { url });
    navigation.closeDrawer();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>My Websites</Text>

      <FlatList
        data={websites}
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => (
          <View style={styles.websiteItem}>
            <TouchableOpacity onPress={() => handleIconPress(item.url)} style={styles.iconButton}>
              <Image source={ICONS[item.icon] || ICONS.default} style={styles.websiteIcon} />
              <Text style={styles.websiteUrl} numberOfLines={1}>
                {item.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => removeWebsite(item.url)}>
              <Text style={styles.removeButton}>❌</Text>
            </TouchableOpacity>
          </View>
        )}
        style={{ flex: 1 }}
      />

      <View style={styles.addWebsiteContainer}>
        <Text style={styles.addTitle}>Add a new website</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., wikipedia.org"
          value={newUrl}
          onChangeText={setNewUrl}
          autoCapitalize="none"
        />

        <Text style={styles.addTitle}>Choose an icon</Text>
        <View style={styles.iconSelectorContainer}>
          {AVAILABLE_ICONS.map((iconName) => (
            <TouchableOpacity key={iconName} onPress={() => setSelectedIcon(iconName)}>
              <Image
                source={ICONS[iconName]}
                style={[styles.selectorIcon, selectedIcon === iconName && styles.selectedIcon]}
              />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.addButton} onPress={() => addWebsite(newUrl, selectedIcon)}>
          <Text style={styles.addButtonText}>Add ✨</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  title: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 34,
    margin: 30,
    marginTop: 50,
    color: '#82c9e3',
    textAlign: 'left',
  },
  websiteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 30,
    justifyContent: 'space-between',
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  websiteIcon: {
    width: 40,
    height: 40,
    marginRight: 20,
    borderRadius: 10,
  },
  websiteUrl: {
    fontFamily: 'Nunito_400Regular',
    fontSize: 16,
    color: '#3d5a80',
    flex: 1,
  },
  removeButton: {
    fontSize: 20,
    opacity: 0.5,
  },
  addWebsiteContainer: {
    padding: 30,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    backgroundColor: '#FFFFFF',
  },
  addTitle: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 16,
    color: '#3d5a80',
    marginBottom: 15,
  },
  input: {
    fontFamily: 'Nunito_400Regular',
    width: '100%',
    backgroundColor: '#f7f7f7',
    borderWidth: 0,
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 16,
    color: '#3d5a80',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#52b64a',
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2.62,
    elevation: 4,
  },
  addButtonText: {
    fontFamily: 'Nunito_700Bold',
    color: 'white',
    fontSize: 18,
  },
  iconSelectorContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'flex-start',
    gap: 15,
  },
  selectorIcon: {
    width: 50,
    height: 50,
    borderRadius: 10,
    opacity: 0.5,
  },
  selectedIcon: {
    opacity: 1,
    transform: [{ scale: 1.1 }],
    borderColor: '#52b64a',
    borderWidth: 3,
  },
});

export default CustomSidebar;
