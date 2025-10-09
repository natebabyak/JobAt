<div align="center">
    <img alt="JobAt" src="./src/lib/assets/favicon.svg" width="80" />
</div>
<h1 align="center">JobAt</h1>
<p align="center">The free and open-source AI-powered job application tracker</p>

## Usage

### Installation

#### 1. Clone Respository

```sh
git clone https://github.com/natebabyak/JobAt.git
cd JobAt
```

#### 2. Set Up Environment Variables

Create a `.env` file in the project root:

```ini
# Database
DATABASE_URL="postgres://user:password@host:port/db-name"
POSTGRES_PASSWORD=""

# GitHub OAuth
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""

# Google OAuth
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
```

#### 3. Start the Database

```sh
docker compose up
```

#### 4. Install Dependencies

```sh
npm install
```

#### 5. Run the Development Server

```sh
npm run dev
```

## License

[MIT](https://github.com/natebabyak/JobAt/blob/main/LICENSE.txt)
