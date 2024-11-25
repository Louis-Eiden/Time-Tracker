import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Animated,
} from "react-native";
import { isMobileOrTablet } from "../utils/platform";
import { Swipeable } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme, getThemeColors } from "../contexts/ThemeContext";
import { Text, Button, IconButton, Menu } from "react-native-paper";
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

  const handlePrint = () => {
    // TODO: Implement PDF generation and printing
    console.log("Print time entries");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          onPress={() => navigation.goBack()}
          iconColor={colors.icon}
          animated={false}
        />
        <Text style={styles.title}>{jobName}</Text>
        <IconButton
          icon="cog"
          onPress={() => navigation.navigate("Settings")}
          iconColor={colors.icon}
          animated={false}
        />
      </View>

      <Text style={styles.timer}>{formatTime(time)}</Text>

      <View style={styles.timerContainer}>
        <Button
          mode="outlined"
          onPress={handleStartStop}
          style={styles.button}
          theme={{ colors: { outline: "#000000" } }}
        >
          <Text style={styles.buttonText}>{isRunning ? "⏸" : "▶"}</Text>
        </Button>
      </View>

      <View style={styles.timeEntryList}>
        {viewMode === "entries" && (
          <Button
            style={styles.backButton}
            onPress={() => {
              setViewMode("days");
              setSelectedDay(null);
            }}
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
              const renderDayRightActions = (
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
                      const updatedDays = days.filter(d => d.date !== item.date);
                      setDays(updatedDays);
                      AsyncStorage.setItem(`${jobName}_days`, JSON.stringify(updatedDays));
                    }}
                  >
                    <Text style={{ color: "white" }}>Delete</Text>
                  </TouchableOpacity>
                );
              };

              return (
                <Swipeable renderRightActions={renderDayRightActions}>
                  <Button
                    mode="outlined"
                    onPress={() => {
                      setSelectedDay(item.date);
                      setViewMode("entries");
                    }}
                    style={[styles.timeEntry, { flex: 1 }]}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <Text
                          style={[
                            styles.timeEntryText,
                            { flex: 1, paddingLeft: 10 },
                          ]}
                        >
                          {new Date(item.date).toLocaleDateString()} (
                          {item.timeEntries.length} entries)
                        </Text>
                        {!isMobileOrTablet() && (
                          <Menu
                            visible={menuVisible === index}
                            onDismiss={() => setMenuVisible(null)}
                            anchor={
                              <IconButton
                                icon="dots-vertical"
                                size={20}
                                onPress={(e) => {
                                  e.stopPropagation();
                                  setMenuVisible(index);
                                }}
                              />
                            }
                          >
                            <Menu.Item
                              onPress={() => {
                                const updatedDays = days.filter(d => d.date !== item.date);
                                setDays(updatedDays);
                                AsyncStorage.setItem(`${jobName}_days`, JSON.stringify(updatedDays));
                                setMenuVisible(null);
                              }}
                              title="Delete"
                            />
                          </Menu>
                        )}
                      </View>
                    </View>
                  </Button>
                </Swipeable>
              );
            }
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
                    const updatedDays = [...days];
                    const dayIndex = updatedDays.findIndex(d => d.date === selectedDay);
                    if (dayIndex !== -1) {
                      updatedDays[dayIndex].timeEntries = updatedDays[dayIndex].timeEntries.filter((_, i) => i !== index);
                      if (updatedDays[dayIndex].timeEntries.length === 0) {
                        updatedDays.splice(dayIndex, 1);
                      }
                      setDays(updatedDays);
                      AsyncStorage.setItem(`${jobName}_days`, JSON.stringify(updatedDays));
                    }
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
                    // TODO: Implement edit functionality for time entries
                    console.log("Edit time entry:", item);
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
                <Button style={[styles.timeEntry, { flex: 1 }]}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <Text
                      style={[
                        styles.timeEntryText,
                        { flex: 1, paddingLeft: 10 },
                      ]}
                    >
                      {item.start} - {item.end}
                    </Text>
                    {!isMobileOrTablet() && (
                      <Menu
                        visible={menuVisible === index}
                        onDismiss={() => setMenuVisible(null)}
                        anchor={
                          <IconButton
                            style={styles.contextMenuButtons}
                            icon="dots-vertical"
                            size={20}
                            onPress={(e) => {
                              e.stopPropagation();
                              setMenuVisible(index);
                            }}
                          />
                        }
                      >
                        <Menu.Item
                          onPress={() => {
                            console.log("Edit time entry:", item);
                            setMenuVisible(null);
                          }}
                          title="Edit"
                        />
                        <Menu.Item
                          onPress={() => {
                            const updatedDays = [...days];
                            const dayIndex = updatedDays.findIndex(d => d.date === selectedDay);
                            if (dayIndex !== -1) {
                              updatedDays[dayIndex].timeEntries = updatedDays[dayIndex].timeEntries.filter((_, i) => i !== index);
                              if (updatedDays[dayIndex].timeEntries.length === 0) {
                                updatedDays.splice(dayIndex, 1);
                              }
                              setDays(updatedDays);
                              AsyncStorage.setItem(`${jobName}_days`, JSON.stringify(updatedDays));
                            }
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
          keyExtractor={(_, index) => index.toString()}
        />

        <Button
          mode="outlined"
          onPress={handlePrint}
          style={[
            styles.printButton,
            {
              marginTop: 10,
            },
          ]}
          theme={{ colors: { outline: "#000000" } }}
        >
          <Text style={styles.printButtonText}>Print Time</Text>
        </Button>
      </View>
    </View>
  );
}
