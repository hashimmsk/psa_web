# psa_web

Website for the **Pakistani Students Association at the University of Miami**.

- **Live site:** https://<your-domain>
- **Instagram:** [@psa.umiami](https://www.instagram.com/psa.umiami/)
- **Engage:** [Official org page](https://miami.campuslabs.com/engage/organization/pakistani-students-association)
- **GroupMe:** [Join the group chat](https://groupme.com/join_group/99551332/4DJJ3RIY)

## How it works

`index.html` is the entire site — one self-contained file. The crest is embedded as a
data URI, the three join QR codes are inline SVG, and the only external request is the
Google Fonts stylesheet. There is no build step, no dependencies, and no framework.

To work on it, open `index.html` in a browser. To publish, commit and push to `main` —
GitHub Pages redeploys automatically.

## Editing common things

| What | Where in `index.html` |
| --- | --- |
| Events timeline | `<section class="panel" id="events">` — one `<article class="stop">` per event |
| Board members | `<section class="panel" id="board">` — the `.roster` block |
| Colours | the `:root` block at the top of `<style>` (dark theme) and the light-theme blocks below it |
| FAQ | `<section class="panel" id="faq">` |
| Ticker words | the `words` array in the `<script>` at the bottom |

## Content sources

Copy is drawn from PSA's public Engage listing, its Engage event archive (7 events,
2019–2025), and the organization's constitution dated 11 April 2024. Board membership
and contact details change yearly — treat the Engage page as authoritative.

## Note

The organization's PDFs (constitution, COSO guidelines) are excluded via `.gitignore`
because they carry officer names and signatures. Keep them out of this repo while it
is public.
