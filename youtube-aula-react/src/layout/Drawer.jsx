import { useDrawerState } from "./useDrawerState";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import SlowMotionVideoIcon from "@mui/icons-material/SlowMotionVideo";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import { Drawer as MuiDrawer } from "@mui/material";

export function Drawer() {
  const drawerOpen = useDrawerState((state) => state.open);

  return (
    <MuiDrawer
      sx={{
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          "@media(prefers-color-scheme: dark)": {
            backgroundColor: "var(--bg-dark-theme)",
          },
        },
        "& .MuiPaper-root": {
          top: 60,
          "@media(prefers-color-scheme: dark)": {
            borderRight: "1px solid rgba(255, 255, 255, 0.12)",
          },
        },
      }}
      variant="persistent"
      anchor="left"
      open={drawerOpen}
    >
      <List
        sx={{
          "@media(prefers-color-scheme: dark)": {
            color: "var(--text-color-dark-theme)",
          },
        }}
      >
        {[
          { text: "Início", icon: <HomeIcon /> },
          { text: "Shorts", icon: <SlowMotionVideoIcon /> },
          { text: "Inscrições", icon: <SubscriptionsIcon /> },
        ].map(({ text, icon }) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon
                sx={{
                  "@media(prefers-color-scheme: dark)": {
                    color: "var(--text-color-dark-theme)",
                  },
                }}
              >
                {icon}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </MuiDrawer>
  );
}
