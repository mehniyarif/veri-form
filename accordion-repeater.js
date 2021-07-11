const accordion = document.createElement("template");
accordion.innerHTML = `
<style>
@import "./assets/css/bootstrap.min.css"; 
</style>
<script src="./assets/js/bootstrap.bundle.min.js"></script>
`;



class AccordionItem extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(accordion.content.cloneNode(true));
    this.accordionId = this.makeId(10)
    
    this.attributesList = ["type","id","name","class","href","placeholder","src","alt","style","title","width","for","onclick","onchange","value"] //attribute olarak gelebilecek muhtemel değerleri listeledik

    setTimeout(() => {  
      this.dataAccordionForm = JSON.parse(this.getAttribute('value'))
      this.loadElement(this.dataAccordionForm)
    }, 100);
  }
  
  
  loadElement(){
    this.headingId = this.makeId(10)
    this.collapseId = this.makeId(9)
    this.newElement = document.createElement("div")
    this.newElement.setAttribute("class","accordion-item")
    
    //header
    let header = document.createElement("h2")
    header.setAttribute("class","accordion-header")
    header.setAttribute("id",this.headingId)

    //header Button
    let headerBtn = document.createElement("button")
    headerBtn.setAttribute("class","accordion-button")
    headerBtn.setAttribute("type","button")
    headerBtn.setAttribute("data-bs-toggle","collapse")
    headerBtn.setAttribute("data-bs-target","#"+this.collapseId)
    headerBtn.setAttribute("aria-expanded","true")
    headerBtn.setAttribute("aria-controls",this.collapseId)
    headerBtn.textContent = this.getAttribute("label")
    header.appendChild(headerBtn)
  

    //Body Accordion
    let bodyAccordion = document.createElement("div")
    bodyAccordion.setAttribute("class","accordion-body") 

    //Body Container
    let bodyContainer = document.createElement("div")
    bodyContainer.setAttribute("id",this.collapseId)
    bodyContainer.setAttribute("class","accordion-collapse collapse")
    bodyContainer.setAttribute("aria-labelledby",this.headingId)
    bodyContainer.setAttribute("data-bs-parent","#accordionExample")

     //Delete Button
     let deleteBtn = document.createElement("button")
     deleteBtn.setAttribute("class","btn btn-danger btn-sm px-5 mt-3")
     deleteBtn.setAttribute("type","button")
     deleteBtn.setAttribute("onclick",`removeFormElement("${this.accordionId}")`)
     deleteBtn.textContent = "Sil"
     bodyContainer.appendChild(deleteBtn)

     bodyContainer.appendChild(bodyAccordion)

   

    this.shadowRoot.appendChild(header)
    this.shadowRoot.appendChild(bodyContainer)
    setTimeout(() => {
        this.attributesList.forEach(attr => {
            if(this.getAttribute(attr) && !["id"].includes(attr)){
                this.removeAttribute(attr)
            }
          })

        this.prepareformElements()
    }, 150);

    
  }

  accordionsChange(){
    let accordionItems = document.querySelectorAll("#accordionExample accordion-item")
    let accordionData = []
    accordionItems.forEach((element)=>{
      let value = JSON.parse(element.getAttribute("value"))
      let obj = {}
      if(value && value.length){
        value.forEach(item => {
          Object.assign(obj,{[item.name]:item.value})
        })
      }
      accordionData.push(obj)
    })
    document.querySelector("#accordionExample").setAttribute("value",JSON.stringify(accordionData))
  }

  prepareformElements() {
    this.shadowRoot.querySelector(`#${this.collapseId} div`).innerHTML = "";
    if(!this.dataAccordionForm || !this.dataAccordionForm.length){
        return
    }

    let form = document.createElement("form-element");
    form.setAttribute("value",JSON.stringify(this.dataAccordionForm))
    this.setAttribute("value",JSON.stringify(this.dataAccordionForm))
    this.setAttribute("id",this.accordionId)


    this.accordionsChange() //Başlangıçta çalıştırdık
    const vm = this
      //form elemanlarından birinin değeri değiştiğinde çalışır
      setTimeout(() => {
        let observer = new MutationObserver(mutations => {
          mutations.forEach(function(mutation) {
            if (mutation.type == "attributes") {
              vm.setAttribute("value", form.getAttribute("value"))
              vm.accordionsChange()
            }
          })
        });;

        observer.observe(form, {
          attributes: true //configure it to listen to attribute changes
        });
      }, 150);
      

      this.shadowRoot.querySelector(`#${this.collapseId} div`).appendChild(form);
  }

  makeId(length) {
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





  connectedCallback() {
      setTimeout(() => {
        this.shadowRoot.querySelector(`#${this.headingId} button.accordion-button`).addEventListener("click", (e) => {
          let collapse = this.shadowRoot.getElementById(this.collapseId)
          if(collapse.classList.contains("show")){
            collapse.classList.remove("show")
          }else{
            collapse.classList.add("show")
          }
        }); 
      }, 150);
  }

  disconnectedCallback() {
        this.shadowRoot.querySelector(`#${this.headingId} button.accordion-button`).removeEventListener("keyup",null);  
  }
}

window.customElements.define("accordion-item", AccordionItem);