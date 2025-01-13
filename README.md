# Cake Shop Cloud Exercise

This exercise will help you build and deploy a simple web application, taking you through the steps of backend development, cloud deployment, and frontend integration. You'll start by creating a basic web application and progressively deploy and enhance it using AWS cloud services.

### [Live Link to Application](https://main.d2nqntl6coijj2.amplifyapp.com/signup)
#### Important Note: Before Using the Frontend URL, Make sure to open [Backend API](https://13.127.23.163/) and click Advanced and then Proceed. This has to be done since the backend EC2 instance contains a self signed certificate.
#### *Note: Each Folder in the repo contains screenshots and approach specific to it.*

## Version-0: Build a Simple Web Application

**Objective:**  
Develop a basic RESTful web application with the following functionalities:

### Users:
- Create user
- Update user
- Delete user
- Get user details

### Products:
- Create product
- Update product
- Delete product
- Get product details

### Orders:
- Create order
- Update order
- Get order details

**Instructions:**  
- Use **basic authentication** (e.g., JWT or simple API key or simple username/password) to secure the endpoints, ensuring only authenticated users can interact with the app.
- For the local datastore, use **MySQL** or **PostgreSQL** to persist the data. You may choose whichever you're most comfortable with. If needed, provide an example schema for Users, Products, and Orders.
- Feel free to add any additional features (pagination, error handling) based on your knowledge.

**Bonus (Optional):**
- Implement basic **input validation** for each endpoint (e.g., required fields for creating users/products/orders, valid data types, etc.).

---

## Version-1: Deploy to AWS

**Objective:**  
Deploy the application to **AWS** using appropriate cloud services. Ensure the application is fully functional and accessible.

**Instructions:**  
- Deploy the backend using **AWS EC2** or **AWS Lambda** (use the service you are more comfortable with).
  - For EC2, use a simple web server (e.g., Node.js, Python Flask) to host the application.
  - For Lambda, use an API Gateway to expose the Lambda functions.
- Use **AWS RDS** (either MySQL or PostgreSQL) as your datastore. Ensure the application is connected to the RDS instance, and data can be retrieved and stored correctly.
- **Security:** Set up basic security for your deployed application using **AWS IAM** roles and **Security Groups** to limit access to only authorized users.

---

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

---

## Version-3: Build and Host a Simple UI

**Objective:**  
Create a simple front-end web interface to interact with your backend, allowing users to create, update, and view users, products, and orders.

**Instructions:**  
- Build a simple UI using HTML, CSS, and JavaScript (or a front-end framework like React or Vue.js or Angular if you are familiar).
- The front-end should be able to perform all **CRUD operations** (Create, Read, Update, Delete) for users, products, and orders, interacting with the backend you deployed in Version-1.
- Host the UI as a static website on **AWS S3**.
- The UI should consume the backend APIs to fetch, create, update, and delete data (via RESTful calls).

**Bonus (Optional):**
- Add **client-side validation** for form inputs (e.g., check if a field is empty before submission).

---

## General Bonus Ideas (Optional for all versions):

1. **Logging and Monitoring:** Set up **AWS CloudWatch** to monitor the app’s logs and performance metrics (e.g., for EC2 or Lambda). This will teach you how to monitor and debug your cloud applications.
2. **Error Handling:** Implement proper error handling across the application, ensuring that meaningful error messages are returned to the client when something goes wrong.

---

## Final Notes:
- **Documentation:** Encourage you to document your work well. This includes creating API documentation for the backend (Using tools like Postman or Swagger for API documentation).
- **Security Best Practices:** Reminder to consider **security best practices** such as proper permissions, securing the S3 bucket access etc.,
