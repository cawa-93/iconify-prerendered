import npmPublish from 'npm:@jsdevtools/npm-publish';
import { join } from 'https://deno.land/std@0.176.0/path/mod.ts';

const entry = join(Deno.cwd(), '/generated/');

const token = Deno.env.get('NPM_TOKEN');

if (!token) {
  if (Deno.env.get('CI') && Deno.env.get('CI') !== 'false') {
    throw new Error(
      `Expected NPM_TOKEN as string but got ${JSON.stringify(token)}`,
    );
  } else {
    console.error(
      `NPM_TOKEN is ${JSON.stringify(token)}. Forced to dry-run publishing`,
    );
  }
}

for (const dirEntry of Deno.readDirSync(entry)) {
  if (!dirEntry.isDirectory) {
    continue;
  }

  await npmPublish({
    package: join(entry, dirEntry.name, `package.json`),
    access: 'public',
    checkVersion: true,
    token,
    dryRun: !token,
  });
}
