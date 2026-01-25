import React from "react";
import { View, FlatList, Platform, TouchableOpacity } from "react-native";
import { Plus } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";

import { Job } from "@/types";
import { useTheme, getThemeColors } from "@/contexts/ThemeContext";
import { createCommonStyles } from "@/theme/styles";
import { useJobs } from "@/hooks/useJobs";
import { useModalForm } from "@/hooks/useModalForm";
import { createJob, deleteJob, updateJob } from "@/services/jobs.services";

import Header from "../components/Header";
import ModalForm from "../components/ModalForm";
import ListItem from "../components/ListItem";

export default function HomeScreen() {
  const navigation = useNavigation();
  const { jobs } = useJobs();
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const styles = createCommonStyles(colors, theme, Platform.OS, "Home");

  const modal = useModalForm<Job>({
    onAdd: createJob,
    onEdit: (job, value) => updateJob(job.id, value),
  });

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.main}>
        <View style={styles.listContainer}>
          <FlatList
            data={jobs}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 100 }}
            renderItem={({ item }) => (
              <ListItem
                text={item.name}
                subText="Last active: Recently"
                id={item.id}
                onPress={() =>
                  navigation.navigate("Job", {
                    jobId: item.id,
                    jobName: item.name,
                  })
                }
                rightSwipeActions={{
                  label: "DELETE",
                  onPress: () => deleteJob(item.id),
                }}
                leftSwipeActions={{
                  label: "EDIT",
                  onPress: () => modal.openEdit(item, item.name),
                }}
              />
            )}
          />
        </View>

        <TouchableOpacity
          style={styles.fab}
          onPress={modal.openAdd}
          activeOpacity={0.8}
        >
          <Plus size={32} color="#000000" strokeWidth={3} />
        </TouchableOpacity>
      </View>

      <ModalForm
        visible={modal.visible}
        onClose={modal.close}
        onConfirm={modal.confirm}
        title={modal.isEditing ? "Edit Ticket" : "New Job Ticket"}
        inputValue={modal.value}
        onInputChange={modal.setValue}
        placeholder="e.g. Website Redesign"
      />
    </View>
  );
}
