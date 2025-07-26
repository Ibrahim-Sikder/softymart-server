@echo off
echo Installing node_modules for all services...

:: ✅ Install for all services inside "services" folder
for /d %%i in (services\*) do (
  if exist "%%i\package.json" (
    echo Installing in %%i...
    cd %%i
    call npm install
    cd ..\..
  )
)

:: ✅ Install for "user" service in root (if exists)
if exist "user\package.json" (
  echo Installing in user...
  cd user
  call npm install
  cd ..
)

:: ✅ Install for "api-gateway" service in root (if exists)
if exist "api-gateway\package.json" (
  echo Installing in api-gateway...
  cd api-gateway
  call npm install
  cd ..
)

echo ✅ All node_modules installed!
pause
