import Link from "next/link";

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Resume Builder</h1>
      <p className="text-lg mb-6">Create your professional resume in minutes.</p>
      <Link href="/builder">
        <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
          Start Building
        </button>
      </Link>
    </div>
  );
}
