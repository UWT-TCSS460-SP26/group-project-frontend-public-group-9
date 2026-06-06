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

**Saeed**:
Weekly meetings were helpful to get a grasp on who needed to complete
certain sections of the project. Kanban project boards in GitHub helped to
organize the sprints in a manner where each of us could self assign tasks
and notify team members when they were ready to be reviewed. Consistent
communication outside of meetings through Discord were helpful to know
where everyone was at progress wise.

**Raiden**:

Our team worked together really well, we stayed on top of getting the work
done in time and fell into a consistent routine for each sprint. We didn't
have much trouble with the implementation, our biggest struggle was the one
time we didn't test our deployment in production and it became an issue. We
didn't have any problems at all with the hand-off, with either our downstream
or upstream partners.

**Riley**:

I think generally everything went well with our group, there wasn't really
any hiccups that we had. I definitely think that the structure and organization
was a big helper to that, Raiden was very good at getting the devariables all
setup, neatly which was very helpful for our team, I'm very thankful for that.

### What We'd Do Differently

**Saeed**:

Meeting minutes felt more like a chore than it did helpful. Some meetings
felt unnecessary as one meeting was enough for us to get a viable sprint
structure; most meetings after the initial weekly meeting consisted of simple
communication where we would say where we were at in the tasks (could have
easily been done through Discord as we were doing already).

**Raiden**:

Knowing what is needed for the frontend, I'd design the backend a bit
differently and not put as much effort into features that aren't going
to be used, while focusing more on the actually necessary features. There
wasn't a whole lot of room for interesting or different implementations on
the backend, while on the frontend we had room to try out different designs.

**Riley**:

Honestly this is just my personal opinion, but I think I'd use AI even
less, while it did everything it was supposed to well I didn't really learn
the underlying tools as well as I would've liked to.

### What Surprised Us

**Saeed**:

The amount of time debugging and writing tests took. Also having to run
lint and check and prettier multiple times throughout PR creation for
simple (but necessary) fixes.

**Raiden**:

How much of a pain dependency management is, especially with documentation
that varies in applicibility so much just over time.

**Riley**:

Just how good AI is. It isn't perfect, but honestly its good enough to a
point its kind of scary. I know that a senior dev can produce better code
than an AI, but AI can just do tasks so fast and to a good enough quality
that it makes the junior dev role, seem like its in danger, this kind of
leads into what I learned about AI.

### What We Learned About AI Agents

**Saeed**:

Claude is actually just the best in comparison to other agents. AI is a
helpful learning and coworking tool, but it is very easy to fall into a
workflow where you're telling Claude what to do and it simply doing it
for you. Claude also makes a lot of assumptions if you are not explicit
in your prompts, so being specific and thorough helps the output become
consistent.

**Raiden**:

They're extremely resource intensive, and not very fun or interesting to
work with. They limit how much I actually learn from doing the work,
and seem more useful with a solid foundational understanding of the
task I'm using them for.

**Riley**:

Building off the last section, I learned that ai isn't as bad as I used to
think it was. I remember working on a C++ project for TCSS 360 in the summer,
and one of the big highlights was how awful Chatgpt was. It couldn't help me
with coding because it didn't know the current version of sdl, which was 3
at the time. It would consistently give me old sdl2 code even after I told
it that I was on a new version; it would push me in weird complex directions
that had a simpler solution. Now I don't think Claude has any of those issues,
its so good matter a fact that I think I could re do that project by my self
and have like 3x the code qualty, since it would be better at helping me
through issue I encounter while programming. So its a scary world.