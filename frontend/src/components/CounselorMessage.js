import { useEffect, useState, useRef } from "react";
import API from "../services/api";
import { FaPaperPlane } from "react-icons/fa";

const BASE_URL = "http://localhost:8070/uploads/";

function CounselorMessage() {
    const user = JSON.parse(localStorage.getItem("user"));

    const [conversations, setConversations] = useState([]);
    const [selected, setSelected] = useState(null);
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
    const [isAnonymousChat, setIsAnonymousChat] = useState(false);
    const [anonymousMap, setAnonymousMap] = useState(() => {
        const saved = localStorage.getItem("anonymousMap");
        return saved ? JSON.parse(saved) : {};
    });
    const isAnon = anonymousMap[selected?._id];
    const chatEndRef = useRef(null);

    // 🔥 LOAD
    useEffect(() => {
        fetchConversations();
    }, []);

    useEffect(() => {
        if (conversations.length > 0 && !selected) {
            setSelected(conversations[0].user);
            setIsAnonymousChat(conversations[0].isAnonymous); // 🔥 important
            fetchMessages(conversations[0].user._id);
        }
    }, [conversations]);

    useEffect(() => {
        if (conversations.length > 0) {
            setAnonymousMap((prev) => {
                const updated = { ...prev };

                conversations.forEach((c) => {
                    const id = c.user._id;

                    // 🔥 only set if not already stored
                    if (!(id in updated)) {
                        updated[id] = c.isAnonymous;
                    }
                });

                // 💾 save to localStorage
                localStorage.setItem("anonymousMap", JSON.stringify(updated));

                return updated;
            });
        }
    }, [conversations]);

    // 🔥 AUTO REFRESH
    useEffect(() => {
        const interval = setInterval(() => {
            fetchConversations();
            if (selected) fetchMessages(selected._id);
        }, 3000);

        return () => clearInterval(interval);
    }, [selected]);

    const fetchConversations = async () => {
        const res = await API.get("/messages/conversations/list");
        setConversations(res.data);
    };

    const fetchMessages = async (userId) => {
        const res = await API.get(`/messages/${userId}`);
        setMessages(res.data);
    };

    const handleSelect = (chat) => {
        setSelected(chat.user);

        // 🔥 store anonymous state ONCE
        setIsAnonymousChat(chat.isAnonymous);

        fetchMessages(chat.user._id);
    };

    const sendMessage = async () => {
        if (!text.trim()) return;

        await API.post("/messages", {
            receiverId: selected._id,
            content: text
        });

        setText("");
        fetchMessages(selected._id);
        fetchConversations();
    };

    const getImage = (user) => {
        if (!user?.profilePic) return "https://i.pravatar.cc/40";
        return BASE_URL + user.profilePic;
    };

    const formatTime = (date) => {
        return new Date(date).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    return (
        <div className="flex h-[85vh] bg-[#efeae2] rounded-xl overflow-hidden shadow">

            {/* 🔥 LEFT CHAT LIST */}
            <div className="w-[30%] bg-white border-r overflow-y-auto">

                <div className="p-4 font-semibold border-b">
                    Chats
                </div>

                {conversations.map((c) => {
                    const isAnon = anonymousMap[c.user._id];

                    return (
                        <div
                            key={c.user._id}
                            onClick={() => handleSelect(c)}
                            className={`flex items-center gap-3 p-3 cursor-pointer transition
                                ${selected?._id === c.user._id
                                    ? "bg-gray-100"
                                    : "hover:bg-gray-50"}`}
                        >
                            <div className="relative">

                                <img
                                    src={
                                        isAnon
                                            ? "https://i.pravatar.cc/40"
                                            : getImage(c.user)
                                    }
                                    className="w-11 h-11 rounded-full object-cover"
                                />
                            </div>

                            <div className="flex-1">
                                <h4 className="text-sm font-medium">
                                    {isAnon ? "Unknown" : c.user.name}
                                </h4>

                                <p className="text-xs text-gray-500 truncate">
                                    {c.lastMessage}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* 🔥 RIGHT CHAT */}
            <div className="flex-1 flex flex-col">

                {!selected ? (
                    <div className="flex items-center justify-center h-full text-gray-400">
                        Select a chat
                    </div>
                ) : (
                    <>
                        {/* HEADER */}
                        <div className="flex items-center gap-3 p-4 bg-gray-100 border-b">


                            <img
                                src={
                                    isAnonymousChat
                                        ? "https://i.pravatar.cc/40"
                                        : selected?.profilePic
                                            ? getImage(selected)
                                            : "https://i.pravatar.cc/40"
                                }
                                className="w-10 h-10 rounded-full object-cover"
                            />

                            <div>
                                <h3 className="font-semibold">
                                    {isAnon ? "Unknown" : selected?.name}
                                </h3>

                                <p className="text-xs text-green-500">online</p>
                            </div>

                        </div>

                        {/* MESSAGES */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-[#efeae2]">

                            {messages.map((msg) => {
                                const myId = user?._id || user?.id;

                                const isMe =
                                    String(msg.sender?._id) === String(myId);

                                return (
                                    <div key={msg._id}>

                                        {/* LEFT */}
                                        {!isMe && (
                                            <div className="flex items-start gap-3 mb-4">

                                                <img
                                                    src={
                                                        msg.isAnonymous
                                                            ? "https://i.pravatar.cc/40"
                                                            : getImage(msg.sender)
                                                    }
                                                    className="w-8 h-8 rounded-full"
                                                />

                                                {/* Bubble */}
                                                <div className="bg-white px-4 py-2 rounded-2xl rounded-bl-none shadow max-w-[70%]">
                                                    <p className="text-sm">{msg.content}</p>

                                                    <span className="text-[10px] text-gray-400 block mt-1">
                                                        {new Date(msg.createdAt).toLocaleTimeString([], {
                                                            hour: "2-digit",
                                                            minute: "2-digit"
                                                        })}
                                                    </span>
                                                </div>

                                            </div>
                                        )}

                                        {/* RIGHT */}
                                        {isMe && (
                                            <div className="flex justify-end mb-3">

                                                <div className="bg-[#d9fdd3] px-4 py-2 rounded-2xl rounded-br-none shadow max-w-[70%]">
                                                    <p className="text-sm">{msg.content}</p>

                                                    <span className="text-[10px] text-gray-500 block mt-1 text-right">
                                                        {new Date(msg.createdAt).toLocaleTimeString([], {
                                                            hour: "2-digit",
                                                            minute: "2-digit"
                                                        })}
                                                    </span>
                                                </div>

                                            </div>
                                        )}

                                    </div>
                                );
                            })}

                            <div ref={chatEndRef} />
                        </div>

                        {/* INPUT */}
                        <div className="p-3 bg-white border-t flex gap-2">
                            <input
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                className="flex-1 border rounded-full px-4 py-2 text-sm"
                                placeholder="Type a message..."
                            />

                            <button
                                onClick={sendMessage}
                                className="bg-green-500 text-white p-3 rounded-full hover:scale-105 transition"
                            >
                                <FaPaperPlane />
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default CounselorMessage;