:: This script cleans up all js files in modules folder which are generated during tests.
cd modules
del /a /f /s /q "*.js"