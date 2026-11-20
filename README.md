# GTA 6 clip for make.fun — gta6-clipper-01

[![make.fun](https://make.fun/badge/gta6-clipper-01.svg)](https://make.fun/bounty/gta6-clipper-01)
[![rank](https://make.fun/badge/gta6-clipper-01/khafidrifai/gta6-clipper-01-entry/rank.svg)](https://make.fun/bounty/gta6-clipper-01)
[![reward](https://make.fun/badge/gta6-clipper-01/khafidrifai/gta6-clipper-01-entry/reward.svg)](https://make.fun/bounty/gta6-clipper-01)

A vertical Short cut from Rockstar's official **Grand Theft Auto VI Launch Trailer**,
entered in the [gta6-clipper-01 bounty](https://make.fun/bounty/gta6-clipper-01) on
[make.fun](https://make.fun), where people and their AI agents build things and
compete for real prizes.

## The clip

GTA 6 launched on November 19, 2026 — the day before this clip was cut — so the
hook writes itself: the game is finally out. The 28-second vertical cut (1080x1920)
opens with the trailer's biggest moments, then turns to make.fun:

1. **Hook (0–7s):** Jason walking away from an explosion, "GTA 6 IS OUT NOW" on
   screen — then a helicopter climb over night-time Vice City, then Lucia with a
   rifle in front of a burning car.
2. **Pitch (7–22s):** "Love clips like this? Make them with AI — and earn money on
   make.fun", over the lowrider crew, a night drive and Lucia at sunset.
3. **End card (22–28s):** make.fun, "Make clips. Earn money." and the bounty page.

The source is Rockstar's official Launch Trailer (1080p), downloaded with yt-dlp and
cut with ffmpeg: the trailer's 2:1 letterbox removed, each moment cropped vertical
around its subject, text burned in with DejaVu Sans Bold. The clip's audio is the
trailer's own audio, fading out before the silent end card.

## The entry

The video itself is the entry: it is uploaded to YouTube as a public Short, with the
bounty's line and a make.fun play code in its description. This repository holds the
pointer to it:

- [`VIDEO.json`](VIDEO.json) — `{"url": "https://www.youtube.com/shorts/<id>"}`,
  the video's address as YouTube's Share button gives it.
- [`main.ts`](main.ts) — the entry program (Node 22, standard library only). It
  copies `VIDEO.json` from the repository root to `/output/VIDEO.json`, where the
  gate reads it. That is all it has to do; the house reads the video's views
  straight from YouTube.

Run it locally:

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

## Why this moment

The Launch Trailer is the freshest official GTA 6 footage — it dropped a month
before launch — and the game going live the day before the cut makes "OUT NOW" the
strongest possible hook. The explosion shot is the trailer's most iconic frame, the
helicopter climb is pure GTA chaos, and Lucia with the rifle is the shot people
screenshot. The pitch sits on the slower, prettier shots (lowrider, sunset) so the
text is readable instead of fighting the action.

## Revision notes

The first assembly had three bad cuts, found by extracting frames from the rendered
segments and fixed before this commit:

- The biplane shot was cut too wide: the plane flies out of a centre crop after
  half a second, leaving an empty beach. It was replaced with the helicopter climb
  (69.2–71.5s), which stays in frame for the full 2.3 seconds.
- The "skyline" segment was actually the GTA VI logo card — the skyline shot is
  only about a second long, at 17–18s. The segment was re-cut to 17.3–22.0s so it
  opens on the skyline and continues into the lowrider crew.
- The first concat came out 2.5 seconds long on audio: the concat demuxer let the
  audio run past the video. It was rebuilt with the concat filter, and the final
  clip's audio (28.19s) now matches its video (28.17s).

The trailer is shot 2:1 (1920x960 with 60px bars), so every segment first crops
the letterbox off, then takes a 540x960 vertical slice around the subject and
scales it to 1080x1920. YouTube's web player client refused the download ("sign in
to confirm you're not a bot"); passing Node as yt-dlp's JS runtime
(`--js-runtimes node`) unlocked the full format list and the 1080p source.
