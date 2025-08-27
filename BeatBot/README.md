# BeatBot 🎵

BeatBot is a **Full-Stack MERN application** that helps users discover their "beat" (personality insight) by answering a short questionnaire. The app integrates **OpenAI** to generate personalized results based on user inputs.

Users can:

* Sign up / Log in securely (JWT Auth)
* Fill out a multiple-choice questionnaire
* Receive AI-generated personality results
* View their history of results on a dashboard

![App Screenshot](./docs/screenshot.png) 

---

## Technologies Used

* **Frontend**: React + Vite + TailwindCSS
* **Backend**: Node.js + Express.js
* **Database**: MongoDB (Mongoose)
* **Authentication**: JWT + bcrypt
* **AI Integration**: OpenAI API
* **Deployment**: Render (Full-stack deployment)
* **Project Management**: Trello + GitHub Projects

---

## Project Links

* 🎤 [Pitch Deck](https://your-link-here)
* 📋 [Trello Board](https://your-link-here)
* 🚀 [Deployed App on Render](https://your-link-here)

---

## Planned Future Enhancements

* [ ] OAuth login (Google, GitHub)
* [ ] Shareable result pages (public link)
* [ ] Ability to retake quiz with different question sets

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

## Getting Started (Local Dev)

```bash
# Clone the repo
git clone https://github.com/your-org/beatbot.git
cd beatbot

# Install dependencies
npm install

# Run app
npm run dev
```

Create a `.env` file in `/server` with:

```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
```

---

## API Routing Table (MVP)
| Method | Path                      | Auth | Body (req)                           | Success (res)                     |
| -----: | ------------------------- | :--: | ------------------------------------ | --------------------------------- |
|   POST | `/api/auth/register`      |  No  | `{ email, password }`                | `201 { user:{_id,email}, token }` |
|   POST | `/api/auth/login`         |  No  | `{ email, password }`                | `200 { user, token }`             |
|    GET | `/api/auth/me`            |  Yes | —                                    | `200 { user }`                    |
|   POST | `/api/questionnaires`     |  Yes | `{ answers:[{qId, choice}], meta? }` | `201 { questionnaire }`           |
|    GET | `/api/questionnaires/:id` |  Yes | —                                    | `200 { questionnaire }`           |
|   POST | `/api/results`            |  Yes | `{ questionnaireId }`                | `201 { result }`                  |
|    GET | `/api/results`            |  Yes | —                                    | `200 { results:[...] }`           |
|    GET | `/api/results/:id`        |  Yes | —                                    | `200 { result }`                  |
| DELETE | `/api/results/:id`        |  Yes | —                                    | `200 { message }`                 |

---

## WireFrame