import { useEffect, useState } from "react";
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

    // =========================================
    // FETCH DATA
    // =========================================
    useEffect(() => {
        fetchConversations();
        fetchCounselors();
    }, []);

    const fetchConversations = async () => {
        try {
            const res = await API.get("/messages/conversations/list");
            setConversations(res.data);
        } catch (err) {
            console.error("Error fetching conversations");
        }
    };

    const fetchCounselors = async () => {
        try {
            const res = await API.get("/users/counselors");
            setCounselors(res.data);
        } catch (err) {
            console.error("Error fetching counselors");
        }
    };

    const fetchMessages = async (userId) => {
        try {
            const res = await API.get(`/messages/${userId}`);
            setMessages(res.data);
        } catch (err) {
            console.error("Error fetching messages");
        }
    };

    // =========================================
    // MERGE CHAT LIST
    // =========================================
    const mergedChats = [
        ...conversations.map((c) => ({
            user: c.user,
            lastMessage: c.lastMessage,
        })),

        ...counselors
            .filter(
                (c) => !conversations.some((conv) => conv.user._id === c._id)
            )
            .map((c) => ({
                user: c,
                lastMessage: "Start conversation",
            })),
    ];

    // =========================================
    // AUTO SELECT FIRST CHAT
    // =========================================
    useEffect(() => {
        if (mergedChats.length > 0 && !selected) {
            setSelected(mergedChats[0].user);
            fetchMessages(mergedChats[0].user._id);
        }
    }, [mergedChats]);

    // =========================================
    // HANDLERS
    // =========================================
    const handleSelect = (chat) => {
        setSelected(chat.user);
        fetchMessages(chat.user._id);
    };

    const sendMessage = async () => {
        if (!text.trim()) return;

        try {
            await API.post("/messages", {
                receiverId: selected._id,
                content: text,
                isAnonymous: anonymous,
            });

            setText("");
            fetchMessages(selected._id);
            fetchConversations(); // update chat list
        } catch (err) {
            console.error("Send message error");
        }
    };

    // =========================================
    // UI
    // =========================================
    return (
        <div className="flex h-[80vh] bg-white rounded-xl shadow overflow-hidden">

            {/* ================================= LEFT PANEL ================================= */}
            <div className="w-1/3 border-r p-4 overflow-y-auto">

                <h2 className="font-semibold mb-3">Chats</h2>

                {mergedChats.map((c) => (
                    <div
                        key={c.user._id}
                        onClick={() => handleSelect(c)}
                        className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition
              ${selected?._id === c.user._id
                                ? "bg-blue-50"
                                : "hover:bg-gray-100"
                            }`}
                    >
                        <img
                            src={
                                c.user.profilePic
                                    ? `http://localhost:8070/uploads/${c.user.profilePic}`
                                    : `https://ui-avatars.com/api/?name=${encodeURIComponent(c.user.name)}`
                            }
                            className="w-10 h-10 rounded-full object-cover"
                            onError={(e) => {
                                e.target.src = "https://i.pravatar.cc/40";
                            }}
                        />

                        <div className="flex-1">
                            <h4 className="text-sm font-medium">
                                {c.user.name}
                            </h4>
                            <p className="text-xs text-gray-500 truncate">
                                {c.lastMessage}
                            </p>
                        </div>
                    </div>
                ))}

            </div>

            {/* ================================= RIGHT PANEL ================================= */}
            <div className="flex-1 flex flex-col">

                {!selected ? (
                    <div className="flex items-center justify-center h-full text-gray-400">
                        Select a chat to start messaging
                    </div>
                ) : (
                    <>
                        {/* HEADER */}
                        <div className="p-4 border-b flex items-center gap-3 bg-gray-50">
                            <img
                                src={
                                    selected.profilePic
                                        ? `http://localhost:8070/uploads/${selected.profilePic}`
                                        : `https://ui-avatars.com/api/?name=${encodeURIComponent(selected.name)}`
                                }
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                                <h3 className="font-semibold">{selected.name}</h3>
                                <p className="text-xs text-gray-500">
                                    {selected.specialization || "Counselor"}
                                </p>
                            </div>
                        </div>

                        {/* MESSAGES */}
                        <div className="flex-1 p-6 overflow-y-auto space-y-2 bg-[#efeae2]">

                            {messages.map((msg) => {
                                const myId = user?._id || user?.id;

                                const isMe =
                                    String(msg.sender?._id) === String(myId);

                                return (
                                    <div key={msg._id}>

                                        {/* RECEIVED (LEFT) */}
                                        {!isMe && (
                                            <div className="flex items-end gap-2 mb-3">

                                                {/* Avatar */}
                                                <img
                                                    src={
                                                        msg.isAnonymous
                                                            ? "https://i.pravatar.cc/40"
                                                            : selected.profilePic
                                                                ? `http://localhost:8070/uploads/${selected.profilePic}`
                                                                : "https://i.pravatar.cc/40"
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

                                        {/* SENT (RIGHT) */}
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

                        </div>

                        {/* INPUT */}
                        <div className="p-3 border-t bg-white">

                            {/* ANONYMOUS TOGGLE */}
                            <div className="flex items-center gap-2 mb-2 text-sm">
                                <input
                                    type="checkbox"
                                    checked={anonymous}
                                    onChange={() => setAnonymous(!anonymous)}
                                />
                                Send anonymously
                            </div>

                            <div className="flex gap-2">
                                <input
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    className="flex-1 border p-2 rounded-lg"
                                    placeholder="Type a message..."
                                />

                                <button
                                    onClick={sendMessage}
                                    className="bg-green-500 text-white px-4 rounded-lg flex items-center justify-center"
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