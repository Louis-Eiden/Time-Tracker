import React, { useState } from "react";
import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import { Text, Button, IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useTheme, getThemeColors } from "../contexts/ThemeContext";

export default function HomeScreen() {
  const [jobs, setJobs] = useState<string[]>(["Job 1", "Job 2"]);
  const navigation = useNavigation();
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  const addJob = () => {
    const newJob = `Job ${jobs.length + 1}`;
    setJobs([...jobs, newJob]);
  };

  const styles = makeStyles(colors);
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Time Tracker</Text>
        <IconButton
          icon="cog"
          size={24}
          onPress={() => navigation.navigate("Settings")}
          style={styles.settingsIcon}
        />
      </View>
      <View style={[styles.jobList, { borderColor: colors.border }]}>
        <FlatList
          data={jobs}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.jobItem, { borderColor: colors.border }]}
              onPress={() => navigation.navigate("Job", { jobName: item })}
            >
              <Text style={{ color: colors.text }}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
        />
        <Button
          mode="outlined"
          onPress={addJob}
          style={[styles.addButton, { borderColor: colors.border }]}
        >
          Add Job
        </Button>
      </View>
    </View>
  );
}

const makeStyles = (colors: ReturnType<typeof getThemeColors>) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: colors.background,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    position: "relative",
  },
  title: {
    fontSize: 28,
    fontWeight: "400",
  },
  settingsIcon: {
    position: "absolute",
    right: 0,
    color: colors.icon,
  },
  jobList: {
    minHeight: 500,
    width: 300,
    borderWidth: 2,
    borderRadius: 0,
    padding: 10,
  },
  jobItem: {
    padding: 12,
    borderWidth: 2,
    marginBottom: 10,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    left: 10,
    right: 10,
    borderWidth: 2,
    borderRadius: 0,
  },
});
