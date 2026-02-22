# Feedback-Next

A modern, full-stack anonymous feedback application built with Next.js 15. This platform allows users to create a personal feedback link, share it via a unique QR code, and receive genuine, unfiltered comments anonymously. It also features Google Gemini AI integration to generate or enhance constructive feedback messages.

## 🚀 Features

- **Anonymous Messaging:** Send and receive private feedback without revealing your identity.
- **AI-Powered Assistance:** Integrated with Google Gemini to analyze sentiment and suggest or enhance constructive feedback drafts.
- **User Dashboard:** A comprehensive dashboard to view recent messages, track analytics (messages per week/month), and manage your public link.
- **Custom Authentication:** Secure, JWT-based authentication with HTTP-only cookies.
- **OTP Email Verification:** Real-time email verification using NodeMailer and React Email upon sign-up.
- **Shareable QR Codes:** Instantly generate QR codes linking to your personal feedback page.
- **Acceptance Toggle:** Easily enable or disable new inbound messages at any time.
- **Dark & Light Mode:** Fully responsive UI with theme toggling support.

## 🛠 Tech Stack

- **Frontend:** Next.js 15 (App Router), React 19, TailwindCSS 4, React Email
- **Backend:** Next.js API Routes, Google Generative AI (Gemini 1.5 Flash)
- **Database:** MongoDB (via Mongoose)
- **Security:** bcryptjs (password hashing), jsonwebtoken (JWT)
- **Validation:** Zod

## ⚙️ Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/sajidmehmoodtariq30/feedback-next.git
cd feedback-next
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and add the following keys. You can use `.env.example` as a reference.

```env
# Database URI
MONGO_URI=mongodb+srv://<username>:<password>@cluster/feedback

# App Environment Variables
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Authentication Secret
JWT_SECRET=your-super-secret-jwt-key

# Email Configuration (Nodemailer)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM="Your App Name"
APP_NAME="Feedback App"

# Google Gemini API
GEMINI_API_KEY=your_gemini_api_key
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app in action.

## 📁 Project Structure

- `src/app/api/*`: Backend route handlers for authentication, message delivery, and Gemini integrations.
- `src/app/(pages)/*`: Page views including Dashboard, Authentication, and the Public Message Sender.
- `src/components/*`: Reusable UI components including the AI Message Assistant and QR Code generator.
- `src/models/*`: Mongoose database schemas (`User` and embedded `Message`).
- `src/lib/*`: Utilities for DB connection, JWT signing, Email transporter, and Gemini initialization.
- `src/schemas/*`: Zod schemas for strict input validation.

## 🛡 Security & Privacy

- Messages are strictly anonymous by default.
- Custom authentication manages sessions securely natively with HTTP-only cookies to mitigate XSS risks.
- Passwords are securely hashed with bcrypt.
- Input data on frontend and backend is validated strictly through Zod.

## 📜 License

This project is licensed under the MIT License - see the [MIT](LICENSE) file for details.
