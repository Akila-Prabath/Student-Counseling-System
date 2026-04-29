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
    const [search, setSearch] = useState("");

    // ✅ SINGLE SOURCE OF TRUTH
    const [anonymousMap, setAnonymousMap] = useState(() => {
        const saved = localStorage.getItem("anonymousMap");
        return saved ? JSON.parse(saved) : {};
    });

    const chatEndRef = useRef(null);

    // =========================================
    // 🔥 LOAD
    // =========================================
    useEffect(() => {
        fetchConversations();
    }, []);

    // =========================================
    // 🔥 AUTO SELECT
    // =========================================

    // =========================================
    // 🔥 SYNC ANONYMOUS MAP
    // =========================================
    useEffect(() => {
        if (conversations.length > 0) {
            setAnonymousMap((prev) => {
                const updated = { ...prev };

                conversations.forEach((c) => {
                    if (!(c.user._id in updated)) {
                        updated[c.user._id] = c.isAnonymous;
                    }
                });

                localStorage.setItem("anonymousMap", JSON.stringify(updated));
                return updated;
            });
        }
    }, [conversations]);

    // =========================================
    // 🔥 AUTO REFRESH
    // =========================================
    useEffect(() => {
        const interval = setInterval(() => {
            fetchConversations();
            if (selected) fetchMessages(selected._id);
        }, 3000);

        return () => clearInterval(interval);
    }, [selected]);

    // =========================================
    // API
    // =========================================
    const fetchConversations = async () => {
        const res = await API.get("/messages/conversations/list");
        setConversations(res.data);
    };

    const fetchMessages = async (userId) => {
        const res = await API.get(`/messages/${userId}`);
        setMessages(res.data);
    };

    const updateAnonymous = (chat) => {
        setAnonymousMap((prev) => {
            const updated = { ...prev };

            if (!(chat.user._id in updated)) {
                updated[chat.user._id] = chat.isAnonymous;
                localStorage.setItem("anonymousMap", JSON.stringify(updated));
            }

            return updated;
        });
    };

    const handleSelect = (chat) => {
        setSelected(chat.user);
        updateAnonymous(chat);
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

    // =========================================
    // 🕒 TIME FORMAT
    // =========================================
    const formatChatTime = (date) => {
        const now = new Date();
        const msgDate = new Date(date);

        const diff = now - msgDate;
        const oneDay = 86400000;

        return diff < oneDay
            ? msgDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            : msgDate.toLocaleDateString([], { month: "short", day: "numeric" });
    };

    // =========================================
    // 🔍 FILTER
    // =========================================
    const filteredConversations = conversations.filter((c) => {
        const isAnon = anonymousMap[c.user._id];
        const name = isAnon ? "unknown" : c.user.name.toLowerCase();
        const msg = c.lastMessage?.toLowerCase() || "";

        return (
            name.includes(search.toLowerCase()) ||
            msg.includes(search.toLowerCase())
        );
    });

    // =========================================
    // 🎯 CURRENT CHAT ANON
    // =========================================
    const isAnon = selected ? anonymousMap[selected._id] : false;

    const formatMessageDate = (date) => {
        const msgDate = new Date(date);
        const today = new Date();
        const yesterday = new Date();

        yesterday.setDate(today.getDate() - 1);

        const isToday =
            msgDate.toDateString() === today.toDateString();

        const isYesterday =
            msgDate.toDateString() === yesterday.toDateString();

        if (isToday) return "Today";
        if (isYesterday) return "Yesterday";

        return msgDate.toLocaleDateString([], {
            month: "short",
            day: "numeric",
            year: "numeric"
        });
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault(); // 🚫 stop new line
            sendMessage();
        }
    };

    const handleInput = (e) => {
        e.target.style.height = "auto";
        e.target.style.height = e.target.scrollHeight + "px";
    };

    // =========================================
    // UI
    // =========================================
    return (
        <div className="flex h-[85vh] bg-[#efeae2] rounded-xl overflow-hidden shadow">

            {/* LEFT */}
            <div className="w-[30%] bg-white border-r flex flex-col">

                {/* 🔥 FIXED HEADER */}
                <div className="p-4 border-b sticky top-0 bg-white z-10">
                    <h2 className="text-xl font-bold">Chats</h2>

                    <input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full mt-3 px-3 py-2 border rounded-lg text-sm"
                    />
                </div>

                {/* 🔥 SCROLLABLE CHAT LIST */}
                <div className="flex-1 overflow-y-auto">

                    {filteredConversations.length === 0 ? (
                        <p className="p-4 text-sm text-gray-400">No chats found</p>
                    ) : (
                        filteredConversations.map((c) => {
                            const isAnonUser =
                                anonymousMap[c.user._id] ?? c.isAnonymous;

                            return (
                                <div
                                    key={c.user._id}
                                    onClick={() => handleSelect(c)}
                                    className={`flex items-center gap-3 p-3 cursor-pointer transition
                                            ${selected?._id === c.user._id
                                            ? "bg-gray-100"
                                            : "hover:bg-gray-50"}`}
                                >
                                    <img
                                        src={
                                            isAnonUser
                                                ? "https://i.pravatar.cc/40"
                                                : getImage(c.user)
                                        }
                                        className="w-11 h-11 rounded-full"
                                    />

                                    <div className="flex-1">
                                        <div className="flex justify-between">
                                            <h4 className="text-sm font-medium">
                                                {isAnonUser ? "Unknown" : c.user.name}
                                            </h4>

                                            <span className="text-xs text-gray-400">
                                                {formatChatTime(c.createdAt)}
                                            </span>
                                        </div>

                                        <p className="text-xs text-gray-500 truncate">
                                            {c.lastMessage}
                                        </p>
                                    </div>
                                </div>
                            );
                        })
                    )}

                </div>
            </div>

            {/* RIGHT */}
            <div className="flex-1 flex flex-col">

                {!selected ? (
                    <div className="flex flex-col items-center justify-center h-full text-center px-6 animate-fadeIn">

                        {/* 💬 ICON */}
                        <div className="text-6xl mb-4">💬</div>

                        {/* TITLE */}
                        <h2 className="text-xl font-semibold text-gray-700">
                            Chat with students
                        </h2>

                        {/* SUBTEXT */}
                        <p className="text-gray-500 text-sm mt-2 max-w-xs">
                            Start conversations with students to provide guidance, support, and better treatment.
                        </p>

                        {/* OPTIONAL HINT */}
                        <p className="text-xs text-gray-400 mt-4">
                            Select a chat from the left to begin
                        </p>

                    </div>
                ) : (
                    <>
                        {/* HEADER */}
                        <div className="flex items-center gap-3 p-4 bg-gray-100 border-b">
                            <img
                                src={
                                    isAnon
                                        ? "https://i.pravatar.cc/40"
                                        : getImage(selected)
                                }
                                className="w-10 h-10 rounded-full"
                            />

                            <h3 className="font-semibold">
                                {isAnon ? "Unknown" : selected.name}
                            </h3>
                        </div>

                        {/* MESSAGES */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-2">

                            {messages.map((msg, index) => {
                                const myId = user?._id || user?.id;

                                const isMe =
                                    String(msg.sender?._id) === String(myId);

                                const currentDate = new Date(msg.createdAt).toDateString();

                                const prevDate =
                                    index > 0
                                        ? new Date(messages[index - 1].createdAt).toDateString()
                                        : null;

                                const showDate = currentDate !== prevDate;

                                const time = new Date(msg.createdAt).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit"
                                });

                                return (
                                    <div key={msg._id}>

                                        {/* 📅 DATE SEPARATOR */}
                                        {showDate && (
                                            <div className="flex justify-center my-4">
                                                <span className="bg-green-50 shadow text-gray-500 text-xs px-4 py-1 rounded-full">
                                                    {formatMessageDate(msg.createdAt)}
                                                </span>
                                            </div>
                                        )}

                                        {/* LEFT (RECEIVED) */}
                                        {!isMe && (
                                            <div className="flex gap-2 mb-3">

                                                <img
                                                    src={
                                                        msg.isAnonymous
                                                            ? "https://i.pravatar.cc/40"
                                                            : getImage(msg.sender)
                                                    }
                                                    className="w-8 h-8 rounded-full"
                                                />

                                                <div className="bg-white px-4 py-2 rounded-2xl rounded-bl-none max-w-[70%] shadow">

                                                    <p className="text-sm">{msg.content}</p>

                                                    {/* 🕒 TIME */}
                                                    <span className="block text-[10px] text-gray-400 mt-1">
                                                        {time}
                                                    </span>

                                                </div>

                                            </div>
                                        )}

                                        {/* RIGHT (SENT) */}
                                        {isMe && (
                                            <div className="flex justify-end mb-3">

                                                <div className="bg-[#d9fdd3] px-4 py-2 rounded-2xl rounded-br-none max-w-[70%] shadow text-left">

                                                    <div className="flex items-end gap-2">
                                                        <p>{msg.content}</p>
                                                        <span className="text-[10px] text-gray-400">{time}</span>
                                                    </div>

                                                </div>

                                            </div>
                                        )}

                                    </div>
                                );
                            })}

                            <div ref={chatEndRef} />
                        </div>

                        {/* INPUT */}
                        <div className="p-3 bg-white flex gap-2 items-center">

                            <textarea
                                onInput={handleInput}
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Type a message..."
                                rows={1}
                                className="flex-1 border rounded-2xl px-4 py-2 text-sm resize-none outline-none focus:ring-2 focus:ring-green-400"
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