

// different forms
const residential = document.querySelector('.residential');
const floors = document.querySelector('.floors');
const basements = document.querySelector('.basements');
const district = document.querySelector('.district');
const parking = document.querySelector('.parking');
const commercial = document.querySelector('.commercial');
const corporate = document.querySelector('.corporate');
const corporate2 = document.querySelector('.corporate2');
const hybrid = document.querySelector('.hybrid');

// input forms
const numApartments = document.getElementById('number-of-apartments')
const numFloors = document.getElementById('number-of-floors')
const numBasements = document.getElementById('number-of-basements')
const numCompanies = document.getElementById('number-of-companies')
const numParking = document.getElementById('number-of-parking-spots')
const numElevator = document.getElementById('number-of-elevators')
const numCorporations = document.getElementById('number-of-corporations')
const maxOccupancy = document.getElementById('maximum-occupancy')
const numHours = document.getElementById('business-hours')

// radio options
const standardLine = document.getElementById('standardLine')
const premiumLine = document.getElementById('premiumLine')
const exceliumLine = document.getElementById('exceliumLine')

// price display
const showPrices = document.getElementById('showPrices')
const showFees = document.getElementById('showFees')
const showTotal = document.getElementById('showTotal')


$( document ).ready(function() {
    $("#building-type").change(function() {
        clearInput();
        let buildingType = $(this).val()
        if(buildingType == "residential") {
            showResidential();
        } else if(buildingType == "commercial") {
            showCommercial()
        } else if(buildingType == "corporate") {
            showCorporate()
        } else if(buildingType == "hybrid") {
            showHybrid()
  $      }
    })















    //this is the event listeners
    $('#quote-form :input').on("input", function() {
        // residential variables
        let buildingType = $("#building-type").val()
        let productType = $("#product-type input[type='radio']:checked").val()

        calculateCosts(buildingType, productType)
    })
});

const STANDARD_PRICE = 7565; 
const PREMIUM_PRICE = 12345
const EXCELIUM_PRICE = 15400
console.log(STANDARD_PRICE);

const STANDARD_FEE = 0.1
const PREMIUM_FEE = 0.13
const EXCELIUM_FEE = 0.16

// this function get the price of the unit
function getUnitPrice(productType) {
    if(productType == "standard") {
        return STANDARD_PRICE;
    } else if(productType == "premium") {
        return PREMIUM_PRICE
    } else if(productType == "excelium") {
        return EXCELIUM_PRICE
    }
}

function getProductTypeFee(productType) {
    if(productType == "standard") {
        return STANDARD_FEE;
    } else if(productType == "premium") {
        return PREMIUM_FEE
    } else if(productType == "excelium") {
        return EXCELIUM_FEE
    }
}


// Calculates price results based on current values
function calculateCosts(buildingType, productType) {
    switch(buildingType) {
        case "residential":
            updateResidentialCosts(productType)
            break;
        case "commercial":
            updateCommercialCosts(productType)
            break;

        case "corporate":
            updateCorporateCosts(productType)
            break;

        case "hybrid":
            updateHybridCosts(productType)
            break;
        
        default:
            break;
    }
}


// Calculates price results for residential building type
function updateResidentialCosts(productType) {
    // Grab values from residential fields
    let nbApartments = $("#number-of-apartments").val()
    let nbFloors = $("#number-of-floors").val()

     // string converted into numbers
     let nbApartmentsNumber = Number.parseInt(nbApartments)
     let nbFloorsNumber = Number.parseInt(nbFloors)

    // part1
    // obtain average of doors per floors   
    let averageApartmentsPerFloor = Math.ceil(nbApartmentsNumber / nbFloorsNumber)
    let averageElevatorsRequired = Math.ceil(averageApartmentsPerFloor / 6)
    // console.log(averageElevatorsRequired);

    //total of elevators needed based on numbers of floors
    let nbColumnRequired = Math.ceil(nbFloorsNumber / 20)

    // Results
    let nbElevatorsRequiredTotal = averageElevatorsRequired * nbColumnRequired
    let unitPrice = getUnitPrice(productType)
    let totalPriceElevators = nbElevatorsRequiredTotal * unitPrice
    let installationFees = totalPriceElevators * getProductTypeFee(productType)
    let finalPrice = totalPriceElevators + installationFees


    let dollarFormat = Intl.NumberFormat("en-US");


    // Refresh labels
    $("#number-of-elevator").val(Math.round(nbElevatorsRequiredTotal))
    $("#elevator-unit-price").val(dollarFormat.format(unitPrice) + "$")
    $("#total-price-elevators").val(dollarFormat.format(totalPriceElevators) + "$")
    $("#installation-fees").val(dollarFormat.format(installationFees) + "$")
    $("#final-price").val(dollarFormat.format(finalPrice) + "$")
}



// Calculates price results for commercial building type
function updateCommercialCosts(productType) {
    let shaft = $('#number-of-elevators').val()
    let unitPrice = getUnitPrice(productType)
    let shaftAndUnit = shaft * unitPrice
    let productFees = getProductTypeFee(productType)
    let installationFeesCommercial = productFees * shaftAndUnit
    let commercialFinalPrice = installationFeesCommercial + shaftAndUnit


    let dollarFormat = Intl.NumberFormat("en-US");

    console.log(typeof unitPrice)
    console.log(unitPrice);
    $("#number-of-elevator").val(shaft)
    $("#elevator-unit-price").val(dollarFormat.format(unitPrice) + "$")  
    $("#total-price-elevators").val(dollarFormat.format(shaftAndUnit) +'$')
    $("#installation-fees").val(dollarFormat.format(installationFeesCommercial) +'$')
    $("#final-price").val(dollarFormat.format(commercialFinalPrice) +'$')  
}



