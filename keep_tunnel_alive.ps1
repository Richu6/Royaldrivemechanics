while ($true) {
    Write-Host "[BORE] Starting tunnel to bore.pub:25144..."
    & .\bore.exe local 4321 --to bore.pub --port 25144
    Write-Host "[BORE] Disconnected. Reconnecting in 2 seconds..."
    Start-Sleep -Seconds 2
}
