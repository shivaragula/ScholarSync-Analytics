# PowerShell script to prepare project for clean Git repository
Write-Host "🚀 Preparing Student Analytics Dashboard for Git..." -ForegroundColor Green

# Create a new directory for clean project
$cleanDir = "student-analytics-dashboard-clean"
if (Test-Path $cleanDir) {
    Remove-Item -Recurse -Force $cleanDir
}
New-Item -ItemType Directory -Path $cleanDir | Out-Null

Write-Host "📁 Created clean directory: $cleanDir" -ForegroundColor Yellow

# Copy essential files and folders
$filesToCopy = @(
    "src",
    "public", 
    "build",
    "package.json",
    "package-lock.json",
    "index.html",
    "vite.config.mjs",
    "tailwind.config.js",
    "postcss.config.js",
    "jsconfig.json",
    ".gitignore",
    ".env",
    ".env.production",
    "vercel.json",
    "server.js",
    "test-server.js",
    "DEPLOYMENT_GUIDE.md",
    "BACKEND_SETUP.md",
    "GOOGLE_SHEETS_SETUP.md",
    "TROUBLESHOOTING.md"
)

foreach ($item in $filesToCopy) {
    if (Test-Path $item) {
        if (Test-Path $item -PathType Container) {
            # It's a directory
            Copy-Item -Path $item -Destination "$cleanDir\$item" -Recurse -Force
            Write-Host "✅ Copied directory: $item" -ForegroundColor Green
        } else {
            # It's a file
            Copy-Item -Path $item -Destination "$cleanDir\$item" -Force
            Write-Host "✅ Copied file: $item" -ForegroundColor Green
        }
    } else {
        Write-Host "⚠️  Not found: $item" -ForegroundColor Yellow
    }
}

Write-Host "`n🎯 Clean project ready in: $cleanDir" -ForegroundColor Green
Write-Host "📋 Next steps:" -ForegroundColor Cyan
Write-Host "1. cd $cleanDir" -ForegroundColor White
Write-Host "2. git init" -ForegroundColor White
Write-Host "3. git add ." -ForegroundColor White
Write-Host "4. git commit -m 'Initial commit: Student Analytics Dashboard'" -ForegroundColor White
Write-Host "5. git remote add origin https://github.com/YOUR_USERNAME/student-analytics-dashboard.git" -ForegroundColor White
Write-Host "6. git branch -M main" -ForegroundColor White
Write-Host "7. git push -u origin main" -ForegroundColor White