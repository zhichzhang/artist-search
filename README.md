> The link to the presentation video of the project is [artist-search-web-presentation.mp4](https://drive.google.com/file/d/1s1TLZP6b2hlV72P6W_J_aXHGdjfJovg7/view?usp=drive_link).  
> The project has now been upgraded to **Artist Search Pro**, an enhanced version built with Angular, Bootstrap, Express.js, and MongoDB.  
> Please check out this [Artist Search Pro](https://github.com/zhichzhang/artist-search-pro) and the [artist-search-pro-web-presentation.mp4](https://drive.google.com/file/d/1s1TLZP6b2hlV72P6W_J_aXHGdjfJovg7/view?usp=sharing) for more details.  
> Thank you!

# Artist Search

This project is available in multiple languages:

- [English](README.md)
- [简体中文](README.zh-CN.md)

This web application allows users to search for artists on [Artsy](https://www.artsy.net/). Simply enter an artist’s name to view search results, and click on any result card to view more details.

## Before Deployment

To deploy the application:

1. Visit the [Artsy API](https://developers.artsy.net/) to obtain your `client_id`, `client_secret`, and `token`.
2. Open [`token_util.py`](./app/utils/token_util.py) and configure the credentials as indicated in the comments.
3. In [`main-page.js`](./app/static/js/main-page.js), toggle the deployment mode via the `DEV_VERSION_OPENED` flag:
   - Set `DEV_VERSION_OPENED = true` for local testing.
   - Set `DEV_VERSION_OPENED = false` for deployment, and replace the `DOMAIN` parameter with your actual cloud domain (replace *my-domain* accordingly).

## Search Artist

1. Type a keyword into the search bar to receive relevant results from the server, shown as a horizontal row of result cards.  
2. Scroll the bar to the right to explore more results.

## Get Detailed Info

If you're interested in a particular artist, click their card to reveal more detailed information including birthdate, death date (if applicable), nationality, and biography—displayed below the result section.

## Responsive Design

The layout of the application adapts responsively to different screen sizes for optimal viewing on various devices.

## Caution

This project has been extensively customized to meet my personal requirements and therefore differs significantly from the original CSCI 571 assignment.  
It is intended solely for study and discussion purposes—**please do not plagiarize or submit the code for academic coursework.**
