// server/config/seed.js

import dotenv from 'dotenv';
import './database.js';
import User from '../models/user.js';
import Submission from '../models/submission.js';
import Result from '../models/result.js';

dotenv.config();

(async function() {

  // delete old data
  await User.deleteMany({});
  const users = await User.create([
    { name: "Alice", email: "alice@example.com", password: "password123" },
    { name: "Bob", email: "bob@example.com", password: "password123" }
  ]);

  await Submission.deleteMany({});
  const submissions = await Submission.create([
    {
      title: "Search for Rock Music",
      description: "Looking for trending rock tracks",
      content: "rock music playlist",
      user: users[0]._id,
      submissionType: "text",
      tags: ["rock", "playlist"]
    },
    {
      title: "Upload MP3 file",
      description: "Testing file upload",
      content: "song.mp3",
      user: users[1]._id,
      submissionType: "file",
      metadata: { fileName: "song.mp3", fileSize: 512000, mimeType: "audio/mpeg" },
      tags: ["upload", "test"]
    }
  ]);

  await Result.deleteMany({});
  const results = await Result.create([
    {
      submission: submissions[0]._id,
      user: users[0]._id,
      resultType: "success",
      output: "Found top 10 trending rock songs.",
      score: 95,
      processingTime: 1200,
      feedback: "Results look good."
    },
    {
      submission: submissions[1]._id,
      user: users[1]._id,
      resultType: "success",
      output: "File uploaded successfully and metadata extracted.",
      score: 90,
      processingTime: 800
    }
  ]);

  console.log(results);

  process.exit();

})();
