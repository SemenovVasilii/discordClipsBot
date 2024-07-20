## Project setup

#### Prerequisites

- Node 16.x or higher
- npm v7 or higher

#### Installation

- Clone the project repository to your local machine
  ```console
  git clone <repository url>
  ```
- Install dependencies
  ```console
  npm install
  ```
- Start the project in production mode 
  ```console
  npm start
  ```
- Start the project in development mode 
  ```console
  npm run dev
  ```

#### Configuration

Create ".env" file in the root directory of your project and add the necessary environment variables
as example use ".example.env"


#### Database 

Table name - "clips"

Table fields:
- **id** [PK] integer
- **server_id** VARCHAR(64)
- **title** VARCHAR(255)
- **video_url** TEXT
