import React, { useState, useEffect } from "react";
import ListItemModal from "./ListItemModal";
import ListItem from "./ListItem";
import { View, FlatList, Platform, Share } from "react-native";
// import RNHTMLtoPDF from "react-native-html-to-pdf";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme, getThemeColors } from "../contexts/ThemeContext";
import { Text, Button, IconButton } from "react-native-paper";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { colors } from "../theme/colors";
import { createJobStyles } from "../theme/styles";

interface TimeEntry {
  start: string;
  end: string;
  id: string;
}

interface DayEntry {
  date: string;
  timeEntries: TimeEntry[];
}

export default function JobScreen() {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [days, setDays] = useState<DayEntry[]>([]);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [menuVisible, setMenuVisible] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"days" | "entries">("days");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editingEntryIndex, setEditingEntryIndex] = useState<number | null>(
    null
  );
  const [startTimeInput, setStartTimeInput] = useState("");
  const [endTimeInput, setEndTimeInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const navigation = useNavigation();
  const route =
    useRoute<RouteProp<{ params: { jobName: string } }, "params">>();
  const jobName = route.params?.jobName;
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const styles = createJobStyles(colors);

  // Load saved state
  useEffect(() => {
    const loadSavedState = async () => {
      try {
        const savedStartTime = await AsyncStorage.getItem(
          `${jobName}_startTime`
        );
        const savedIsRunning = await AsyncStorage.getItem(
          `${jobName}_isRunning`
        );
        const savedDays = await AsyncStorage.getItem(`${jobName}_days`);

        if (savedStartTime && savedIsRunning === "true") {
          const startTimeNum = parseInt(savedStartTime);
          setStartTime(startTimeNum);
          setIsRunning(true);
          const elapsedSeconds = Math.floor((Date.now() - startTimeNum) / 1000);
          setTime(elapsedSeconds);
        }

        if (savedDays) {
          setDays(JSON.parse(savedDays));
        }
      } catch (error) {
        console.error("Error loading saved state:", error);
      }
    };

    loadSavedState();
  }, [jobName]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        if (startTime) {
          const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
          setTime(elapsedSeconds);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, startTime]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(
      2,
      "0"
    )}:${String(secs).padStart(2, "0")}`;
  };

  const handleStartStop = async () => {
    if (isRunning) {
      // Stopping the timer
      const currentDate = new Date().toISOString().split("T")[0];
      const newEntry = {
        id: Date.now().toString(),
        start: new Date(startTime!).toLocaleTimeString(),
        end: new Date().toLocaleTimeString(),
      };

      const updatedDays = [...days];
      const dayIndex = updatedDays.findIndex((day) => day.date === currentDate);

      if (dayIndex >= 0) {
        updatedDays[dayIndex].timeEntries.push(newEntry);
      } else {
        updatedDays.push({
          date: currentDate,
          timeEntries: [newEntry],
        });
      }

      setDays(updatedDays);
      setTime(0);
      setStartTime(null);

      // Save state
      await AsyncStorage.setItem(`${jobName}_isRunning`, "false");
      await AsyncStorage.setItem(
        `${jobName}_days`,
        JSON.stringify(updatedDays)
      );
      await AsyncStorage.removeItem(`${jobName}_startTime`);
    } else {
      // Starting the timer
      const now = Date.now();
      setStartTime(now);

      // Save state
      await AsyncStorage.setItem(`${jobName}_startTime`, now.toString());
      await AsyncStorage.setItem(`${jobName}_isRunning`, "true");
    }
    setIsRunning(!isRunning);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          onPress={() => navigation.goBack()}
          iconColor={colors.icon}
          // style={{ elevation: 0 }}
          containerColor="transparent" // Background color of button
          theme={{
            colors: {
              secondaryContainer: "transparent", // Controls hover state background
            },
          }}
        />
        <Text style={styles.title}>{jobName}</Text>
        <IconButton
          icon="cog"
          onPress={() => navigation.navigate("Settings")}
          iconColor={colors.icon}
          style={{ elevation: 0 }}
          rippleColor="transparent"
          containerColor="transparent" // Background color of button
          theme={{
            colors: {
              secondaryContainer: "transparent", // Controls hover state background
            },
          }}
        />
      </View>

      <Text style={styles.timer}>{formatTime(time)}</Text>

      {/* TODO: Add Hover effect using boxshadow so it looks pressed when isRunning*/}
      <View style={styles.timerContainer}>
        <Button
          mode="outlined"
          onPress={handleStartStop}
          style={styles.button}
          theme={{ colors: { outline: "#000000" } }}
          rippleColor="transparent"
        >
          <Text style={styles.buttonText}>{isRunning ? "⏸" : "▶"}</Text>
        </Button>
      </View>

      <ListItemModal
        visible={isModalVisible}
        onClose={() => {
          setIsModalVisible(false);
          setStartTimeInput("");
          setEndTimeInput("");
          setEditingEntryIndex(null);
        }}
        onConfirm={(_, startTime, endTime) => {
          if (startTime && endTime) {
            const updatedDays = [...days];
            const dayIndex = updatedDays.findIndex(
              (d) => d.date === selectedDay
            );

            if (
              modalMode === "edit" &&
              editingEntryIndex !== null &&
              dayIndex !== -1
            ) {
              updatedDays[dayIndex].timeEntries[editingEntryIndex] = {
                ...updatedDays[dayIndex].timeEntries[editingEntryIndex],
                start: startTime,
                end: endTime,
              };
            }

            setDays(updatedDays);
            AsyncStorage.setItem(
              `${jobName}_days`,
              JSON.stringify(updatedDays)
            );
            setIsModalVisible(false);
            setStartTimeInput("");
            setEndTimeInput("");
            setEditingEntryIndex(null);
          }
        }}
        title={modalMode === "add" ? "Add Time Entry" : "Edit Time Entry"}
        inputValue=""
        onInputChange={() => {}}
        isTimeEntry={true}
        startTime={startTimeInput}
        endTime={endTimeInput}
        onStartTimeChange={setStartTimeInput}
        onEndTimeChange={setEndTimeInput}
      />

      <View style={styles.timeEntryList}>
        {viewMode === "days" && (
          <Button
            style={styles.backToJobsButton}
            onPress={() => navigation.goBack()}
            rippleColor="transparent"
          >
            <Text style={styles.backButtonText}>← Back to Jobs</Text>
          </Button>
        )}
        {viewMode === "entries" && (
          <Button
            style={styles.backButton}
            onPress={() => {
              setViewMode("days");
              setSelectedDay(null);
            }}
            rippleColor="transparent"
          >
            <Text style={styles.backButtonText}>← Back to Days</Text>
          </Button>
        )}
        <FlatList
          data={
            viewMode === "days"
              ? days
              : days.find((d) => d.date === selectedDay)?.timeEntries || []
          }
          renderItem={({ item, index }) => {
            if (viewMode === "days") {
              return (
                <ListItem
                  text={`${new Date(item.date).toLocaleDateString()} (${
                    item.timeEntries.length
                  } entries)`}
                  onPress={() => {
                    setSelectedDay(item.date);
                    setViewMode("entries");
                  }}
                  onDelete={() => {
                    const updatedDays = days.filter(
                      (d) => d.date !== item.date
                    );
                    setDays(updatedDays);
                    AsyncStorage.setItem(
                      `${jobName}_days`,
                      JSON.stringify(updatedDays)
                    );
                  }}
                  rightSwipeActions={{
                    label: "Delete",
                    color: "red",
                    onPress: () => {
                      const updatedDays = days.filter(
                        (d) => d.date !== item.date
                      );
                      setDays(updatedDays);
                      AsyncStorage.setItem(
                        `${jobName}_days`,
                        JSON.stringify(updatedDays)
                      );
                    },
                  }}
                />
              );
            }

            return (
              <ListItem
                text={`${item.start} - ${item.end}`}
                onEdit={() => {
                  setModalMode("edit");
                  setEditingEntryIndex(index);
                  setStartTimeInput(item.start);
                  setEndTimeInput(item.end);
                  setIsModalVisible(true);
                }}
                onDelete={() => {
                  const updatedDays = [...days];
                  const dayIndex = updatedDays.findIndex(
                    (d) => d.date === selectedDay
                  );
                  if (dayIndex !== -1) {
                    updatedDays[dayIndex].timeEntries = updatedDays[
                      dayIndex
                    ].timeEntries.filter((_, i) => i !== index);
                    if (updatedDays[dayIndex].timeEntries.length === 0) {
                      updatedDays.splice(dayIndex, 1);
                    }
                    setDays(updatedDays);
                    AsyncStorage.setItem(
                      `${jobName}_days`,
                      JSON.stringify(updatedDays)
                    );
                  }
                }}
                rightSwipeActions={{
                  label: "Delete",
                  color: "red",
                  onPress: () => {
                    const updatedDays = [...days];
                    const dayIndex = updatedDays.findIndex(
                      (d) => d.date === selectedDay
                    );
                    if (dayIndex !== -1) {
                      updatedDays[dayIndex].timeEntries = updatedDays[
                        dayIndex
                      ].timeEntries.filter((_, i) => i !== index);
                      if (updatedDays[dayIndex].timeEntries.length === 0) {
                        updatedDays.splice(dayIndex, 1);
                      }
                      setDays(updatedDays);
                      AsyncStorage.setItem(
                        `${jobName}_days`,
                        JSON.stringify(updatedDays)
                      );
                    }
                  },
                }}
                leftSwipeActions={{
                  label: "Edit",
                  color: "blue",
                  onPress: () => {
                    setModalMode("edit");
                    setEditingEntryIndex(index);
                    setStartTimeInput(item.start);
                    setEndTimeInput(item.end);
                    setIsModalVisible(true);
                  },
                }}
              />
            );
          }}
          keyExtractor={(_, index) => index.toString()}
        />
        {/* <Button
          mode="outlined"
          onPress={() => setIsModalVisible(true)}
          style={styles.addButton}
          rippleColor="transparent"
        >
          <Text style={styles.addButtonText}>+</Text>
        </Button> */}
        <IconButton
          icon="plus"
          size={24}
          mode="outlined"
          // onPress={showAddModal}
          onPress={() => setIsModalVisible(true)}
          style={styles.addButton}
          rippleColor="transparent"
          iconColor={colors.icon}
          animated={false}
        />
        {viewMode === "entries" && (
          <Button
            mode="outlined"
            onPress={handlePrint(days)} //different for dayscreen
            style={[
              styles.printButton,
              {
                marginTop: 10,
              },
            ]}
            theme={{ colors: { outline: "#000000" } }}
            rippleColor="transparent"
          >
            <Text style={styles.printButtonText}>Print Time</Text>
          </Button>
        )}
      </View>
    </View>
  );
}
