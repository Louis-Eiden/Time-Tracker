import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { useTheme, getThemeColors } from "../contexts/ThemeContext";
import { Text, Button, IconButton } from "react-native-paper";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { colors } from "../theme/colors";

interface TimeEntry {
  start: string;
  end: string;
}

export default function JobScreen() {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  const navigation = useNavigation();
  const route =
    useRoute<RouteProp<{ params: { jobName: string } }, "params">>();
  const jobName = route.params?.jobName;
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(
      2,
      "0"
    )}:${String(secs).padStart(2, "0")}`;
  };

  const handleStartStop = () => {
    if (isRunning) {
      const newEntry = {
        start: new Date(Date.now() - time * 1000).toLocaleTimeString(),
        end: new Date().toLocaleTimeString(),
      };
      setTimeEntries([...timeEntries, newEntry]);
      setTime(0);
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
        />
        <Text style={styles.title}>{jobName}</Text>
        <IconButton
          icon="cog"
          onPress={() => navigation.navigate("Settings")}
          iconColor={colors.icon}
        />
      </View>

      <Text style={styles.timer}>{formatTime(time)}</Text>

      <Button mode="contained" onPress={handleStartStop} style={styles.button}>
        {isRunning ? "Stop" : "Start"}
      </Button>

      <View style={styles.timeEntryList}>
        <FlatList
          data={timeEntries}
          renderItem={({ item }) => (
            <View style={styles.timeEntry}>
              <Text style={styles.timeEntryText}>
                {item.start} - {item.end}
              </Text>
            </View>
          )}
          keyExtractor={(_, index) => index.toString()}
        />

        <Button
          mode="outlined"
          onPress={handlePrint}
          style={styles.printButton}
        >
          Print Time
        </Button>
      </View>
    </View>
  );
}

const makeStyles = (colors: ReturnType<typeof getThemeColors>) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: colors.background,
      alignItems: "center",
    },
    header: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 30,
    },
    title: {
      fontSize: 24,
      fontWeight: "500",
      color: colors.text,
    },
    timer: {
      fontSize: 56,
      textAlign: "center",
      marginVertical: 40,
      fontWeight: "400",
      color: colors.text,
    },
    timeEntryList: {
      minHeight: 300,
      width: 300,
      borderWidth: 2,
      borderColor: colors.border,
      borderRadius: 0,
      padding: 10,
      backgroundColor: colors.background,
    },
    button: {
      backgroundColor: colors.background,
      borderWidth: 2,
      borderColor: colors.border,
      width: 100,
      height: 100,
      alignSelf: "center",
      marginBottom: 40,
      justifyContent: "center",
      borderRadius: 0,
    },
    timeEntry: {
      padding: 12,
      borderWidth: 2,
      marginBottom: 10,
      height: 45,
      justifyContent: "center",
      alignItems: "center",
    },
    timeEntryText: {
      color: colors.text,
    },
    printButton: {
      padding: 12,
      borderWidth: 2,
      height: 45,
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      bottom: 10,
      width: 276,
      backgroundColor: colors.background,
      borderColor: colors.border,
      borderRadius: 0,
    },
  });

const styles = makeStyles({
  text: colors.text,
  background: colors.background,
  border: colors.primary,
  icon: colors.primary,
  link: colors.primary,
});
