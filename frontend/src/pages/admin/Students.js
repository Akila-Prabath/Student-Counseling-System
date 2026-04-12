import Sidebar from "../../components/admin/Sidebar";

function Students() {
  return (
    <div className="flex">

      <Sidebar />

      <div className="ml-64 p-6 w-full bg-gray-100 min-h-screen">
        <h2 className="text-xl font-bold mb-4">Students</h2>

        <div className="bg-white p-4 rounded shadow">
          <p>Student list will appear here...</p>
        </div>
      </div>

    </div>
  );
}

export default Students;