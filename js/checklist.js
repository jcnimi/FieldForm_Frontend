import { fetchData } from "./comonlib.js";

window.addEventListener("load", async function () {

let urlParams = new URLSearchParams(window.location.search);
const group = urlParams.get('group');
const userId = urlParams.get('userid');
const disabledCCC = (group=='ccc'?'disabled':'');
const disabledCRO = (group=='cro'?'disabled':'');
const pret_sollicite_id = document.getElementById("hid_request_id").value;
var checkList = null;

try {
  document.body.style.setProperty('cursor', 'progress');
  //Get the checklist 
  var url = `/customer/loan/checklist/view/${pret_sollicite_id}`;
  var result = await fetchData(url, 'GET');
  if(result !== null && result.status === 'success'){
    if(result.hasOwnProperty('data')){
      checkList = result.data;
    }
  }

  // Get document from db and populate the checklist with items
  url = `/customer/loan/document/view`;
  result = await fetchData(url, 'GET');
  if(result !== null && result.status === 'success'){
    if(result.hasOwnProperty('data')){
      const docs = result.data;
      // Create an unordered list
      var list_ = document.createElement('ol');
      // Create a list item for each document and append it to the list
      docs.forEach(function (doc) {

        let chkListItem = checkList.filter(function(item) {
          return item.code_document == doc.code_document;
        });
        let checkedStatusCCC = '';
        let checkedStatusCRO = '';
        let checkListId = 0;
        let fileName = '';
        if(chkListItem != null && chkListItem.length > 0){
          chkListItem = chkListItem[0]
          checkedStatusCCC = ((chkListItem.Approbation_ccc == 1) ? 'checked': '');
          checkedStatusCRO = ((chkListItem.Approbation_agent == 1) ? 'checked': '');
          checkListId = chkListItem.checklist_id;
          fileName = chkListItem.file_name
        }


        list_.insertAdjacentHTML("beforeend", `
        <li style="display: flex">

        <div class="col col-sm-5">
        <label class="form-label form-label-sm"><h6>${doc.description}</h6></label>  
        </div>
         
        <div class="col col-sm-2">
        <input ${disabledCCC} class="form-check-input" type="checkbox"
          onclick = "saveCheckListChoice('${doc.code_document}')"
          name="${doc.code_document}" id="${doc.code_document}_cro" value="1" ${checkedStatusCRO}>
        </div>
        <div class="col col-sm-2">
        <input ${disabledCRO} class="form-check-input col col-sm-2" type="checkbox" 
          onclick = "saveCheckListChoice('${doc.code_document}')"
          name="${doc.code_document}" id="${doc.code_document}_ccc"  value="1" ${checkedStatusCCC}>
        </div>

        <div class="col col-sm-3"
        <div class="fcheck">
          <label class="file-label">
            <input  type="file" id="${doc.code_document}_file" class="file-input" onchange="uploadFile('${doc.code_document}')">
            <img src="img/plus_1828817.png" alt="Fichier">

            <span class="file-name"><a href="https://cdwebapsvr.fincadrc.com:8002/customer/loan/file/view/${checkListId}" 
            id="${doc.code_document}_link">${fileName}</a></span>
            <input type="hidden" value="${checkListId}" id="${doc.code_document}_hid">
          </label>
          </div>
        </div>
        </li>
      `);  
    });
    // Inject into the DOM
    var app = document.querySelector('#checklistmain');
    app.appendChild(list_);
    }
  }
} catch(err){
  console.log(err)
} finally{
  document.body.removeAttribute('style'); 
}


});

function getOneCheckListValue(checkList, code){
  console.log("In function checkList : ", checkList)
  checkList.forEach(function (chkListItem) {
    if(chkListItem.code_document == code){
      console.log("Return value :", chkListItem)
      return chkListItem;
    }
  });
}