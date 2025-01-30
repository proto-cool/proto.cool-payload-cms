# Payload CMS for proto.cool

This project is the headless **Payload CMS** that powers my personal website, [proto.cool](https://proto.cool). It is designed to provide a robust CMS for managing content with greater developer flexibility. The project includes structured collections for managing blog content like **Posts**, **Tags**, as well as the core Payload features of **Users** and **Media**. Many features have been collected or extended from official Payload samples, so hopefully what's in this repository can be of some benefit to you! 💻 🚀

---

## Features

- **Rich Blog Management**: Manage blog posts with rich text content, tags, and customizable metadata.
- **Tags for Categorization**: Assign and manage tags to organize and classify blog posts.
- The default **User System**, **Media Handling**, and **Draft and Version** controls that come with Payload CMS are enabled.
- Builds can be kicked off automatically when Posts are published or modified, providing authors a seamless publishing experience.
- The frontend is largely data-driven from the data stored in Payload. In fact, this repository is used in production for my Payload instance and website, but you can fork it and start writing your own content!

---

## Getting Started

### Prerequisites

- **Node.js** (v18 or later)
- **pnpm**
- **Postgres** or **MongoDB** instance for the database

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/proto-cool/proto.cool-payload-cms.git
    cd proto.cool-payload-cms
    ```

2. Install dependencies:

    ```bash
    pnpm install
    ```

3. Create a `.env` file in the root directory with the following variables:

    ```env
    DATABASE_URI=postgres://postgres:<password>@127.0.0.1:5432/your-database-name
    PAYLOAD_SECRET=your-secret-key
    ```

    Or, if you prefer MongoDB:

    ```env
    DATABASE_URI=mongodb://localhost:27017/your-database-name
    PAYLOAD_SECRET=your-secret-key
    ```

    Replace `your-secret-key` with a secure secret for Payload CMS.

4. Start the development server:

    ```bash
    pnpm dev
    ```

    The CMS dashboard will be available at [http://localhost:3000/admin](http://localhost:3000/admin).

5. (Optional) Configure web server to redirect to `/admin`

    I didn't like having my root URL just 404 when the only URLs used for this project are the `/admin` and `/api` endpoints (as well as `/_next` for supporting files). To that end, here is some Caddy configuration I use to redirect that may be of use:

    ```text
    # Match any request that is not /admin or under /api
    @notPayload {
        not path /admin /admin/* /api /api/* /_next /_next/*
    }

    # Redirect those requests to /admin
    redir @notPayload /admin 302
    ```

---

## Collections Overview

### Blog Collection Group

#### Posts

- **Purpose**: Manage blog articles with rich metadata and content structures.
- **Fields**:
    - `id`: Unique identifier for the post.
    - `title`: The title of the blog post (required).
    - `slug`: URL-friendly identifier (auto-generated and customizable).
    - `slugLock`: Prevents automatic updates to the slug (admin UI element only).
    - `subtitle`: Short subtitle for the post (optional).
    - `description`: Brief summary or excerpt of the post.
    - `tag`: A relationship to a `Tag` object.
    - `readTime`: Estimated time to read the post (auto-calculated using `reading-time` library).
    - `heroImage`: Main image for the post, linked to a Media object.
    - `content`: Rich text structured content of the blog post.
    - `updatedAt`: Timestamp of the last update.
    - `createdAt`: Timestamp of when the post was created.
    - `_status`: Current status of the post (`draft`, `published`).

#### Tags

- **Purpose**: Categorize and organize blog posts.
- **Fields**:
    - `id`: Unique identifier for the tag.
    - `text`: The tag name (required).
    - `slug`: URL-friendly identifier.
    - `slugLock`: Prevents automatic updates to the slug (admin UI element only).
    - `description`: Optional description of the tag.
    - `updatedAt`: Timestamp of the last update.
    - `createdAt`: Timestamp of when the tag was created.

---

### Core Collection Group

#### Users

- **Purpose**: Manage CMS users and authentication.
- **Fields**:
    - Unchanged from default Payload CMS.

#### Media

- **Purpose**: Manage and organize media assets like images and videos.
- **Fields**:
    - Unchanged from default Payload CMS.

---

## Globals Overview

**Globals** are a PayloadCMS concept which is a data type very similar to Collections, but where there is not multiples of that data type. This lends itself well to...

### Site Metadata

- **Purpose**: Core metadata about the site and yourself as its author.
- **Fields**:
    - `id`: Unique identifier for the document.
    - `name`: The name of the site - shows up in the header, etc.
    - `title`: A title for the site that shows up on the homepage.
    - `description`: A short description about the site used for SEO and other things.
    - `author`: The name you'd like to use throughout the site.
    - `author-photo`: A photo of the author to use throughout the site.
    - `nav`: Navigation links for the header/mobile navigation menu. TODO: Make sure empty navs are supported properly.
    - `social`: Social network links that are used for the hero section and footer. TODO: Make sure empty socials are supported properly.
    - `code-injection`: Analytics code, or anything else that goes into <Head> goes here. Be _very_ careful what you put here, someone could trick you into placing malicious code here.
    - `enable-builds`: Combined with the `FRONTEND_BUILD_URL` environment variable, allows Payload to kick off a build whenever content changes.
    - `use-view-transitions`: Whether to enable the new View Transition API in Astro. Works in Chromium, Safari, etc, but not Firefox (yet!)
    - `use-animations`: The default site comes included with some animations on the index page, this checkbox will control whether they are enabled.

## License

This project is licensed under the [MIT License](LICENSE).
