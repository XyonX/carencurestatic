import os
from bs4 import BeautifulSoup

# Get the current working directory (the root directory of your script)
directory = os.getcwd()

# The hosted CSS file URL
css_file_name = "https://www.careandcure.us/styles.css"

# Function to process each HTML file
def process_html_file(html_file_path):
    try:
        # Try reading the file with utf-8 encoding
        with open(html_file_path, "r", encoding="utf-8") as file:
            html = file.read()
    except UnicodeDecodeError:
        # Fallback to latin-1 encoding if utf-8 fails
        with open(html_file_path, "r", encoding="latin-1") as file:
            html = file.read()

    # Parse the HTML
    soup = BeautifulSoup(html, "html.parser")

    # Ensure the <head> section exists
    if not soup.head:
        print(f"Warning: No <head> found in {html_file_path}. Skipping file.")
        return

    # Remove all <style> elements in the <head>
    for style in soup.head.find_all("style"):
        style.decompose()

    # Check if styles.css is already linked
    existing_link = soup.head.find("link", rel="stylesheet", href=css_file_name)
    if not existing_link:
        # Add a <link> tag at the beginning of the <head>
        new_link = soup.new_tag("link", rel="stylesheet", href=css_file_name)
        soup.head.insert(0, new_link)

    # Write the modified HTML back to the same file
    with open(html_file_path, "w", encoding="utf-8") as file:
        file.write(soup.prettify())

    print(f"Processed: {html_file_path}")

# Iterate over all files in the script's root directory and subdirectories
for root, dirs, files in os.walk(directory):
    for file_name in files:
        # Process only .html and .htm files
        if file_name.lower().endswith((".html", ".htm")):
            html_file_path = os.path.join(root, file_name)
            try:
                process_html_file(html_file_path)
            except Exception as e:
                print(f"Error processing {html_file_path}: {e}")
