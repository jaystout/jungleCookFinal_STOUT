# # Jungle Cook Final (Jaymee Stout)
This is a project that I made for my NEWM-N315 class. It's a CRUD application with responsive views where a user can sign up, login, logout, and create and view a recipe. The name of the website is called Jungle Cook. There was an issue with getting the functionality of being able to edit, so you can view the page by clicking on "recipes by category" on the footer. Likewise, the "your recipes" page styles can be seen on the "your recipes" link in the footer. Those were my biggest challenges and I couldn't get them to work, but you can see they were made. 

## How to view

You can go to this firebase hosted site to see the page.

```bash
https://final-712e7.web.app/ 
```

## What this application does and how it works

Users can visit the Jungle Cook site, register with a new account; or login if they already have an existing account, and create a new recipe with ingredients and instructions, and then view that recipe that they created in the "view recipe" tab. Users can create as many recipes as they would like, which the data is all kept in firebase. Users can also log out, and there are error messages explaining what the error is if the user types something wrong or something wrong occurs. The pages are displayed through view injection, and the project itself uses firebase, so the code is inside the public folder. Users receive alerts when they are succesfully logged in and are taken back to the login screen when they log out. In regards to the viewinjection, this is a one page site with the block modifier element model, (BEM model), with block components, elements that depend on the block, and modifiers that change the style of the block.



