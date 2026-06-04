# TCSS460 Group 9 Frontend

## Deployed URL

https://tcss460-g9.vercel.app/

## Backend Partner

### README

https://github.com/UWT-TCSS460-SP26/group-project-backend-group-8

### API Docs

https://tcss460-team-8-api.onrender.com/api-docs

### Bug Reporter

https://group-project-bug-tracker-front-end-mu.vercel.app/

## Reflection

### Findings

1) Homepage carousel image size

The homepage carousels took some work to make the image size responsive.
The library we're using for the carousels styles them a bit oddly, so it
took some work to get them looking nice. Now, they have two different
sizes based on the screen size, and will flex to columns if needed.

2) Content width

On several pages, the width of the main content was limited to look good
on a small screen, but not so good on a larger one. We adjusted the size
of these sections to fill the screen, no matter the size

3) Navbar icons

On smaller screen sizes, our navbar would get all clustered and ugly
because the text took up too much space. We added some FontAwesome icons
for each of the navbar buttons, and then when the screen was too small,
hid the text leaving only the icons. We also took the opportunity to
spread some more icons around in sensible places, like the search pages,
to make the current page's purpose more quickly identifiable.

---

Our Lighthouse audit came back with perfect performance, so we didn't have
any areas to improve there, likely due to how simple the app is.

### What Went Well

TODO

### What We'd Do Differently

TODO

### What Surprised Us

TODO

### What We Learned About AI Agents

TODO