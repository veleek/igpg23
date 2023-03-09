# To get it working

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