// Calculates price results for corporate building type
function updateCorporateCosts(productType) {

    // occupants, floors, basements form
    let occupant = $('#maximum-occupancy').val()
    let nbFloors = $("#number-of-floors").val()
    let nbBasements = $('#number-of-basements').val()

    // string converted into numbers
    let nbFloorsNumber = Number.parseInt(nbFloors)
    let nbBasementsNumber = Number.parseInt(nbBasements)
    let occupantNumber = Number.parseInt(occupant)

    //part 1
    // the number of floors plus the number of basements
     let floorAndBasement = nbFloorsNumber + nbBasementsNumber
     // the total number of occupant
     let totalOccupant = occupantNumber * floorAndBasement
    //part2
    // the number of elevators required
    numElevatorRequired = Math.ceil(totalOccupant / 1000)
    //part3
    // number of elevator column required
    let columnRequired = Math.ceil(floorAndBasement / 20)
    // part4
    // the number of elevator per column
    let numElevatorPerColumn = Math.ceil(numElevatorRequired / columnRequired)
    console.log(numElevatorPerColumn);
    //part5
    // the total number of elevators
    let totalNumElevators = numElevatorPerColumn * columnRequired

    // result
    let unitPrice = getUnitPrice(productType)
    let totalPriceElevators = totalNumElevators * unitPrice
    let installationFees = totalPriceElevators * getProductTypeFee(productType)
    let finalPrice = totalPriceElevators + installationFees




    let dollarFormat = Intl.NumberFormat("en-US");



    $("#number-of-elevator").val(totalNumElevators)
    $("#elevator-unit-price").val(dollarFormat.format(unitPrice) + "$")
    $("#total-price-elevators").val(dollarFormat.format(totalPriceElevators) + "$")
    $("#installation-fees").val(dollarFormat.format(installationFees) + "$")
    $("#final-price").val(dollarFormat.format(finalPrice) + "$")
}

// Calculates price results for corporate building type
function updateHybridCosts(productType) {   

    // occupants, floors, basements form
    let occupant = $('#maximum-occupancy').val()
    let nbFloors = $("#number-of-floors").val()
    let nbBasements = $('#number-of-basements').val()

    // string converted into numbers
    let nbFloorsNumber = Number.parseInt(nbFloors)
    let nbBasementsNumber = Number.parseInt(nbBasements)
    let occupantNumber = Number.parseInt(occupant)

    //part 1
    // the number of floors plus the number of basements
     let floorAndBasement = nbFloorsNumber + nbBasementsNumber
     // the total number of occupant
     let totalOccupant = occupantNumber * floorAndBasement
    //part2
    // the number of elevators required
    numElevatorRequired = Math.ceil(totalOccupant / 1000)
    //part3
    // number of elevator column required
    let columnRequired = Math.ceil(floorAndBasement / 20)
    // part4
    // the number of elevator per column
    let numElevatorPerColumn = Math.ceil(numElevatorRequired / columnRequired)
    console.log(numElevatorPerColumn);
    //part5
    // the total number of elevators
    let totalNumElevators = numElevatorPerColumn * columnRequired

    // result
    let unitPrice = getUnitPrice(productType)
    let totalPriceElevators = totalNumElevators * unitPrice
    let installationFees = totalPriceElevators * getProductTypeFee(productType)
    let finalPrice = totalPriceElevators + installationFees



    let dollarFormat = Intl.NumberFormat("en-US");


    $("#number-of-elevator").val(totalNumElevators)
    $("#elevator-unit-price").val(dollarFormat.format(unitPrice) + "$")
    $("#total-price-elevators").val(dollarFormat.format(totalPriceElevators) + "$")
    $("#installation-fees").val(dollarFormat.format(installationFees) + "$")
    $("#final-price").val(dollarFormat.format(finalPrice) + "$")
}

























// Will clear all input fields
function clearInput() {
    $('#quote-form :input').val('');
    $('#readonly :input').val('');
    // $("#product-type input[type='radio']:checked").prop("defaultValue", "New value") 

}


// residential function
function showResidential() {
    residential.classList.remove('hidden')
    floors.classList.remove('hidden')
    basements.classList.remove('hidden')
    district.classList.add('hidden')
    parking.classList.add('hidden')
    commercial.classList.add('hidden')
    corporate.classList.add('hidden')
    corporate2.classList.add('hidden')
    hybrid.classList.add('hidden')
}


// commercial function
function showCommercial() {
    residential.classList.add('hidden')
    floors.classList.remove('hidden')
    basements.classList.remove('hidden')
    district.classList.remove('hidden')
    parking.classList.remove('hidden')
    commercial.classList.remove('hidden')
    corporate.classList.add('hidden')
    corporate2.classList.add('hidden')
    hybrid.classList.add('hidden')
}

// corporate function
function showCorporate() {
    residential.classList.add('hidden')
    floors.classList.remove('hidden')
    basements.classList.remove('hidden')
    district.classList.add('hidden')
    parking.classList.remove('hidden')
    commercial.classList.add('hidden')
    corporate.classList.remove('hidden')
    corporate2.classList.remove('hidden')
    hybrid.classList.add('hidden')
}


// hybrid function
function showHybrid() {
    residential.classList.add('hidden')
    floors.classList.remove('hidden')
    basements.classList.remove('hidden')
    district.classList.remove('hidden')
    parking.classList.remove('hidden')
    commercial.classList.add('hidden')
    corporate.classList.add('hidden')
    corporate2.classList.remove('hidden')
    hybrid.classList.remove('hidden')
}


