# 💀 Skeleton

Opinionated boilerplate for a monorepo with [Next.js](https://nextjs.org/) and [Sanity.io](https://www.sanity.io/)

## Getting Started

To start, clone this repo and install devDependencies from the root directory:

```sh
npm i
```

## Studio Setup

1. **Sign up** for [Sanity.io](https://www.sanity.io/) and/or **log in** if you haven't yet (`sanity login`) (you can also use your Github Account for this).

2. **Change to the studio directory** (`cd studio`), **install** and **initialize** a new Sanity project:

```sh
sanity install && sanity init
```

3. Follow the step-by-step wizard and complete the installation.

4. Adjust the studio's `package.json` and `sanity.json`

5. Run `sanity upgrade` to get the most recent version of the studio

6. Finally, `sanity deploy` to deploy the studio to Sanity's hosted service.

7. You can now access the studio via `sanity start` on [http://localhost:3333/](http://localhost:3333/)

## Front End Setup

1. Use `sanity manage` to find the newly created **Project Id** name.

2. Switch to **API** and **add a CORS origin** from _http://localhost:3000_ with _Credentials Allowed_, so that your front-end can communicate with the Studio.

3. Also, **create a Viewer Token** named `SANITY_API_TOKEN_VIEWER`

4. Next change over to `/web` in the root of the monorepo and open `.example.env`.

5. Enter the following Environment Variables:

   - `NEXT_PUBLIC_SANITY_PROJECT_ID`: Your Project Id
   - `NEXT_PUBLIC_SANITY_API_VERSION`: the current date (e.g. `2021-01-01`)
   - `NEXT_PUBLIC_ENVIRONMENT=local`
   - `SANITY_API_TOKEN_VIEWER`: The generated Token from Step 3
   - `SANITY_PREVIEW_SECRET`

   `NEXT_PUBLIC_ENVIRONMENT` will affect whether crawlers such as the Google Bot are allowed to access and index the site. (See `web/pages/api/robots.js`).
   This should only be set to `production` in the production environment's **Environment Variable settings** on [Netlify](https://www.netlify.com/) or [Vercel](https://www.vercel.com/). This will prevent the staging environment from appearing in search results.

   ❗️ **Important:
   Change the filename from `.example.env` to `.env` before you commit/push changes to the repository, especially if the GitHub repository is not set to `private` (it should be). You risk leaking sensitive API keys or access tokens to third parties or the public.**

   💡 **Reminder:
   If you work in a team or on multiple machines you probably want to store those environment variables in a password manager or some other save place so you can access and share them without creating lots of additional keys/tokens. (See "Handoff" for tips on secure ways to share sensitive information)**

6. Adjust `package.json` and `project.config.json` to fit your project

7. Now install all the dependencies...

```sh
npm i
```

8. ...and start the development server on [http://localhost:3000/](http://localhost:3000/)

```sh
npm run dev
```

## i18n Setup (Internationalization)

This boilerplate supports Internationalization/Localization out-of-the-box. To enable multiple locales you need to adjust some configuration files:

- `studio/sanity.json`: Modify `"locales": [{ "title": "English", "code": "en", "emoji": "🇬🇧" }]` array to include all locales you need.
- `web/i18n.json`, `web/locales/...`: Follow the instructions for [next-translate](https://github.com/vinissimus/next-translate)
- `web/project.config.json`: List the country codes for each of you locales e.g. `"i18n": { "en": "English", "de": "Deutsch" }`

💡 **Tip: Use country codes such as "en-US" and "en-GB" if you need more granular control for regions with the same language**

⚠️ **Important:
Ideally one of the first decisions should be whether your project needs to support more than one locale. The `/studio` will automatically adjust its structure and add some QoL changes for working with multiple locales once they're specified. Although you can add a second locale at a later time, you will then need to [migrate your data](https://www.sanity.io/docs/migrating-data) to a new structure as a locale suffix (e.g. `-en`) will be added to each document's `_id` upon creation. If you've previously added content with only one active locale, those documents will become inaccessible through the interface. You will then need to manually add the aforementioned suffix to `_id` and set `i18n.locale` accordingly. Collection documents which can be added freely by authors have one or more additional (optional) reference fields for translations (e.g. `i18n.translation_de`). Not every document will exist in every locale, so you need to link each document to its translation(s). (This will likely be updated to sync automatically in a future version). Modifying the files/folders above will also change how queries for data fetching are handled in `/web/queries/...`, add a language switcher to `Nav` and use the string translations defined in `web/locales/...`.**

## Account Setup

This project makes use of a number of different services which will have to be **set up for the client**.

- [Sanity.io](https://www.sanity.io/) (Content Platform / CMS)
- [Mux](https://www.mux.com) (Video Hosting)
- [Github](https://www.github.com/) (Version Control)
- [Netlify](https://www.netlify.com/) **or** [Vercel](https://www.vercel.com/) (Hosting, CD/CI, ...)

Only Mux requires a dedicated account, everything else can (theoretically) be accessed via a Github account.

Nevertheless, a dedicated account for Sanity is still recommended for non-technical clients as they will likely only want to access the CMS most of the time. This is a security benefit, too. 😉

### Email

To begin, create a new email address e.g. `client-name@yourdomain.com`. Forward this address to a catch-all account that you've added to your email program e.g. `clients@yourdomain.com`.

You can use `client-name@yourdomain.com` to create all neccessary accounts and receive notifications / 2FA Keys etc.

### Github

First, create a Github account and a (private) repository to later hold the production codebase. Invite your own Github account and any collaborator to this repo (`Settings -> Manage Access`).

Then, also add this repository as a remote (e.g. `production`)

### Vercel / Netlify

Use the newly created Github Account to sign up for the hosting platform of your choice.

☝️ **Please note: The free "Hobby" Plan on Vercel may only be used for non-commercial projects. Netlify does not have this specific restriction but will require an [additional plugin](https://github.com/netlify/netlify-plugin-nextjs) for Next.js (Can be installed in the Netlify Admin Panel or added to netlify.toml config).**

### Mux

You technically can set up the account for your client ahead of time, but they will have to add a payment info to prevent their videos from being watermarked and deleted after 24hrs.

Another way is to have them set up this account themselves, add their credit card and provide you with the login.

Once you can access their account, you need to create an API Key and Token for the [Mux Input Component](https://www.sanity.io/plugins/sanity-plugin-mux-input) on Sanity.

You will find instructions on this when you open a video input in the Studio for the first time.

### Sanity

You don't need to create a Sanity account for the client, just invite them to the studio at an appropriate time. Insist they add payment details so Sanity can charge them once they go over quota.

### Other

Depending on the requirements of the site you might need to include other services as well (e.g. Shopify, Mailchimp, Google Analytics, ...).

## Handoff

Once the website is completed and approved, you hand over all the logins to the client. Depending on the setup, it might only come down to the Github account in their name.
Remind them to change any password(s) immediately after they've received them.

**✌️ Tip: Try not to send sensitive information via email as those are (usually) not encrypted. If possible use a service like 1Password to [share the passwords securely](https://blog.1password.com/psst-item-sharing/) and have set everything to be deleted after a reasonably short time. Alternatively you can use a messenger that supports end-to-end encryption (e.g. [Signal](https://signal.org/)) or send the information as a text file in a password protected .ZIP, whose password you share with the recipient over the phone.**
