// Function to populate the notice with data
function populateNotice(data) {
    // Get the notice container element
    let noticeContainer = document.querySelector('.notice');

    // Loop through the data object and populate the notice
    Object.keys(data).forEach(function(key) {
        let element = noticeContainer.querySelector(`[data-fill="${key}"]`);
        if (element) {
            element.textContent = data[key];
        }
    });
}

// Example data object
var noticeData = {
    tenants_name: "John Doe",
    tenants_address: "123 Main St, Apartment 101",
    owners_name: "Jane Smith",
    owners_address: "456 Elm St, Suite 202",
    total_ammount_due: "$1000",
};

// Populate the notice with the example data
populateNotice(noticeData);

function generate_notice(data) {
    let notice = document.querySelector('.notice')

    Object.keys(data.forEach((key) => {
        let element = notice.querySelector(`[data-fill="${key}"]`)
        if(element) {
            
        }
    }))

}