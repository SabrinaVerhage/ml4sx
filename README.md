# ml4sx

**Machine learning for sex-tech enthusiasts, sex workers, and anyone in the sex-tech industry.**

Hi! I'm a maker who likes experimenting with sex tech, giving workshops, and sharing tech knowledge. I'm not a machine learning expert — just a hobbyist figuring things out and happy to share what I learn.

I made this repo for my **Prompt Denied** workshop. I also gave a workshop called **Artificial Desire** at **PFFV in 2026**.

Here I'm collecting little guides and experiments about machine learning and how it connects to sex tech. If you're curious too, have a look around. You don't need a technical background to get started.

Inspired by [ml4a — Machine Learning for Artists](https://ml4a.github.io/), by Gene Kogan and collaborators.

## What's here so far?

Four interactive guides:

- [Inside the next word](./Inside-the-next-word.html) — how language models turn text into tokens, use attention, and choose what comes next.
- [Inside the emerging image](./Inside-the-emerging-image.html) — how image models learn, and how prompts, noise, and a few other ingredients lead to an image.
- [Inside the refusal](./Inside-the-refusal.html) — the layers AI companies use to keep sexual content out: filtering training data, erasing concepts, teaching refusals, checking prompts and outputs. And what gets blocked by mistake (yes, aubergines too).
- [Inside the map](./Inside-the-map.html) — how a model learns which things look alike, shown with a real UMAP map of 864 vibrators.

The first two start with general examples. The idea is to get a feel for the basics, then use that understanding to look at how these systems treat sex and sex tech.

Each guide has about ten short steps and fits on one screen, so it works well on a projector. Pick a step from the bar at the top, or use the Back / Next buttons (or the ← → keys). Every step has a short explanation, a picture, and a "Try it" panel where you can click buttons, move sliders, and see what changes. Most are simplified demos, not actual AI models running in your browser; the map guide uses real data. There are notes and links inside each guide if you want to dig further.

## Try them

1. Download this repo using **Code → Download ZIP** and unzip it, or clone it if you use Git.
2. Open any of the HTML files in your browser. Keep the `assets` folder next to them: it holds the shared styles, navigation and map data.
3. Click around!

No setup or API key needed. On GitHub you'll see the code, so download the files to use the guides.

The demos run locally and don't send prompts to an AI service. The guides load Google Fonts when you're online, but work without them too.

### Product photos in the map guide

The map guide is built from my vibrator UMAP experiment: product photos from one online shop, turned into numbers with CLIP and laid out with UMAP. The photos belong to the shop, so they aren't in this repo; the guide shows labelled dots and tiles instead. If you have the photos, put them in a `map-photos/` folder next to the HTML files (named like `product_0000.jpg`) and the guide shows them automatically.

## More to come, probably :)

I'll add things as I make them or use them in workshops. No big roadmap — just a place to collect and share useful stuff.

Found something confusing or wrong? Have an idea for an experiment? Open an issue or send a pull request. I'm learning too, and help is welcome.

## License

I haven't picked a license yet.
