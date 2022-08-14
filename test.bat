:: This script automatically compile and run a single .ts test.
:: Usage: ./test xxx
call tsc test/%1%-test.ts
node --trace-uncaught test/%1%-test.js
call clean>nul 2>nul