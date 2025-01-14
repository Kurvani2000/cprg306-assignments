import StudentInfo from "./student-info";
import Link from "next/link";

export default function Page() 
{
    return (
      <main>
        <h1>Welcome to week-2</h1>
        <p><Link href="/">Go to Home</Link></p>
      </main>
    );
  }