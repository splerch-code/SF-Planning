import requests
from bs4 import BeautifulSoup
import os

url = "https://satisfactory.fandom.com/wiki/Category:Fluid_icons"
save_folder = "public/sf-images/item-images"

# Fetch the page content
image_page = requests.get(url)
page_soup = BeautifulSoup(image_page.content, "html.parser")

# Find the gallery element
gallery = page_soup.find("ul", class_="gallery mw-gallery-traditional")

# Iterate through all 'li' elements in the gallery
for li in gallery.find_all("li", class_="gallerybox"):
    # Find the 'a' tag with the full-size image URL
    a_tag = li.find("a", class_="image")
    if a_tag:
        img_url = a_tag.get("href")

        # Find the 'img' tag and get the data-image-name attribute
        img_tag = li.find("img")
        if img_tag:
            img_name = img_tag.get("data-image-name")

            # Ensure both the URL and the image name are valid
            if img_url and img_name:
                # Full image URL (in case it's relative)
                if not img_url.startswith("http"):
                    img_url = "https:" + img_url

                # Download the image
                img_data = requests.get(img_url).content

                # Save the image with the correct name
                img_path = os.path.join(save_folder, img_name)
                with open(img_path, "wb") as img_file:
                    img_file.write(img_data)

                print(f"Downloaded {img_name}")

print("All images downloaded.")
