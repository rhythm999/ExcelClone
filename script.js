let body = document.querySelector("body");
body.spellcheck = false;
let columns = document.querySelector(".columns");
let row = document.querySelector(".rows");
let grid = document.querySelector(".grid");
let SelectedMenu = document.querySelectorAll(".menu p");
let Cell_selected = document.querySelector("#selected_cell");
let oldcell;
let formulaBar = document.querySelector("#selected_cell_formula");
let dataObj = {};
let BUIoptions = document.querySelectorAll(".font");
let boldcount = false;
let italicscount = false;
let underlinecount = false;
let bold = BUIoptions[0];
let itali = BUIoptions[1];
let Underline = BUIoptions[2];
let fontstyle = document.querySelectorAll(".Fstyle");
let family = fontstyle[0];
let size = fontstyle[1];
let alignm = document.querySelectorAll(".align");
let left = alignm[0];
let center = alignm[1];
let right = alignm[2];
let currentalignmnet;
let colorSpans = document.querySelectorAll(".cccc");
let fontColorBtn = colorSpans[0];
let backgroundColorBtn = colorSpans[1];
let modalvisible = false;
let file = document.querySelector(".file");

//for saving ,opening ,and clearing the sheet
file.addEventListener("click", function () {
    if (!modalvisible) {
        modalvisible = true;
        let modal = document.createElement("div");
        modal.classList.add("BOXOPEN");
        modal.innerHTML = `<div class="box save">SAVE</div>
        <div class="box open">OPEN</div>
        <div class="box clear">CLEAR</div>`;

        let clear = modal.querySelector(".clear");
        clear.addEventListener("click", function () {
            // console.log(5)
            let allcell = document.querySelectorAll(".cell");
            for (let i = 0; i < allcell.length; i++) {
                allcell[i].innerText = "";
                let currcelAdd = allcell[i].getAttribute("data-address");
                dataObj[currcelAdd] = {
                    value: "",
                    formula: "",
                    upStream: "",
                    downStream: "",
                    bold: false,
                    italics: false,
                    underline: false,
                    style: "",
                    size: "",
                    left: false,
                    center: false,
                    right: false,
                    fontcolor: "",
                    bgcolor: "",
                };
            }
            modal.remove();
        });
        let save = modal.querySelector(".save");
        save.addEventListener("click", function () {
            // let sheetname = document.querySelector(".title").innerText;
            localStorage.setItem("sheet", JSON.stringify(dataObj));
            modal.remove();
        })
        let open = modal.querySelector(".open");
        open.addEventListener("click", function () {
            dataObj = JSON.parse(localStorage.getItem("sheet"));
            for (let i = 0; i < 35; i++) {
                for (let j = 1; j < 15; j++) {
                    let address = number(j) + i;
                    let cellObj = dataObj[address];
                    let cellonui = document.querySelector(`[data-address=${address}]`);
                    // console.log(cellonui);
                    cellonui.innerText = cellObj.value;
                    if (dataObj[address].bold)
                        cellonui.style.fontWeight = "bold";
                    if (dataObj[address].italics)
                        cellonui.style.fontStyle = "italic";
                    if (dataObj[address].underline)
                        cellonui.style.textDecoration = "underline";
                    if (dataObj[address].left)
                        cellonui.style.textAlign = "left";
                    if (dataObj[address].center)
                        cellonui.style.textAlign = "center";
                    if (dataObj[address].right)
                        cellonui.style.textAlign = "right";
                    cellonui.style.backgroundColor = dataObj[address].bgcolor;
                    cellonui.style.color = dataObj[address].fontcolor;
                    if (dataObj[address].size == 10) {
                        cellonui.style.fontSize = "1rem";
                    }
                    if (dataObj[address].size == 20) {
                        cellonui.style.fontSize = "1.2rem";
                    }
                    if (dataObj[address].size == 30) {
                        cellonui.style.fontSize = "1.5rem";
                    }
                    if (dataObj[address].size == 40) {
                        cellonui.style.fontSize = "1.8rem";
                    }
                    if (dataObj[address].size == 50) {
                        cellonui.style.fontSize = "2rem";
                        console.log(dataObj[address].size);
                    }
                    if (dataObj[address].style == "rhythm") {
                        cellonui.style.fontFamily = "Verdana,sans-serif";
                    }
                    if (dataObj[address].style == "sharma") {
                        cellonui.style.fontFamily = "Impact,Charcoal,sans-serif";
                    }
                }
            }
            modal.remove();
        })

        body.append(modal);
    } else {
        modalvisible = false;
        let modal = document.querySelector(".BOXOPEN");
        modal.remove();
    }
});
// for creating number of columns
for (let i = 1; i < 15; i++) {
    let columnName = document.createElement("div");
    columnName.classList.add("column_numbering");
    columnName.innerText = number(i);
    columns.append(columnName);
}
//for creating the nuber of rows
for (let i = 0; i < 35; i++) {
    let rowName = document.createElement("div");
    rowName.classList.add("rows_numbering");
    rowName.innerText = i;
    row.append(rowName);
}
//for converting number into a alphatets for columns
function number(n) {
    if (n > 26) {
        return stringCalc(n);
    } else {
        return String.fromCharCode(n + 65 - 1);
    }
}
//suppoting function of the unction number
function stringCalc(n) {
    let rem = Math.floor(n % 26);
    if (rem == 0) {
        let ans = number(Math.floor((n - 26) / 26));
        let final = ans + "Z";
        return final;
    } else {
        let div = Math.floor(n / 26);
        let recAns = "";
        if (div > 26) {
            recAns = number(div);
            let finalans = recAns + String.fromCharCode(rem + 65 - 1);
            return finalans;
        } else {
            recAns =
                String.fromCharCode(div + 65 - 1) + String.fromCharCode(rem + 65 - 1);
            return recAns;
        }
    }
}
// cell selector
for (let i = 0; i < SelectedMenu.length; i++) {
    SelectedMenu[i].addEventListener("click", function (e) {
        if (e.currentTarget.classList.contains("selected")) {
            e.currentTarget.classList.remove("selected");
        } else {
            for (let j = 0; j < SelectedMenu.length; j++) {
                if (SelectedMenu[j].classList.contains("selected")) {
                    SelectedMenu[j].classList.remove("selected");
                }
            }
        }
        e.currentTarget.classList.add("selected");
    });
}
// remove particular downstream 
function removeDownstreamOfUpstream(up, down) {
    let newd = [];
    for (let i = 0; i < dataObj[down].downStream.length; i++) {
        if (dataObj[down].downStream[i] != up) {
            newd.push(dataObj[down].downStream[i]);
        }
    }
    dataObj[down].downStream = newd;
}
//updating the downstream elements with the new value
function updateDownStream(self) {
    let formulaArr = dataObj[self].formula.split(" ");
    for (let i = 0; i < formulaArr.length; i++) {
        if (dataObj[formulaArr[i]] != undefined) {
            formulaArr[i] = dataObj[formulaArr[i]].value;
        }
    }
    let newF = formulaArr.join(" ");
    let newV = eval(newF);
    dataObj[self].value = newV;
    let currCell = document.querySelector(`[data-address="${self}"]`);
    currCell.innerText = newV;
    for (let i = 0; i < dataObj[self].downStream.length; i++) {
        updateDownStream(dataObj[self].downStream[i]);
    }
}
// adding new downstream elements
function putindownstream(newDown, down) {
    let newdownst = [];
    for (let i = 0; i < dataObj[down].downStream.length; i++) {
        newdownst.push(dataObj[down].downStream[i]);
    }
    newdownst.push(newDown);
    dataObj[down].downStream = newdownst;
}
//creating the cellg it all the required details
for (let i = 0; i < 35; i++) {
    let gridRow = document.createElement("div");
    gridRow.classList.add("gridRow");
    for (let j = 1; j < 15; j++) {
        let columningrid = document.createElement("div");
        columningrid.classList.add("cell");
        let address = number(j) + i;
        columningrid.setAttribute("data-address", address);

        dataObj[address] = {
            value: "",
            formula: "",
            upStream: "",
            downStream: "",
            bold: false,
            italics: false,
            underline: false,
            style: "",
            size: "",
            left: false,
            center: false,
            right: false,
            fontcolor: "",
            bgcolor: "",
        };

        columningrid.addEventListener("click", function (e) {
            if (oldcell) {
                oldcell.classList.remove("grid-selected-cell");
            }
            oldcell = e.currentTarget;
            e.currentTarget.classList.add("grid-selected-cell");
            Cell_selected.value = e.currentTarget.getAttribute("data-address");
        });
        columningrid.addEventListener("input", function (e) {
            let selectedCellAddress = oldcell.getAttribute("data-address");
            dataObj[selectedCellAddress].value = e.target.innerText;
            dataObj[selectedCellAddress].formula = "";
            for (let i = 0; i < dataObj[selectedCellAddress].upStream.length; i++) {
                removeDownstreamofUpstream(
                    selectedCellAddress,
                    data[selectedCellAddress].upStream[i]
                );
            }
            dataObj[selectedCellAddress].upStream = [];
            for (let i = 0; i < dataObj[selectedCellAddress].downStream.length; i++) {
                updateDownStream(dataObj[selectedCellAddress].downStream[i]);
            }
        });
        columningrid.contentEditable = true;
        gridRow.append(columningrid);
    }
    grid.append(gridRow);
}
//accepting the values from formula bar
formulaBar.addEventListener("change", function (e) {
    let newFormulafromformulabar = e.currentTarget.value;
    // console.log(newFormulafromformulabar);
    let newformulaarr = newFormulafromformulabar.split(" ");
    // console.log(newformulaarr);

    let newarrupstream = [];

    for (let i = 0; i < newformulaarr.length; i++) {
        if (dataObj[newformulaarr[i]] != undefined) {
            newarrupstream.push(newformulaarr[i]);
            console.log(dataObj, newformulaarr[i]);
            newformulaarr[i] = Number(dataObj[newformulaarr[i]].value);
        }
    }
    let newformula = newformulaarr.join(" ");
    console.log(newarrupstream);
    let formulaans = eval(newformula);
    console.log(formulaans);
    let currentcell = oldcell.getAttribute("data-address");
    dataObj[currentcell].formula = newFormulafromformulabar;
    dataObj[currentcell].value = formulaans;
    for (let i = 0; i < dataObj[currentcell].upStream.length; i++) {
        removeDownstreamOfUpstream(currentcell, dataObj[currentcell].upStream[i]);
    }
    dataObj[currentcell].upStream = newarrupstream;
    for (let i = 0; i < dataObj[currentcell].downStream.length; i++) {
        updateDownStream(dataObj[currentcell].downStream[i]);
    }
    for (let i = 0; i < newarrupstream.length; i++) {
        putindownstream(currentcell, newarrupstream[i]);
    }
    // let currentcellui = document.querySelector(`[data-address="${currentcell}"]`);
    // currentcell.innetText = formulaans;
    oldcell.innerText = formulaans;
    e.currentTarget.value = "";
});
// creating the particular cell bold
bold.addEventListener("click", function (e) {
    if (oldcell != undefined) {
        let Caddress = oldcell.getAttribute("data-address");
        if (boldcount) {
            oldcell.style.fontWeight = "normal";
            boldcount = false;
            dataObj[Caddress].bold = false;
            bold.classList.remove("bg");
        } else {
            oldcell.style.fontWeight = "bold";
            boldcount = true;
            dataObj[Caddress].bold = true;
            bold.classList.add("bg");
        }
    } else {
        alert("Nothing is selected");
    }
});
//creating the particular cell itali
itali.addEventListener("click", function () {
    if (oldcell != undefined) {
        let Caddress = oldcell.getAttribute("data-address");
        if (italicscount) {
            oldcell.style.fontStyle = "normal";
            dataObj[Caddress].italics = false;
            italicscount = false;
            itali.classList.remove("bg");
        } else {
            oldcell.style.fontStyle = "italic";
            dataObj[Caddress].italics = true;
            italicscount = true;
            itali.classList.add("bg");
        }
    } else {
        alert("Nothing is selected");
    }
});
//creating underline beneath the current cell
Underline.addEventListener("click", function () {
    if (oldcell != undefined) {
        let Caddress = oldcell.getAttribute("data-address");
        if (underlinecount) {
            oldcell.style.textDecoration = "none";
            dataObj[Caddress].underline = false;
            underlinecount = false;
            Underline.classList.remove("bg");
        } else {
            underlinecount = true;
            Underline.classList.add("bg");
            oldcell.style.textDecoration = "underline";
            dataObj[Caddress].underline = true;
        }
    } else {
        alert("Nothing is selected");
    }
});
// selecting font family
family.addEventListener("click", function (e) {
    if (oldcell != undefined) {
        let Caddress = oldcell.getAttribute("data-address");
        if (e.currentTarget.value == "Ariel") {
            oldcell.style.fontFamily = "Arial,sans-serif";
            dataObj[Caddress].style = e.currentTarget.value;
        } else if (e.currentTarget.value == "times_roman") {
            (oldcell.style.fontFamily = "Times New Roman"), Times, serif;
            dataObj[Caddress].style = e.currentTarget.value;
        } else if (e.currentTarget.value == "open_sans") {
            oldcell.style.fontFamily = "sans-serif";
            dataObj[Caddress].style = e.currentTarget.value;
        } else if (e.currentTarget.value == "rhythm") {
            oldcell.style.fontFamily = "Verdana,sans-serif";
            dataObj[Caddress].style = e.currentTarget.value;
        } else if (e.currentTarget.value == "sharma") {
            oldcell.style.fontFamily = "Impact,Charcoal,sans-serif";
            dataObj[Caddress].style = e.currentTarget.value;
            console.log(dataObj[Caddress].style);
        }
    } else {
        alert("Nothing is selected");
    }
});
//selecting font size
size.addEventListener("click", function (e) {
    if (oldcell != undefined) {
        let Caddress = oldcell.getAttribute("data-address");
        if (e.currentTarget.value == "10") {
            oldcell.style.fontSize = "1rem";
            dataObj[Caddress].size = e.currentTarget.value;
        } else if (e.currentTarget.value == "20") {
            oldcell.style.fontSize = "1.2rem";
            dataObj[Caddress].size = e.currentTarget.value;
        } else if (e.currentTarget.value == "30") {
            oldcell.style.fontSize = "1.5rem";
            dataObj[Caddress].size = e.currentTarget.value;
        } else if (e.currentTarget.value == "40") {
            oldcell.style.fontSize = "1.8rem";
            dataObj[Caddress].size = e.currentTarget.value;
        } else if (e.currentTarget.value == "50") {
            oldcell.style.fontSize = "2rem";
            dataObj[Caddress].size = e.currentTarget.value;
            console.log(dataObj[Caddress].size);
        }
    } else {
        alert("Nothing is selected");
    }
});
//align the text on the left side
left.addEventListener("click", function () {
    for (let i = 0; i < alignm.length; i++) {
        if (alignm[i].classList.contains("bg")) {
            alignm[i].classList.remove("bg");
            break;
        }
    }
    if (oldcell != undefined) {
        let Caddress = oldcell.getAttribute("data-address");
        left.classList.add("bg");
        oldcell.style.textAlign = "left";
        dataObj[Caddress].left = true;
    } else {
        alert("Nothing is selected");
    }
});
//align the text on center
center.addEventListener("click", function () {
    for (let i = 0; i < alignm.length; i++) {
        if (alignm[i].classList.contains("bg")) {
            alignm[i].classList.remove("bg");
            break;
        }
    }
    if (oldcell != undefined) {
        let Caddress = oldcell.getAttribute("data-address");
        oldcell.style.textAlign = "center";
        dataObj[Caddress].center = true;
        center.classList.add("bg");
    } else {
        alert("Nothing is selected");
    }
});
//align the text to the right
right.addEventListener("click", function () {
    for (let i = 0; i < alignm.length; i++) {
        if (alignm[i].classList.contains("bg")) {
            alignm[i].classList.remove("bg");
            break;
        }
    }
    if (oldcell != undefined) {
        let Caddress = oldcell.getAttribute("data-address");
        oldcell.style.textAlign = "right";
        dataObj[Caddress].right = true;
        right.classList.add("bg");
    } else {
        alert("Nothing is selected");
    }
});
//giving the fnt coor to the given or current cell
fontColorBtn.addEventListener("click", function () {
    let colorPicker = document.createElement("input");
    colorPicker.type = "color";

    colorPicker.addEventListener("change", function (e) {
        oldcell.style.color = e.currentTarget.value;
        let address = oldcell.getAttribute("data-address");
        dataObj[address].fontcolor = e.currentTarget.value;
        console.log(e.currentTarget.value);
    });

    colorPicker.click();
});
//giving the background color for the same cell which is selected
backgroundColorBtn.addEventListener("click", function () {
    let colorPicker = document.createElement("input");
    colorPicker.type = "color";
    colorPicker.addEventListener("change", function (e) {
        oldcell.style.backgroundColor = e.currentTarget.value;
        let address = oldcell.getAttribute("data-address");
        dataObj[address].bgcolor = e.currentTarget.value;
        console.log(e.currentTarget.value);
    });
    colorPicker.click();
});



// grid.addEventListener("scroll",function(e){
//     let currentLeft=e.currentTarget.scrollLeft;
//     let currentTop=e.currentTarget.scrollTop;
//     // if(currentTop!=previosuTop && currentLeft!=previousLeft){

//     // }
//      if(currentTop!=previosuTop){
//         previosuTop=currentTop;
//         columns.classList.add("column_tag_atke");
//         row.classList.remove("row_tag_atke");
//     }
//     else if(currentLeft!=previousLeft){
//         previousLeft=currentLeft;
//         row.classList.add("row_tag_atke");
//         columns.classList.remove("column_tag_atke");
//     }


// })


let previousLeft=0;
let previosuTop=0;
grid.addEventListener("scroll", function (e) {
    let currentLeft = e.currentTarget.scrollLeft;
    let currentTop = e.currentTarget.scrollTop;

    columns.style.transform=`translateX(-${currentLeft}px)`;
    row.style.transform=`translateY(-${currentTop}px)`;
})