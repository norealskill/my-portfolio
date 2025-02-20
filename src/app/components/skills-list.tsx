import { Code, Palette, Briefcase, Lightbulb, Wrench } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';

// Sample skills data
const skills = [
  {
    id: 1,
    name: 'React',
    category: 'Programming',
    proficiency: 90,
    icon: Code,
  },
  {
    id: 2,
    name: 'UI/UX Design',
    category: 'Design',
    proficiency: 85,
    icon: Palette,
  },
  {
    id: 3,
    name: 'Project Management',
    category: 'Management',
    proficiency: 80,
    icon: Briefcase,
  },
  {
    id: 4,
    name: 'Problem Solving',
    category: 'Soft Skills',
    proficiency: 95,
    icon: Lightbulb,
  },
  {
    id: 5,
    name: 'DevOps',
    category: 'Technical',
    proficiency: 75,
    icon: Wrench,
  },
];

export function SkillsList() {
  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Skills List</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          {skills.map((skill) => (
            <div key={skill.id} className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <skill.icon className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">{skill.name}</h3>
                </div>
                <Badge variant="outline">{skill.category}</Badge>
              </div>
              <Progress value={skill.proficiency} className="h-2" />
              <p className="text-sm text-muted-foreground mt-1">
                Proficiency: {skill.proficiency}%
              </p>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
