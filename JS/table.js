let edit_status = true
let edit_button = document.getElementById('edit_button')
let status_bar = document.querySelector('.status-bar')

function add_row() {
    let table = document.getElementById('tenant_table')
    let current_index = table.rows.length


    let rows = table.insertRow()
    rows.id = `r${current_index}`
    rows.setAttribute('data-type', 'row')
    

    for(let y = 0; y < 7; y++) {
        cell = rows.insertCell(y)
        cell.id = `${rows.id}c${y}`

        if(cell.id == `${rows.id}c6`) {
            cell.addEventListener("click", checked)
            cell.setAttribute("data-checked", "false")
        }

    }

    // enabled contenteditable on the first 6 cells
    for(let k = 0; k < 6; k++) {
        document.getElementById(`${rows.id}c${k}`).setAttribute("contenteditable", true)
    }


    localStorage.setItem("table_length", document.getElementById('tenant_table').rows.length - 1)
}

// default is off
// if clicked and false then change to true
// if clicked and true then change to false
// TLDR: when clicked get ready for next status
function edit_mode() {
    switch(edit_status) {
        case false:
            change_status(false)
            break;
        case true:
            change_status(true)
            break;
        default:
            console.log('How did you even get this?')
    }
}

function change_status(bool) {
    if(bool == false) {
        edit_button.innerText = "Edit Mode: ON"
        edit_status = true
        status_bar.style.display = "block"
        change_editable(true) // ADD contenteditable from every cell
    } else if(bool == true) {
        edit_button.innerText = "Edit Mode: OFF"
        edit_status = false
        status_bar.style.display = "none"
        change_editable(false) // REMOVE contenteditable from every cell
    }
}

function change_editable(bool) {
    let cells = (document.querySelectorAll('[contenteditable]'))

    switch(bool) {
        case true:
            cells.forEach((index) => {
                index.setAttribute('contenteditable', true)
            }) 
        break;
        case false:
            cells.forEach((index) => {
                index.setAttribute('contenteditable', false)
            })
        break;
        default:
            console.log("How did you even get this?")
    }

}

function checked() {
    let cell = this
    let checked = cell.getAttribute("data-checked")
    save_row_data()

    if(checked == "false") {
        cell.setAttribute("data-checked", "true")
        cell.style.backgroundColor = "#f44336"
        save_row_data()
    } else if(checked == "true") {
        cell.setAttribute("data-checked", "false")
        cell.style.backgroundColor = "white"
    }
}

function remove_row() {
    document.getElementById('tenant_table').deleteRow(-1)
}


function save_row_data() {
    let checked = document.querySelectorAll('[data-checked="true"]')

    checked.forEach((index) => {
        let parent = index.parentElement
        let row = {
            tenants_name: "", 
            tenants_address: "",
            "total_amount_due": "",
            owners_name: "",
            owners_address: "",
            todays_date: "",
        }


        // redo to make it work :) 
        parent.childNodes.forEach((child_node, i) => {
            if(child_node.nodeType === 1) {
                Object.keys(row).forEach((key, index) => {
                    if(row.hasOwnProperty(key) && row[key] === "") {
                        row[key] = child_node[i]
                    }
                })
            }
        })
        console.log(row)
        localStorage.setItem(`${parent.id}_data`, JSON.stringify(row))
    })
}

