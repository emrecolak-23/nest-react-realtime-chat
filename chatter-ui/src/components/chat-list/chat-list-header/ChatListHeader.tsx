import { FC } from "react";
import { AppBar, IconButton, Toolbar } from "@mui/material";
import AddCircle from "@mui/icons-material/AddCircle";

interface ChatListHeaderProps {
  handleAddChat: () => void;
}

const ChatListHeader: FC<ChatListHeaderProps> = ({ handleAddChat }) => {
  return (
    <AppBar position="static" color="transparent">
      <Toolbar>
        <IconButton size="large" edge="start" onClick={handleAddChat}>
          <AddCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default ChatListHeader;
