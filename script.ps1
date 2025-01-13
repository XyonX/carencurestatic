# Get all files in the current directory (adjust path as needed)
$files = Get-ChildItem -Path . -File

# Loop through each file
foreach ($file in $files) {
    # Get the current file name
    $oldName = $file.Name

    # Replace "abba" with "dabba" in the file name
    $newName = $oldName -replace "abbba", "dabba"

    # Rename the file
    Rename-Item -Path $file.FullName -NewName $newName
}