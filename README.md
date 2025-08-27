# BeatBot 🎧

BeatBot is a **full-stack MERN** app that gives **AI-powered music recommendations** from a short preferences form. Users sign up, log in, submit their mood/activity/genres, and get back a playlist with **title, explanation, and track picks** (each with a “why”). If the user is authenticated, the submission and result are **saved** so they can be viewed later.

---

![BeatBot Demo](/BeatBot/src/assets/BeatBot-MainScreen.png) 

---

## Project Links

* 🎤 [Pitch Deck](https://new.express.adobe.com/publishedV2/urn:aaid:sc:AP:b93b1063-a6d6-4e60-aae8-5eb3c97566c4?promoid=Y69SGM5H&mv=other)
* 📋 [Trello Board](https://trello.com/b/kdhz2ao3/beatbot)
* 🚀 [Deployed App on Render](https://your-link-here)

---

* **Auth**: JWT (signup/login) + protected routes
* **AI**: OpenAI Chat Completions (`gpt-4o-mini`) returning **strict JSON**
* **CRUD**: Submissions & their generated results (per user)
* **UI**: Black & red theme, Times New Roman, responsive, SCSS modules
* **Deploy target**: Render (single Node service serving API + Vite build)

---

## Tech Stack

**Frontend**

* React + Vite
* React Router v6
* SCSS Modules (no Tailwind)
* Vite proxy → Node server during dev

**Backend**

* Node.js + Express
* JWT (jsonwebtoken) + bcrypt
* MongoDB + Mongoose

**AI**

* OpenAI API (`chat.completions`, model: `gpt-4o-mini`)

**Deploy**

* Render (Node web service serving `dist` + API)

---

## App Features

* **Auth flows**

  * Sign Up → *then* Log In (signup does **not** auto-login)
  * Token stored in `localStorage`
  * `GET /api/users/check-token` verifies a token
* **Music form (Home)**

  * Age Group, Mood, Activity, Energy
  * Genres (multi, up to 8)
  * Language (any or specific)
  * Track count (3–20)
* **Generate playlist**

  * POST **`/api/ai/recommend`**
  * If logged in, request + result are **persisted**
  * Response is valid JSON; when saved, includes `submissionId`
* **History / Results**

  * View a submission and its results (`/results/:id`)
  * Results show title, explanation, metadata chips, and tracks (title — artist + *why*)
* **Profile (Display Name)**

  * Client UI to edit display name (uses token refresh pattern).
    *Backend profile endpoints may be added by your team later.*

---

## Environment Variables

Create a **`.env`** at project root:

```
MONGO_URI=your_mongodb_uri
SECRET=your_jwt_secret
PORT=3000
OPENAI_API_KEY=your_openai_api_key
```

> `SECRET` is used to sign JWTs.
> `OPENAI_API_KEY` is required for `/api/ai/recommend`.
> The Node server serves the Vite `dist` folder in production.

---

## Install & Run (Local Dev)

```bash
# install
npm install

# run server (port 3000, with nodemon)
npm run server

# in another terminal: run Vite (port 5173, proxy -> 3000)
npm run dev

# or: run both together
npm run dev:full
```

Vite is configured to proxy `/api/*` → `http://localhost:3000`, so the frontend can call the backend without CORS issues in dev.

---


## Validation Highlights

* `genres`: array, **kept to max 8**
* `count`: **3–20**, defaults to 10
* If age group is under 18, prompt prefers **clean/radio edits**

---


## Team Roles

- **Scrum Master / Product Lead – Hussain Alkaabi**  
  Responsible for planning, facilitating standups, and managing Trello workflow.  

- **GitHub Manager – Fatima Alkuwaiti**  
  Oversees repository setup, pull request reviews, and CI/CD pipeline.  

- **Designer – Salman Alhashimee**  
  Creates wireframes and ensures UI/UX consistency across the app.  

- **Database Manager – Hawra Ayoob**  
  Designs schemas, manages seed data, and optimizes database indexing.  

- **Frontend Lead – Abdulrazaq Mohammed**  
  Builds React components, manages state, and implements frontend logic.  

- **Backend Lead – Alia Burashid**  
  Develops Express routes, implements authentication, and integrates OpenAI API. 

---

## Planned Future Enhancements

* [ ] OAuth login (Google, GitHub)
* [ ] Shareable result pages (public link)
* [ ] Spotify/Apple links for tracks

---

## WireFrame
![BeatBot-WireFrame](/BeatBot/src/assets/wireframe.png) 
---

> Have fun beating the silence.🖤
