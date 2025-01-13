## Version-2: Add Product Images and Use S3

**Objective:**  
Enhance the application by adding the ability to upload and store product images in **AWS S3**, and retrieve those images when product details are requested.

**Instructions:**  
- Add an image field to the **Products** endpoint. Allow users to upload an image file when creating or updating a product.
![image](https://github.com/user-attachments/assets/52b8283a-8f5f-41d4-83ed-056d37f39add)

- Store the image in **AWS S3** and save the image URL in the corresponding **Product** record in the database.
  - Use an S3 bucket to store product images.
![image](https://github.com/user-attachments/assets/ffb27456-3b4e-4d36-80ba-01a541bcfefa)

  - The URL of the image should be stored in the product’s table (alongside product details) in RDS.
![image](https://github.com/user-attachments/assets/fcaf81cd-7fb9-44bd-9319-d4ff020916df)

- When retrieving the product details, include the URL of the image along with other product details (e.g., name, description, price).
![image](https://github.com/user-attachments/assets/23ca0747-a8c7-4b49-aba6-e655df03090a)


**Bonus (Optional):**
- Add functionality to delete the product image from S3 when deleting a product.
![image](https://github.com/user-attachments/assets/babebc2a-4a6b-4cea-aa5b-ce075bd511b5)

