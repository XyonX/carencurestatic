import os
import copy
from bs4 import BeautifulSoup

# Get the current working directory (the root directory of your script)
directory = os.getcwd()
base_layout_name = "BaseLayout.html"
content_left_file = "ContentLeft2.html"  # New file containing the left content

def load_content_left():
    """Load the content-left2 section from external file"""
    if not os.path.isfile(content_left_file):
        print(f"Error: {content_left_file} not found.")
        exit(1)
    
    with open(content_left_file, "r", encoding="utf-8") as f:
        content = f.read()
    return BeautifulSoup(content, "html.parser").find("aside", id="content-left2")

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

    # Load content-left2 section
    content_left = load_content_left()
    if not content_left:
        print(f"Error: content-left2 not found in {content_left_file}")
        return
    
        # Find main elements
    wrapper = soup.find("div", id="wrapper")
    header = soup.find("header", id="header") if wrapper else None
    main_content_right = soup.find("div", id="main-content-right")

        # Ensure required elements exist
    if not all([wrapper, header, main_content_right]):
        missing = []
        if not wrapper: missing.append("Wrapper div")
        if not header: missing.append("Header")
        if not main_content_right: missing.append("Main-content-right")
        print(f"Skipping {html_file_path} - Missing: {', '.join(missing)}")
        return
    
    # Insert content-left2 after header
    if not wrapper.find("aside", id="content-left2"):
        header.insert_after(copy.copy(content_left))


    # Write the modified HTML back to the same file, preserving &nbsp; and other entities
    with open(html_file_path, "w", encoding="utf-8") as file:
        file.write(soup.prettify(formatter="html"))
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
