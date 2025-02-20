import { Mail, Phone, MapPin } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

import { neon } from '@neondatabase/serverless';

async function getData() {
  const sql = neon(process.env.DATABASE_URL!);
  const response = await sql`             
                        with emails as (
                        select user_id, contact
                            from user_contacts
                        where contact_type = 'EML')
                        , phones as (
                        select user_id, contact
                            from user_contacts
                        where contact_type = 'MBL')
                        , addresses as (
                        select user_id, contact
                            from user_contacts
                        where contact_type = 'ADR')
                        select first_name
                            , middle_name
                            , last_name
                            , first_name || ' ' || last_name full_name
                            , e.contact email
                            , p.contact phone
                            , a.contact address
                        from users u
                        join emails e on e.user_id = u.user_id
                        join phones p on p.user_id = u.user_id
                        join addresses a on a.user_id = u.user_id;`;
  return response;
}

export async function UserList() {
  const users = await getData();
  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>User List</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          {users.map((user) => (
            <div
              key={user.user_id}
              className="mb-4 grid grid-cols-[auto,1fr] gap-4"
            >
              <Avatar>
                <AvatarImage src={user.avatar} alt={user.full_name} />
                <AvatarFallback>
                  {user.full_name
                    .split(' ')
                    .map((n: string) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h3 className="font-semibold leading-none">{user.full_name}</h3>
                <div className="text-sm text-muted-foreground flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {user.email}
                </div>
                <div className="text-sm text-muted-foreground flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  {user.phone}
                </div>
                <div className="text-sm text-muted-foreground flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {user.address}
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
