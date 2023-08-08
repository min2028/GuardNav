<br />
<p align="center">
  <a href="./frontend/src/resources/logo.png">
    <img width="30%" src="./frontend/src/resources/logo.png" alt="mystudy-space logo">
  </a>
  <p align="center">
</p>
  <h1 align="center">GuardNav</h1>
  <h3 align="center">Plan a safe trip in Vancouver</h3>
</p>

### Overview:
GuardNav aims to provide users with a reliable and user-friendly navigation experience, prioritizing their safety by leveraging historic crime information. With features like safe route planning, data visualization through heat maps, the app empowers users to make informed decisions while navigating Vancouver and ensures their confidence in reaching their destinations securely.

>

### Target Users
The Safe Route Planning App is intended for the following user groups:

1. Commuters who prioritize reaching their destination safely.
2. Tourists who want to explore the best of Vancouver while avoiding high-risk areas.
3. Parents who seek to ensure the safety of their children while traveling around the city.
4. Delivery or rideshare companies (e.g., Uber, Doordash) aiming to take the safest and most efficient routes for optimal customer service.
5. Prospective real estate investors who desire information on the safety of specific areas.

>

### Key Features
**Safe Route Planning:** Utilizes historic crime data to create safe routes, enabling users to avoid high-risk areas and navigate securely.

**Data Storage:** Stores relevant data, including user-selected routes and imported data in CSV format.

**Visualization of Safety:** Provides users with a visual representation of danger levels through heat maps, helping them assess the safety of different areas.

## Project Task Requirements
> Please note that the following requirements are subject to change and may be modified during the course of development:

**Minimal**
>will definitely complete
- Create a simple CRUD (Create, Read, Update, Delete) functionality to enable users to manage trips.
- Users should be able to add trips by specifying a pair of source and destination locations.
- Each trip should include the suggested routes, the primary route selected by the user.
- Users should be able to update the origin or destination of the primary route, similar to the timeline functionality in Google Maps.
- Utilize historic crime data to create the initial dataset for generating a heatmap.
- The heatmap should display risk levels across Vancouver based on the crime data.
- Develop a basic user interface (UI) that includes a map displaying the generated heatmap.

**Standard**
>will most likely complete
- Integrate route planning that avoids high risk areas.
- Multiple route suggestions with varying levels of risk.
- Risk categorization. [intensity weighted]


**Stretch Goals**
>will complete if time permits
- Implement a grid representation to validate hazard reports.
- Use aggregated number of reports in the area for the validation
- User authentication and user profiles.
- User preferences for risk levels and categories.
- Alert system if off-route.
- CRUD to enable users to add, update, and delete their own reports of hazards and risks to be added to the database.
- Enhance manual crime entry functionality with entry validation.
- Real-time alerts of new hazards along the route.
- Send directions to user via SMS.
- (friendly design for mobile users)

## Prototypes:

### Landing Page
<img width="811" alt="Landing Page" src="https://github.com/min2028/GuardNav/assets/93061872/ad754e8c-4457-41bd-8ace-377b06db2620">

### Main Page
<img width="322" alt="Main / About Page" src="https://github.com/min2028/GuardNav/assets/93061872/b4131b85-6277-458c-a821-07820b8419fd">


### Map Page
<img width="556" alt="Map Page (Default)" src="https://github.com/min2028/GuardNav/assets/93061872/ee4a8304-f922-4cdb-a609-20d5c84684a9">

<img width="635" alt="Map Page" src="https://github.com/min2028/GuardNav/assets/93061872/078f2c20-d15d-419f-9949-64d9c5d67200">

## Utilizes tech from Units 1-5

#### Unit 1: HTML, CSS, JS
We leveraged HTML, CSS, and JS to build the entire frontend of our project, with the backend in JavaScript and Node Express. Using libraries such as Material UI and the React Google Maps API, we achieved a visually appealing design and an efficient map interface. The separation of these technologies ensured reduced coupling and increased cohesion.

#### Unit 2: React & Redux
React & Redux were vital in managing global and local states throughout the project, integrating changing components seamlessly. We used Redux for tracking user's geolocation and created several reducers for history list logic, user profiles, and other functionalities such as in our MapPage.js file.

#### Unit 3: Node and Express
In Unit 3, we leveraged Node.js and the Express framework to build the backend of our GuardNav application. With Node.js, we created a robust and efficient server-side environment that handles user authentication, data management, and communication with the frontend. Express enabled us to set up routes, middleware, and handle HTTP requests effectively and through the integration of different packages, we managed user accounts, trip data, and communication with external services such as Auth0.

#### Unit 4: MongoDB
Unit 4 played a crucial role in our GuardNav project as we utilized MongoDB, a NoSQL database, to manage and store our application's data. We modeled our data structures to optimize trip information and user-specific data such as user history. Through Mongoose, a MongoDB object modeling library for Node.js, we ensured data consistency, validation, and easy querying for various parts of our application.

#### Unit 5: Builds and Deployment
Our mono repo code base utilized git for version control with collaborative review of pull requests. We employed yarn and npm for package management and as build tools, resolving dependencies and conflicts. The site was deployed on Render, a cloud hosting platform, ensuring it remains up-to-date.

## Description of 'Above and Beyond' Functionality
We integrated the React Google Maps API for the entire map interface, including search bars, routing logic, heatmaps, and directions renderer. We utilized the OpenWeather API for current weather display and built the entire project around location services for route planning according to user input. We implemented Auth0 to handle user authentication and authorization seamlessly. Users can now create accounts, log in securely through email and password or external services like google, and access personalized features with confidence. [Additional contributions if needed]

## List of Contributions

#### Aayush Raghuvamshi
Aayush took leadership in initiating and maintaining team conversations and often delegating tasks. Key contributions include working with the VPD crime dataset, implementing the Heat Map Layer, setting up Route planning, and implementing all of the math behind the route planning logic. He also took charge of the terms of service page and documentation.

#### Dickson Ngan
Dickson played a key role in the project by designing and developing the comprehensive map page, which includes integrating with Google Map's API and creating the history component that enables users to add, favorite, and clear their previous routes. Additionally, he also implemented the functionality for users to seamlessly send route directions to their phones using Twilio and ensured smooth integration with the backend by establishing connections to the relevant endpoints.

#### Andres Lee
Andres worked on the frontend, backend, and the deployment of the app. Key contributions consist of making the styling of the static portion of the web app, media querries to make it mobile friendly, and one schema on mongoose.

#### Aung Khant Min
Aung Khant Min played a pivotal role in GuardNav, leading backend development with robust APIs, MongoDB integration, and enhanced data management. He bolstered security by implementing Auth0-based authentication. Aung Khant Min's frontend-backend integration enabled real-time updates, while his UI contributions enriched user experience.

[Other team members' contributions]

### Description of Next Steps
We aim to further reduce bugs and are considering revamping the entire map interface by possibly using Mapbox instead of Google Maps for enhanced functionality in route planning. [Additional thoughts if needed]

