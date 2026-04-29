import { useEffect, useState, useRef } from "react";
import API from "../services/api";
import { FaPaperPlane } from "react-icons/fa";

function StudentMessage() {
    const user = JSON.parse(localStorage.getItem("user"));

    const [conversations, setConversations] = useState([]);
    const [counselors, setCounselors] = useState([]);
    const [selected, setSelected] = useState(null);
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
    const [anonymous, setAnonymous] = useState(false);
    const [search, setSearch] = useState("");

    const bottomRef = useRef();

    // ================= FETCH =================
    useEffect(() => {
        fetchConversations();
        fetchCounselors();
    }, []);

    const fetchConversations = async () => {
        const res = await API.get("/messages/conversations/list");
        setConversations(res.data);
    };

    const fetchCounselors = async () => {
        const res = await API.get("/users/counselors");
        setCounselors(res.data);
    };

    const fetchMessages = async (id) => {
        const res = await API.get(`/messages/${id}`);
        setMessages(res.data);
    };

    // ================= MERGE =================
    const mergedChats = [
        ...conversations.map((c) => ({
            user: c.user,
            lastMessage: c.lastMessage,
            createdAt: c.createdAt
        })),
        ...counselors
            .filter((c) => !conversations.some((conv) => conv.user._id === c._id))
            .map((c) => ({
                user: c,
                lastMessage: "Start conversation",
                createdAt: new Date()
            }))
    ];

    // ================= FILTER =================
    const filteredChats = mergedChats.filter((c) =>
        c.user.name.toLowerCase().includes(search.toLowerCase())
    );

    // ================= HANDLERS =================
    const handleSelect = (chat) => {
        setSelected(chat.user);
        fetchMessages(chat.user._id);
    };

    const sendMessage = async () => {
        if (!text.trim()) return;

        await API.post("/messages", {
            receiverId: selected._id,
            content: text,
            isAnonymous: anonymous
        });

        setText("");
        fetchMessages(selected._id);
        fetchConversations();
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const handleInput = (e) => {
        e.target.style.height = "auto";
        e.target.style.height = e.target.scrollHeight + "px";
    };

    // ================= HELPERS =================
    const formatChatTime = (date) => {
        const now = new Date();
        const msgDate = new Date(date);
        return now - msgDate < 86400000
            ? msgDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            : msgDate.toLocaleDateString([], { month: "short", day: "numeric" });
    };

    const formatMessageDate = (date) => {
        const d = new Date(date);
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);

        if (d.toDateString() === today.toDateString()) return "Today";
        if (d.toDateString() === yesterday.toDateString()) return "Yesterday";

        return d.toLocaleDateString([], { month: "short", day: "numeric" });
    };

    // ================= UI =================
    return (
        <div className="flex h-[85vh] bg-white rounded-xl shadow overflow-hidden">

            {/* LEFT */}
            <div className="w-[30%] flex flex-col border-r">

                {/* HEADER */}
                <div className="p-4 border-b bg-white sticky top-0 z-10">
                    <h2 className="text-xl font-bold">Chats</h2>

                    <input
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full mt-3 px-3 py-2 border rounded-lg text-sm"
                    />
                </div>

                {/* SCROLL LIST */}
                <div className="flex-1 overflow-y-auto">
                    {filteredChats.map((c) => (
                        <div
                            key={c.user._id}
                            onClick={() => handleSelect(c)}
                            className={`flex items-center gap-3 p-3 cursor-pointer ${selected?._id === c.user._id ? "bg-blue-50" : "hover:bg-gray-100"
                                }`}
                        >
                            <img
                                src={
                                    c.user.profilePic
                                        ? `http://localhost:8070/uploads/${c.user.profilePic}`
                                        : `https://ui-avatars.com/api/?name=${encodeURIComponent(c.user.name)}`
                                }
                                className="w-10 h-10 rounded-full"
                            />

                            <div className="flex-1">
                                <div className="flex justify-between">
                                    <h4 className="text-sm font-medium">{c.user.name}</h4>
                                    <span className="text-xs text-gray-400">
                                        {formatChatTime(c.createdAt)}
                                    </span>
                                </div>

                                <p className="text-xs text-gray-500 truncate">
                                    {c.lastMessage}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* RIGHT */}
            <div className="flex-1 flex flex-col">

                {!selected ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                        <div className="text-6xl mb-4">💬</div>
                        <h2 className="text-xl font-semibold">
                            Chat with counselor for better solution
                        </h2>
                        <p className="text-gray-500 mt-2">
                            Select a chat from the left to begin
                        </p>
                    </div>
                ) : (
                    <>
                        {/* HEADER */}
                        <div className="p-4 border-b flex items-center gap-3 bg-gray-50">
                            <img
                                src={
                                    selected.profilePic
                                        ? `http://localhost:8070/uploads/${selected.profilePic}`
                                        : `https://ui-avatars.com/api/?name=${selected.name}`
                                }
                                className="w-10 h-10 rounded-full"
                            />
                            <h3 className="font-semibold">{selected.name}</h3>
                        </div>

                        {/* MESSAGES */}
                        <div className="flex-1 p-4 overflow-y-auto bg-[#efeae2]">

                            {messages.map((msg, i) => {
                                const isMe =
                                    String(msg.sender?._id) === String(user?._id || user?.id);

                                const showDate =
                                    i === 0 ||
                                    new Date(msg.createdAt).toDateString() !==
                                    new Date(messages[i - 1].createdAt).toDateString();

                                const time = new Date(msg.createdAt).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit"
                                });

                                return (
                                    <div key={msg._id}>

                                        {/* 📅 DATE SEPARATOR */}
                                        {showDate && (
                                            <div className="flex justify-center my-3">
                                                <span className="text-xs bg-gray-200 px-3 py-1 rounded-full">
                                                    {formatMessageDate(msg.createdAt)}
                                                </span>
                                            </div>
                                        )}

                                        {/* LEFT (RECEIVED) */}
                                        {!isMe && (
                                            <div className="flex items-end gap-2 mb-3">

                                                <img
                                                    src={
                                                        msg.isAnonymous
                                                            ? "https://i.pravatar.cc/40"
                                                            : `http://localhost:8070/uploads/${selected.profilePic}`
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

                                                    <p className="text-sm">{msg.content}</p>

                                                    {/* 🕒 TIME */}
                                                    <span className="block text-[10px] text-gray-500 mt-1">
                                                        {time}
                                                    </span>

                                                </div>

                                            </div>
                                        )}

                                    </div>
                                );
                            })}

                            <div ref={bottomRef} />
                        </div>

                        {/* INPUT */}
                        <div className="p-3 border-t bg-white">

                            <div className="flex items-center gap-2 mb-2 text-sm">
                                <input
                                    type="checkbox"
                                    checked={anonymous}
                                    onChange={() => setAnonymous(!anonymous)}
                                />
                                Send anonymously
                            </div>

                            <div className="flex gap-2">
                                <textarea
                                    rows={1}
                                    onInput={handleInput}
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    className="flex-1 border rounded-2xl px-4 py-2 text-sm leading-tight resize-none overflow-hidden h-[40px]"
                                    placeholder="Type a message..."
                                />

                                <button
                                    onClick={sendMessage}
                                    className="bg-green-500 text-white px-4 rounded-lg"
                                >
                                    <FaPaperPlane />
                                </button>
                            </div>

                        </div>
                    </>
                )}

            </div>
        </div>
    );
}

export default StudentMessage;