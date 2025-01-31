
## Version-3: Build and Host a Simple UI

**Objective:**  
Create a simple front-end web interface to interact with your backend, allowing users to create, update, and view users, products, and orders.

**Instructions:**  
- Build a simple UI using HTML, CSS, and JavaScript (or a front-end framework like React or Vue.js or Angular if you are familiar).
- The front-end should be able to perform all **CRUD operations** (Create, Read, Update, Delete) for users, products, and orders, interacting with the backend you deployed in Version-1.
- Host the UI as a static website on **AWS S3**.
- The UI should consume the backend APIs to fetch, create, update, and delete data (via RESTful calls).

**Live Link:**
- The application is running in [Link to Website](https://main.d2nqntl6coijj2.amplifyapp.com/signup)
- **Important Note:** Before Using the Frontend URL, Make sure to open [Backend API](https://13.127.23.163) and click Advanced and then Proceed. This has to be done since the backend EC2 instance contains a self signed certificate.
- Link to [Swagger UI](https://13.127.23.163/api-docs)
- You can login as Admin by using the credentials
```
email: admin@admin.com
password: admin
```
to access all the Admin functionalities.
- If you want to Login as an user, go ahead and Sign Up.

**My Approach:**  
- I built the frontend application using React with Tremor Components for styling and Redux for state management.
- I used AWS amplify to deploy the application.
- I have implemented Role Based Access Control (Admin/User)
- The Admin can do all the operations related to the product and view all the orders in his respective dashboard.
- The User can view all the available products and place an order which is later displayed in the My Orders Page. Additionaly the User can also edit his personal information in the Profile Page.





**Bonus (Optional):**
- Add **client-side validation** for form inputs (e.g., check if a field is empty before submission).
  
![image](https://github.com/user-attachments/assets/b4823837-6813-4d2b-995f-a8866b985085)


---

## General Bonus Ideas (Optional for all versions):

1. **Logging and Monitoring:** Set up **AWS CloudWatch** to monitor the app’s logs and performance metrics (e.g., for EC2 or Lambda). This will teach you how to monitor and debug your cloud applications.
    - Enabled CloudWatch for RDS database.
    - The server keeps logging data using the logger middleware implemented
2. **Error Handling:** Implement proper error handling across the application, ensuring that meaningful error messages are returned to the client when something goes wrong.
    - Every route has been returned with a proper response message which is displayed in the frontend with the help of a toaster from sonner.

---

## Final Notes:
- **Documentation:** Encourage you to document your work well. This includes creating API documentation for the backend (Using tools like Postman or Swagger for API documentation). [Link to Swagger UI](https://13.127.23.163/api-docs)
- **Security Best Practices:** Reminder to consider **security best practices** such as proper permissions, securing the S3 bucket access etc.,
