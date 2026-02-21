@echo off
REM Batch script to run Property-Based Tests on Windows
REM Usage: run-property-tests.bat [test-name]
REM Note: TTY warning will appear but can be ignored

setlocal

echo Running Property-Based Tests...
echo.

if "%~1"=="" (
    REM Run all property tests
    php artisan test tests/Property
) else (
    REM Run specific property test
    php artisan test --filter=%~1
)

echo.
echo Note: Property-based tests may take longer to run.
echo Note: The "TTY mode is not supported" warning is harmless and can be ignored.

endlocal
