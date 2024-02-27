# MWeb Fill

Automatically Fill out forms for easier testing via this bookmarklet.

## Installing Standalone Bookmarklet

```
npm run build
```

After running the build command, you should have a standalone bookmarklet at **html/bookmarklet**. Add a new bookmark in your browser whose URL/path is the contents of this file.

## Usage

Click the bookmarklet to autofill the form on your current page.

## Development

```
cd bin/mweb-fill
npm install
npm start
```

This will start a local development session that will open a browser-synced page with a button. Drag that button into your bookmark bar to get the latest code or test changes

### Adding New Forms

You can use enroll and airBooking as examples. Some notes

- You can use regex to match the url
- Input event type is fine for most inputs but select boxes and buttons work differently because of how React works with the dom. There are examples of both in enroll that should get you rolling.

### Notes

- This relies on jquery but does not include it directly. This means the page needs to have jquery at $ (which is currently true for our app)
- This attempts to fill in randomized data for different fields. However, it is not foolproof. For example, on Enroll, username overlaps that cause server side validation error are possible.
