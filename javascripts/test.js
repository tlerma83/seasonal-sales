//////****** This is WAY too much code. I need to find a way to simplify it ******/////



console.log("trying again");
var categoryXHR = new XMLHttpRequest();
var catData;
var productXHR = new XMLHttpRequest();
var productData;
var apparalDisplay = document.getElementById("apparel");
var furnitureDisplay = document.getElementById("furniture");
var householdDisplay = document.getElementById("household");


document.getElementById("select-element").addEventListener("change", testSelected);

//testing what season is selected
function testSelected () {
    var selectedTagEl = document.getElementById("select-element");
    var optionTagSelected = selectedTagEl.options[selectedTagEl.selectedIndex].value;

    if (optionTagSelected == "0.10") {
        console.log("Winter");
        var hideWinter = document.getElementsByClassName("originalWinter");
        var holditem2 = document.getElementsByClassName("hiddenp");

        for (var a = 0 ; a < hideWinter.length; a++) {
            var holdItem = hideWinter[a];
            holdItem.style.display = 'none';
            var holdDiscount = holditem2[a];
            holdDiscount.classList.add("discountWinter");

        }
    }else if (optionTagSelected == "0.25") {
        console.log("Spring");
        var hideSpring = document.getElementsByClassName("originalSpring");
        var holditem2 = document.getElementsByClassName("hiddenpp");

            for (var a = 0 ; a < hideSpring.length; a++) {
                var holdSpring = hideSpring[a];
                holdSpring.style.display = 'none';
                var holdDiscount = holditem2[a];
                holdDiscount.classList.add("discountWinter");
            }

    }else if (optionTagSelected == "0.15") {
        console.log("Summer");
        var hideSummer = document.getElementsByClassName("originalSummer");
        var holditem2 = document.getElementsByClassName("hiddenppp");

            for (var a = 0 ; a < hideSummer.length; a++) {
                var holdSummer = hideSummer[a];
                holdSummer.style.display = 'none';
                var holdDiscount = holditem2[a];
                holdDiscount.classList.add("discountWinter");
            }

    }

}

// parsing cat JSON file into object & load success
function loadCatData () {
    catData = JSON.parse(event.target.responseText);
}

// JSON cat error load
function loadCatDataError () {
    console.log("error loading category JSON data");
}

//sending JSON files
categoryXHR.addEventListener("load", loadCatData);
categoryXHR.addEventListener("error", loadCatDataError);
categoryXHR.open("GET", "categories.json");
categoryXHR.send();

//starting Products JSON Load

function loadProductData () {
    console.log("product current target", event.currentTarget);
                console.log(event.target);
    productData = JSON.parse(event.target.responseText);

    var catObjectArray = catData.categories;
    var prodObjectArray = productData.products;

    for (var i = 0; i < catObjectArray.length; i++) {
        var catObject = catObjectArray[i];

        for (var j = 0; j < prodObjectArray.length; j++ ) {
            var prodObject = prodObjectArray[j];

            if (prodObject.category_id === catObject.id) {
                if (catObject.id === 1)  {

                    apparalDisplay.innerHTML +=
                    `<div>
                    <h5>${catObject.name}</h5>
                    <p>${prodObject.name}</p>
                    <p class="originalWinter">${prodObject.price}</p>
                    <p class="hiddenp">${(prodObject.price - (prodObject.price * .10)).toFixed(2)}</p>
                    </div>`;
                } else if (prodObject.category_id === 2) {
                    furnitureDisplay.innerHTML +=
                    `<div>
                    <h5>${catObject.name}</h5>
                    <p>${prodObject.name}</p>
                    <p class="originalSpring">${prodObject.price}</p>
                    <p class="hiddenpp">${(prodObject.price - (prodObject.price * .10)).toFixed(2)}</p>
                    </div>`;
                } else if (prodObject.category_id === 3) {
                    householdDisplay.innerHTML +=
                    `<div>
                    <h5>${catObject.name}</h5>
                    <p>${prodObject.name}</p>
                    <p class="originalSummer">${prodObject.price}</p>
                    <p class="hiddenppp">${(prodObject.price - (prodObject.price * .10)).toFixed(2)}</p>
                    </div>`;
                }
            }
        }
    }
}


function loadProductDataError () {
    console.log("product JSON did not load");
}

productXHR.addEventListener("load", loadProductData);
productXHR.addEventListener("error", loadProductDataError);
productXHR.open("GET", "products.json");
productXHR.send();



