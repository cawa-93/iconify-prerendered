import { npmPublish } from 'npm:@jsdevtools/npm-publish@2.2.1';
import { join } from 'https://deno.land/std@0.176.0/path/mod.ts';

const entry = join(Deno.cwd(), '/generated/');

const token = Deno.env.get('NODE_AUTH_TOKEN');

if (!token) {
  if (Deno.env.get('CI') && Deno.env.get('CI') !== 'false') {
    throw new Error(
      `Expected NODE_AUTH_TOKEN as string but got ${JSON.stringify(token)}`,
    );
  } else {
    console.error(
      `NODE_AUTH_TOKEN is ${
        JSON.stringify(token)
      }. Forced to dry-run publishing`,
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
    token: token || 'dry-run-token-placeholder',
    dryRun: !token,
    provenance: true,
  });
}
