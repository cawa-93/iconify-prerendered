import npmPublish from 'npm:@jsdevtools/npm-publish';
import { join } from 'https://deno.land/std@0.176.0/path/mod.ts';

const entry = join(Deno.cwd(), '/generated/');

for (const dirEntry of Deno.readDirSync(entry)) {
  if (!dirEntry.isDirectory) {
    continue;
  }

  await npmPublish({
    package: join(entry, dirEntry.name, `package.json`),
    access: 'public',
    checkVersion: true,
    token: Deno.env.get('NPM_TOKEN'),
  });
}
