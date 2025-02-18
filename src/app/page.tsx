// Next.js example
import { neon } from '@neondatabase/serverless';

async function getData() {
  const sql = neon(process.env.DATABASE_URL!);
  const response = await sql`select * from users`;
  return response;
}

export default async function Home() {
  const data = await getData();

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {data.map((row) => {
        return (
          <li key={row.user_id} className="flex justify-between gap-x-6 py-5">
            {row.first_name}
          </li>
        );
      })}
    </ul>
  );
}
