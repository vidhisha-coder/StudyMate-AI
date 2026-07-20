export default function RecentNotes() {
  const notes = [
    "Operating System.pdf",
    "Python Notes.pdf",
    "Java Unit 3.pdf",
    "AI Chapter 2.pdf",
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-8">
      <h2 className="text-xl font-semibold mb-4">Recent Notes</h2>

      {notes.map((note, index) => (
        <div
          key={index}
          className="border-b py-3 last:border-none"
        >
          📄 {note}
        </div>
      ))}
    </div>
  );
}