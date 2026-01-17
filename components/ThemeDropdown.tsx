import * as React from "react";
import { Button, Menu, Text } from "react-native-paper";
import { useTheme, Theme, getThemeColors } from "@/contexts/ThemeContext";
import { createSettingsStyles } from "@/theme/styles";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const colors = getThemeColors(theme);
  const styles = createSettingsStyles(colors);
  const [visible, setVisible] = React.useState(false);

  return (
    <Menu
      visible={visible}
      onDismiss={() => setVisible(false)}
      contentStyle={{
        width: 300,
        justifyContent: "center",
      }}
      anchor={
        <Button style={styles.button} onPress={() => setVisible(true)}>
          <Text style={styles.themeButtonText}>Theme: {theme}</Text>
        </Button>
      }
    >
      <Menu.Item onPress={() => setTheme("retro-light")} title="Retro Light" />
      <Menu.Item onPress={() => setTheme("retro-dark")} title="Retro Dark" />
      <Menu.Item onPress={() => setTheme("retro-color")} title="Retro Color" />

      <Menu.Item onPress={() => setTheme("clear-light")} title="Clear" />
      {/* <Menu.Item onPress={() => setTheme("clear-dark")} title="Clear Dark" />
      <Menu.Item onPress={() => setTheme("clear-color")} title="Clear Color" /> */}

      <Menu.Item onPress={() => setTheme("round-light")} title="Round" />
      {/* <Menu.Item onPress={() => setTheme("round-dark")} title="Round Dark" />
      <Menu.Item onPress={() => setTheme("round-color")} title="Round Color" /> */}
    </Menu>
  );
}
