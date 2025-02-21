'use server';

import { PrismaClient, Skills } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export async function addSkill() {
  const newSkill: Skills = await prisma.skills.create({
    data: {
      name: 'PL/SQL',
      proficiency: 100,
    },
  });

  revalidatePath('/skills');
}

export async function removeSkill(skillId: number) {
  const deleteSkill = await prisma.skills.delete({
    where: { skillId: skillId },
  });

  revalidatePath('/skills');
}
