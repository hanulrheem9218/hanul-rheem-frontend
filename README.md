# Hanul Rheem Portfolio

<img src="https://github.com/hanulrheem9218/hanul-rheem-frontend/blob/master/public/assets/portfolioWeb.png"  width="100%" />

I created a simple Three.js-based website that showcases my projects and introduces myself. I used HTML, CSS, React, Vite, Three.js, GSAP, and TypeScript to implement this 3D website. The website is hosted on Vercel.

## Features

### Finished (Website Features)

- Animated 3D objects from homepage.
- Compatible Desktop & Mobile web application
- Screen effect on the about me page.
- Moveable 3d Objects and allows user to input and sumbit.
- Email system feature for the contact page.
- Animated point lights.
- Low poly based 3d assets.

### Bug Fixes

<details><summary>Expand to see bug fixes</summary>

- Fixed the vercel intergration error with linking image.
- Fixed screen size automation for desktop and mobile
- Fixed rendering pixel ratio "1" to "3", so it's more readable.
- Fixed null reference issues
- CSS3Drenderer & WebGLRenderer compatible.
- 3DObject & 2DObject UI interactions are responsive.
- Model light compilation errors
- Vercel.json host address redirected to "./"
- Replaced "process.env" to "import.meta.env" for vite js
- Delayed input from mobile application
- 2DObject images are no longer flickering.
- CSS3DRenderer black lines are disappeared. (Z-buffer) issue  

</details>

# Package Structure

**This is only applicable to the old XML version of the application. I will be changing the
structure during the Compose Migration and will update this section once I finish that.**

- **public** — a folder that contains 3d models and assets. 
- **src** — a folder that contains components,interface, pages.


