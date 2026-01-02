import React, { useState, useEffect } from "react";
import ListItemModal from "./ModalForm";
import ListItem from "./ListItem";
import { View, FlatList } from "react-native";
import { useTheme, getThemeColors } from "../contexts/ThemeContext";
import { Text, Button, IconButton } from "react-native-paper";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
// import { colors } from "../theme/colors";
import { createJobStyles } from "../theme/styles";
import { handlePrint } from "../utils/print";
import { useTimes } from "../hooks/useTimes";
import { startTimer, stopTimer } from "../services/times.services";
import ModalForm from "./ModalForm";
import { useModalForm } from "@/hooks/useModalForm";
import { createTime, deleteTime } from "@/services/times.services";
import { Time, Days } from "@/types";

export default function JobScreen() {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const styles = createJobStyles(colors);

  const [isTimeModalVisible, setIsTimeModalVisible] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const navigation = useNavigation();
  const route =
    useRoute<
      RouteProp<{ params: { jobId: string; jobName: string } }, "params">
    >();

  const userId = "local-user"; // TODO: needs to be changes when authentication is added
  const [selectedDay, setSelectedDay] = useState<string | null>(null); // When a day is selected it shows the times
  const { jobId, jobName } = route.params;
  const { times } = useTimes(jobId);
  const activeEntry = times.find((t) => t.end === null) ?? null; // checks for running timers

  // Helper function

  const elapsedSeconds = activeEntry
    ? Math.floor((Date.now() - activeEntry.start.toMillis()) / 1000)
    : 0;

  const handleStartStop = async () => {
    if (activeEntry) {
      await stopTimer(activeEntry.id);
    } else {
      await startTimer(jobId, userId);
    }
  };

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(
      2,
      "0"
    )}:${String(secs).padStart(2, "0")}`;
  };

  // Get all Days from Times collection
  const days = React.useMemo(() => {
    const map = new Map<string, typeof times>();

    times.forEach((t) => {
      const date = new Date(t.start.toMillis()).toDateString();
      if (!map.has(date)) map.set(date, []);
      map.get(date)!.push(t);
    });

    return Array.from(map.entries()).map(([date, times]) => ({
      date,
      times,
    }));
  }, [times]);

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

      {/* ============================================================================ */}
      {/* Timer */}
      {/* ============================================================================ */}

      <Text style={styles.timer}>{formatTime(elapsedSeconds)}</Text>

      {/* ============================================================================ */}
      {/* Start/Stop Button */}
      {/* ============================================================================ */}
      {/* TODO: Add Hover effect using boxshadow so it looks pressed when isRunning*/}

      <View style={styles.timerContainer}>
        <Button
          mode="outlined"
          onPress={handleStartStop}
          style={styles.button}
          theme={{ colors: { outline: "#000000" } }}
          rippleColor="transparent"
        >
          <Text style={styles.buttonText}>{activeEntry ? "⏸" : "▶"}</Text>
        </Button>
      </View>

      {/* ============================================================================ */}
      {/* List JSX */}
      {/* ============================================================================ */}
      <View style={styles.timeEntryList}>
        {/* Backbutton */}
        {selectedDay === null && (
          <Button
            style={styles.backToJobsButton}
            onPress={() => navigation.goBack()}
            rippleColor="transparent"
          >
            <Text style={styles.backButtonText}>← Back to Jobs</Text>
          </Button>
        )}
        {selectedDay !== null && (
          <Button
            style={styles.backButton}
            onPress={() => {
              setSelectedDay(null);
            }}
            rippleColor="transparent"
          >
            <Text style={styles.backButtonText}>← Back to Days</Text>
          </Button>
        )}

        {/* ============================================================================ */}
        {/* Days FlatList */}
        {selectedDay === null && (
          <FlatList<Days>
            data={days}
            keyExtractor={(item) => item.date}
            renderItem={({ item }) => (
              <ListItem
                text={`${new Date(item.date).toLocaleDateString()} (${
                  item.times.length
                } entries)`}
                onPress={() => setSelectedDay(item.date)}
                onDelete={() => {
                  // TODO: delete from days array and more important recrusively delete from firestore
                  // TODO: add safety check "really delete all times from this day?"
                }}
                rightSwipeActions={{
                  label: "Delete",
                  color: "red",
                  onPress: () => {
                    // TODO: delete from days array and more important recrusively delete from firestore
                    // TODO: add safety check "really delete all times from this day?"
                  },
                }}
              />
            )}
          />
        )}

        {/* ============================================================================ */}
        {/* Times FlatList */}
        {selectedDay !== null && (
          <FlatList<Time>
            data={days.find((d) => d.date === selectedDay)?.times ?? []}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ListItem
                text={`${new Date(
                  item.start.toMillis()
                ).toLocaleTimeString()} - ${
                  item.end
                    ? new Date(item.end.toMillis()).toLocaleTimeString()
                    : "Running"
                }`}
                rightSwipeActions={{
                  label: "Delete",
                  color: "red",
                  onPress: () => deleteTime(item.id),
                }}
              />
            )}
          />
        )}

        <IconButton
          icon="plus"
          size={24}
          mode="outlined"
          // onPress={showAddModal}
          onPress={() => setIsTimeModalVisible(true)}
          style={styles.addButton}
          rippleColor="transparent"
          iconColor={colors.icon}
          animated={false}
        />
        {selectedDay !== null && (
          <Button
            mode="outlined"
            onPress={() => handlePrint(jobName, days)} //different for dayscreen
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

      {/* ============================================================================ */}
      {/* ModalForm JSX */}
      {/* ============================================================================ */}
      <ModalForm
        visible={isTimeModalVisible}
        title="Add time"
        isTimeEntry
        inputValue="" // required by ModalForm
        onInputChange={() => {}} // noop
        startTime={startTime}
        endTime={endTime}
        onStartTimeChange={setStartTime}
        onEndTimeChange={setEndTime}
        onClose={() => setIsTimeModalVisible(false)}
        onConfirm={(_, start, end) => {
          if (!start || !end) return;

          createTime({
            jobId,
            userId,
            start: new Date(start),
            end: new Date(end),
          });

          setIsTimeModalVisible(false);
        }}
      />
    </View>
  );
}
