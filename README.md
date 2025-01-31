# Cake Shop Cloud Exercise

This exercise will help you build and deploy a simple web application, taking you through the steps of backend development, cloud deployment, and frontend integration. You'll start by creating a basic web application and progressively deploy and enhance it using AWS cloud services.

### [Live Link to Application](https://main.d2nqntl6coijj2.amplifyapp.com/signup)
### [Swagger API](https://13.127.23.163/api-docs) (Runs on **/api-docs** route)
#### Important Note: Before Using the Frontend URL, Make sure to open [Backend API](https://13.127.23.163/) and click Advanced and then Proceed. This has to be done since the backend EC2 instance contains a self signed certificate.

**Usage**
- You can login as Admin by using the credentials
```
email: admin@admin.com
password: admin
```
to access all the Admin functionalities.
- If you want to Login as an user, go ahead and Sign Up.
  
#### Note: Each Folder in the repo contains screenshots and approach specific to it.

## Technologies

- **Backend:**
  - Node.js
  - Express
  - PostgreSQL
  - AWS SDK
  - JWT for authentication
  - Multer for file uploads
  - Swagger for API documentation

- **Frontend:**
  - React
  - Vite
  - Tailwind CSS
  - Redux Toolkit
  - Axios for API requests


## Local Setup

### Backend

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd v3/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` directory and add the following environment variables:
   ```plaintext
   DB_USER=your_db_user
   DB_HOST=your_db_host
   DB_NAME=your_db_name
   DB_PASSWORD=your_db_password
   DB_PORT=your_db_port
   AWS_ACCESS_KEY_ID=your_aws_access_key_id
   AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
   AWS_REGION=your_aws_region
   S3_BUCKET_NAME=your_s3_bucket_name
   JWT_SECRET=your_jwt_secret
   PORT=8000
   ```

4. Start the backend server:
   ```bash
   npm run server
   ```

### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm run dev
   ```
