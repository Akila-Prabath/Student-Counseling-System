function Services() {
  return (
    <div className="py-20 px-10 text-center bg-gray-50">
      <h2 className="text-3xl font-bold mb-12">Our Services</h2>

      <div className="grid md:grid-cols-3 gap-10">
        
        <div className="p-8 bg-white shadow-lg rounded-xl hover:shadow-2xl transition">
          <h3 className="text-xl font-semibold mb-3">Online Counseling</h3>
          <p className="text-gray-600">
            Talk with experts anytime from anywhere.
          </p>
        </div>

        <div className="p-8 bg-white shadow-lg rounded-xl hover:shadow-2xl transition">
          <h3 className="text-xl font-semibold mb-3">Anonymous Support</h3>
          <p className="text-gray-600">
            Share your feelings without revealing identity.
          </p>
        </div>

        <div className="p-8 bg-white shadow-lg rounded-xl hover:shadow-2xl transition">
          <h3 className="text-xl font-semibold mb-3">Mental Resources</h3>
          <p className="text-gray-600">
            Access guides, tips, and helpful materials.
          </p>
        </div>

      </div>
    </div>
  );
}

export default Services;