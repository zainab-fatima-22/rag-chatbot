# Development Reports

This report covers all of the work completed for Tax Assist AI between July 10 and August 17, 2026, from the first day of project setup through the end of the four module roadmap, followed by a summary of the additional enhancement work that came afterward.

The project began as a proposal for a university chatbot, but after early discussion the direction changed to a Retrieval Augmented Generation chatbot focused on Pakistan personal income tax. This change was made because understanding income tax rules and the filing process is something many salaried individuals and freelancers in Pakistan struggle with, giving the project clearer real world usefulness. The underlying technology stack, including React, TypeScript, Tailwind CSS, Node.js, Express, MongoDB, a vector based search system, and the Google Gemini API, remained exactly as planned in the original proposal. The four module roadmap and the working days within each module also remained unchanged, with Sundays kept as rest days throughout the internship.

## Module 1, Project Setup and Authentication (July 10 to July 16, 2026)

### Day 1, July 10, 2026

Set up the complete project structure with separate folders for the frontend and the backend, so both parts of the application could grow independently. Built the Express server and added a health check route to confirm the backend was running correctly. Set up the React project using Vite, together with TypeScript and Tailwind CSS, and created the first version of the landing page. Added environment configuration files for both the frontend and backend so that sensitive values like database links and API keys could be managed safely and kept out of the codebase. Also finalized the exact direction of the project, moving from the original idea of a university chatbot to a tax assistant that helps salaried individuals and freelancers in Pakistan understand their personal income tax.

### Day 2, July 11, 2026

Built the complete authentication system for the application. On the backend, added password hashing using bcrypt so that user passwords are never stored as plain text, and added JSON Web Tokens so users can stay logged in securely across sessions. Created a middleware function that checks whether a user is logged in before allowing access to protected parts of the application. On the frontend, created a login page and a registration page with proper form handling, connected both pages to the backend through a dedicated request service, and set up page navigation using React Router so users could move smoothly between the different pages of the app.

### Day 3, July 13, 2026

Focused on preparing documents for the chatbot to read from later, since the whole idea of the project depends on giving the AI real information to search through. Added utility functions that can split long documents into smaller pieces called chunks, which is a needed step before the AI can properly search and understand them. Also added sample template documents that describe how the real tax information should be structured once it is collected from official sources. On the frontend, built the actual chat page for the first time, including the message bubbles and the input box where users type their questions, along with a rule that only logged in users are allowed to open the chat page.

### Day 4, July 14, 2026

Added proper error handling on the backend, including a handler for pages that do not exist and a general error handler that keeps all error responses consistent across the application. On the frontend, built a navigation bar that appears on every page, along with a small notice banner reminding users that the tool is for information purposes only. Created an About page that explains what the project does and repeats the disclaimer in more detail. Also cleaned up a duplicate header on the chat page since the new navigation bar now handles that job for the whole application.

### Day 5, July 15, 2026

Built a Profile page that only logged in users can see, showing their name, email address, and account role. Also created a Frequently Asked Questions page with common tax related questions and simple answers, giving new users a quick way to understand the app before they start chatting. Connected both new pages to the navigation bar and added proper page routes so they could be reached from anywhere in the app.

### Day 6, July 16, 2026

Created a Postman collection covering the health check, registration, login, and protected user routes, so the backend could be tested manually in an organized way. Went through the entire login and registration flow by hand to confirm everything worked as expected, including checking how the app behaved with wrong passwords. Cleaned up comments and code across the backend and frontend, and finished writing the documentation that summarizes everything completed in the first module of the project.

## Module 2, Retrieval Augmented Generation Pipeline (July 17 to July 23, 2026)

### Day 7, July 17, 2026

Started the second module of the project, which is focused on building the actual Retrieval Augmented Generation pipeline. Built a simple storage system that can save pieces of text along with their number based representation and search through them using similarity comparison. This was built as a lightweight stand in for a proper vector database, but written in a way that would allow swapping in a tool like ChromaDB later without changing how the rest of the app uses it. Also created the first version of a script that reads documents from a folder, breaks them into chunks, and prepares them for the next stage of the pipeline.

### Day 8, July 18, 2026

Built a service that connects to the Google Gemini embedding model, which converts text into a numeric representation that can be compared for similarity. Connected this service into the document preparation script from the day before, so that documents are now read, split into chunks, converted into their numeric representation, and saved into the storage system automatically in a single step.

### Day 9, July 20, 2026

Built a retrieval service that combines two steps into one simple function, first converting a user question into its numeric representation, and then searching the storage system for the most relevant pieces of text. Added a minimum relevance score so that pieces of text with very low similarity are left out of the final answer, since including unrelated information can confuse the AI more than leaving it out. Also added a helper function that formats the retrieved information into a clean block of text that can be handed to the AI model, including labels showing where each piece of information came from.

### Day 10, July 21, 2026

Built the service that talks to the Google Gemini text generation model, along with a carefully written system instruction that tells the AI to answer only using the information it was given, and to remind users to confirm details with FBR or a tax consultant. Created the main chat controller and the protected chat route, which brings together retrieval and generation into one working pipeline. A user question now goes through the full process of being searched, matched with related information, and answered by the AI, all in a single request. Updated the Postman collection to include this new route for testing.

### Day 11, July 22, 2026

Connected the frontend chat page to the real backend chat route for the first time, replacing the placeholder responses that were used earlier. Added a loading state so users can see when the assistant is working on an answer, and added proper error messages in case something goes wrong during the request. This completed the full connection from the chat interface all the way through to the AI generated answer.

### Day 12, July 23, 2026

