# GuardNav

> A Safe Route Planning App

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
  - Each trip should include the suggested routes, the primary route selected by the user, and the name of the trip.
  - Users should be able to update the primary route and the name of the trip, similar to the timeline functionality in Google Maps.
  - Users should be able to delete trips from their history.

- Utilize historic crime data to create the initial dataset for generating a heatmap.
  - The heatmap should display risk levels across Vancouver based on the crime data.

- Develop a basic user interface (UI) that includes a map displaying the generated heatmap and allows users to enter hazard reports.

**Standard**
>will most likely complete
- Integrate route planning that avoids high risk areas.
- Multiple route suggestions with varying levels of risk.
- Risk categorization. [Frequency and intensity: weighted]
- (friendly design for mobile users)


**Stretch Goals**
>will complete if time permits
- Implement a grid representation to validate hazard reports.
  - use aggregated number of reports in the area for the validation
- User authentication and user profiles.
- User preferences for risk levels and categories.
- Alert system if off-route.
- CRUD to enable users to add, update, and delete their own reports of hazards and risks to be added to the database.
  - Enhance manual crime entry functionality with entry validation.
- Real-time alerts of new hazards along the route.

## Prototypes:

### Landing Page
<img width="811" alt="Landing Page" src="https://github.com/min2028/GuardNav/assets/93061872/ad754e8c-4457-41bd-8ace-377b06db2620">

### Main Page
<img width="322" alt="Main / About Page" src="https://github.com/min2028/GuardNav/assets/93061872/b4131b85-6277-458c-a821-07820b8419fd">


### Map Page
<img width="556" alt="Map Page (Default)" src="https://github.com/min2028/GuardNav/assets/93061872/ee4a8304-f922-4cdb-a609-20d5c84684a9">

<img width="635" alt="Map Page" src="https://github.com/min2028/GuardNav/assets/93061872/078f2c20-d15d-419f-9949-64d9c5d67200">

