
## Qlik Sense Help Text Popup ##

This extension displays a help text popup box on a sheet in a Qlik Sense app. You can display this Help Text Box by clicking the question mark help icon on the sheet. 

The **Help Icon** is displayed as question mark. It can be placed anywhere on the sheet and can be as small as one grid box.

__Help Icon Options__
 - Color - The icon color can be set to any valid color expression.
 - Size - The icon is normally displayed as 16px (default). It can also be changed to small (12px) or large (20px).

The **Help Text Box** is a popup box that overlays a portion of the screen with HTML help text content. The box can be rendered as modal or non-modal, and can be any size, up to the height and width of the window. The help text is any HTML content that can be rendered.

__Help Box Options__

 - Show box title - The help box title can be toggled on and off.
 - Help Box Title - The help box can have a custom title.
 - Width - The width of the box can be sized to any percent of the browser window.
 - Height - The height of the box can be sized to any percent of the browser window.
 - HTML Text - The actual help text is any valid HTML that can be rendered.

__HTML Sanitization__
The Help Text Popup includes a built-in HTML sanitization in order to prevent cross-site scripting and other vulnerabilities. This is configurable via the sanitize-html-config.js file included in the extension package. By default the most commonly used safe HTML tags are allowed, but you may adjust this to suit your security requirements. All required files are included in the extension and does not require any additional installation. More information about allowing and disallowing specific tags can be found at [this link](https://github.com/apostrophecms/sanitize-html). 

__Sample__
A file named 	"Sample_Help_Text_For_Testing.txt" is included. This file contains some sample help text to demonstrate the features of this extension.

The image below shows the help text box displayed over a sample app from the Qlik site.

![](/Help-Text-Popup.PNG)
