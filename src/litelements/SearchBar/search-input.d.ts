import {LitElement, html,css} from 'lit';
import {customElement} from 'lit/decorators.js';
import Fontawesome from 'lit-fontawesome';


@customElement('search-input')
class SearchInput extends LitElement {
  suggestion: any[]=[]
  suggest: any[]=[]

  static get properties(){
     return{
        suggest:{type:Array},
        searchquery:{type:String},
     }
  };

  static get styles() {
    return[ Fontawesome, css`
     .suggest{
      list-style-type:none;
      padding:10px;
      border-radius:5px
     }
     ul { 
      list-style-type: none; 
      padding: 0px;
    }
  
    .fa {
      padding-right: 5%;
    }
    
    /* Layout */
    .table{
       width: 100%;
    }
    .row {
      display: flex;
      width: 100%;
      box-sizing: border-box;
      font-size: small;
    }
    .column {
      width: 50% !important;
      padding: 10px;
      text-align: center;
    }
    .column.span {
      padding-right: 5px;
    }
    
    .visible {
      display: block;
    }
    
    .invisible {
      display: none;
    }
    
    .thick {
      font-weight: bold;
      font-size: small;
    }
    
    /*search bar*/
    .search {
      width: 100%;
      position: relative;
      display: flex;
    }
    
    .searchTerm {
      width: 400px;
      border: 3px solid #e2e2e2;
      padding: 5px;
      height: 40px;
      border-radius: 5px;
      outline: none;
      color: #cccccc;
    }
    
    .searchTerm:focus{
      color: #5f5f5f;
    }
    
    .searchIcon {
      text-align: center;
      color: rgb(253, 141, 36);
      position: relative;
      z-index: 1;
      left: -30px;
    }
    .list-group {
      width: 400px;
  }`] ;
 }
  
   
   searchquery=""
   users=[
    {
    id: 1,
    employeeName:"Sandra",
    employerName: "Jane",
    occupation:"Product manager",
    country:"Sweden",
    flag:"SE",
    },
    {
    id: 2,
    employeeName:"John",
    employerName: "Tomas",
    occupation:"Front end developer",
    country:"USA",
    flag:"USA"
    },
    {
      id: 3, 
      employeeName:"Mattis",
      employerName: "Jonas",
      occupation:"Back end developer",
      country:"Japan",
      flag:"JP",
    },
    {
    id: 4, 
    employeeName:"Tom",
    employerName: "Jonas",
    occupation:"Back end developer",
    country:"Germany",
    flag:"DE",
    }
   ]



  render() {
    return html`
      ${this.bootstraplib()}
      <div className="search">
      <input name="search" class="searchTerm" @change="${this.updateSearch}" .value="${this.searchquery}" @input=${this.updateSearch} placeholder="Search..." type="text"/> 
      <i class="searchIcon fas fa-search"></i>
      ${(this.suggest.length > 0 && this.searchquery.length > 0) ? 
        html `<ul class="list-group">
           ${this.suggest.map((s)=>{
               if(this.users.filter(u=>u.employeeName.toLowerCase()===s.toLowerCase())){
                  var index=this.users.findIndex(u=>u.employeeName.toLowerCase()==s.toLowerCase());
                  if(index!=-1){
                    return html `<li class="suggest list-group-item list-group-item-action" @click=${(e: any)=>this.searchResult(s.toLowerCase())}>
                    ${s}<br/>
                    <i class="fas fa-sitemap"></i> ${this.users[index]['employerName']}
                    <i class="fas fa-briefcase"></i> ${this.users[index]['occupation']}
                    </li>`
                  }
               }
               if(this.users.filter(u=>u.country.toLowerCase()===s.toLowerCase())){
                  return html `
                  <li class="suggest list-group-item list-group-item-action" @click=${(e: any)=>this.searchResult(s.toLowerCase())}>
                   ${s}
                  </li>`
               }
           })}
          </ul></div>`:''}
    `;
  }
  bootstraplib(){
    return html`
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">`;
  }
  updateSearch(e:{target:HTMLInputElement}){
    this.searchquery=e.target.value
    this.suggestion=[]
    this.users.map((u)=>{
      return this.suggestion.push(u.employeeName,u.country)
    })
   this.suggest=this.suggestion.filter(s=>s.toLowerCase().includes(this.searchquery.toLowerCase())?s:'')
   this.suggest=[...new Set(this.suggest)]
  }
  searchResult(selectquery: string){
      this.searchquery=selectquery
      this.suggest=[]
      console.log(this.searchquery)
  }
}

//Define JSX IntrinsicElements
declare global {
  namespace JSX {
      interface IntrinsicElements {
          'search-input': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      }
  }
}
