# prozip-music

prozip-music is a simple audio streaming to play my own music collections. ----hope you liked it

Deploy at: [prozip-music.tk](https://prozip-music.tk/)

## Features 

- [x] AdsFree and Open Source

- [x] Playlists support 
- [x] Multiple playmode (order, loop, 1loop, shuffle)
- [x] Custom music play
- [x] Miniplay
- [x] PIP player
- [x] Custom context Menu
- [ ] Hotkeys 
- [ ] Local song player
- [ ] Save history song 
- [ ] add song to favorites 
- [ ] Song, Album, Artist search
- [ ] Lyrics Support
- [ ] User can contribute their song
- [ ] Desktop App version
- [x] Download for offline play - with full ID3 tags
- [x] Dark mode

## Albums

This is my list from static backend API.

1. Top Picks

2. Nhạc Việt

3. Dan Nhi Vol 1

4. Melody of the Night

   ......



## For development

#### Requirements

- Nodejs
- Yarn



#### Clone this project

```javascript
git clone https://github.com/prozip/prozip-music
```



#### Prepare a backend API server

> For static backend, your albums will add inside public folder
>
> - Create a new albums by create a new folder with id_name (Ex: 03-dan-nhi-vol-1)
> - Audio put inside this folder
> - Run json_generator.py to create json for API
> - Repeat when adding new song or ablums
>
> For dynamic backend: build yourself



#### Install dependencies

```
yarn
```

#### Run the development server

```
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000/) with your browser to see the result.



## Special thanks to:

- [Nextjs](https://nextjs.org/): better React FrameWork.
- Github: host the Client.
- Freenom: domain.
- Cloudflare workers: custom DNS server.