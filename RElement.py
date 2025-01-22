import os
from bs4 import BeautifulSoup

# Get the current working directory (the root directory of your script)
directory = os.getcwd()

# Function to process each HTML file
def process_html_file(html_file_path):
    # List of IDs and classes to remove
    selectors_to_remove = ["content-left", "content-right-right", "g-recaptcha"]

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

    # Loop through the selectors and remove corresponding elements
    for selector in selectors_to_remove:
        # Remove element by ID
        element_to_remove = soup.find(id=selector)
        if element_to_remove:
            element_to_remove.decompose()
            print(f"Removed element with id='{selector}' from {html_file_path}")

        # Remove elements by class
        elements_by_class = soup.find_all(class_=selector)
        for element in elements_by_class:
            element.decompose()
            print(f"Removed element with class='{selector}' from {html_file_path}")

    # Remove all <img> tags inside an element with id="logo"
    parent_with_logo_id = soup.find(id="logo")
    if parent_with_logo_id:
        img_elements = parent_with_logo_id.find_all("img")  # Find all <img> tags inside the parent
        for img_element in img_elements:
            img_element.decompose()
            print(f"Removed <img> tag inside id='logo' from {html_file_path}")

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
