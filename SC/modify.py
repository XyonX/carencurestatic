from bs4 import BeautifulSoup

# Specify the file name
file_name = "medical-tourism-india.htm"

# List of IDs to remove
selectors_to_remove = ["content-left", "content-right-right","g-recaptcha"]

# Load the HTML file
with open(file_name, "r", encoding="utf-8") as file:
    html = file.read()

# Parse the HTML
soup = BeautifulSoup(html, "html.parser")

# Loop through the selectors and remove corresponding elements
for selector in selectors_to_remove:

    #remvoe element by id
    element_to_remove = soup.find(id=selector)
    if element_to_remove:
        element_to_remove.decompose()  # Removes the element completely

    # Remove elements by class
    elements_by_class = soup.find_all(class_=selector)
    for element in elements_by_class:
        element.decompose()  # Removes the elements completely

# Write the modified HTML back to the same file
with open(file_name, "w", encoding="utf-8") as file:
    file.write(soup.prettify())

