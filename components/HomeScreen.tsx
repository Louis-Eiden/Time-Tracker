import React, { useState } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Animated,
} from "react-native";
import ListItemModal from "./ListItemModal";
import { isMobileOrTablet } from "../utils/platform";
import { Swipeable } from "react-native-gesture-handler";
import { Text, Button, IconButton, Menu } from "react-native-paper";
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
  const styles = {
    ...createHomeStyles(colors),
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      flex: 1,
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
      backgroundColor: colors.background,
      borderWidth: 2,
      borderColor: colors.border,
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
      width: "100%",
    },
    modalButton: {
      flex: 1,
      marginHorizontal: 5,
      borderRadius: 0,
      borderColor: colors.border,
      borderWidth: 2,
    },
    modalInput: {
      borderWidth: 2,
      borderColor: colors.border,
      borderRadius: 0,
      padding: 10,
      marginBottom: 15,
      height: 40,
      width: "100%",
    },
    modalActionButton: {
      borderColor: "#000000",
      borderRadius: 0,
      backgroundColor: "#D3D3D3",
    },
  };

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
            renderItem={({ item, index }) => {
              const renderRightActions = (
                progress: Animated.AnimatedInterpolation<number>,
                dragX: Animated.AnimatedInterpolation<number>
              ) => {
                return (
                  <TouchableOpacity
                    style={{
                      backgroundColor: "red",
                      justifyContent: "center",
                      alignItems: "center",
                      width: 70,
                    }}
                    onPress={() => {
                      setJobs(jobs.filter((_, i) => i !== index));
                    }}
                  >
                    <Text style={{ color: "white" }}>Delete</Text>
                  </TouchableOpacity>
                );
              };

              const renderLeftActions = (
                progress: Animated.AnimatedInterpolation<number>,
                dragX: Animated.AnimatedInterpolation<number>
              ) => {
                return (
                  <TouchableOpacity
                    style={{
                      backgroundColor: "blue",
                      justifyContent: "center",
                      alignItems: "center",
                      width: 70,
                    }}
                    onPress={() => {
                      // TODO: Implement edit functionality
                      console.log("Edit job:", item);
                    }}
                  >
                    <Text style={{ color: "white" }}>Edit</Text>
                  </TouchableOpacity>
                );
              };

              return (
                <Swipeable
                  renderRightActions={renderRightActions}
                  renderLeftActions={renderLeftActions}
                >
                  <Button
                    mode="outlined"
                    onPress={() =>
                      navigation.navigate("Job", { jobName: item })
                    }
                    style={styles.jobButton}
                    theme={{ colors: { outline: "#000000" } }}
                    rippleColor="transparent"
                  >
                    <View style={styles.buttonContent}>
                      <Text
                        style={[styles.jobButtonText, { color: colors.text }]}
                      >
                        {item}
                      </Text>
                      {!isMobileOrTablet() && (
                        <Menu
                          visible={menuVisible === index}
                          onDismiss={() => setMenuVisible(null)}
                          anchor={
                            <IconButton
                              icon="dots-vertical"
                              size={20}
                              iconColor={colors.icon}
                              style={styles.contextMenuButtons}
                              onPress={(e) => {
                                e.stopPropagation();
                                setMenuVisible(index);
                              }}
                            />
                          }
                        >
                          <Menu.Item
                            onPress={() => {
                              console.log("Edit job:", item);
                              setMenuVisible(null);
                            }}
                            title="Edit"
                          />
                          <Menu.Item
                            onPress={() => {
                              setJobs(jobs.filter((_, i) => i !== index));
                              setMenuVisible(null);
                            }}
                            title="Delete"
                          />
                        </Menu>
                      )}
                    </View>
                  </Button>
                </Swipeable>
              );
            }}
            keyExtractor={(item) => item}
          />
          <Button
            mode="outlined"
            onPress={showAddModal}
            style={styles.addButton}
            rippleColor="transparent"
          >
            <Text style={styles.addButtonText}>+</Text>
          </Button>
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
