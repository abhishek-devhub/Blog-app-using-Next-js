<div align="center">

<br/>

<img src="https://img.shields.io/badge/BlogVerse-Next.js%20Blog%20Platform-6366f1?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="BlogVerse" />

<h1>📝 BlogVerse</h1>

<p><strong>A full-stack, modern blogging platform built with Next.js 14, MongoDB & Cloudinary.</strong><br/>
Write, share, and discover stories that matter.</p>

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=nextdotjs)](https://nextjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![NextAuth](https://img.shields.io/badge/NextAuth.js-v4-purple?style=flat-square)](https://next-auth.js.org/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-Image%20Uploads-3448C5?style=flat-square&logo=cloudinary)](https://cloudinary.com/)
[![GSAP](https://img.shields.io/badge/GSAP-Animations-88CE02?style=flat-square&logo=greensock)](https://gsap.com/)

</div>

---

## ✨ Features

- 🔐 **Dual Authentication** — Secure login via **NextAuth** (OAuth) and a custom **credentials-based** system
- ✍️ **Blog Management** — Create, read, and manage your own blog posts with rich content and cover images
- 📸 **Cloud Image Uploads** — Seamless image hosting powered by **Cloudinary**
- ❤️ **Favorites** — Bookmark blogs you love and revisit them anytime
- 💬 **Comments & Likes** — Engage with the community through comments and likes on posts
- 🗂️ **Categories** — Browse and filter content by topic
- 📬 **Contact Form** — Built-in contact page with database-backed message storage
- 🎨 **Stunning Animations** — Smooth GSAP-powered text and scroll animations
- 📱 **Fully Responsive** — Optimized layout for mobile, tablet, and desktop
- 🔒 **Protected Routes** — Route-level access control via Next.js Middleware

---

## 🖼️ Tech Stack

| Layer         | Technology                                     |
|---------------|------------------------------------------------|
| **Framework** | Next.js 14 (App Router)                        |
| **Styling**   | Tailwind CSS v4, tw-animate-css                |
| **Database**  | MongoDB via Mongoose                           |
| **Auth**      | NextAuth.js v4 + Custom JWT/localStorage auth  |
| **Storage**   | Cloudinary (next-cloudinary)                   |
| **Animation** | GSAP + @gsap/react                             |
| **Icons**     | FontAwesome, Lucide React                      |
| **UI Utils**  | Radix UI, clsx, class-variance-authority       |
| **Toasts**    | react-toastify                                 |

---

## 📁 Project Structure

```
my-app/
├── app/
│   ├── Context/
│   │   └── AuthContext.js        # Global auth state (localStorage-based)
│   ├── api/
│   │   ├── auth/                 # NextAuth configuration
│   │   ├── blog/                 # Blog CRUD API routes
│   │   ├── favorites/            # Favorites API routes
│   │   ├── contact/              # Contact form API route
│   │   ├── registeruser/         # User registration endpoint
│   │   ├── login/                # Custom login endpoint
│   │   └── logout/               # Logout endpoint
│   ├── blog/                     # Blog detail page
│   ├── favorites/                # Favorites page (protected)
│   ├── myblogs/                  # User's own blogs page
│   ├── login/                    # Login page
│   ├── Registerpage/             # Registration page
│   ├── contact/                  # Contact page
│   └── layout.js                 # Root layout
├── components/
│   ├── Navbar.js                 # Responsive navbar with auth state
│   ├── Footer.js                 # Site footer
│   ├── Homelayout.js             # Home page layout & blog feed
│   ├── PostingBlogs.js           # Blog creation form
│   ├── SessionWrapper.js         # NextAuth session provider wrapper
│   ├── textanimation.js          # GSAP SplitText animation component
│   └── typinganimation.js        # GSAP typing effect component
├── models/
│   ├── BlogPost.js               # Blog post Mongoose schema
│   ├── registeruser.js           # User Mongoose schema
│   ├── Favorite.js               # Favorites Mongoose schema
│   └── ContactUsers.js           # Contact form Mongoose schema
├── lib/                          # Utility functions (DB connection, etc.)
├── middleware.js                 # Route protection middleware
└── public/                       # Static assets
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) >= 18.x
- [MongoDB](https://www.mongodb.com/) (local or Atlas cluster)
- [Cloudinary](https://cloudinary.com/) account
- A Google OAuth app (for social login via NextAuth)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/blogverse.git
cd blogverse/my-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the root of `my-app/` and populate it:

```env
# MongoDB
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/blogverse

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📋 Available Scripts

| Command         | Description                          |
|-----------------|--------------------------------------|
| `npm run dev`   | Start the development server         |
| `npm run build` | Build the app for production         |
| `npm run start` | Start the production server          |
| `npm run lint`  | Run ESLint for code quality checks   |

---

## 🌐 Pages & Routes

| Route            | Description                              | Auth Required |
|------------------|------------------------------------------|:-------------:|
| `/`              | Home feed — browse all blog posts        | ❌            |
| `/blog/[id]`     | Individual blog post detail view         | ❌            |
| `/myblogs`       | View & manage your own blog posts        | ✅            |
| `/favorites`     | View your saved/favorite posts           | ✅            |
| `/login`         | Log in with credentials or Google        | ❌            |
| `/Registerpage`  | Create a new account                     | ❌            |
| `/contact`       | Contact the site team                    | ❌            |

---

## 🔐 Authentication

BlogVerse supports two authentication strategies:

1. **NextAuth.js** (Google OAuth / Social login) — managed via `next-auth` sessions
2. **Custom Credentials Auth** — traditional email/password login with `bcryptjs` hashing, persisted via `localStorage` through `AuthContext`

Both strategies are unified in the Navbar, so the UI responds correctly regardless of which method the user chose to sign in with.

---

## 📸 Image Uploads

Blog cover images are uploaded directly to **Cloudinary** using the `next-cloudinary` package. This keeps your MongoDB lightweight (storing only the secure image URL) while offloading media delivery to Cloudinary's global CDN.

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'feat: add some feature'`
4. Push to your branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">

Made with ❤️ by **Abhishek**

</div>
