JOHN LEE BIRTHDAY WEBSITE — VERSION 2

PROJECT ORGANIZATION
- index.html       Website content and sections
- css/style.css    All colors, layout, fonts and visual styling
- js/script.js     Password, music, interactive surprises and timers
- photos/          Put your own six pictures here
- music.mp3        Optional music file (you provide this)

OPEN THE PROJECT
1. Extract this ZIP file.
2. Open the john_lee_birthday_v2 folder in VS Code.
3. Keep the folder structure exactly as provided.
4. Open index.html and run it with Live Server.

PASSWORD
The password is 112624.
To change it, open js/script.js and edit:
const WEBSITE_PASSWORD = "112624";

ADD PHOTOS
1. Put your pictures in the photos folder.
2. Name them photo1.jpg, photo2.jpg, photo3.jpg, photo4.jpg, photo5.jpg, photo6.jpg.
3. If a photo is PNG, edit its matching src and data-src in index.html to .png.
4. The gallery has a click-to-enlarge photo viewer.
5. Change captions in the span with class="caption".

ADD MUSIC
Put an MP3 file beside index.html and name it music.mp3.
The player is prepared, but the song audio is not included. Browsers require
the visitor to press Play. Use an audio file you are allowed to use.

ANNIVERSARY COUNT-UP
The live counter starts at November 15, 2024.
It updates every second and shows full years, remaining days, hours, minutes
and seconds. The date is set near the top of js/script.js:
const ANNIVERSARY_DATE = new Date(2024, 10, 15, 0, 0, 0);
JavaScript uses 0 for January, so 10 means November.

INTERACTIVE SURPRISES
- Click photos to enlarge them.
- Flip a birthday card.
- Open and close a secret letter.
- Generate a random reason.
- Answer the anniversary mini quiz.
- Unwrap and re-wrap a virtual gift.
- Make floating hearts appear.

SECURITY NOTE
The password is visible in JavaScript. This gate is for a fun surprise, not
strong security. Do not use it to protect sensitive information.
