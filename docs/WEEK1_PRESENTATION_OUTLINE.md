# Week 1 PowerPoint Outline — UniTrade: Campus Marketplace (10 Marks)

Assign Slides 1–5 to Members 1–5 and have Member 6 unify formatting before submitting one PowerPoint deck per team on Google Classroom (Due: 25 Nov 2026).

---

## Slide 1: Title Slide
- **Project:** #10 — UniTrade: Campus Marketplace
- **Course:** CS 309 — Full-Stack Web Development
- **Team Members:** List all 6 member names and student IDs
- **Stack:** React.js, Node.js + Express.js, MongoDB + Mongoose

## Slide 2: Problem Statement (2 Marks)
- Students regularly buy and sell secondhand textbooks, calculators, lab coats, electronics, and course supplies every semester.
- Currently, trades happen across scattered WhatsApp/Telegram/Facebook groups where posts get buried, prices and item conditions are unclear, there is no structured search or category filtering, and buyers have no way to check seller reliability.
- Result: wasted time, missed deals, and low trust when arranging campus meetups.

## Slide 3: Target Users (2 Marks)
- **Student Buyers:** Browse, search, filter listings by category, shortlist items in a cart, contact sellers, and submit product/seller reviews after an exchange.
- **Student Sellers:** Create, update, and delete product listings with photos, respond to buyer exchange requests, and build reputation through buyer reviews.
- **Moderators:** Review reported or non-compliant listings, enforce campus marketplace rules, and remove inappropriate items or accounts.

## Slide 4: Goals (2 Marks)
- Centralize campus secondhand trading into one searchable student-only marketplace.
- Reduce the time to find required course textbooks or electronics through category and keyword filtering.
- Increase buyer-seller trust using product photos and verified post-exchange ratings/reviews.
- Support a complete end-to-end exchange workflow (Account -> Listing + Photo -> Cart/Contact -> Review) without requiring online payment processing.

## Slide 5: How to Solve the Problem (2 Marks)
- Build a 3-tier full-stack web application:
  - **React Frontend:** Modular feature screens for accounts (Register, Login, Profile), marketplace browsing (Home, Search, Items List, Single Item), listing management (Create, Update, Delete, Image Upload), Reviews, and Cart.
  - **Express REST API:** Structured endpoints handling users, listings, images, cart/exchange requests, and reviews.
  - **MongoDB + Mongoose:** Persistent storage for users, product listings, and reviews.
- **Core Workflow:** Seller posts item with photo -> Buyer discovers via search/filter -> Buyer adds to cart & contacts seller -> Exchange completes -> Buyer posts review.

## Slide 6: Usage Patterns (2 Marks)
- **Flow 1 (Onboarding - Week 1):** Student registers with campus email & role (Buyer/Seller/Moderator) -> Logs in -> Updates campus meetup spot and contact info in Profile.
- **Flow 2 (Selling - Week 2/3):** Seller creates a textbook/electronics listing with photo & price -> Updates availability or deletes listing after sale.
- **Flow 3 (Buying & Reviewing - Week 2/3):** Buyer searches "Algorithms textbook" -> Inspects Single Item details -> Adds item(s) to Cart -> Sends exchange/contact request -> Leaves a star rating and review after pickup.
- **Flow 4 (Moderation - Week 3):** Moderator reviews active listings and removes prohibited or duplicate posts.
