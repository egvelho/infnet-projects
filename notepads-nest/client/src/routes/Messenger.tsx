import { useState, useEffect, useRef } from "react";
import toast from "react-simple-toasts";
import { getUsers } from "../api/getUsers";
import { loadMessageHistory } from "../api/loadMessageHistory";
import { sendMessage } from "../api/sendMessage";
import { listenMessengerNotifications } from "../api/listenMessengerNotifications";
import type { User, Message } from "../types";
import { UserItem } from "../components/UserItem";

const initialUsers: User[] = [];
const initialCurrentUserChat: User | null = null;
const initialMessages: Message[] = [];

const texts = {
  messagePlaceholder: "Digite uma mensagem e pressione [enter] para enviar",
};

export function Messenger() {
  const [users, setUsers] = useState(initialUsers);
  const [messages, setMessages] = useState(initialMessages);
  const [messageToSend, setMessageToSend] = useState("");
  const [currentUserChat, setCurrentUserChat] = useState(
    initialCurrentUserChat
  );
  const currentUserChatRef = useRef(initialCurrentUserChat);
  const messagesRef = useRef(initialMessages);
  const messagesScrollRef = useRef<HTMLDivElement | null>();

  async function onLoadUsers() {
    const nextUsers = await getUsers();
    setUsers(nextUsers);
  }

  async function onLoadMessages() {
    if (currentUserChat === null) {
      return;
    }

    const nextMessages = await loadMessageHistory(currentUserChat.id);
    setMessages(nextMessages);
  }

  async function onSendMessage() {
    if (currentUserChat === null) {
      return;
    }

    setMessageToSend("");
    const nextMessage: Message = {
      id: Date.now(),
      content: messageToSend,
      created_at: new Date().toJSON(),
      sender: 0,
      receiver: currentUserChat.id,
    };
    setMessages([...messages, nextMessage]);
    await sendMessage(messageToSend, currentUserChat.id);
  }

  useEffect(() => {
    onLoadMessages();
    currentUserChatRef.current = currentUserChat;
  }, [currentUserChat]);

  useEffect(() => {
    messagesRef.current = messages;
    if (messagesScrollRef.current !== null) {
      messagesScrollRef.current?.scrollTo(
        0,
        messagesScrollRef.current.scrollHeight
      );
    }
  }, [messages]);

  useEffect(() => {
    onLoadUsers();
    listenMessengerNotifications((message) => {
      console.log("messenger", message, currentUserChatRef.current);
      if (message.sender === currentUserChatRef.current?.id) {
        setMessages([...messagesRef.current, message]);
      } else {
        toast(message.content.slice(0, 24).concat("..."));
      }
    });
  }, []);

  return (
    <div
      className="bg-white my-4 rounded-lg shadow max-w-screen-md mx-auto flex"
      style={{
        maxHeight: "calc(100vh - 60px - 2rem)",
      }}
    >
      <div className="flex flex-col min-w-[256px] border-r overflow-auto">
        {users.map((user) => (
          <div
            key={user.id}
            className={`p-3 border-b cursor-pointer ${
              currentUserChat?.id === user.id ? "bg-orange-300" : ""
            }`}
            onClick={() => setCurrentUserChat(user)}
          >
            <UserItem user={user} />
          </div>
        ))}
      </div>
      <div className="flex-1 flex flex-col bg-stone-300 rounded-r-lg">
        <div
          className="flex-1 flex flex-col gap-3 p-3 overflow-auto"
          ref={(ref) => (messagesScrollRef.current = ref)}
        >
          {messages.map((message) => (
            <MessageItem
              key={message.id}
              isReceiver={message.sender === currentUserChat?.id}
              content={message.content}
            />
          ))}
        </div>
        <div className="border-t">
          <input
            disabled={currentUserChat === null}
            type="text"
            placeholder={texts.messagePlaceholder}
            className="w-full p-4 rounded-br-lg outline-none"
            value={messageToSend}
            onChange={(event) => setMessageToSend(event.target.value)}
            onKeyDown={(event) => event.key === "Enter" && onSendMessage()}
          />
        </div>
      </div>
    </div>
  );
}

type MessageItemProps = {
  isReceiver: boolean;
  content: string;
};

function MessageItem({ isReceiver, content }: MessageItemProps) {
  return (
    <div
      className={`${
        isReceiver ? "mr-16 bg-slate-600" : "ml-16 bg-green-600"
      } text-slate-100 text-sm leading-tight py-2 px-3 rounded-xl`}
    >
      {content}
    </div>
  );
}
