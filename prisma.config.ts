import path from 'node:path';

export default {
  earlyAccess: true,
  schema: {
    kind: 'multi',
    folderPath: path.join('prisma', 'schema'),
  },
};
