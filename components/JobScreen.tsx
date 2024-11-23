import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme, getThemeColors } from "../contexts/ThemeContext";
import { Text, Button, IconButton } from "react-native-paper";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { colors } from "../theme/colors";
import { createJobStyles } from "../theme/styles";

interface TimeEntry {
  start: string;
  end: string;
}

export default function JobScreen() {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
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
        const savedTimeEntries = await AsyncStorage.getItem(
          `${jobName}_timeEntries`
        );

        if (savedStartTime && savedIsRunning === "true") {
          const startTimeNum = parseInt(savedStartTime);
          setStartTime(startTimeNum);
          setIsRunning(true);
          const elapsedSeconds = Math.floor((Date.now() - startTimeNum) / 1000);
          setTime(elapsedSeconds);
        }

        if (savedTimeEntries) {
          setTimeEntries(JSON.parse(savedTimeEntries));
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
      const newEntry = {
        start: new Date(startTime!).toLocaleTimeString(),
        end: new Date().toLocaleTimeString(),
      };
      const newTimeEntries = [...timeEntries, newEntry];
      setTimeEntries(newTimeEntries);
      setTime(0);
      setStartTime(null);

      // Save state
      await AsyncStorage.setItem(`${jobName}_isRunning`, "false");
      await AsyncStorage.setItem(
        `${jobName}_timeEntries`,
        JSON.stringify(newTimeEntries)
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
          {isRunning ? "⏸" : "▶"}
        </Button>
      </View>

      <View style={styles.timeEntryList}>
        <FlatList
          data={timeEntries}
          renderItem={({ item }) => (
            <Button style={styles.timeEntry}>
              <Text style={styles.timeEntryText}>
                {item.start} - {item.end}
              </Text>
            </Button>
          )}
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
