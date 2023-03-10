# Building

```bash
npm install
npm run build
```

The [dist folder](./dist) will contain the rendered pages and compiled CSS/Javascript that you need.

New pages should be added to [the pages folder](./site/pages).  Just copy one of the existing pages and replace everything inside of the

```nunjucks
{% block content %}
{% endblock %}
```

# Viewing

There is a [workflow](./.github/workflows/static.yml) that runs whenever a change is pushed to the `main` branch to publish the content to GitHub pages.

[https://www.veleek.com/igpg23]
