import React, { useState } from "react";
import { View, FlatList } from "react-native";
import ModalForm from "./ModalForm";
import ListItem from "./ListItem";

// types
import { Job } from "@/types";

import { Text, IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useTheme, getThemeColors } from "@/contexts/ThemeContext";
import { createHomeStyles, createCommonStyles } from "@/theme/styles";

import { useJobs } from "@/hooks/useJobs";
import { useModalForm } from "@/hooks/useModalForm";

import { createJob, deleteJob, updateJob } from "@/services/jobs.services";

export default function HomeScreen() {
  // hooks
  const navigation = useNavigation();
  const modal = useModalForm<Job>({
    onAdd: createJob,
    onEdit: (job, value) => updateJob(job.id, value),
  });
  const { jobs, loading } = useJobs();

  // context
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const styles = createHomeStyles(colors);

  return (
    //TODO: Make one headbar so its easier to style and change theme / mode
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Time Tracker</Text>
        <IconButton
          icon="cog"
          size={24}
          onPress={() => navigation.navigate("Settings")}
          iconColor={colors.icon}
          style={styles.settingsIcon}
          rippleColor="transparent"
          containerColor="transparent" // Background color of button
          theme={{
            colors: {
              secondaryContainer: "transparent", // Controls hover state background
            },
          }}
          animated={false}
        />
      </View>
      <View style={styles.main}>
        <View style={[styles.jobList, { borderColor: colors.border }]}>
          <FlatList
            data={jobs}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ListItem
                text={item.name}
                onPress={() =>
                  navigation.navigate("Job", {
                    jobId: item.id,
                    jobName: item.name,
                  })
                }
                rightSwipeActions={{
                  label: "Delete",
                  color: "red",
                  onPress: () => deleteJob(item.id),
                }}
                leftSwipeActions={{
                  label: "Edit",
                  color: "blue",
                  onPress: () => modal.openEdit(item, item.name),
                }}
              />
            )}
          />
          <IconButton
            icon="plus"
            size={24}
            mode="outlined"
            onPress={modal.openAdd}
            style={styles.addButton}
            rippleColor="transparent"
            iconColor={colors.icon}
            animated={false}
          />
        </View>
      </View>

      <ModalForm
        visible={modal.visible}
        onClose={modal.close}
        onConfirm={modal.confirm}
        title={modal.isEditing ? "Edit Job" : "New Job"}
        inputValue={modal.value}
        onInputChange={modal.setValue}
      />
    </View>
  );
}
