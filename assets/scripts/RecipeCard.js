// RecipeCard.js

class RecipeCard extends HTMLElement {
	// Called once when document.createElement('recipe-card') is called, or
	// the element is written into the DOM directly as <recipe-card>
	constructor() {
		super(); // Inherit everything from HTMLElement

		// EXPOSE - START (All expose numbers start with A)
		// A1. TODO - Attach the shadow DOM to this Web Component (leave the mode open)
		let shadowEl = this.attachShadow({mode:'open'});
		// A2. TODO - Create an <article> element - This will hold our markup once our data is set
		let articleEl = document.createElement('article');
		// A3. TODO - Create a style element - This will hold all of the styles for the Web Component
		let styleEl = document.createElement('style');
		// A4. TODO - Insert all of the styles from cardTemplate.html into the <style> element you just made (copy everything INSIDE the <style> tag>)
		fetch('reference/cardTemplate.html')
			.then(response => response.text())
			.then(data => {
				const temp = document.createElement('div');
				temp.innerHTML = data;
				const styleTag = temp.querySelector('style')
				styleEl.innerHTML = styleTag.innerHTML;
			})
			.catch(error => {
				console.error('There was a problem fetching the data:', error);
			});

		// A5. TODO - Append the <style> and <article> elements to the Shadow DOM
		shadowEl.appendChild(styleEl);
		shadowEl.appendChild(articleEl);
	}

	/**
	 * Called when the .data property is set on this element.
	 *
	 * For example:
	 * let recipeCard = document.createElement('recipe-card'); // Calls constructor()
	 * recipeCard.data = { foo: 'bar' } // Calls set data({ foo: 'bar' })
	 *
	 * @param {Object} data - The data to pass into the <recipe-card> must be of the
	 *                        following format:
	 *                        {
	 *                          "imgSrc": "string",
	 *                          "imgAlt": "string",
	 *                          "titleLnk": "string",
	 *                          "titleTxt": "string",
	 *                          "organization": "string",
	 *                          "rating": number,
	 *                          "numRatings": number,
	 *                          "lengthTime": "string",
	 *                          "ingredients": "string"
	 *                        }
	 */
	set data(data) {
		// If nothing was passed in, return
		if (!data) return;

		// A6. TODO - Select the <article> we added to the Shadow DOM in the constructor
		let articleSelected = this.shadowRoot.querySelector('article');
		// A7. TODO - Set the contents of the <article> with the <article> template given in
		//           cardTemplate.html and the data passed in (You should only have one <article>,
		//           do not nest an <article> inside another <article>). You should use template
		//           literals (template strings) and element.innerHTML for this.
		// 			 Do NOT include the <article> tags within the innerHTML of the element you create.
		//           Remember to replace all the placeholders in the template with the data passed in.
		//           i.e. imgSrc, titleLnk, etc
		articleSelected.innerHTML = `
			<img src="${data.imgSrc}" alt="${data.imgAlt}">
  			<p class="title">
    			<a href="${data.titleLnk}">${data.titleTxt}</a>
  			</p>
			<p class="organization">${data.organization}</p>
			<div class="rating">
				<span>${data.rating}</span>
				<img src="/assets/images/icons/${data.rating}-star.svg" alt="${data.rating} stars">
				<span>(${data.numRatings})</span>
			</div>
			<time>${data.lengthTime}</time>
			<p class="ingredients">
				${data.ingredients}
			</p>`;
	}
}

// A8. TODO - Define the Class as a customElement so that you can create
//           'recipe-card' elements
customElements.define('recipe-card', RecipeCard);