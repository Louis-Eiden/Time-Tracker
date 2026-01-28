import React, { useState, useEffect, useMemo } from "react";
import { View, FlatList, Platform, Text, TouchableOpacity } from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { Play, Pause, Printer, Clock } from "lucide-react-native";

import { useTheme, getThemeColors } from "@/contexts/ThemeContext";
import { useTimeFormat } from "@/contexts/TimeContext";
import { createCommonStyles, createJobStyles } from "../theme/styles";
import { handlePrint } from "@/utils/print";
import { formatDateForDisplay, formatTimeForDisplay } from "@/utils/time";
import { useTimes } from "../hooks/useTimes";
import {
  startTimer,
  stopTimer,
  createTime,
  deleteTime,
} from "@/services/times.services";
import { Time, Days } from "@/types";

import Header from "../components/Header";
import ModalForm from "../components/ModalForm";
import ListItem from "../components/ListItem";
import RetroButton from "../components/RetroButton";

export default function JobScreen() {
  const navigation = useNavigation();
  const routeProp =
    useRoute<
      RouteProp<{ params: { jobId: string; jobName: string } }, "params">
    >();
  const route = useRoute();

  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const styles = createJobStyles(colors);
  const commonStyles = createCommonStyles(colors);

  const [isTimeModalVisible, setIsTimeModalVisible] = useState(false);
  const [startTime, setStartTime] = useState<Date | undefined>();
  const [endTime, setEndTime] = useState<Date | undefined>();

  const { timeFormat } = useTimeFormat();
  const { jobId, jobName } = routeProp.params;
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const { times } = useTimes(jobId);
  const activeEntry = times.find((t) => t.end === null) ?? null;

  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    if (!activeEntry?.start) return;
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, [activeEntry]);

  const elapsedSeconds = activeEntry?.start
    ? Math.floor((now - activeEntry.start.toMillis()) / 1000)
    : 0;

  const formatTimer = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleStartStop = async () => {
    if (activeEntry) await stopTimer(activeEntry.id);
    else await startTimer(jobId);
  };

  const days = useMemo(() => {
    const map = new Map<string, typeof times>();
    times.forEach((t) => {
      if (!t.start) return;
      const date = new Date(t.start.toMillis()).toDateString();
      if (!map.has(date)) map.set(date, []);
      map.get(date)!.push(t);
    });
    return Array.from(map.entries()).map(([date, times]) => ({ date, times }));
  }, [times]);

  const handleDeleteDay = async (dateStr: string) => {
    const dayData = days.find((d) => d.date === dateStr);
    if (!dayData) return;

    const deletePromises = dayData.times.map((t) => deleteTime(t.id));
    await Promise.all(deletePromises);
  };

  return (
    <View style={commonStyles.container}>
      <Header jobName={jobName} />

      <View style={commonStyles.main}>
        {/* --- RETRO TIMER CARD (Layered) --- */}
        <View style={commonStyles.retroCardWrapper}>
          {/* 1. Hard Shadow */}
          <View style={commonStyles.retroCardShadow} />

          {/* 2. Main Card Content */}
          <View style={[commonStyles.retroCardMain, styles.timerCard]}>
            <Text style={styles.timerLabel}>SESSION DURATION</Text>
            <Text style={styles.timerDisplay}>
              {formatTimer(elapsedSeconds)}
            </Text>

            <RetroButton
              style={[
                styles.controlButton,
                activeEntry ? styles.stopBtn : styles.startBtn,
              ]}
              onPress={handleStartStop}
              shadowColor={colors.border}
            >
              {activeEntry ? (
                <Pause size={20} color={colors.text} />
              ) : (
                <Play size={20} color={colors.text} />
              )}
              <Text style={styles.btnText}>
                {activeEntry ? "PAUSE" : "START"}
              </Text>
            </RetroButton>
          </View>
        </View>
        {/* ---------------------------------- */}

        {/* Action Grid */}
        <View style={styles.actionGrid}>
          <RetroButton
            style={styles.actionButton}
            onPress={() => setIsTimeModalVisible(true)}
            shadowColor={colors.border}
          >
            <Clock size={16} color={colors.text} />
            <Text style={styles.btnText}>MANUAL</Text>
          </RetroButton>

          <RetroButton
            style={styles.actionButton}
            onPress={() => handlePrint(jobName, times, timeFormat)}
            shadowColor={colors.border}
          >
            <Printer size={16} color={colors.text} />
            <Text style={styles.btnText}>PRINT</Text>
          </RetroButton>
        </View>

        {/* List Section */}
        <View style={{ flex: 1 }}>
          <Text style={styles.sectionTitle}>
            {selectedDay
              ? `LOGS: ${formatDateForDisplay(new Date(selectedDay), timeFormat)}`
              : "RECENT LOGS"}
          </Text>

          {selectedDay !== null ? (
            <TouchableOpacity
              onPress={() => setSelectedDay(null)}
              style={{ marginBottom: 10 }}
            >
              <Text style={{ color: "#6B7280", fontWeight: "bold" }}>
                ← BACK TO DAYS
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ marginBottom: 10 }}
            >
              <Text style={{ color: "#6B7280", fontWeight: "bold" }}>
                ← BACK TO JOBS
              </Text>
            </TouchableOpacity>
          )}

          <FlatList<Time | Days>
            data={
              selectedDay
                ? (days.find((d) => d.date === selectedDay)?.times ?? [])
                : days
            }
            keyExtractor={(item) =>
              selectedDay ? (item as Time).id : (item as Days).date
            }
            renderItem={({ item }) => {
              if (selectedDay) {
                // Render Time Entry
                const t = item as Time;
                return (
                  <ListItem
                    text={`${formatTimeForDisplay(t.start.toDate(), timeFormat)} - ${t.end ? formatTimeForDisplay(t.end.toDate(), timeFormat) : "Running"}`}
                    rightSwipeActions={{
                      label: "DELETE",
                      onPress: () => deleteTime(t.id),
                    }}
                  />
                );
              } else {
                // Render Day
                const d = item as Days;
                return (
                  <ListItem
                    text={formatDateForDisplay(new Date(d.date), timeFormat)}
                    subText={`${d.times.length} entries`}
                    onPress={() => setSelectedDay(d.date)}
                    rightSwipeActions={{
                      label: "DELETE",
                      onPress: () => handleDeleteDay(d.date),
                    }}
                  />
                );
              }
            }}
          />
        </View>
      </View>

      <ModalForm
        visible={isTimeModalVisible}
        title="Manual Entry"
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
          createTime({ jobId, start, end });
          setStartTime(undefined);
          setEndTime(undefined);
          setIsTimeModalVisible(false);
        }}
      />
    </View>
  );
}
