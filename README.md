# 🔐 Next.js Fullstack Authentication App

A comprehensive fullstack authentication system built with Next.js 15, TypeScript, and MongoDB. Features secure user registration, login, email verification, password reset functionality, and protected routes with a beautiful starfield-themed UI.

## ✨ Features

### 🔑 **Authentication System**
- **User Registration & Login**: Secure account creation and authentication
- **Email Verification**: Account activation via email tokens
- **Password Reset**: Secure password recovery via email
- **JWT Token Management**: Access tokens with HTTP-only cookies
- **Protected Routes**: Middleware-based route protection
- **Session Management**: Automatic logout and token validation

### 🛡️ **Security Features**
- **Password Hashing**: Bcrypt encryption for secure password storage
- **Token-based Authentication**: JWT tokens with expiration
- **Email Token Verification**: Secure email verification system
- **Password Reset Tokens**: Time-limited password reset functionality
- **Input Validation**: Comprehensive form validation
- **CSRF Protection**: Secure cookie handling

### 🎨 **User Interface**
- **Modern Design**: Clean, responsive UI with Tailwind CSS
- **Starfield Background**: Interactive animated starfield effect
- **Toast Notifications**: Real-time user feedback with react-hot-toast
- **RSuite Components**: Pre-built UI components for better UX
- **Mobile Responsive**: Optimized for all device sizes

### ⚡ **Technical Features**
- **Next.js 15**: Latest Next.js with App Router
- **TypeScript**: Full type safety throughout the application
- **MongoDB Integration**: Mongoose ODM for database operations
- **API Routes**: RESTful API endpoints for all auth operations
- **Middleware Protection**: Route-level authentication middleware
- **Email Service**: Nodemailer integration for email functionality

## 🛠️ Tech Stack

### **Frontend**
- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **React 19**: Latest React with concurrent features
- **RSuite**: React UI library for components
- **React Hot Toast**: Notification system
- **React Loading Icons**: Loading animations
- **React Starfield**: Background animation effects

### **Backend**
- **Next.js API Routes**: Serverless API endpoints
- **MongoDB**: NoSQL database for user data
- **Mongoose**: ODM for MongoDB operations
- **JWT**: JSON Web Tokens for authentication
- **Bcrypt.js**: Password hashing library
- **Nodemailer**: Email service integration

### **Development Tools**
- **ESLint**: Code linting and formatting
- **PostCSS**: CSS processing
- **Turbopack**: Next.js development bundler

## 🚀 Live Demo

**🌐 Live App**: [Next.js Auth App](https://auth-nextjs-ourtube-ninaad-mhadalkars-projects.vercel.app)

### **Demo Credentials**
You can test the application by creating a new account or use the demo features.

## 📱 Features Overview

### **Authentication Flow**
1. **Sign Up**: Create account with username, email, and password
2. **Email Verification**: Verify email address via token
3. **Login**: Secure authentication with JWT tokens
4. **Protected Access**: Access to protected dashboard/profile pages
5. **Password Reset**: Reset password via email token
6. **Logout**: Secure session termination

### **User Management**
- User profile dashboard
- Account verification status
- Admin role management
- Session tracking

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB database (local or cloud)
- Email service (Gmail, Mailtrap, etc.)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ninaad25/nextjs-fullstack-auth.git
   cd nextjs-fullstack-auth
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   MONGO_URI=mongodb://localhost:27017/your-db-name
   # or MongoDB Atlas
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/your-db-name
   
   # JWT Secret
   TOKEN_SECRET=your-super-secret-jwt-key-here
   
   # Domain (for production)
   DOMAIN=http://localhost:3000
   
   # Email Configuration (Nodemailer)
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   
   # Mailtrap (for testing)
   MAILTRAP_USER=your-mailtrap-user
   MAILTRAP_PASS=your-mailtrap-password
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open the application**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                     # Next.js App Router
│   ├── api/                # API Routes
│   │   ├── testdb/        # Database connection test
│   │   ├── debugenv/      # Environment debug
│   │   └── users/         # User authentication APIs
│   │       ├── login/     # Login endpoint
│   │       ├── signup/    # Registration endpoint
│   │       ├── logout/    # Logout endpoint
│   │       ├── me/        # Get current user
│   │       ├── verifyemail/     # Email verification
│   │       ├── forgotpassword/  # Password reset request
│   │       ├── resetpassword/   # Password reset
│   │       └── verifyresettoken/ # Reset token validation
│   ├── login/             # Login page
│   ├── signup/            # Registration page
│   ├── profile/           # Protected profile pages
│   ├── verifyemail/       # Email verification page
│   ├── forgotpassword/    # Forgot password page
│   ├── resetpassword/     # Reset password page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── dbConfig/              # Database configuration
├── helpers/               # Utility functions
├── models/                # Mongoose models
│   └── userModel.js       # User schema
└── middleware.ts          # Route protection middleware
```

## 🔗 API Endpoints

### **Authentication**
- `POST /api/users/signup` - User registration
- `POST /api/users/login` - User login
- `GET /api/users/logout` - User logout
- `GET /api/users/me` - Get current user

### **Email Verification**
- `POST /api/users/verifyemail` - Verify email address
- `POST /api/users/forgotpassword` - Request password reset
- `POST /api/users/resetpassword` - Reset password
- `POST /api/users/verifyresettoken` - Validate reset token

### **Utility**
- `GET /api/testdb` - Test database connection
- `GET /api/debugenv` - Debug environment variables

## 🔒 Security Implementation

### **Password Security**
```javascript
// Password hashing with bcrypt
const hashedPassword = await bcryptjs.hash(password, 10);

// Password verification
const validPassword = await bcryptjs.compare(password, user.password);
```

### **JWT Token Management**
```javascript
// Token generation
const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET!, { expiresIn: "1d" });

