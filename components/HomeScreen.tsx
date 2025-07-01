import React, { useState } from "react";
import { View, FlatList } from "react-native";
import ListItemModal from "./ListItemModal";
import ListItem from "./ListItem";
import { Text, IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useTheme, getThemeColors } from "../contexts/ThemeContext";
import { createHomeStyles, createCommonStyles } from "../theme/styles";

export default function HomeScreen() {
  const [jobs, setJobs] = useState<string[]>(["Job 1", "Job 2"]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [jobInput, setJobInput] = useState("");
  const [editingJobIndex, setEditingJobIndex] = useState<number | null>(null);
  const [menuVisible, setMenuVisible] = useState<number | null>(null);
  const navigation = useNavigation();
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const styles = createHomeStyles(colors);

  const showAddModal = () => {
    setModalMode("add");
    setJobInput("");
    setIsModalVisible(true);
  };

  const showEditModal = (index: number) => {
    setModalMode("edit");
    setEditingJobIndex(index);
    setJobInput(jobs[index]);
    setIsModalVisible(true);
  };

  const handleJobConfirm = (value: string) => {
    if (modalMode === "add") {
      setJobs([...jobs, value]);
    } else {
      const updatedJobs = [...jobs];
      if (editingJobIndex !== null) {
        updatedJobs[editingJobIndex] = value;
        setJobs(updatedJobs);
      }
    }
    setIsModalVisible(false);
  };

  return (
    //TODO: Make one headbar so its easier to style and change theme / mode
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Time Tracker</Text>
        <IconButton
          icon="cog"
          size={24}
          onPress={() => navigation.navigate("Settings")}
          iconColor={colors.icon}
          style={styles.settingsIcon}
          rippleColor="transparent"
          containerColor="transparent" // Background color of button
          theme={{
            colors: {
              secondaryContainer: "transparent", // Controls hover state background
            },
          }}
          animated={false}
        />
      </View>
      <View style={styles.main}>
        <View style={[styles.jobList, { borderColor: colors.border }]}>
          <FlatList
            data={jobs}
            renderItem={({ item, index }) => (
              <ListItem
                text={item}
                onPress={() => navigation.navigate("Job", { jobName: item })}
                onEdit={() => showEditModal(index)}
                onDelete={() => {
                  setJobs(jobs.filter((_, i) => i !== index));
                }}
                rightSwipeActions={{
                  label: "Delete",
                  color: "red",
                  onPress: () => {
                    setJobs(jobs.filter((_, i) => i !== index));
                  },
                }}
                leftSwipeActions={{
                  label: "Edit",
                  color: "blue",
                  onPress: () => showEditModal(index),
                }}
              />
            )}
            keyExtractor={(item) => item}
          />
          <IconButton
            icon="plus"
            size={24}
            mode="outlined"
            onPress={showAddModal}
            style={styles.addButton}
            rippleColor="transparent"
            iconColor={colors.icon}
            animated={false}
          />
        </View>
      </View>

      <ListItemModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onConfirm={handleJobConfirm}
        title={modalMode === "add" ? "New Job" : "Edit Job"}
        inputValue={jobInput}
        onInputChange={setJobInput}
        placeholder="Enter job name"
      />
    </View>
  );
}
