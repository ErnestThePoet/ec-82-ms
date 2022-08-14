:: This script cleans up all js files in modules folder which are generated during tests.
echo ========== CLEAN UP ==========
cd modules
del /a /f /s /q "*.js"
cd ../observables
del /a /f /s /q "*.js"
cd ../test
del /a /f /s /q "*.js"