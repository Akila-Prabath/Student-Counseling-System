import { useEffect, useState } from "react";

function Counter({ target }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const increment = target / (duration / 20);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 20);

    return () => clearInterval(timer);
  }, [target]);

  return <span>{count}+</span>;
}

function Stats() {
  const stats = [
    { value: 650, label: "Happy Customers" },
    { value: 320, label: "Successful Therapy" },
    { value: 5, label: "Years of Experience" },
    { value: 10, label: "Specialists" },
  ];

  return (
    <div className="bg-gradient-to-r from-orange-500 to-orange-700 py-12 px-6 md:px-20 text-white">

      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">

        {stats.map((item, index) => (
          <div key={index}>

            {/* Number */}
            <h2 className="text-3xl md:text-5xl font-bold mb-2">
              <Counter target={item.value} />
            </h2>

            {/* Label */}
            <p className="text-sm md:text-lg text-green-100">
              {item.label}
            </p>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Stats;