# PowerShell script to start the backend server
Write-Host "Starting EEE Department Backend Server..." -ForegroundColor Green

# Check if port 3001 is in use
$portInUse = Get-NetTCPConnection -LocalPort 3001 -ErrorAction SilentlyContinue
if ($portInUse) {
    Write-Host "Port 3001 is in use. Killing existing process..." -ForegroundColor Yellow
    $portInUse | ForEach-Object { 
        Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue
    }
    Start-Sleep -Seconds 1
}

# Start the server
Write-Host "Starting server on port 3001..." -ForegroundColor Cyan
npm start

