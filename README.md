# Simple Select

### This is a simple Javascript library to help you style the html select element


## 1. Installation:

1. Download **simple-select.min.js** or **simple-select.js**
2. Place code below at the end of body element in your HTML file:

	`<script  src="path_to_file/simple-select.min.js"></script>`

## 2. How to use?

You can use this just like a normal select element except that you need to give it a unique id. Example:

    <select id="unique_id">
	    <option value="val1>Value 1</option>
	    ...
	</select>

In the option tag you can use the properties selected, hidden and disable. Example:

    <select id="unique_id">
	    <option value="val1 selected>Value 1</option>
	    <option value="val2 diabled>Value 2</option>
	    <option value="val3 hidden>Value 3</option>
	    ...
	</select>

The whole works with forms. Example:

    <form method="get" action="/test">
	    <select id="unique_id" name="value">
		    <option value="val1 selected>Value 1</option>
		    <option value="val2 diabled>Value 2</option>
		    <option value="val3 hidden>Value 3</option>
		    ...
		</select>
	</form>

Submit result:

    https://example.com/test?value=Value+1

## 3. How to style?

There are three objects to style:

- **.select** - corresponds to the select element
- **.options** - corresponds to a list with options
- **.option** - corresponds to the option elements

You can style elements globally using the above classes, or choose one with id and class using css child combinator. Example:

    #unique_id .select {
	    width: 200px;
    }

## 4. Notices

- If you do not add css width property to the .select element it will adjust to the length of the current selected option, and if the user selects an option that contains more text, the select element will expand downwards or rightwards.
Consider fixing the width of the .select element if the text in the .option elements is of different lengths.

- The library contains a built-in style that is added to the HTML code as a base64 link, not as a \<style> block, so that you can override it with your own styles.

- Can be controlled by the Tab, Enter (Return) and Arrow keys.
