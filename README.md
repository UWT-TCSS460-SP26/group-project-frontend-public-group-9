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

## Design

### Philosophy

Our team saw what other frontend teams had come up with, and decided to go
with a more minimalist style focused on functionality and maximum contrast.
Our UI elements are largely monochromatic, our theme features 4 main
colours (as well as a colour for links).

We use icons from FontAwesome to represent user actions available, which
respond to dark/light mode and are used on small screens to represent
actions on their own.

### Extra Features

**Media Carousels**

Our homepage features side-by-side (or stacked on small screens) carousels
of the top 20 popular movies. Each carousel displays a poster for the movie
or show, automatically scrolling between them, and then pauses when the user
hovers over the carousel to display the title and synopsis of the media. The
carousels are responsive to any screen size, and both dark and light modes.

**Dark Mode**

Our navbar includes a toggle for swapping between light mode and dark mode.
We reviewed the design of all of our pages, ensuring the different modes
worked well and correcting any outlier elements (like the homepage
carousels). Our implementation is built on toggling a class in the `body`
element, which swaps around the theme colours.

**Skip to content**

All of our pages feature a skip-to-content button that appears when focused
(and always to screen readers), that is the first focusable element on the
page.

**Scroll to top**

All of our pages feature a scroll-to-top button that appears when the user
scrolls down the page. The button is typically hidden, but will also display
when focused (and is the second focusable element)

### Accessibility Features

Accessibility gauged against [WCAG 2.2](https://www.w3.org/WAI/standards-guidelines/wcag/glance/).

**Contrast**

Due to our choice of a minimalist monochromatic theme, contrast is at it's
maximum.

**Keyboard Navigation**

For power users and non-visual users alike, our website offers several
features aimed at keyboard navigation. Primarily, these features are the
skip to content button and the scroll to top button.

The skip to content button is the first focusable element on every page,
and is only visible when focused but always visible to screen readers.
This feature allows screen reader users to skip past the navbar on every
page, which usually doesn't change, and go straight to the new content of
the page. As the first element of the page, it's the first thing the screen
reader will describe.

The scroll-to-top button is the second focusable element on every page, and
is visible when focused, when any user has scrolled, or always to screen
readers. This button focuses the top element, making navigation easy after
going through the content of a page.

**Flashing**

The only changing visuals on our site are the carousels on the homepage, which
respect the user's auto-play preferences and will always stop moving on hover.

**Alternative Text**

All non-decorative images, buttons, and links have alternative text
descriptions.

**Compatibility**

Our website has been tested across browsers, and is built with responsiveness
in mind. The website functions largely the same across any platform that
supports it's technology.

**Visual**

Our website has been tested with a variety of text sizes, and remains functional
with text 200% larger than default.

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