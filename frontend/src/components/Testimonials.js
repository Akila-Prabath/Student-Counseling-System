function Testimonials() {
  return (
    <div className="py-20 px-10 bg-gray-50 text-center">
      <h2 className="text-3xl font-bold mb-10">What Students Say</h2>

      <div className="grid md:grid-cols-3 gap-8">
        
        <div className="bg-white p-6 rounded-lg shadow">
          <p>"This platform really helped me reduce stress."</p>
          <h4 className="mt-4 font-semibold">- Student A</h4>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <p>"Counselors are very supportive and friendly."</p>
          <h4 className="mt-4 font-semibold">- Student B</h4>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <p>"Anonymous support is a great feature!"</p>
          <h4 className="mt-4 font-semibold">- Student C</h4>
        </div>

      </div>
    </div>
  );
}

export default Testimonials;