# PokeTrader
Discord Web-Scraping Bot for Pokemon Cards

# Why?
Because my friend liked Pokemon cards, and always complained in Discord about having to search them up.

# How?
Uses a regular expression to match potential card IDs (i.e. 104/205) and automatically searches them on Troll & Toad.
Also has a few commands implemented using Discord.Js and Akairo.

To reduce API requests (and subsequent IP ban, probably), results are cached using MemCache.
