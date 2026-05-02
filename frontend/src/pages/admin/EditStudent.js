import { useEffect, useState } from "react";

import {
  useParams,
  useNavigate
} from "react-router-dom";

import Sidebar from "../../components/admin/Sidebar";
import AdminHeader from "../../components/admin/AdminHeader";

import API from "../../services/api";

import {
  FaEye,
  FaEyeSlash
} from "react-icons/fa";

import { toast } from "react-toastify";

function EditStudent() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [collapsed, setCollapsed] =
    useState(false);

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: ""
  });

  const [profilePic, setProfilePic] =
    useState(null);

  const [preview, setPreview] =
    useState("");

  const [showPassword,
    setShowPassword] =
    useState(false);

  // FETCH STUDENT DATA
  useEffect(() => {
    fetchStudent();
  }, []);

  const fetchStudent = async () => {

    try {

      const res = await API.get(
        `/users/${id}`
      );

      setForm({
        name: res.data.name || "",
        username:
          res.data.username || "",
        email: res.data.email || "",
        password: ""
      });

      if (res.data.profilePic) {

        setPreview(
          `http://localhost:8070/uploads/${res.data.profilePic}`
        );
      }

    } catch (error) {

      console.error(
        "Error fetching student",
        error
      );

      toast.error(
        error.response?.data?.message ||
        "Failed to fetch student data"
      );
    }
  };

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]:
        e.target.value
    });
  };

  // IMAGE CHANGE
  const handleImageChange = (e) => {

    const file =
      e.target.files[0];

    if (!file) return;

    // IMAGE SIZE VALIDATION
    if (
      file.size >
      2 * 1024 * 1024
    ) {

      return toast.error(
        "Image must be less than 2MB"
      );
    }

    setProfilePic(file);

    setPreview(
      URL.createObjectURL(file)
    );
  };

  // UPDATE STUDENT
  const handleSubmit = async (e) => {

    e.preventDefault();

    // EMAIL VALIDATION
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailRegex.test(form.email)
    ) {

      return toast.error(
        "Please enter a valid email address"
      );
    }

    // PASSWORD VALIDATION
    if (
      form.password &&
      form.password.length < 6
    ) {

      return toast.error(
        "Password must be at least 6 characters"
      );
    }

    try {

      const data =
        new FormData();

      data.append(
        "name",
        form.name
      );

      data.append(
        "username",
        form.username
      );

      data.append(
        "email",
        form.email
      );

      if (form.password) {

        data.append(
          "password",
          form.password
        );
      }

      if (profilePic) {

        data.append(
          "profilePic",
          profilePic
        );
      }

      await API.put(
        `/users/${id}`,
        data
      );

      toast.success(
        "Student updated successfully"
      );

      setTimeout(() => {

        navigate(
          "/admin/students"
        );

      }, 1500);

    } catch (error) {

      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to update student"
      );
    }
  };

  return (
    <div className="flex bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen">

      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <div
        className={`${
          collapsed
            ? "ml-20"
            : "ml-64"
        } w-full p-6 transition-all duration-300`}
      >

        <AdminHeader
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />

        <h2 className="text-2xl font-bold mt-6 mb-6 dark:text-white">
          Edit Student
        </h2>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow w-full">

          <form
            onSubmit={handleSubmit}
            className="grid md:grid-cols-3 gap-8"
          >

            {/* LEFT IMAGE */}
            <div className="md:col-span-1 flex flex-col items-center gap-4 border-r pr-6">

              <div className="w-52 h-52 rounded-full bg-gray-200 overflow-hidden shadow">

                {preview ? (

                  <img
                    src={preview}
                    alt="preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src =
                        "https://i.pravatar.cc/150";
                    }}
                  />

                ) : (

                  <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                    No Image
                  </div>

                )}

              </div>

              <input
                type="file"
                accept="image/*"
                onChange={
                  handleImageChange
                }
              />

            </div>

            {/* RIGHT FORM */}
            <div className="md:col-span-2 space-y-5">

              <div className="grid md:grid-cols-2 gap-4">

                <div>

                  <label className="text-sm font-semibold">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={
                      handleChange
                    }
                    className="w-full mt-1 p-3 bg-gray-100 rounded-lg"
                  />

                </div>

                <div>

                  <label className="text-sm font-semibold">
                    Username
                  </label>

                  <input
                    type="text"
                    name="username"
                    value={
                      form.username
                    }
                    onChange={
                      handleChange
                    }
                    className="w-full mt-1 p-3 bg-gray-100 rounded-lg"
                  />

                </div>

              </div>

              <div className="grid md:grid-cols-2 gap-4">

                <div>

                  <label className="text-sm font-semibold">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={
                      handleChange
                    }
                    className="w-full mt-1 p-3 bg-gray-100 rounded-lg"
                  />

                </div>

                <div>

                  <label className="text-sm font-semibold">
                    Password (Optional)
                  </label>

                  <div className="relative">

                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      name="password"
                      placeholder="Leave blank to keep current"
                      value={
                        form.password
                      }
                      onChange={
                        handleChange
                      }
                      className="w-full mt-1 p-3 bg-gray-100 rounded-lg"
                    />

                    <span
                      className="absolute right-3 top-4 cursor-pointer"
                      onClick={() =>
                        setShowPassword(
                          !showPassword
                        )
                      }
                    >

                      {showPassword
                        ? <FaEyeSlash />
                        : <FaEye />}

                    </span>

                  </div>

                </div>

              </div>

              <button className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700">

                Update Student

              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
}

export default EditStudent;