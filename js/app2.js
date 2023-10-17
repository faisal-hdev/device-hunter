const loadData = (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayDevices(data.data, dataLimit));
};

// Show all data common function
const processSearch = (dataLimit) => {
    // Start Loader
    toggleSpinner(true)
    const searchText = document.getElementById('input-field').value;
    loadData(searchText, dataLimit);
};

// handle search btn click
const searchBtnEl = document.getElementById('search-btn').addEventListener('click', function () {
    processSearch(10)
});

// Search input field enter key handler
document.getElementById('input-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        // code for enter
        processSearch(10)
    }
});


const spinLoader = document.getElementById('spin-loader');
const toggleSpinner = isLoading => {
    if (isLoading) {
        spinLoader.classList.remove('d-none')
    } else {
        spinLoader.classList.add('d-none')
    }
};

const devicesContainerEl = document.getElementById('devices-container');
const noFoundMsg = document.getElementById('no-found-device');
const showAllBtn = document.getElementById('show-all');
const displayDevices = (devices, dataLimit) => {
    // Clear the again search data in display container 
    devicesContainerEl.textContent = '';
    // Show the 10 data in our UI
    if (dataLimit && devices.length > 10) {
        devices = devices.slice(0, 10);
        showAllBtn.classList.remove('d-none')
    } else {
        showAllBtn.classList.add('d-none')
    };
  
    // Display no devices found
    if (devices.length === 0) {
        noFoundMsg.classList.remove('d-none')
    } else {
        noFoundMsg.classList.add('d-none')
    };

    // Display all the data 
    devices.forEach(device => {
        const devicesDiv = document.createElement('div');
        devicesDiv.classList.add('col');
        devicesDiv.innerHTML = `
            <div class="card">
                <img src="${device.image}" class="card-img-top p-4" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Model Name : ${device.phone_name}</h5>
                    <h6 class="card-title">Manufacturer : ${device.brand}</h6>
                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    <button onclick="loadDeviceDetails('${device.slug}')" type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal">
                      Show Details 
                    </button>
                </div>
            </div>
        `;
        devicesContainerEl.appendChild(devicesDiv);
    });
    // Stop spinner or Loader
    toggleSpinner(false);
};

// Not the best way to load show all 
document.getElementById('btn-show-all').addEventListener('click', function () {
    processSearch()
});

const loadDeviceDetails = id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayDeviceDetails(data.data))
};

const modalTile = document.getElementById('exampleModalLabel');
const modalBrand = document.getElementById('modal-brand');
const deviceDetails = document.getElementById('device-details');
const displayDeviceDetails = (device) => {
    console.log(device);
    modalTile.innerText = device.name
    deviceDetails.innerHTML = `
        <h4>Brand : ${device.brand ? device.brand : 'No Brand found'}</h4>
        <p>Release Date : ${device.releaseDate ? device.releaseDate : 'No release date found'}</p>
        <p>ChipSet : ${device.mainFeatures.chipSet ? device.mainFeatures.chipSet : 'No ChipSet found'}</p>
        <p>Storage : ${device.mainFeatures.storage ? device.mainFeatures.storage : 'No Storage found'}</p>
        <p>Memory : ${device.mainFeatures.memory ? device.mainFeatures.memory : 'No Memory found'}</p>
        <p>DisplaySize : ${device.mainFeatures.displaySize ? device.mainFeatures.displaySize : 'No displaySize found'}</p>
        <p>GPS : ${device.others.GPS ? device.others.GPS : 'No USB found'}</p>
        <p>Bluetooth : ${device.others.Bluetooth ? device.others.Bluetooth : 'No Bluetooth found'}</p>
        <p>USB : ${device.others.USB ? device.others.USB : 'No USB found'}</p>
    `;
};


loadData('apple');
