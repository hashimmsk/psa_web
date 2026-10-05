# psa_web

Website and working folder for the **Pakistani Students Association at the University of Miami**.

- **Live site:** https://psaumiami.com
- **Instagram:** [@psa.umiami](https://www.instagram.com/psa.umiami/)
- **Engage:** [Official org page](https://miami.campuslabs.com/engage/organization/pakistani-students-association)
- **WhatsApp:** [Join the group chat](https://chat.whatsapp.com/CKHYEkN3TRg7ovX76oHj2v)

## Folder layout

```
psa/
├─ index.html            the entire website, one self-contained file (published)
├─ og.png                link-preview image and favicon (published)
├─ CNAME, .nojekyll      GitHub Pages config (published)
├─ site-assets/          source images used while designing the site (not referenced by index.html)
├─ forms/                Google Apps Script for the e-board application form
├─ org-docs/             constitution, COSO guidelines, Engage reactivation form, spring plan  (private)
├─ misc/                 unrelated files parked here
└─ safac-2026-27/        everything for this year's SAFAC budget                     (private)
   ├─ 1-submission/        R1 SAFAC 26-27.xlsx + the documentation packet — what SAFAC receives
   ├─ 2-vendor-documents/  Lakeside invoice, SCC email, quotes, Amazon price captures
   ├─ 3-cosponsorships/    Eid × Basant packets for SASO, SG Senate, Hurricane Productions
   ├─ 4-safac-reference/   handbook, guidelines, policies, blank official template
   ├─ 5-last-year-2025-26/ the 2025-26 Regular 1 budget, for precedent
   └─ working/             planning workbook, build scripts (tools/), superseded drafts (archive/)
```

Everything marked private is excluded from this public repository by `.gitignore`
(`*.pdf`, `*.xlsx`, `*.docx`, the `safac-2026-27/`, `org-docs/` and `misc/` folders) because
those files carry officer names, phone numbers and signatures.

## How the site works

`index.html` is the whole site. The crest is embedded as a data URI, the join QR codes are
inline SVG, and the only external request is the Google Fonts stylesheet. No build step,
no dependencies, no framework. To work on it, open `index.html` in a browser. To publish,
commit and push to `main` — GitHub Pages redeploys automatically.

## Editing common things

| What | Where in `index.html` |
| --- | --- |
| Events timeline | `<section class="panel" id="events">` — one `<article class="stop">` per event |
| Board members | `<section class="panel" id="board">` — the `.roster` block |
| Colours | the `:root` block at the top of `<style>` (dark theme) and the light-theme blocks below it |
| FAQ | `<section class="panel" id="faq">` |
| Ticker words | the `words` array in the `<script>` at the bottom |

## Rebuilding the SAFAC working files

```bash
cd safac-2026-27/working/tools
python3 build_budget.py && python3 build_docpack.py
```

`build_budget.py` writes the planning workbook into `working/`; `build_docpack.py` reads it and
writes a regenerated documentation packet next to it. The copies SAFAC actually receives live in
`1-submission/` and are edited by hand in Excel and Word.

## Content sources

Site copy is drawn from PSA's public Engage listing, its Engage event archive, and the
organization's constitution. Board membership and contact details change yearly — treat the
Engage page as authoritative.
