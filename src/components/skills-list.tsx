import { Code } from 'lucide-react';
import { PrismaClient } from '@prisma/client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CreateButton, DeleteButton } from '../app/skills/buttons';

const prisma = new PrismaClient();

export async function SkillsList() {
  const skills = await prisma.skills.findMany();
  console.log(skills);

  return (
    <Card className="w-full max-w-3xl bg-slate-800 shadow-lg">
      <CardHeader>
        <CardTitle className="flex flex-items justify-between">
          Skills <CreateButton />
        </CardTitle>
      </CardHeader>
      <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          {skills.map((skill) => (
            <div key={skill.skillId} className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">{skill.name}</h3>
                </div>
                <Badge variant="outline">{skill.category}</Badge>
              </div>
              <Progress value={skill.proficiency} className="h-2" />
              <div className="flex items-center justify-between gap-2">
                <div className="text-sm text-muted-foreground mt-1">
                  Proficiency: {skill.proficiency}%{' '}
                </div>
                <div className="mt-2">
                  <DeleteButton id={skill.skillId} />
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
