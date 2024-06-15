import { FC, useState } from "react";
import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";

import { useCreateChat } from "../../../hooks/useCreateChat";
import { UNKNOWN_ERROR_MESSAGE } from "../../../constants/error";
import router from "../../Routes";

interface ChatListAddProps {
  open: boolean;
  handleClose: () => void;
}

const ChatListAdd: FC<ChatListAddProps> = ({ open, handleClose }) => {
  // const [isPrivate, setIsPrivate] = useState(true);
  const [error, setError] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [createChat] = useCreateChat();

  const onClose = () => {
    setError("");
    setName("");
    // setIsPrivate(false);
    handleClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Stack spacing={2}>
          <Typography variant="h6" component="h2">
            Add Chat
          </Typography>
          {/* <FormGroup>
            <FormControlLabel
              style={{ width: 0 }}
              control={<Switch defaultChecked={isPrivate} value={isPrivate} />}
              label="Private"
              value={isPrivate}
              onChange={(_: SyntheticEvent<Element, Event>, checked: boolean) =>
                setIsPrivate(checked)
              }
            />
          </FormGroup> */}

          <TextField
            label="Name"
            error={!!error}
            helperText={error}
            onChange={(event) => setName(event.target.value)}
          />

          <Button
            variant="outlined"
            onClick={async () => {
              if (!name.length) {
                setError("Chat name is required");
                return;
              }
              try {
                const chat = await createChat({
                  variables: {
                    createChatInput: { name: name },
                  },
                });
                onClose();
                router.navigate(`/chats/${chat?.data?.createChat._id}`);
              } catch (error) {
                setError(UNKNOWN_ERROR_MESSAGE);
              }
            }}
          >
            Save
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};
export default ChatListAdd;
