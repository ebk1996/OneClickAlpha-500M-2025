'use client';

export default function AlphaButton() {
  const handleTrade = async () => {
    console.log('Alpha trade initiated');
  };

  return (
    <button
      onClick={handleTrade}
      className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg"
    >
      Execute Alpha Trade
    </button>
  );
}
