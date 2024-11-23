import React, { useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import { Text, Button, IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useTheme, getThemeColors } from "../contexts/ThemeContext";
import { createHomeStyles, createCommonStyles } from "../theme/styles";

export default function HomeScreen() {
  const [jobs, setJobs] = useState<string[]>(["Job 1", "Job 2"]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newJobName, setNewJobName] = useState("");
  const navigation = useNavigation();
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const styles = {
    ...createHomeStyles(colors),
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      width: 400,
      padding: 20,
      backgroundColor: "#fff",
      borderWidth: 1,
    },
    modalTitle: {
      fontSize: 18,
      marginBottom: 15,
      textAlign: "center",
    },
    input: {
      borderWidth: 1,
      padding: 10,
      marginBottom: 15,
      height: 40,
    },
    modalButtons: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    modalButton: {
      flex: 1,
      marginHorizontal: 5,
      borderRadius: 0,
      borderColor: colors.border,
      borderWidth: 2,
    },
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const addJob = () => {
    if (newJobName.trim()) {
      setJobs([...jobs, newJobName.trim()]);
      setNewJobName("");
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Time Tracker</Text>
        <IconButton
          icon="cog"
          size={24}
          onPress={() => navigation.navigate("Settings")}
          iconColor={colors.icon}
          style={styles.settingsIcon}
          animated={false}
        />
      </View>
      <View style={styles.main}>
        <View style={[styles.jobList, { borderColor: colors.border }]}>
          <FlatList
            data={jobs}
            renderItem={({ item }) => (
              <Button
                mode="outlined"
                onPress={() => navigation.navigate("Job", { jobName: item })}
                style={styles.jobButton}
                theme={{ colors: { outline: "#000000" } }}
              >
                <Text style={{ color: colors.text }}>{item}</Text>
              </Button>
            )}
            keyExtractor={(item) => item}
          />
          <Button
            mode="outlined"
            onPress={showModal}
            style={[
              styles.addButton,
              {
                borderColor: "#000000",
                borderRadius: 0,
                height: 40,
                marginTop: 10,
              },
            ]}
            theme={{ colors: { outline: "#000000" } }}
          >
            <Text style={styles.addButtonText}>+</Text>
          </Button>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View
            style={[
              styles.modalContent,
              { backgroundColor: colors.background },
            ]}
          >
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              Job Name
            </Text>
            <TextInput
              style={[styles.modalInput, { color: colors.text }]}
              value={newJobName}
              onChangeText={setNewJobName}
              placeholder="Enter job name"
              placeholderTextColor={colors.text}
              selectionColor="#000000"
              underlineColorAndroid="transparent"
            />
            <View style={styles.modalButtons}>
              <Button
                mode="outlined"
                onPress={() => setModalVisible(false)}
                style={[styles.modalButton, styles.modalActionButton]}
              >
                <Text style={{ color: "#000000" }}>Cancel</Text>
              </Button>
              <Button
                mode="outlined"
                onPress={addJob}
                style={[styles.modalButton, styles.modalActionButton]}
              >
                <Text style={{ color: "#000000" }}>Confirm</Text>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
