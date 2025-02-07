import os
import copy
from bs4 import BeautifulSoup, Doctype, NavigableString

directory = os.getcwd()
base_layout_name = "BaseLayout.html"

def process_html_file(page_path):
    try:
        if os.path.basename(page_path) == base_layout_name:
            return

        # Load page content
        with open(page_path, "r", encoding="utf-8") as f:
            page_html = f.read()
        soup_page = BeautifulSoup(page_html, "html.parser")

        # Load fresh base layout
        with open(base_layout_name, "r", encoding="utf-8") as f:
            base_html = f.read()
        soup_base = BeautifulSoup(base_html, "html.parser")

        # Find content areas
        original_content = soup_page.find("div", id="main-content-right")
        base_container = soup_base.find("section", id="content")
        base_main_div = soup_base.find("div", id="main-content-right")

        if not all([original_content, base_container, base_main_div]):
            missing = []
            if not original_content: missing.append("Original page content")
            if not base_container: missing.append("Base content container")
            if not base_main_div: missing.append("Base main div")
            print(f"Skipping {page_path} - Missing: {', '.join(missing)}")
            return

        # Clear base content area and insert original content
        base_container.clear()
        for child in original_content.contents:
            # Handle different node types properly
            if isinstance(child, NavigableString):
                # Create new string instance to avoid cross-soup issues
                base_container.append(type(child)(child))
            else:
                # Create proper copy of tag elements
                base_container.append(copy.copy(child))

        # Replace original page's main div with updated base version
        original_content.replace_with(copy.copy(base_main_div))

        # Write the modified HTML back to the same file, preserving special entities
        with open(page_path, "w", encoding="utf-8") as output_file:
            output_file.write(soup_page.prettify(formatter="html"))
            
        print(f"Successfully updated: {page_path}")

    except Exception as e:
        print(f"Error processing {page_path}: {str(e)}")

# Process all HTML files except base layout
for root, _, files in os.walk(directory):
    for file in files:
        if file.lower().endswith((".html", ".htm")):
            path = os.path.join(root, file)
            process_html_file(path)