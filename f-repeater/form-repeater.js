const config = {
  skeleton: `<style>STYLE_FILE</style> <form></form> `,
  //type olarak gelebilecek muhtemel değerleri listeledik
  inputTypes: ["text","date","number","tel","email","password","color","radio","checkbox","file","button","submit","reset","url","datetime-local","search","select"],
  inputCreateFuncs: ["createTextInput","createDateInput","createNumberInput","createTelInput","createOtherInputs","createOtherInputs","createOtherInputs","createOtherInputs",
                      "createCheckboxInput","createOtherInputs","createButton","createOtherInputs","createOtherInputs","createOtherInputs","createOtherInputs","createOtherInputs","createSelectInput"],
  //attribute olarak gelebilecek muhtemel değerleri listeledik
  attributesList: ["type","id","class","href","placeholder","src","alt","style","title","name","width","for","onclick","onchange","value","options"], 
  ignoreAttrList: ["value"],
  alwaysAddAttrList: ["value"]
}

const template = document.createElement("template");

class FormElement extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    
    // config dosyalarının işlenmesi
    setTimeout(() => {  
      this.config = JSON.parse(this.getAttribute("config"))
      this.loadStyle()
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }, 100);

    // datanın işlenmesi
    setTimeout(() => {
      this.formData = JSON.parse(this.getAttribute("value"))
      this.loadForm()
    }, 150);
  }

  loadStyle(){
      config.skeleton = config.skeleton.replace("STYLE_FILE",'@import "./assets/css/bootstrap.min.css";')
      template.innerHTML = config.skeleton
  }
  
  loadForm(){
      this.formData.forEach((element,index) =>{
        let group = document.createElement("div")
        if(!element.id){
           let id = this.makeId(11)
           this.formData[index]['id'] = id
           group.setAttribute("id",id)
           group.setAttribute("class","mb-3")
        }
        this.shadowRoot.appendChild(group)
        this.loadElement(this.formData[index])
      })

  }

  loadElement(groupData){
    //gelen datanın içindeki type a göre inputTypes içinden indexini buluyoruz,  inputCreateFuncs listesinde aynı indexlere koyulmuş function isimlerini alıp function olarak kullanıyoruz. 
    let indexFunc = config.inputTypes.findIndex(v => v == groupData.type)
    if(indexFunc > -1) this[config.inputCreateFuncs[indexFunc]](groupData)
  }


  createButton(groupData){   
    /* Yeni bir Button oluşturur */  
    let newElement = document.createElement("button")
    newElement.textContent = groupData.label;

    newElement.setAttribute("type",groupData.type) // boostrap classları eklendi

    // Attribute Bilgilerini Okumak...
    config.attributesList.forEach(attr => {
      if(groupData[attr]  || config.alwaysAddAttrList.includes(attr)){
        newElement.setAttribute(attr,groupData[attr])
        if(!config.ignoreAttrList.includes(attr)){
          //Eğer attr ignore edilmiş bir değer değilse componentin kendi attr listinden
          //this.removeAttribute(attr)
        }
      }
    })
    this.shadowRoot.querySelector(`#${groupData['id']}`).appendChild(newElement) // div container elementine append ettik
  }


  createOtherInputs(groupData){    
    /* Yeni bir Gelen Type a Göre bir Input oluşturur */
    let newLabel = document.createElement("label")
    newLabel.setAttribute("class","form-label")
    newLabel.textContent = groupData.label;
    let newElement = document.createElement("input")

    newElement.setAttribute("type",groupData.type) // boostrap classları eklendi

    // Attribute Bilgilerini Okumak...
    config.attributesList.forEach(attr => {
      if(groupData[attr]  || config.alwaysAddAttrList.includes(attr)){
        newElement.setAttribute(attr,groupData[attr])
        if(!config.ignoreAttrList.includes(attr)){
          //Eğer attr ignore edilmiş bir değer değilse componentin kendi attr listinden
          this.removeAttribute(attr)
        }
      }
    })

    this.shadowRoot.querySelector(`#${groupData['id']}`).appendChild(newLabel) // div container elementine append ettik
    this.shadowRoot.querySelector(`#${groupData['id']}`).appendChild(newElement) // div container elementine append ettik
  }

  createTextInput(groupData){    
    /* Yeni bir Gelen Type a Göre bir Text Inputu oluşturur */
    let newLabel = document.createElement("label")
    newLabel.setAttribute("class","form-label")
    newLabel.textContent = groupData.label;
    let newElement = document.createElement("input")

    newElement.setAttribute("type","text")

    // Attribute Bilgilerini Okumak...
    config.attributesList.forEach(attr => {
      if(groupData[attr]  || config.alwaysAddAttrList.includes(attr)){
        newElement.setAttribute(attr,groupData[attr])
        if(!config.ignoreAttrList.includes(attr)){
          //Eğer attr ignore edilmiş bir değer değilse componentin kendi attr listinden
          this.removeAttribute(attr)
        }
      }
    })

    this.shadowRoot.querySelector(`#${groupData['id']}`).appendChild(newLabel) // div container elementine append ettik
    this.shadowRoot.querySelector(`#${groupData['id']}`).appendChild(newElement) // div container elementine append ettik
  }

  createNumberInput(groupData){    
    /* Yeni bir Gelen Type a Göre bir Number Inputu oluşturur */
    let newLabel = document.createElement("label")
    newLabel.setAttribute("class","form-label")
    newLabel.textContent = groupData.label;
    let newElement = document.createElement("input")

    newElement.setAttribute("type","number")

    // Attribute Bilgilerini Okumak...
    config.attributesList.forEach(attr => {
      if(groupData[attr]  || config.alwaysAddAttrList.includes(attr)){
        newElement.setAttribute(attr,groupData[attr])
        if(!config.ignoreAttrList.includes(attr)){
          //Eğer attr ignore edilmiş bir değer değilse componentin kendi attr listinden
          this.removeAttribute(attr)
        }
      }
    })

    this.shadowRoot.querySelector(`#${groupData['id']}`).appendChild(newLabel) // div container elementine append ettik
    this.shadowRoot.querySelector(`#${groupData['id']}`).appendChild(newElement) // div container elementine append ettik
  }

  createDateInput(groupData){    
    /* Yeni bir Gelen Type a Göre bir Date Inputu oluşturur */
    let newLabel = document.createElement("label")
    newLabel.setAttribute("class","form-label")
    newLabel.textContent = groupData.label;
    let newElement = document.createElement("input")

    newElement.setAttribute("type","date")

    // Attribute Bilgilerini Okumak...
    config.attributesList.forEach(attr => {
      if(groupData[attr]  || config.alwaysAddAttrList.includes(attr)){
        newElement.setAttribute(attr,groupData[attr])
        if(!config.ignoreAttrList.includes(attr)){
          //Eğer attr ignore edilmiş bir değer değilse componentin kendi attr listinden
          this.removeAttribute(attr)
        }
      }
    })

    this.shadowRoot.querySelector(`#${groupData['id']}`).appendChild(newLabel) // div container elementine append ettik
    this.shadowRoot.querySelector(`#${groupData['id']}`).appendChild(newElement) // div container elementine append ettik
  }

  createTelInput(groupData){    
    /* Yeni bir Gelen Type a Göre bir Tel Inputu oluşturur */
    let newLabel = document.createElement("label")
    newLabel.setAttribute("class","form-label")
    newLabel.textContent = groupData.label;
    let newElement = document.createElement("input")

    newElement.setAttribute("type","tel")

    // Attribute Bilgilerini Okumak...
    config.attributesList.forEach(attr => {
      if(groupData[attr]  || config.alwaysAddAttrList.includes(attr)){
        newElement.setAttribute(attr,groupData[attr])
        if(!config.ignoreAttrList.includes(attr)){
          //Eğer attr ignore edilmiş bir değer değilse componentin kendi attr listinden
          this.removeAttribute(attr)
        }
      }
    })

    this.shadowRoot.querySelector(`#${groupData['id']}`).appendChild(newLabel) // div container elementine append ettik
    this.shadowRoot.querySelector(`#${groupData['id']}`).appendChild(newElement) // div container elementine append ettik
  }

  createSelectInput(groupData){    
    /* Yeni bir Select Inputu oluşturur */
    let newLabel = document.createElement("label")
    newLabel.setAttribute("class","form-label")
    newLabel.textContent = groupData.label;
    let newElement = document.createElement("select")
    
    let options = this.getOptions(groupData.options) // options propu eklenmişse çağırıldı
    if(options.length){
      // Eğer options değerleri var ise bunlar için tek tek tagler oluştıruldu ve select tagına append edildi.
      options.forEach(option => {
        let newOption = document.createElement("option")
        newOption.value, newOption.textContent = option
        if(option == groupData.value){
          newOption.setAttribute("selected",true)
        }
        newElement.appendChild(newOption)
      })
    }

    // Attribute Bilgilerini Okumak...
    config.attributesList.forEach(attr => {
      if(groupData[attr] || config.alwaysAddAttrList.includes(attr)){
        newElement.setAttribute(attr,groupData[attr])
        if(!config.ignoreAttrList.includes(attr)){
          //Eğer attr ignore edilmiş bir değer değilse componentin kendi attr listinden
          this.removeAttribute(attr)
        }
      }
    })

    this.shadowRoot.querySelector(`#${groupData['id']}`).appendChild(newLabel) // div container elementine append ettik
    this.shadowRoot.querySelector(`#${groupData['id']}`).appendChild(newElement) // div container elementine append ettik
  }

  createCheckboxInput(groupData){
    /* Yeni bir Checkbox Inputu oluşturur */
      let newLabel = document.createElement("label")
      newLabel.setAttribute("class","form-label")
      newLabel.textContent = groupData.label;
      let newElement = document.createElement("div")

      let options = this.getOptions(groupData.options) // options propu eklenmişse çağırıldı
      if(options.length){
        // Eğer options değerleri var ise bunlar için tek tek tagler oluştıruldu ve select tagına append edildi.
        options.forEach(option => {
          let id = this.makeId(8)

          let newInputContainer = document.createElement("div")
          newInputContainer.setAttribute("class","form-check form-check-inline")
          
          let newLabel = document.createElement("label")
          newLabel.setAttribute("class","form-check-label")
          newLabel.setAttribute("for",id)
          newLabel.textContent = option
          newInputContainer.appendChild(newLabel)

          let newCheckbox = document.createElement("input")
          newCheckbox.setAttribute("type","checkbox")
          newCheckbox.setAttribute("class","form-check-input")
          newCheckbox.setAttribute("id",id)
          newCheckbox.value = option
          newCheckbox.textContent = option
          newInputContainer.appendChild(newCheckbox)

          newElement.appendChild(newInputContainer)
        })
      }

      // Attribute Bilgilerini Okumak...
      config.attributesList.forEach(attr => {
        if(groupData[attr]  || config.alwaysAddAttrList.includes(attr)){
          newElement.setAttribute(attr,groupData[attr])
          if(!config.ignoreAttrList.includes(attr)){
            //Eğer attr ignore edilmiş bir değer değilse componentin kendi attr listinden
            this.removeAttribute(attr)
          }
        }
      })

      this.shadowRoot.querySelector(`#${groupData['id']}`).appendChild(newLabel) // div container elementine append ettik
      this.shadowRoot.querySelector(`#${groupData['id']}`).appendChild(newElement) // div container elementine append ettik
  }


  makeId(length) {
    var result           = ["id"];
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result.push(characters.charAt(Math.floor(Math.random() * 
        charactersLength)));
    }
   return result.join('');
}

  getOptions(value){
    if(typeof value != 'object'){
      let options = []
      try {
        // string bir json değerimi mi diye kontrol ettik
        options = JSON.parse(value)
        throw(value)
      } catch (error) {
        try {
          // virgülle ayrılmış bir string mi diye kontrol ettik
          options = value.split(",")
          if(!value) throw(value) //eğer value boş bir değerse boş array döndermek için catch bloğuna yönlendirdik
        } catch (error) {
          options = []
          console.log("options attribute not valid. This attribute must be Array or object")
        }        
      }
      finally{
        return options
      }
    }
    return value
  }
  connectedCallback() {
    setTimeout(() => {
      this.formData.forEach((element,index) =>{
        switch (element.type) {
          case 'select':
            this.shadowRoot.getElementById(element.id).addEventListener("change", (e) => {
              let currectIndex = this.formData.findIndex(v => v.name == e.target.name)
              this.formData[currectIndex].value = e.target.value
              this.setAttribute("value",JSON.stringify(this.formData))
              this.shadowRoot.getElementById(element.id).setAttribute("value",e.target.value)
              
            }); 
            break; 
          case 'checkbox':
            this.shadowRoot.getElementById(element.id).addEventListener("change", (e) => {
              let value = this.getOptions(this.shadowRoot.getElementById(element.id).value)
              if(value.includes(e.target.value)){
                let ind = value.findIndex(v => v == e.target.value)
                value.splice(ind,1)
              }else{
                value.push(e.target.value)
              }
              
              let currectIndex = this.formData.findIndex(v => v.name == e.target.name)
              this.formData[currectIndex].value = e.target.value
              this.setAttribute("value",JSON.stringify(this.formData))
              this.shadowRoot.getElementById(element.id).setAttribute("value",value)
            }); 
            break; 
          default:
            this.shadowRoot.getElementById(element.id).addEventListener("keyup", (e) => {
              let currectIndex = this.formData.findIndex(v => v.name == e.target.name)
              this.formData[currectIndex].value = e.target.value
              this.setAttribute("value",JSON.stringify(this.formData))
              this.shadowRoot.getElementById(element.id).setAttribute("value",e.target.value)
            }); 
            break;
        }
      });
    }, 150);
  }

  disconnectedCallback() {    
    this.formData.forEach((element,index) =>{
      switch (element.type) {
        case 'select':
          this.shadowRoot.getElementById(element.id).removeEventListener("change",null);
          break; 
        case 'checkbox':
          this.shadowRoot.getElementById(element.id).removeEventListener("change",null);
          break; 
        default:
          this.shadowRoot.getElementById(element.id).removeEventListener("keyup",null);
          break;
      }
    })
  } 
}

window.customElements.define("form-element", FormElement);