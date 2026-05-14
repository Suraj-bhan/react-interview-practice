import Image from "next/image";
import { chatData } from "./data";
import "./style.css";

const ChatBotPage = () => {
  return (
    <div className="chat-page">
      <div className="chat-container">
        <div className="contact-container">
          <input type="text" className="search" />
          <div className="contact-scroll">
            {chatData.map((chat) => (
              <div className="contact-info" key={chat.id}>
                <Image
                  src={chat.imageURL}
                  width={40}
                  height={40}
                  alt="profile"
                />
                <div className="contact-details">
                  <span>{chat.title}</span>
                  <span>
                    {chat.messageList.length > 0
                      ? chat.messageList[chat.messageList.length - 1].message
                      : ""}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="message-container">Message</div>
      </div>
    </div>
  );
};

export default ChatBotPage;
