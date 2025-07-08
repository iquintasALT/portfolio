
<div align="center">
  <h1 style="display:inline-block;vertical-align:middle;">Stellar Thematic Portfolio</h1>
  <span>
    <a href="https://iquintasalt.vercel.app"><img src="https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel&style=flat-square" alt="Vercel"/></a>
    <a href="LICENSE"><img src="https://img.shields.io/github/license/iquintasALT/portfolio?style=flat-square" alt="License"/></a>
    <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.4.5-blue?logo=typescript&style=flat-square" alt="TypeScript"/></a>
    <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-14.2.3-black?logo=next.js&style=flat-square" alt="Next.js"/></a>
    <a href="https://github.com/iquintasALT/portfolio/actions"><img src="https://github.com/iquintasALT/portfolio/actions/workflows/vercel.yml/badge.svg" alt="CI/CD"/></a>
    <a href="https://prettier.io/"><img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square" alt="Prettier"/></a>
  </span>
</div>

---

> **A modern, full-stack portfolio built with Next.js, React, TypeScript, and deployed on Vercel.**

## 🌐 [Live Site](https://iquintasalt.vercel.app)

---

## 📖 Introduction

This project showcases my skills acquired through a React course and self-driven learning. The site is a single-page application (SPA) that combines static and dynamic routes for fast load times, great SEO, and content updates without redeploys. The UI is mobile-first, with fullpage scroll snap sections and a focus on accessibility and performance.

## 🛠️ Libraries & Tools

- **React** — Core UI library
- **Next.js** — SSR, SSG, dynamic routing, API routes
- **TypeScript** — Type-safe codebase
- **Tailwind CSS** — Utility-first styling
- **Redux** — State management
- **Framer Motion** — Animations
- **Vercel Blob** — Dynamic storage
- **Jest** — (Planned) Unit testing
- **Playwright/Cypress** — (Planned) E2E testing
- **ESLint/Prettier** — Code quality

## ✨ Features

- **Mobile-first, swipeable UI**
- **Fullpage layout** with scroll snap navigation
- **Dark/Light mode** with system preference
- **Dynamic API routes** (Vercel Blob, Next.js API)
- **Content management** via JSON/MDX
- **Accessibility**: semantic HTML, keyboard navigation, ARIA
- **Image optimization** with Next.js `<Image />`
- **Animated, visually appealing components**

## 🏗️ Project Structure

- `/src/app` — Next.js app directory
- `/src/components` — UI and layout components
- `/content` — MDX and JSON content
- `/public` — Static assets

## 🧩 Example: SectionTransition

```tsx
<SectionTransition>
  <Section id="about">About</Section>
  <Section id="projects">Projects</Section>
  <Section id="contact">Contact</Section>
</SectionTransition>
```

This ensures each section fills the viewport and enables smooth scroll snap navigation, providing a mobile-first, app-like experience.

## 🚧 Roadmap / Future Work

- [ ] Internationalization (i18n)
- [ ] Light mode improvements
- [ ] Unit and E2E tests
- [ ] Further performance optimizations
- [ ] More motion/animation polish

## 🐞 Known Issues

- See [GitHub Issues](https://github.com/iquintasALT/portfolio/issues)

## 🧠 What I've Learned

### 🖥️ Frontend & UI
- Modern SPA with Next.js & React
- Framer Motion for smooth transitions
- Responsive, accessible design
- Section navigation with hash/anchor links
- Image optimization

### ⚙️ Backend & Content
- RESTful API routes
- Vercel Blob Storage for dynamic content
- Centralized content with JSON/MDX

### 🧪 Tooling & Testing
- ESLint, Prettier, TypeScript
- MDX rendering and error handling
- (Planned) Jest, Playwright
- CI/CD with Vercel

### 📦 Package Management
- Peer dependencies and npm compatibility
- Keeping dependencies up to date

### 🌟 Other Experience
- UI/UX iteration and real device testing
- Migration: React Router v7/Remix → Next.js
- Debugging stacking context/z-index
- Conventional commits

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

> Built and maintained by [Iago](https://iquintasalt.vercel.app) — [LinkedIn](https://www.linkedin.com/in/iagoq) · [GitHub](https://github.com/iquintasALT)
