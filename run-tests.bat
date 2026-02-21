@echo off
REM Batch script to run PHPUnit tests on Windows
REM Usage: run-tests.bat [filter]
REM Note: TTY warning will appear but can be ignored

setlocal

echo Running Tests...
echo.

if "%~1"=="" (
    php artisan test
) else (
    php artisan test --filter=%~1
)

echo.
echo Note: The "TTY mode is not supported" warning is harmless and can be ignored.

endlocal
