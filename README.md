<p align="center">
	<a href="https://plaguecraft.xyz">
	<img width="150" src="https://plaguecraft.xyz/assets/img/logo.png">
	</a>
</p>

<hr>

<h2 align="center">The PlagueCraft Network Discord Bot</h2>
	<p align="center"><a href="LICENSE">MIT License Agreement</a> ---- <a href="change.log">Changelog</a></p>

<p align="center">This bot is used in the <a href="https://plaguecraft.xyz/discord">PlagueCraft Network Discord server</a> for moderation, Minecraft tools, and more. It has a built-in ticket system, moderation commands (kick, ban etc) and some Minecraft commands, like something to check the status!</p>

<hr>

<h2 align="center">Contributing to this project</h2>
	<p align="center">If you'd like to contribute to this project, feel free to fork this and make a PR! We're always open to new ideas or improvements on this bot!</p>

<h2 align="center">This bot requires:</h2>
<p align="center">node.js - Obviously. Why wouldn't we need the thing it'd coded in lmao<br />
discord.js<br />
node-fetch - Not required atm, but eventually will be. Used eventually to fetch data from our backend (http://services.plaguecraft.xyz:3000). It will replace the http module.<br />
http - This is a pre-installed Node.js module, currently used to fetch data from our backend.. No need to `npm i http`.<br>
dotenv - If you'd like. You can make modifications for it to just pull the token directly from the file and remove the const at the beginning of bot.js, or use .env to hide your token!<br>
ms - used for the mute command's timer</p>
