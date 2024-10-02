import { join } from 'path';
import { InterwebBuild, InterwebBuildOptions } from '@interweb/build';

interface BuildConfig {
  entryFile: string;
  outFile: string;
  externalPackages: string[];
}

const rootDir = join(__dirname, '/../');

async function buildInterweb(config: BuildConfig): Promise<void> {
  const { entryFile, outFile, externalPackages } = config;

  const options: Partial<InterwebBuildOptions> = {
    entryPoints: [join(rootDir, entryFile)],
    outfile: join(rootDir, outFile),
    external: externalPackages
  };

  try {
    await InterwebBuild.build(options);
    console.log(`Build completed successfully! Output: ${options.outfile}`);
  } catch (error) {
    console.error('Build failed:', error);
    throw error;
  }
}

// Example usage
async function main() {
  const configs: BuildConfig[] = [
    {
      entryFile: 'src/contract1/index.ts',
      outFile: 'contracts/bundle1.js',
      externalPackages: ['otherpackage', '~somepackage']
    },
    {
      entryFile: 'src/contract2/index.ts',
      outFile: 'contracts/bundle2.js',
      externalPackages: ['differentpackage']
    }
  ];

  for (const config of configs) {
    try {
      await buildInterweb(config);
    } catch (error) {
      console.error(`Build failed for ${config.entryFile}:`, error);
    }
  }
}

main().catch(console.error);