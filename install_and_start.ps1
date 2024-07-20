# Check if Node.js is installed
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "Node.js is not installed. Installing Node.js..."

    # Download Node.js installer
    $nodeInstallerUrl = "https://nodejs.org/dist/v18.17.1/node-v18.17.1-x64.msi"
    $nodeInstallerPath = "$env:TEMP\nodejs_installer.msi"

    Invoke-WebRequest -Uri $nodeInstallerUrl -OutFile $nodeInstallerPath

    # Install Node.js
    Start-Process msiexec.exe -ArgumentList "/i", $nodeInstallerPath, "/quiet", "/norestart" -Wait

    # Remove the installer
    Remove-Item $nodeInstallerPath
} else {
    Write-Host "Node.js is already installed."
}

# Check if npm is installed
if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Host "npm is not installed. Please install npm manually."
    exit 1
} else {
    Write-Host "npm is already installed."
}

# Navigate to the directory containing the package.json
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location $scriptPath

# Install dependencies
Write-Host "Installing dependencies..."
npm install

# Start the Electron application
Write-Host "Starting the Electron application..."
npm start
