import React, { useState, useEffect, useMemo } from "react";
import { View, FlatList, Platform } from "react-native";
import { Text, Button, IconButton } from "react-native-paper";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
// Contexts
import { useTheme, getThemeColors } from "@/contexts/ThemeContext";
import { useTimeFormat } from "@/contexts/TimeContext";
// Styles
import { createCommonStyles, createJobStyles } from "../theme/styles";
// Utils / Hooks
import { handlePrint } from "@/utils/print";
import { formatDateForDisplay, formatTimeForDisplay } from "@/utils/time";
import { useTimes } from "../hooks/useTimes";
// Services
import { startTimer, stopTimer } from "../services/times.services";
import { createTime, deleteTime } from "@/services/times.services";
// Components
import Header from "../components/Header";
import ModalForm from "../components/ModalForm";
import ListItem from "../components/ListItem";

import { Time, Days } from "@/types";

export default function JobScreen() {
  // ---------------------------------------------------------------------------
  // Navigation and Route
  // ---------------------------------------------------------------------------
  const navigation = useNavigation();
  const routeProp =
    useRoute<
      RouteProp<{ params: { jobId: string; jobName: string } }, "params">
    >();
  const route = useRoute();
  // ---------------------------------------------------------------------------
  // Theme & styles
  // ---------------------------------------------------------------------------
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const styles = createJobStyles(colors);
  const commonStyles = createCommonStyles(
    colors,
    theme,
    Platform.OS,
    route.name,
  );

  // ---------------------------------------------------------------------------
  // local State
  // ---------------------------------------------------------------------------
  const [isTimeModalVisible, setIsTimeModalVisible] = useState(false);
  const [startTime, setStartTime] = useState<Date | undefined>();
  const [endTime, setEndTime] = useState<Date | undefined>();

  // ---------------------------------------------------------------------------
  // local variables
  // ---------------------------------------------------------------------------
  const { timeFormat } = useTimeFormat();
  const { jobId, jobName } = routeProp.params;
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const { times } = useTimes(jobId);
  const activeEntry = times.find((t) => t.end === null) ?? null;

  // ---------------------------------------------------------------------------
  // Timer ticking
  // ---------------------------------------------------------------------------
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    if (!activeEntry?.start) return;

    const startMs = activeEntry.start.toMillis();
    if (startMs > Date.now()) return;

    setNow(Date.now());

    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, [activeEntry?.id, activeEntry?.start]);

  const elapsedSeconds = activeEntry?.start
    ? Math.floor((now - activeEntry.start.toMillis()) / 1000)
    : 0;

  const formatTimer = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(
      2,
      "0",
    )}:${String(secs).padStart(2, "0")}`;
  };

  // ---------------------------------------------------------------------------
  // Start / Stop timer
  // ---------------------------------------------------------------------------
  const handleStartStop = async () => {
    if (activeEntry) {
      await stopTimer(activeEntry.id);
    } else {
      await startTimer(jobId);
    }
  };

  // ---------------------------------------------------------------------------
  // Group times by day
  // ---------------------------------------------------------------------------
  const days = useMemo(() => {
    const map = new Map<string, typeof times>();

    times.forEach((t) => {
      if (!t.start) return;

      const date = new Date(t.start.toMillis()).toDateString();

      if (!map.has(date)) map.set(date, []);
      map.get(date)!.push(t);
    });

    return Array.from(map.entries()).map(([date, times]) => ({
      date,
      times,
    }));
  }, [times]);

  // ---------------------------------------------------------------------------
  // JSX
  // ---------------------------------------------------------------------------
  return (
    <View style={commonStyles.container}>
      <Header jobName={jobName} />

      {/* ===================================================================== */}
      {/* Timer */}
      {/* ===================================================================== */}
      <Text style={styles.timer}>{formatTimer(elapsedSeconds)}</Text>

      {/* ===================================================================== */}
      {/* Start / Stop Button */}
      {/* ===================================================================== */}
      <View style={styles.timerContainer}>
        <IconButton
          icon={activeEntry ? "pause" : "play"}
          iconColor={colors.icon}
          style={styles.timerButton}
          size={20}
          onPress={handleStartStop}
        />
      </View>

      {/* ===================================================================== */}
      {/* List Container */}
      {/* ===================================================================== */}
      <View style={commonStyles.listContainer}>
        {/* Back Buttons */}
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
            onPress={() => setSelectedDay(null)}
            rippleColor="transparent"
          >
            <Text style={styles.backButtonText}>← Back to Days</Text>
          </Button>
        )}

        {/* ===================================================================== */}
        {/* Days List */}
        {/* ===================================================================== */}
        {selectedDay === null && (
          <FlatList<Days>
            data={days}
            keyExtractor={(item) => item.date}
            renderItem={({ item }) => (
              <ListItem
                text={formatDateForDisplay(new Date(item.date), timeFormat)}
                onPress={() => setSelectedDay(item.date)}
                rightSwipeActions={{
                  label: "Delete",
                  onPress: () => {},
                }}
              />
            )}
          />
        )}

        {/* ===================================================================== */}
        {/* Times List */}
        {/* ===================================================================== */}
        {selectedDay !== null && (
          <FlatList<Time>
            data={days.find((d) => d.date === selectedDay)?.times ?? []}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ListItem
                text={`${formatTimeForDisplay(
                  item.start.toDate(),
                  timeFormat,
                )} - ${
                  item.end
                    ? formatTimeForDisplay(item.end.toDate(), timeFormat)
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

        {/* ===================================================================== */}
        {/* Footer Buttons */}
        {/* ===================================================================== */}
        <View style={{ flexDirection: "row", height: 46 }}>
          <Button
            mode="outlined"
            onPress={() => handlePrint(jobName, times, timeFormat)}
            style={styles.printButton}
            rippleColor="transparent"
          >
            <Text style={styles.printButtonText}>Print</Text>
          </Button>

          <IconButton
            icon="plus"
            size={24}
            mode="outlined"
            onPress={() => setIsTimeModalVisible(true)}
            style={commonStyles.addButton}
            rippleColor="transparent"
            iconColor={colors.icon}
            animated={false}
          />
        </View>
      </View>

      {/* ===================================================================== */}
      {/* Modal */}
      {/* ===================================================================== */}
      <ModalForm
        visible={isTimeModalVisible}
        title="Add time"
        isTimeEntry
        inputValue=""
        onInputChange={() => {}}
        startTime={startTime}
        endTime={endTime}
        onStartTimeChange={setStartTime}
        onEndTimeChange={setEndTime}
        onClose={() => setIsTimeModalVisible(false)}
        onConfirm={(_, start, end) => {
          if (!start || !end) return;

          createTime({
            jobId,
            start,
            end,
          });

          setStartTime(undefined);
          setEndTime(undefined);
          setIsTimeModalVisible(false);
        }}
      />
    </View>
  );
}
