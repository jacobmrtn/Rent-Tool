document.addEventListener('DOMContentLoaded', () => {
    load_table()
    load_table_data()
})


function save() {
    window.localStorage.clear() // clear localstorage first to remove rows that were deleted 

    localStorage.setItem("table_length", document.getElementById('tenant_table').rows.length - 1)
    let rows = (document.querySelectorAll('[data-type="row"]'))

    rows.forEach((index) => {
        console.log(index.children)
        let pos = index.children.length

        for(let i = 0; i < pos; i++) {
            let id = index.children[i].id
            let innerText = index.children[i].innerText
            
            if(innerText.length > 0) {
                localStorage.setItem(`${id}`, innerText)
            }
        }
    })
}

function delete_data() {
    window.localStorage.clear()
}

function load_table() {
    let table = document.getElementById('tenant_table')
    let table_length = localStorage.getItem('table_length')

    for(let t = 0; t < table_length; t++) {
        let current_index = table.rows.length
        let rows = table.insertRow()
        rows.id = `r${current_index}`
        rows.setAttribute('data-type', 'row')
        
        // use rows.id to make cell.id unique to that row
        for(let y = 0; y < 7; y++) {
            cell = rows.insertCell(y)
            cell.id = `${rows.id}c${y}`

            // add click eventlistener to the last cell (checked is always default on first load)
            if(cell.id == `${rows.id}c6`) {
                cell.addEventListener("click", checked)
                cell.setAttribute("data-checked", "false")
            }

        }

        // enabled contenteditable on the first 6 cells
        for(let k = 0; k < 6; k++) {
            document.getElementById(`${rows.id}c${k}`).setAttribute("contenteditable", true)
        }
    }
}

function load_table_data() {
    let table_length = localStorage.getItem('table_length') 
    for(let l = 0; l < table_length; l++) {
        let row_number = l + 1
        for(let d = 0; d < 6; d++) {
            let cell = document.getElementById(`r${row_number}c${d}`)
            cell.innerText = localStorage.getItem(`r${row_number}c${d}`)
        }
    }
}
