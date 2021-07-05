var formValues = {
  config:{
      cssFramework:"bootstrap"
  },
  data:[
    {
      type:"text",
      name:"adsoyad",
      label:"Ad Soyad",
      class:"form-control",
      placeholder:"Lütfen Ad Soyad Giriniz",
      value:""
    },
  
    {
      type:"select",
      label:"Yaş",
      name:"yas",
      class:"form-select",
      placeholder:"Lütfen Ad Soyad Giriniz",
      options:[1,2,3,4,5],
      value:""
    },
    
    {
      type:"email",
      label:"E-Posta",
      name:"eposta",
      class:"form-control",
      placeholder:"Lütfen E-Postanızı Giriniz",
      value:""
    },
    
    {
      type:"tel",
      label:"GSM",
      name:"gsm",
      class:"form-control",
      placeholder:"Lütfen Telefon Numaranızı Giriniz",
      value:""
    },
    
    {
      type:"checkbox",
      label:"İletişim Şekli",
      name:"iletisim",
      options:["email","sms","telefon"],
      placeholder:"İletişim Şekli Seçiniz",
      value:""
    },
    
    {
      type:"button",
      label:"Gönder",
      name:"gonder",
      class:"btn btn-success",
    },
  
  ]
}


const prepareFormData = function(currentObj){
  return formData = [
    {        
      type:"select",
      label:"Type",
      name:"type",
      class:"form-select",
      options:["text","date","number","tel","email","password","color","radio","checkbox","file","button","submit","reset","url","datetime-local","search","select"],
      value: currentObj.type || ""
    },
    {        
      type:"text",
      label:"Label",
      name:"label",
      class:"form-control",
      value: currentObj.label || ""
    },
    {        
      type:"text",
      label:"Placeholder",
      name:"placeholder",
      class:"form-control",
      value: currentObj.placeholder || ""
    },
    {        
      type:"text",
      label:"Value",
      name:"value",
      class:"form-control",
      value: currentObj.value || ""
    },
    {        
      type:"text",
      label:"Options",
      name:"options",
      class:"form-control",
      value: currentObj.value && currentObj.value.split(",") || ""
    },
    {        
      type:"text",
      label:"Class",
      name:"class",
      class:"form-control",
      value: currentObj.class || ""
    }
  ]
}

function changeFormData(){  
  formValues.data = JSON.parse(document.querySelector("#accordionExample").getAttribute("value"))
  createElements()
  let myModal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'))
  myModal.hide()
}

function makeId(length) {
  var result           = ["id"];
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
      result.push(characters.charAt(Math.floor(Math.random() * 
      charactersLength)));
  }
  result = result.join('');
  return result.toLowerCase()
}

async function createElements() {
  prepareformElements();
}

function prepareformElements() {
  let form = document.querySelector("#formElements");
  beforeForms = form.querySelectorAll("form-element")
  beforeForms.forEach(element => {
    element.remove()
  })
  let form_repeater = document.createElement("form-element")
  form_repeater.setAttribute("value",JSON.stringify(formValues.data))
  form_repeater.setAttribute("config",JSON.stringify(formValues.config))
  form.append(form_repeater);
}

function prepareAccordions() {
  document.querySelector("#accordionExample").innerHTML = "";
  formValues.data.map((tag) => {
        prepareAccordion(tag,prepareFormData(tag))
  });
}

function prepareAccordion(tag, data){
  let accordionItem = document.createElement("accordion-item");
  Object.entries(tag).forEach(item => {
    accordionItem.setAttribute(item[0], item[1]);
  })
  accordionItem.setAttribute("value",JSON.stringify(data))
  document.querySelector("#accordionExample").append(accordionItem);
}


createElements()