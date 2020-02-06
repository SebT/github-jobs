# Github Jobs

## Goal

Recruitement test for visage.jobs

Specs received by e-mail from Emmanuel Marboeuf :

> As I told you we have a quick test to assess your skills as a Front End Engineer [...]
>
> Could you write a small Javascript application (2 or 3 tiers) that will validate >
> the following specifications :
>
> - Input a location
> - use the https://jobs.github.com/api Github job API to request jobs from the location you selected.
> - Display the jobs sorted by submission date (desc)
> - Allow users to save jobs (persist) and access their saved jobs

## App design approach

As the application is very simple I wouldn't use a SPA for a real-world usage. I would develop a simple web server handling a single HTML page containing a form. It would be a (much) simpler version of how the https://jobs.github.com/ website works

But since this is a recruitement test and we talked about VueJS during my first interview, I've decided to develop a small SPA in vue.

### Iterations

#### Search for jobs

- Setup server with a small HTTP api to request github jobs api and prevent CORS errors
- Setup frontend app (vuejs) :
  - A default view with a location input
  - On form submit, show results
  - On job click, show details (second view)

#### Save jobs

- Use localStorage to avoid account creation
- Allow user to save job
- Add view to show saved jobs

#### Account management

- Allow user creating account with email / password
- Persist save jobs to DB
- Use server instead of localStorage if logged into account

#### Improvements

- Improve UI
- Show job details as markdown
- Login with external service like github account
- Handle pagination

## How to use

Generated with vue-cli.
See [Configuration Reference](https://cli.vuejs.org/config/).

### Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve:front

# For backenf use
yarn serve:back
```

### Compiles and minifies for production

```
yarn build
```

### Run your unit tests

```
yarn test:unit
```