Built a small script that runs a set of sample questions through the retrieval system and prints out which pieces of information were matched along with their relevance scores, which makes it easier to check and improve the quality of the search results. Carried out manual testing of the full chat experience from start to finish, and updated the project documentation with the new commands needed to prepare documents and check retrieval quality. This marked the completion of the second module, with a fully working pipeline that reads questions, searches for relevant information, and generates grounded answers.

## Module 3, Chatbot Integration and Optimization (July 24 to July 30, 2026)

### Day 13, July 24, 2026

Improved the instructions given to the AI model so that when a question is too vague, such as asking how much tax someone will pay without giving their income, the assistant now asks for the missing detail instead of guessing an answer. On the frontend, added an animated typing indicator that appears while the assistant is preparing a response, replacing the plain loading text that was used before and giving the chat a more natural feel.

### Day 14, July 25, 2026

Improved the retrieval system by making the number of results and the relevance threshold adjustable settings instead of fixed values, which makes it much easier to fine tune how the search behaves. Also added simple cleanup of user questions before they are searched, removing greetings and filler phrases such as "hey" or "can you tell me", so that the numeric representation of the question focuses more closely on the actual tax related content being asked about.

### Day 15, July 27, 2026

Added a new database model to store conversation history for each user, saving every question and every answer along with its sources and timestamps. Updated the chat route so that every exchange between the user and the assistant is automatically saved. Also added a new route that returns a user's saved conversation, and updated the Postman collection to include this new route for testing.

### Day 16, July 28, 2026

Connected the frontend chat page to the new conversation history route, so that when a user opens the chat page, their previous conversation is automatically loaded and shown to them. Added a loading message while the history is being fetched, and made sure new users with no previous history still see a friendly welcome message instead of an empty screen.

### Day 17, July 29, 2026

Added a simple caching system that remembers the numeric representation of questions that have already been processed, so repeated or common questions do not need to be sent to the embedding service again during the same server session. Also added a logging tool that records how long each request takes to complete, which is especially useful for keeping an eye on how fast the chat route is responding.

### Day 18, July 30, 2026

Found and fixed a bug where a user's saved conversation history could grow without any limit over time, which would eventually slow things down, so a limit was added to only keep the most recent exchanges. Also added a limit on how long a single question can be, both on the backend and on the frontend, to prevent overly long messages from being sent. Carried out a full round of testing across everything built in this module before finalizing the documentation, which completed the third module of the project.

## Module 4, Testing, Deployment, and Documentation (July 31 to August 6, 2026)

### Day 19, July 31, 2026

Started the final module of the project by setting up automated testing using Jest. Wrote a set of tests for the document splitting functions to confirm they behave correctly, including edge cases such as very short or empty text. Also wrote tests for the storage and search system to confirm that it correctly returns the most similar results and handles an empty storage system properly.

### Day 20, August 1, 2026

Found and fixed two small bugs during testing. The first was that email addresses were not being treated consistently, meaning the same email typed with different capital letters could be registered as two separate accounts, which has now been corrected. The second was that the login and registration forms could be submitted more than once if a user clicked the button repeatedly, which has now been fixed by disabling the button and showing a loading message while the request is in progress.

### Day 21, August 3, 2026

Added the configuration files needed to deploy the project, one for the backend on Render and one for the frontend on Vercel. Made sure all the required environment variables were properly referenced in these configuration files, and confirmed that the settings for connecting the frontend to the backend would work correctly once both parts are deployed online.

### Day 22, August 4, 2026

Wrote a complete reference document covering every route in the backend, including example requests, example responses, and possible error messages. Also added a simple diagram to the main project document showing how the frontend, backend, and different services connect to each other. Went through the code one more time to make sure comments were clear and consistent throughout the project.

### Day 23, August 5, 2026

Made a final round of improvements to the chat interface, including making the chat window automatically scroll down to the newest message as the conversation grows. Also went through the interface to improve accessibility, adding proper labels and roles so that the chat page works well for users relying on screen readers and other assistive tools.

### Day 24, August 6, 2026

Wrote a short presentation guide describing how to demonstrate the project, covering the problem it solves, a step by step walkthrough of the app, and how the system works behind the scenes. Carried out one final full check across every part of the project, including the login system, the chat and retrieval pipeline, saved conversation history, and the deployment settings. Reviewed the project documentation from start to finish for accuracy. This completed the fourth and final module, marking the project as fully finished according to the original roadmap.

## Additional Enhancement Work, Beyond the Original Roadmap (August 7 to August 17, 2026)

After completing all four modules by August 6, 2026, work began on further enhancing the project beyond what was originally scoped. Running from August 7 to August 17, 2026, the first piece of this additional work was a complete visual redesign of the application. A new design identity was created around the theme of an official ledger and an ink stamp, fitting for a tax related application, using a deep green and brass gold color palette on a warm paper style background. A custom stamp style logo mark was created and used consistently across the application, and a new type system was introduced using a serif display font for headings, a clean sans serif font for body text, and a monospace font for labels and numeric data. Every page in the application was redesigned to match this new identity, including the landing page, the login and registration pages, the chat page, the about page, the frequently asked questions page, and the profile page. The chat interface in particular was reworked so that messages appear as stamped notes on a ledger lined background instead of plain rounded chat bubbles.

The enhancement work described above was delivered through August 17, 2026. Further improvements to the user interface and additional features are expected to be added as the project moves forward. Planned areas for continued improvement include replacing the placeholder tax documents with verified content sourced directly from FBR, upgrading the simple search system to a full vector database, and adding further polish to the overall user experience across the application.

## Reports Index

* The main project documentation is in [README.md](README.md).
* The API reference, architecture, demo script, and full setup guide are all consolidated in [README.md](README.md).