// Token verification in middleware
const token = request.cookies.get("token")?.value || "";
```

### **Email Token System**
```javascript
// Generate secure tokens for email verification
const hashedToken = await bcryptjs.hash(userId.toString(), 10);
```

## 🎭 User Interface Features

### **Starfield Animation**
- Interactive background using react-starfield
- Smooth animations and transitions
- Responsive design for all screen sizes

### **Toast Notifications**
- Success/error message handling
- Real-time user feedback
- Customizable notification styles

### **Form Validation**
- Client-side input validation
- Real-time error handling
- User-friendly error messages

## 🚀 Deployment

### **Vercel Deployment**
This app is optimized for Vercel deployment:

1. **Automatic Deployment**
   - Connected to GitHub for automatic deployments
   - Deploys on every push to main branch

2. **Manual Deployment**
   ```bash
   npx vercel --prod
   ```

3. **Environment Variables**
   Set up the following in Vercel dashboard:
   ```
   MONGO_URI=your-mongodb-connection-string
   TOKEN_SECRET=your-jwt-secret
   DOMAIN=https://your-domain.vercel.app
   EMAIL_USER=your-email
   EMAIL_PASS=your-email-password
   ```

### **Other Platforms**
- **Netlify**: Compatible with serverless functions
- **Railway**: Full-stack deployment with database
- **Docker**: Containerized deployment option

## 🧪 Testing

### **API Testing**
```bash
# Test database connection
curl http://localhost:3000/api/testdb

# Test environment variables
curl http://localhost:3000/api/debugenv
```

### **Authentication Flow Testing**
1. Register a new user
2. Check email for verification
3. Verify email and login
4. Access protected routes
5. Test password reset flow

## 🔧 Customization

### **Styling**
- Modify `globals.css` for global styles
- Customize Tailwind configuration
- Update RSuite theme settings

### **Authentication Logic**
- Extend user model in `userModel.js`
- Add custom middleware in `middleware.ts`
- Implement additional API endpoints

### **Email Templates**
- Customize email content in helper functions
- Add HTML email templates
- Configure different email providers

## 📈 Performance Features

- **Next.js 15**: Latest performance optimizations
- **Turbopack**: Fast development builds
- **Image Optimization**: Next.js built-in image optimization
- **Code Splitting**: Automatic route-based code splitting
- **Caching**: Efficient API response caching

## 🔍 Monitoring & Analytics

- **Vercel Analytics**: Built-in performance monitoring
- **Error Tracking**: Comprehensive error handling
- **User Activity**: Login/logout tracking
- **Database Monitoring**: MongoDB connection health

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### **Contribution Guidelines**
- Follow TypeScript best practices
- Maintain consistent code formatting
- Add proper error handling
- Update documentation for new features
- Test all authentication flows

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Ninaad M**
- GitHub: [@Ninaad25](https://github.com/Ninaad25)
- LinkedIn: [Connect with me](https://linkedin.com/in/ninaad390)

## 🙏 Acknowledgments

- **Next.js Team**: For the amazing React framework
- **Vercel**: For hosting and deployment platform
- **MongoDB**: For the reliable database solution
- **React Community**: For the ecosystem of packages
- **Open Source**: For all the libraries and tools used

## 📚 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [JWT Introduction](https://jwt.io/introduction/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

## 📋 Future Enhancements

- [ ] **OAuth Integration**: Google, GitHub, Facebook login
- [ ] **Two-Factor Authentication**: SMS/Email 2FA
- [ ] **User Roles**: Advanced role-based permissions
- [ ] **Profile Pictures**: Avatar upload functionality
- [ ] **Account Settings**: Advanced user preferences
- [ ] **Admin Dashboard**: User management interface
- [ ] **Email Templates**: Rich HTML email designs
- [ ] **Social Features**: User connections and messaging
- [ ] **API Rate Limiting**: Request throttling
- [ ] **Audit Logs**: User activity tracking

---

⭐ **Star this repository if you found it helpful!**

🔐 **Build secure applications with confidence!**
