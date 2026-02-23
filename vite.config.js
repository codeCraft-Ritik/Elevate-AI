import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import obfuscator from 'vite-plugin-javascript-obfuscator';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // 🛡️ SECURITY LAYER: Scrambles code during production build
    obfuscator({
      compact: true,
      controlFlowFlattening: true, // Rewrites code flow to be confusing
      controlFlowFlatteningThreshold: 0.75,
      deadCodeInjection: true, // Injects fake code to distract inspectors
      deadCodeInjectionThreshold: 0.4,
      debugProtection: true, // Disables console and debugger tools
      debugProtectionInterval: 2000,
      disableConsoleOutput: true, // Prevents others from seeing your logs
      identifierNamesGenerator: 'hexadecimal', // Renames variables to hex strings like _0x1a2b
      log: false,
      renameGlobals: false,
      rotateStringArray: true,
      selfDefending: true, // Makes the code crash if someone tries to "beautify" it
      stringArray: true,
      stringArrayThreshold: 0.75,
    }),
  ],
  // OPTIONAL: Port configuration to keep your dev environment consistent
  server: {
    port: 5173,
    strictPort: true,
  },
});