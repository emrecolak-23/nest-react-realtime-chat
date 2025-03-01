import { useEffect, useState } from "react";
import List from "@mui/material/List";
import { Divider, Stack } from "@mui/material";
import ChatListItem from "./chat-list-item/ChatListItem";
import ChatListHeader from "./chat-list-header/ChatListHeader";
import ChatListAdd from "./chat-list-add/ChatListAdd";
import { useGetChats } from "../../hooks/useGetChats";
import { usePath } from "../../hooks/usePath";
import { useMessageCreated } from "../../hooks/useMessageCreated";
import { Chat } from "../../gql/graphql";

const ChatList = () => {
  const [chatListAddVisible, setChatListAddVisible] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState("");
  const { data } = useGetChats();
  const { path } = usePath();

  useMessageCreated({ chatIds: data?.chats.map((chat) => chat._id) || [] });

  useEffect(() => {
    const pathSplit = path.split("chats/");
    if (pathSplit.length === 2) {
      setSelectedChatId(pathSplit[1]);
    }
  }, [path]);

  return (
    <>
      <ChatListAdd
        open={chatListAddVisible}
        handleClose={() => setChatListAddVisible(false)}
      />
      <Stack>
        <ChatListHeader handleAddChat={() => setChatListAddVisible(true)} />
        <Divider />
        <List
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            maxHeight: "80vh",
            overflow: "auto",
          }}
        >
          {data?.chats &&
            [...data.chats]
              .sort((chatA, chatB) => {
                if (!chatA.latestMessage) {
                  return -1;
                }

                return (
                  new Date(chatA.latestMessage?.createdAt).getTime() -
                  new Date(chatB.latestMessage?.createdAt).getTime()
                );
              })
              .map((chat: Chat) => {
                return (
                  <ChatListItem
                    key={chat._id}
                    selected={chat._id === selectedChatId}
                    chat={chat}
                  />
                );
              })
              .reverse()}
        </List>
      </Stack>
    </>
  );
};

export default ChatList;
