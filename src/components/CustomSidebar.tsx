import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image,
  SafeAreaView,
  Modal,
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
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>('');
  const [newUrl, setNewUrl] = useState<string>('');
  const [selectedIcon, setSelectedIcon] = useState<string>(AVAILABLE_ICONS[0]);

  const handleIconPress = (url: string) => {
    navigation.navigate('Main', { url });
    navigation.closeDrawer();
  };

  const handleAddWebsite = () => {
    addWebsite(newName, newUrl, selectedIcon);
    setNewName('');
    setNewUrl('');
    setSelectedIcon(AVAILABLE_ICONS[0]);
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={websites}
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => (
          <View style={styles.websiteItem}>
            <TouchableOpacity onPress={() => handleIconPress(item.url)} style={styles.iconButton}>
              <Image source={ICONS[item.icon] || ICONS.default} style={styles.websiteIcon} />
              <Text style={styles.websiteName} numberOfLines={1}>
                {item.name}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => removeWebsite(item.url)}>
              <Text style={styles.removeButton}>❌</Text>
            </TouchableOpacity>
          </View>
        )}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingTop: 20 }}
      />

      <View style={styles.addButtonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.addButtonText}>Add URL</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Website</Text>

            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Games"
              value={newName}
              onChangeText={setNewName}
              autoCapitalize="words"
            />

            <Text style={styles.label}>URL</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., wikipedia.org"
              value={newUrl}
              onChangeText={setNewUrl}
              autoCapitalize="none"
            />

            <Text style={styles.label}>Choose an icon</Text>
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

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.submitButton]}
                onPress={handleAddWebsite}
              >
                <Text style={styles.submitButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  websiteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
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
    marginRight: 15,
    borderRadius: 10,
  },
  websiteName: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 18,
    color: '#3d5a80',
    flex: 1,
  },
  removeButton: {
    fontSize: 20,
    opacity: 0.5,
  },
  addButtonContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    backgroundColor: '#FFFFFF',
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 30,
    width: '85%',
    maxWidth: 400,
  },
  modalTitle: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 24,
    color: '#3d5a80',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 16,
    color: '#3d5a80',
    marginBottom: 10,
    marginTop: 10,
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
  },
  iconSelectorContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 10,
    justifyContent: 'flex-start',
    gap: 15,
    flexWrap: 'wrap',
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
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 10,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
  },
  cancelButtonText: {
    fontFamily: 'Nunito_700Bold',
    color: '#3d5a80',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#52b64a',
  },
  submitButtonText: {
    fontFamily: 'Nunito_700Bold',
    color: 'white',
    fontSize: 16,
  },
});

export default CustomSidebar;
