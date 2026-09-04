Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "   fstack — Fabio's Stack / Founder's Stack" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

$nodeCmd = Get-Command node -ErrorAction SilentlyContinue
if (-not $nodeCmd) {
    Write-Error "Node.js is required to install fstack. Please install Node v18+ and rerun."
    exit 1
}

node bin/fstack.js install @args

Write-Host ""
Write-Host "=========================================" -ForegroundColor Green
Write-Host "✅ fstack successfully installed!" -ForegroundColor Green
Write-Host "Use /fstack or /engineer-mode in your agent." -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Green
