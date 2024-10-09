import { useState } from "react";

function Count() {
  const [count, setCount] = useState(0);

  const handleIncrease = () => {
    setCount((count) => (count += 1));
  };
  const handleReset = () => {
    setCount(0);
  };
  const handleDecrease = () => {
    setCount((count) => (count -= 1));
  };

  return (
    <section className=" min-h-full w-full flex items-center justify-center p-20 flex-col">
      <section className="flex items-center justify-center p-20 shadow-2xl rounded flex-col">
        <h1 className=" text-4xl font-bold ">{count}</h1>
        <section className="mt-3 flex items-center justify-center gap-4">
          <button
            className="btn bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
            onClick={handleIncrease}>
            Increase
          </button>
          <button
            className="btn bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
            onClick={handleReset}>
            Reset
          </button>
          <button
            className="btn bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
            onClick={handleDecrease}>
            Decrease
          </button>
        </section>
      </section>
    </section>
  );
}

export default Count;
