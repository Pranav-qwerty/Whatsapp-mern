import React, { useState } from "react";
import "./Chat.css";
import { Avatar, Icon, IconButton } from "@material-ui/core";
import {
  AttachFile,
  InsertEmoticon,
  Mic,
  MoreVert,
  SearchOutlined,
} from "@material-ui/icons";
import axios from "./axios";

function Chat({ messages }) {
  const [input, setInput] = useState("");
  const sendMessage = async (e) => {
    e.preventDefault();
    await axios.post("/messages/new", {
      message: input,
      name: "DEMO APP",
      timestamp: "Juse now",
      received: true,
    });
    setInput("");
  };
  return (
    <div className="chat">
      <div class="chat_header">
        <Avatar />
        <div class="chat_headerInfo">
          <h3>Room Name</h3>
          <p>Last seen at...</p>
        </div>
        <div class="chat_headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat_body">
        {messages.map((message) => (
          <p className={`chat_message ${message.received && "chat_reciever"}`}>
            <span className="chat_name">{message.name}</span>
            {message.message}
            <span className="chat_timestamp">{message.timestamp}</span>
          </p>
        ))}
        <div class="chat_footer">
          <IconButton>
            <InsertEmoticon />
          </IconButton>
          <form>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message"
            />
            <button onClick={sendMessage} type="submit">
              Send a message
            </button>
          </form>
          <IconButton>
            <Mic />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default Chat;
