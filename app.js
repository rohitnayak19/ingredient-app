const addBtn = document.querySelector("#addButton");
const input = document.querySelector("#ingredientInput");
const categorySelected = document.querySelector("#categorySelect");

const ingredientData = JSON.parse(localStorage.getItem("ingredients")) || {};


function saveingredientData() {
    localStorage.setItem("ingredients", JSON.stringify(ingredientData))
}


function renderIngredient(category, name) {
    const list = document.querySelector(`.category[data-category="${category}"] .ingredients`);
    const emptyMessage = list.querySelector(".empty");

    if (emptyMessage) emptyMessage.remove()
    const li = document.createElement("li");
    li.className = "ingredient"
    li.innerHTML = `${name} <span class="delete">&times;</span>`;

    const deleteIngredient = li.querySelector(".delete");
    deleteIngredient.addEventListener("click",()=>{
        li.remove()
        ingredientData[category] = ingredientData[category].filter(itemName => itemName !== name);
        if(ingredientData[category].length === 0){
            delete ingredientData[category]
            const empty = document.createElement("p")
            empty.className = "empty"
            empty.textContent = "No ingredient"
            list.appendChild(empty)
        }
        saveingredientData()
        
    });

    list.appendChild(li)

}
addBtn.addEventListener("click", () => {
    const ingredientName = input.value.trim();
    const selectedCategory = categorySelected.value;

    if (!ingredientName || !selectedCategory) {
        alert("please enter ingredient name and selct category")
        return
    }

    if (!ingredientData[selectedCategory]) {
        ingredientData[selectedCategory] = []
    }

    ingredientData[selectedCategory].push(ingredientName)
    saveingredientData()
    renderIngredient(selectedCategory, ingredientName)

    input.value = ""
});

window.addEventListener("DOMContentLoaded",()=>{
    for(const category in ingredientData){
        ingredientData[category].forEach((name)=>{
            renderIngredient(category, name)
        })
    }
})