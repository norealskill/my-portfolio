import { PrismaClient } from '@prisma/client';
import { unstable_cache } from 'next/cache';
import { UserList } from './components/list-item';
import { SkillsList } from './components/skills-list';
import { neon } from '@neondatabase/serverless';

type User = {
  user_id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
};

async function getData() {
  const sql = neon(process.env.DATABASE_URL!);
  const response = await sql`
select user_id
     , first_name
     , middle_name
     , last_name 
  from users`;

  return response;
}

const prisma = new PrismaClient();

export default async function Home() {
  const data = await getData();
  const newSkill = await prisma.skills.create({
    data: {
      name: 'PL/SQL',
      rating: 5,
    },
  });

  const skills = await prisma.skills.findMany();
  console.log(skills);
  return <SkillsList />;
}
