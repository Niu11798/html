# JLU 100th Anniversary Countdown · WeChat Mini Program

A WeChat Mini Program that celebrates the 100th anniversary of Jilin University (JLU) and counts down to **September 16, 2046** — the centenary of the university, whose earliest predecessor was founded in 1946.

## Features

- 🎉 **Welcome** — an entry screen that leads into the app.
- ⏳ **Countdown** — a real-time day / hour / minute / second countdown with rolling-digit animation, plus a "century progress" bar showing how far along the 1946 → 2046 journey we are.
- 📜 **History Timeline** — 49 milestones covering JLU's predecessor schools and the mergers that formed today's university.
- 📊 **Statistics** — an interactive map of JLU's six Changchun campuses with their addresses.
- 💬 **Message Board** — leave anniversary wishes (seeded with sample messages).
- ❓ **Quiz** — a 10-question quiz on JLU's history and facts.

## Tech Stack

- Native WeChat Mini Program (WXML / WXSS / JavaScript), no build tools required.
- [miniprogram-api-typings](https://www.npmjs.com/package/miniprogram-api-typings) for TypeScript type hints.

## Project Structure

```
├── app.js / app.json / app.wxss   # global app logic, config & styles
├── pages/
│   ├── welcome/                   # welcome / entry page
│   ├── index/                     # countdown (home tab)
│   ├── timeline/                  # history timeline
│   ├── data/                      # statistics & campus map
│   ├── message/                   # message board
│   └── quiz/                      # knowledge quiz
├── utils/
│   └── data.js                    # history events, quiz questions, sample messages
├── images/                        # logo & tab-bar icons
└── project.config.json            # WeChat DevTools project config
```

## Getting Started

1. Install [WeChat Developer Tools](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html) (微信开发者工具).
2. Open it and choose **Import project**, then select this folder.
3. The AppID is already set in `project.config.json`; you may replace it with your own AppID or a test AppID.
4. Click **Compile** to preview the app in the simulator.

## The Anniversary Date

Jilin University traces its origin to the Northeast Administration College (东北行政学院), founded in **1946**. September 16, 2046 marks the university's 100th anniversary — the target of this countdown.
