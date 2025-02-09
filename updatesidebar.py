import os
from bs4 import BeautifulSoup

# Get the current working directory (the root directory of your script)
directory = os.getcwd()

new_code_file_name = "zsidebar.html"  # File containing the new <div> code

# Ensure the new_code_file_name exists
if not os.path.isfile(new_code_file_name):
    print(f"Error: {new_code_file_name} not found.")
    exit(1)

# Function to process each HTML file
def process_html_file(html_file_path):
    try:
        # Load the original HTML file
        with open(html_file_path, "r", encoding="utf-8") as original_file:
            html = original_file.read()

        # Load the new HTML code from a file
        with open(new_code_file_name, "r", encoding="utf-8") as new_code_file:
            new_code_html = new_code_file.read()

        # Parse the original HTML
        soup = BeautifulSoup(html, "html.parser")

        # Parse the new HTML code and extract the desired <div>
        new_div = BeautifulSoup(new_code_html, "html.parser").find("div", class_="sidebar")

        # Find the existing <div> with id="sidebar" in the original HTML
        old_div = soup.find("div", class_="sidebar")

        # Replace the old <div> with the new <div>
        if old_div and new_div:
            old_div.replace_with(new_div)
            print(f"Replaced 'sidebar' div in {html_file_path}")
        elif not old_div:
            print(f"Warning: No div with id 'sidebar' found in {html_file_path}")
        elif not new_div:
            print(f"Warning: No div with id 'sidebar' found in {new_code_file_name}")

        # Write the modified HTML back to the same file, preserving special entities
        with open(html_file_path, "w", encoding="utf-8") as output_file:
            output_file.write(soup.prettify(formatter="html"))
        print(f"Processed: {html_file_path}")

    except Exception as e:
        print(f"Error processing {html_file_path}: {e}")

# Iterate over all files in the script's root directory and subdirectories
for root, dirs, files in os.walk(directory):
    for file_name in files:
        # Process only .html and .htm files
        if file_name.lower().endswith((".html", ".htm")):
            html_file_path = os.path.join(root, file_name)
            process_html_file(html_file_path)
