# Set the directory to the location of this script
$directory = Split-Path -Parent $MyInvocation.MyCommand.Path

# Define the target word or string to replace
$targetWord = '#FF6F61'
$replacementWord = "#FF6F61"

# File types to process (optional: adjust as needed, e.g., *.txt, *.html, *.cs)
$fileTypes = "*.*"  # Processes all file types. Adjust if needed.

# Get all files of specified types in the directory and subfolders
Get-ChildItem -Path $directory -Filter $fileTypes -Recurse | ForEach-Object {
    $file = $_.FullName

    # Read file content
    $content = Get-Content -Path $file -Raw

    # Check if the target word exists in the file
    if ($content -match [regex]::Escape($targetWord)) {
        Write-Host "Found target word in file: $file" -ForegroundColor Yellow

        # Replace the target word with the replacement word
        $updatedContent = $content -replace [regex]::Escape($targetWord), $replacementWord

        # Write the updated content back to the file
        Set-Content -Path $file -Value $updatedContent
        Write-Host "Updated file: $file" -ForegroundColor Green
    }
    else {
        Write-Host "No match found in file: $file" -ForegroundColor Gray
    }
}

Write-Host "Completed processing all files in the directory and subfolders." -ForegroundColor Cyan

















