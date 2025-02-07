import os
import copy
from bs4 import BeautifulSoup, Doctype, NavigableString

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

def process_html_file(page_path):
    try:
        if os.path.basename(page_path) in [base_layout_name, content_left_file]:
            return

        # Load page content
        with open(page_path, "r", encoding="utf-8") as f:
            page_html = f.read()
        soup_page = BeautifulSoup(page_html, "html.parser")

        # Load base layout
        with open(base_layout_name, "r", encoding="utf-8") as f:
            base_html = f.read()
        soup_base = BeautifulSoup(base_html, "html.parser")

        # Load content-left2 section
        content_left = load_content_left()
        if not content_left:
            print(f"Error: content-left2 not found in {content_left_file}")
            return

        # Find main elements
        wrapper = soup_page.find("div", id="wrapper")
        header = soup_page.find("header", id="header") if wrapper else None
        original_content = soup_page.find("div", id="main-content-right")
        base_main_div = soup_base.find("div", id="main-content-right")

        # Create wrapper if it doesn't exist
        if not wrapper:
            wrapper = soup_page.new_tag("div", id="wrapper")
            body = soup_page.find("body")
            if body:
                body.insert(0, wrapper)

        # Ensure required elements exist
        if not all([wrapper, header, original_content, base_main_div]):
            missing = []
            if not wrapper: missing.append("Wrapper div")
            if not header: missing.append("Header")
            if not original_content: missing.append("Main content")
            if not base_main_div: missing.append("Base layout content")
            print(f"Skipping {page_path} - Missing: {', '.join(missing)}")
            return

        # Insert content-left2 after header
        if not wrapper.find("aside", id="content-left2"):
            header.insert_after(copy.copy(content_left))

        # Update main content from base layout
        base_container = soup_base.find("section", id="content")
        if base_container:
            base_container.clear()
            for child in original_content.contents:
                if isinstance(child, NavigableString):
                    base_container.append(type(child)(child))
                else:
                    base_container.append(copy.copy(child))

        # Replace main content div
        original_content.replace_with(copy.copy(base_main_div))

        # Reorganize wrapper structure
        wrapper.clear()
        wrapper.append(header)
        wrapper.append(content_left)
        wrapper.append(base_main_div)

        # Preserve doctype
        doctype = next((c for c in soup_page.contents if isinstance(c, Doctype)), Doctype("html"))

        # Write updated HTML
        with open(page_path, "w", encoding="utf-8") as f:
            f.write(str(doctype) + '\n' + soup_page.prettify(formatter="html"))
            
        print(f"Updated: {page_path}")

    except Exception as e:
        print(f"Error processing {page_path}: {str(e)}")

# Process all HTML files
for root, _, files in os.walk(directory):
    for file in files:
        if file.lower().endswith((".html", ".htm")):
            path = os.path.join(root, file)
            process_html_file(path)