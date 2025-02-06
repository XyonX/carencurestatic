import os
from bs4 import BeautifulSoup, Doctype

directory = os.getcwd()
base_layout_name = "BaseLayout.html"

def process_html_file(page_path):
    try:
        # Skip processing the base layout file itself
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

        # Find content containers
        page_content = soup_page.find("div", id="main-content-right")
        base_container = soup_base.find("section", id="content")

        if not page_content:
            print(f"No main-content-right in {page_path}")
            return

        if not base_container:
            print(f"No content section in base layout")
            return

        # Clear base container and inject page content
        base_container.clear()
        for child in page_content.contents:
            # Convert to string and reparse to avoid cross-soup issues
            temp_soup = BeautifulSoup(str(child), "html.parser")
            base_container.append(temp_soup)

        # Preserve original doctype if exists
        if soup_base.contents and isinstance(soup_base.contents[0], Doctype):
            doctype = str(soup_base.contents[0])
        else:
            doctype = "<!DOCTYPE html>"

        # Rebuild final HTML
        final_html = f"{doctype}\n{soup_base.html.unwrap().prettify()}"
        
        # Write back to original file
        with open(page_path, "w", encoding="utf-8") as f:
            f.write(final_html)
            
        print(f"Updated: {page_path}")

    except Exception as e:
        print(f"Failed {page_path}: {str(e)}")

# Process all HTML files except base layout
for root, _, files in os.walk(directory):
    for file in files:
        if file.lower().endswith((".html", ".htm")):
            path = os.path.join(root, file)
            process_html_file(path)