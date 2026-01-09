import React, { useState, useEffect } from "react";
import ListItem from "./ListItem";
import { View, FlatList } from "react-native";
import { useTheme, getThemeColors } from "../contexts/ThemeContext";
import { useTimeFormat } from "@/contexts/TimeContext";
import { formatDateForDisplay, formatTimeForDisplay } from "@/utils/time";
import { Text, Button, IconButton } from "react-native-paper";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { createJobStyles } from "../theme/styles";
import { createButtonStyles } from "@/theme/buttons";
import { handlePrint } from "@/utils/print";
import { useTimes } from "../hooks/useTimes";
import { startTimer, stopTimer } from "../services/times.services";
import ModalForm from "./ModalForm";
// import { useModalForm } from "@/hooks/useModalForm";
import { createTime, deleteTime } from "@/services/times.services";
import { Time, Days } from "@/types";
import { parseTimeFromInput } from "@/utils/time";
import Header from "./Header";

export default function JobScreen() {
  const { theme } = useTheme();
  const { timeFormat } = useTimeFormat();
  const colors = getThemeColors(theme);
  const styles = createJobStyles(colors);
  const buttonStyles = createButtonStyles(colors);

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
  const [now, setNow] = useState(Date.now()); // ticking state

  // ticking effect
  useEffect(() => {
    if (!activeEntry?.start) return;

    const startMs = activeEntry.start.toMillis();

    // Don't tick until the server timestamp is usable
    if (startMs > Date.now()) return;

    setNow(Date.now());

    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, [activeEntry?.id, activeEntry?.start]);

  // Helper function

  const elapsedSeconds = activeEntry?.start
    ? Math.floor((now - activeEntry.start.toMillis()) / 1000)
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

  const getBaseDateForEntry = () => {
    if (selectedDay) {
      return new Date(selectedDay);
    }
    return new Date();
  };

  // Get all Days from Times collection
  const days = React.useMemo(() => {
    const map = new Map<string, typeof times>();

    times.forEach((t) => {
      if (!t.start) return; // guard

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
      <Header jobName={jobName} />

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
            style={buttonStyles.backToJobsButton}
            onPress={() => navigation.goBack()}
            rippleColor="transparent"
          >
            <Text style={buttonStyles.backButtonText}>← Back to Jobs</Text>
          </Button>
        )}
        {selectedDay !== null && (
          <Button
            style={buttonStyles.backButton}
            onPress={() => {
              setSelectedDay(null);
            }}
            rippleColor="transparent"
          >
            <Text style={buttonStyles.backButtonText}>← Back to Days</Text>
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
                text={`${formatDateForDisplay(
                  new Date(item.date),
                  timeFormat
                )}`}
                onPress={() => setSelectedDay(item.date)}
                onDelete={() => {
                  // TODO: delete from days array and more important recrusively delete from firestore
                  // TODO: add safety check "really delete all times from this day?"
                }}
                rightSwipeActions={{
                  label: "Delete",
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
        {/* ============================================================================ */}
        {selectedDay !== null && (
          <FlatList<Time>
            data={days.find((d) => d.date === selectedDay)?.times ?? []}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ListItem
                text={`${formatTimeForDisplay(
                  item.start.toDate(), // Convert Timestamp to Date
                  timeFormat
                )} - ${
                  item.end
                    ? formatTimeForDisplay(item.end.toDate(), timeFormat) // Convert Timestamp to Date
                    : "Running"
                }`}
                rightSwipeActions={{
                  label: "Delete",
                  onPress: () => deleteTime(item.id),
                }}
              />
            )}
          />
        )}
        <View style={{ flexDirection: "row", height: 46 }}>
          {/* ============================================================================ */}
          {/* Print Button */}
          {/* Only visible in Times Table */}
          {/* ============================================================================ */}
          {/* {selectedDay !== null && ( */}
          <Button
            mode="outlined"
            onPress={() => handlePrint(jobName, times, timeFormat)} //different for dayscreen
            style={buttonStyles.printButton}
            theme={{ colors: { outline: "#000000" } }}
            rippleColor="transparent"
          >
            <Text style={buttonStyles.printButtonText}>Print</Text>
          </Button>
          {/* )} */}
          {/* ============================================================================ */}
          {/* Add Button */}
          {/* ============================================================================ */}
          <IconButton
            icon="plus"
            size={24}
            mode="outlined"
            // onPress={showAddModal}
            onPress={() => setIsTimeModalVisible(true)}
            style={buttonStyles.addButton}
            rippleColor="transparent"
            iconColor={colors.icon}
            animated={false}
          />
        </View>
      </View>

      {/* ============================================================================ */}
      {/* ModalForm JSX */}
      {/* ============================================================================ */}
      <ModalForm
        visible={isTimeModalVisible}
        title="Add time"
        isTimeEntry={true}
        inputValue="" // required by ModalForm is used
        onInputChange={() => {}}
        startTime={startTime}
        endTime={endTime}
        onStartTimeChange={setStartTime}
        onEndTimeChange={setEndTime}
        onClose={() => setIsTimeModalVisible(false)}
        onConfirm={(_, start, end) => {
          if (!start || !end) return;

          const baseDate = getBaseDateForEntry();

          const parsedStart = parseTimeFromInput(start, baseDate, timeFormat);

          const parsedEnd = parseTimeFromInput(end, baseDate, timeFormat);

          if (!parsedStart || !parsedEnd) {
            console.warn("Invalid time format");
            return;
          }

          // Handle overnight shifts (e.g. 22:00 → 06:00)
          if (parsedEnd <= parsedStart) {
            parsedEnd.setDate(parsedEnd.getDate() + 1);
          }

          createTime({
            jobId,
            userId,
            start: parsedStart,
            end: parsedEnd,
          });

          // Clear inputs after Save
          setStartTime("");
          setEndTime("");

          setIsTimeModalVisible(false);
        }}
      />
    </View>
  );
}
