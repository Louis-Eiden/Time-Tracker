import React, { useState } from "react";
import { View, FlatList, Platform } from "react-native";
import ModalForm from "../components/ModalForm";
import ListItem from "../components/ListItem";

// types
import { Job } from "@/types";

import { Text, IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useTheme, getThemeColors } from "@/contexts/ThemeContext";
import { createCommonStyles } from "@/theme/styles";
// import { createButtonStyles } from "@/theme/buttons";

import { useJobs } from "@/hooks/useJobs";
import { useModalForm } from "@/hooks/useModalForm";

import { createJob, deleteJob, updateJob } from "@/services/jobs.services";
import Header from "../components/Header";

export default function HomeScreen() {
  // ---------------------------------------------------------------------------
  // hooks
  // ---------------------------------------------------------------------------
  const navigation = useNavigation();
  const { jobs, jobsLoading } = useJobs();

  // ---------------------------------------------------------------------------
  // Theme & styles
  // ---------------------------------------------------------------------------
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const commonStyles = createCommonStyles(colors, theme, Platform.OS, "Home");

  const modal = useModalForm<Job>({
    onAdd: createJob,
    onEdit: (job, value) => updateJob(job.id, value),
  });

  return (
    <View style={commonStyles.container}>
      <Header />
      {/* ===================================================================== */}
      {/* Placeholder for Timer */}
      {/* ===================================================================== */}
      {Platform.OS === "web" ? <View style={{ height: 105 }} /> : ""}

      {/* ===================================================================== */}
      {/* Placeholder Start / Stop Button */}
      {/* ===================================================================== */}
      {Platform.OS === "web" ? <View style={{ height: 130 }} /> : ""}

      {/* <View style={commonStyles.main}> */}
      <View style={commonStyles.listContainer}>
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
                onPress: () => deleteJob(item.id),
              }}
              leftSwipeActions={{
                label: "Edit",
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
          style={commonStyles.addButton}
          rippleColor="transparent"
          iconColor={colors.icon}
          animated={false}
        />
      </View>
      {/* </View> */}

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
