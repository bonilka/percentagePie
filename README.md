# percentagePie.js
percentagePie.js is small plugin for presentation of interes data.

# Basic Usage
1. Include the Javascript file in your html.
```
<script type="text/javascript" src="iconate.min.js">
```
2. Create `div` element.
    ```
    <div id="pie-1"></div>
    ```
3. Create new Pie object/
    ```
    var pie1 = new Pie({id: 'pie-1', value: 65});
    ```
4. Success!

# Settings object
  ```
  {
    'id':'pie-1', //id of dom element
   'value': 35, //interes value (35%)
    'font': 'normal 1em Helvetica, Arial, sans-serif', //font setting for text in the pie
    'borderWidth': '20', //thickness of border
    'textColor': '#c0c0c0', //text color in the pie
    'borderColor': '#a0ffff', //border color
    'innerColor': '#0429ff', // background color inner the pie
    'backgroundColor': '#c0c0c0' //background color of canvas
}
  ```
# a bit more
* Height of the pie calculate  based on the width of the div.
* Plugin append canvas element to div#id.
* PrecentagePie creates responsive circles.
