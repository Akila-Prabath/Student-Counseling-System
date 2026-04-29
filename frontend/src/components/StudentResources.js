import { useEffect, useState } from "react";
import API from "../services/api";

function StudentResources() {
    const [resources, setResources] = useState([]);
    const [filter, setFilter] = useState("all");

    const user = JSON.parse(localStorage.getItem("user"));

    // ⭐ bookmarks
    const [bookmarks, setBookmarks] = useState(
        JSON.parse(localStorage.getItem("bookmarks")) || []
    );

    useEffect(() => {
        fetchResources();
    }, []);

    const fetchResources = async () => {
        try {
            const res = await API.get("/resources/student");
            setResources(res.data);
        } catch (err) {
            console.error("Error fetching resources");
        }
    };

    // =========================
    // 🔍 TYPE FILTER
    // =========================
    const filtered =
        filter === "all"
            ? resources
            : resources.filter((r) => r.type === filter);

    // =========================
    // ⭐ BOOKMARK TOGGLE
    // =========================
    const toggleBookmark = (id) => {
        let updated;

        if (bookmarks.includes(id)) {
            updated = bookmarks.filter((b) => b !== id);
        } else {
            updated = [...bookmarks, id];
        }

        setBookmarks(updated);
        localStorage.setItem("bookmarks", JSON.stringify(updated));
    };

    // =========================
    // 🎬 THUMBNAIL
    // =========================
    const getYouTubeId = (url) => {
        if (!url) return null;

        if (url.includes("youtu.be")) return url.split("/").pop();
        if (url.includes("v=")) return url.split("v=")[1]?.split("&")[0];

        return null;
    };

    const getThumbnail = (r) => {
        if (r.type === "video") {
            const id = getYouTubeId(r.link);
            return id
                ? `https://img.youtube.com/vi/${id}/hqdefault.jpg`
                : "https://img.icons8.com/color/96/video.png";
        }

        return "https://cdn-icons-png.flaticon.com/512/337/337946.png";
    };

    return (
        <div className="p-6 bg-orange-50">

            {/* HEADER */}
            <h2 className="text-2xl font-bold mb-6">Resources</h2>

            {/* FILTER */}
            <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-xl w-fit">
                {["all", "article", "video"].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-1 rounded-lg text-sm capitalize ${filter === f
                            ? "bg-white shadow text-orange-600"
                            : "text-gray-500"
                            }`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* CARDS */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                {filtered.map((r) => (
                    <div
                        key={r._id}
                        className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden"
                    >

                        {/* IMAGE */}
                        <div className="relative">
                            <img
                                src={getThumbnail(r)}
                                className="w-full h-40 object-cover"
                            />

                            <span className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                {r.type}
                            </span>

                            <button
                                onClick={() => toggleBookmark(r._id)}
                                className="absolute top-2 right-2 bg-white/80 p-1 rounded-full"
                            >
                                {bookmarks.includes(r._id) ? "⭐" : "☆"}
                            </button>
                        </div>

                        {/* CONTENT */}
                        <div className="p-4">
                            <h3 className="font-semibold line-clamp-1">
                                {r.title}
                            </h3>

                            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                                {r.description}
                            </p>

                            <a
                                href={r.link}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-block mt-3 text-orange-600 text-sm font-medium"
                            >
                                View Resource →
                            </a>
                        </div>

                    </div>
                ))}

            </div>

            {/* EMPTY */}
            {filtered.length === 0 && (
                <p className="text-gray-400 text-center mt-10">
                    No resources available for you
                </p>
            )}

        </div>
    );
}

export default StudentResources;