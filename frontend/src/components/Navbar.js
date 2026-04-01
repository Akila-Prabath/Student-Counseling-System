function Navbar({ onLoginClick }) {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
      <h1 className="text-2xl font-bold text-green-600">MindCare</h1>

      <button
        onClick={onLoginClick}
        className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
      >
        Login
      </button>
    </nav>
  );
}

export default Navbar;