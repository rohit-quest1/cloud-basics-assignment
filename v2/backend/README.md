## Version-2: Add Product Images and Use S3

**Objective:**  
Enhance the application by adding the ability to upload and store product images in **AWS S3**, and retrieve those images when product details are requested.

**Instructions:**  
- Add an image field to the **Products** endpoint. Allow users to upload an image file when creating or updating a product.
- Store the image in **AWS S3** and save the image URL in the corresponding **Product** record in the database.
  - Use an S3 bucket to store product images.
  - The URL of the image should be stored in the product’s table (alongside product details) in RDS.
- When retrieving the product details, include the URL of the image along with other product details (e.g., name, description, price).

**Bonus (Optional):**
- Add functionality to delete the product image from S3 when deleting a product.

