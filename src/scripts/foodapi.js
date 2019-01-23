const listEl = document.querySelector(".foodList")

const foodFactory = food => {
    return `
        <article class="foodEachCard">
        <section>
            <h1>Food: ${food.name}</h1>
        </section>
        <section>
            Category: ${food.category}
        </section>
        <section>
           Ethnicity: ${food.ethnicity}
        </section>
        <section>
            UPC: ${food.barcode}
        </section>
        <section>
        Ingredients: ${food.ingredients}
        </section>
        <section>
        Country of Origin: ${food.countryOrigin}
        </section>
        <section>
        Calories per Serving: ${food.servingCalories}
        </section>
        <section>
        Fat per serving: ${food.servingFat}
        </section>
        <section>
        Sugar per serving: ${food.servingSugar}
        </section>
        </article>
    `
}

const addFoodToDom = foodHTML => listEl.innerHTML += foodHTML

fetch("http://localhost:8088/foods")
    .then(response => response.json())
    .then(myParsedFoods => {
        myParsedFoods.forEach(food => {
            // console.log(food) // Should have a `barcode` property

            // Now fetch the food from the Food API
            fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)
                .then(response => response.json())
                .then(productInfo => {
                    // food.ingredients = productInfo.product.ingredients
                    food.ingredients = productInfo.product.ingredients_text
                    food.countryOrigin = productInfo.product.countries_tags
                    food.servingCalories = productInfo.product.energy_serving
                    food.servingFat = productInfo.product.fat_serving
                    food.servingSugar = productInfo.product.sugars_serving
                    console.log(productInfo)

                    // Produce HTML representation
                    const foodAsHTML = foodFactory(food)
                    // Add representaiton to DOM
                    addFoodToDom(foodAsHTML)
                })
        })
    })