import { useEffect, useState } from "react";
import API from "../services/api";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import blogIcon from "../assets/blog.png";

function CounselorResources() {
    const [resources, setResources] = useState([]);
    const [students, setStudents] = useState([]);
    const [filter, setFilter] = useState("all");

    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState(null);

    const [form, setForm] = useState({
        title: "",
        description: "",
        type: "article",
        link: "",
        visibleTo: []
    });

    useEffect(() => {
        fetchResources();
        fetchStudents();
    }, []);

    const fetchResources = async () => {
        const res = await API.get("/resources");
        setResources(res.data);
    };

    const fetchStudents = async () => {
        const res = await API.get("/users/students");
        setStudents(res.data);
    };

    // ================= FILTER =================
    const filtered =
        filter === "all"
            ? resources
            : resources.filter((r) => r.type === filter);

    // ================= THUMBNAIL =================
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
        return blogIcon;
    };

    // ================= ACTIONS =================
    const handleSubmit = async () => {
        if (!form.title || !form.description || !form.link) {
            alert("Fill all fields");
            return;
        }

        if (editId) {
            await API.put(`/resources/${editId}`, form);
        } else {
            await API.post("/resources", form);
        }

        resetForm();
        fetchResources();
    };

    const resetForm = () => {
        setForm({
            title: "",
            description: "",
            type: "article",
            link: "",
            visibleTo: []
        });
        setEditId(null);
        setShowForm(false);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this resource?")) return;
        await API.delete(`/resources/${id}`);
        fetchResources();
    };

    const handleEdit = (r) => {
        setForm({
            ...r,
            visibleTo: (r.visibleTo || []).map((s) =>
                typeof s === "object" ? s._id : s
            )
        });
        setEditId(r._id);
        setShowForm(true);
    };

    const toggleStudent = (id) => {
        if (form.visibleTo.includes(id)) {
            setForm({
                ...form,
                visibleTo: form.visibleTo.filter((s) => s !== id)
            });
        } else {
            setForm({
                ...form,
                visibleTo: [...form.visibleTo, id]
            });
        }
    };

    return (
        <div className="p-6 bg-stone-100">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Resources</h2>

                <button
                    onClick={() => setShowForm(true)}
                    className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 shadow"
                >
                    <FaPlus /> Add Resource
                </button>
            </div>

            {/* FILTER */}
            <div className="flex gap-2 mb-6 bg-white p-1 rounded-xl w-fit">
                {["all", "article", "video"].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-1 rounded-lg text-sm capitalize ${filter === f
                            ? "bg-orange-600 shadow text-white"
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
                        className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden group"
                    >

                        {/* IMAGE */}
                        <div className="relative">

                            <img
                                src={getThumbnail(r)}
                                className="w-full h-40 object-cover"
                            />

                            {/* TYPE */}
                            <span className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                {r.type}
                            </span>


                        </div>

                        {/* CONTENT */}
                        <div className="p-4">

                            <h3 className="font-semibold line-clamp-1">
                                {r.title}
                            </h3>

                            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                                {r.description}
                            </p>

                            {/* 👥 VISIBLE USERS + ACTIONS */}
                            <div className="flex justify-between items-center mt-4">

                                {/* LEFT: visibility */}
                                <div className="flex items-center">
                                    {r.visibleTo?.length > 0 ? (
                                        r.visibleTo.slice(0, 3).map((id, i) => (
                                            <div
                                                key={i}
                                                className="w-7 h-7 rounded-full bg-gray-300 text-xs flex items-center justify-center -ml-2 border-2 border-white"
                                            >
                                                👤
                                            </div>
                                        ))
                                    ) : (
                                        <span className="text-xs text-gray-400">
                                            Public
                                        </span>
                                    )}
                                </div>

                                {/* RIGHT: edit/delete */}
                                <div className="flex items-center gap-3 text-gray-500">

                                    <FaEdit
                                        onClick={() => handleEdit(r)}
                                        className="cursor-pointer hover:text-blue-600 transition"
                                    />

                                    <FaTrash
                                        onClick={() => handleDelete(r._id)}
                                        className="cursor-pointer hover:text-red-600 transition"
                                    />

                                </div>
                            </div>

                            {/* OPEN LINK */}
                            <a
                                href={r.link}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-block mt-3 text-orange-600 text-sm font-medium hover:underline"
                            >
                                Open →
                            </a>

                        </div>

                    </div>
                ))}

            </div>

            {/* MODAL */}
            {showForm && (
                <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

                    <div className="bg-white p-6 rounded-2xl w-[420px] space-y-4 max-h-[90vh] overflow-y-auto">

                        <h3 className="text-lg font-semibold">
                            {editId ? "Edit Resource" : "Add Resource"}
                        </h3>

                        <input
                            placeholder="Title"
                            className="w-full border p-2 rounded"
                            value={form.title}
                            onChange={(e) =>
                                setForm({ ...form, title: e.target.value })
                            }
                        />

                        <textarea
                            placeholder="Description"
                            className="w-full border p-2 rounded"
                            value={form.description}
                            onChange={(e) =>
                                setForm({ ...form, description: e.target.value })
                            }
                        />

                        <select
                            className="w-full border p-2 rounded"
                            value={form.type}
                            onChange={(e) =>
                                setForm({ ...form, type: e.target.value })
                            }
                        >
                            <option value="article">Article</option>
                            <option value="video">Video</option>
                        </select>

                        <input
                            placeholder="Paste link"
                            className="w-full border p-2 rounded"
                            value={form.link}
                            onChange={(e) =>
                                setForm({ ...form, link: e.target.value })
                            }
                        />

                        {/* STUDENTS */}
                        <div>
                            <p className="text-sm font-semibold mb-2">
                                Select Students
                            </p>

                            <div className="max-h-40 overflow-y-auto border p-2 rounded space-y-1">
                                {students.map((s) => (
                                    <label key={s._id} className="flex gap-2 text-sm">
                                        <input
                                            type="checkbox"
                                            checked={form.visibleTo.includes(s._id)}
                                            onChange={() => toggleStudent(s._id)}
                                        />
                                        {s.name}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-end gap-2">
                            <button onClick={resetForm}>Cancel</button>

                            <button
                                onClick={handleSubmit}
                                className="bg-orange-600 text-white px-4 py-1 rounded"
                            >
                                Save
                            </button>
                        </div>

                    </div>
                </div>
            )}

        </div>
    );
}

export default CounselorResources;