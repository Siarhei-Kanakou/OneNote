var Application=function(){function a(a){var b,c,d=(a||"Application").split("."),e=window.Application||(window.Application={});for(d="Application"===d[0]?d.slice(1):d,b=0,c=d.length;c>b;b++)e[d[b]]=e[d[b]]||{},e=e[d[b]];return e}function b(){f=new d.DateRange,e.NavigationController.bind(f),e.NoteController.bind(f)}function c(){window.addEventListener("load",function(){b()})}var d={},e={},f=null;return{Models:d,Controllers:e,getNamespace:a,start:c}}();!function(a){var b=a.getNamespace("Controllers"),c=a.getNamespace("Models"),d=a.getNamespace("Views");b.NavigationController={bind:function(a){function b(b){var e,f=document.getElementById("month"),g=document.getElementById("date"),h=document.getElementById("canvas"),i=a.getCurrentWeek()[b],b=0,j=i.notes.length;for(week=a.changeCurrentDay(i.date.getTime()),f.textContent=c.Months[i.date.getMonth()],g.textContent=i.date.getDate()<10?"0"+i.date.getDate():i.date.getDate();h.firstChild;)h.removeChild(h.firstChild);for(b=0;j>b;b++)e=new d.NoteView(i.date,i.notes[b]),e.parentEle=h,e.render()}var e=document.querySelector("header");e.addEventListener("click",function(c){var d,e=!0;((e=/\w*roundStyle\w*/.test(c.target.className))||/\w*roundStyle*\w/.test(c.target.parentElement.className))&&(d=e?c.target:c.target.parentElement,"previous"===d.id?(a.getPreviousWeek(),bind()):"next"===d.id?(a.getNextWeek(),bind()):"createNote"!==d.id&&b(parseInt(d.id)))}),(bind=function(){var c=document.querySelectorAll("p.day"),d=0,e=c.length,f=a.getCurrentWeek(),g=a.getCurrentDay();for(d=0;e>d;d++)c[d].textContent=f[d].date.getDate(),f[d].date.getTime()===g.date.getTime()&&(c[d].parentElement.parentElement.children[0].checked=!0,b(d))})()}}}(Application),function(a){var b=a.getNamespace("Controllers"),c=(a.getNamespace("Models"),a.getNamespace("Views"));b.NoteController={bind:function(a){{var b=document.getElementById("createNote");document.getElementById("canvas")}b.addEventListener("click",function(){var b=new c.NoteView(a.getCurrentDay().date,a.createNote()),d=document.getElementById("canvas");b.parentEle=d,b.render()})}}}(Application),function(a){var b=a.getNamespace("Models"),c=(a.getNamespace("Utils"),a.getNamespace("Views"));c.NoteView=function(a,b){this._date=a,this._data=b,this._element=null,this.parentEle=null},c.NoteView.prototype._buildElement=function(){var a=document.createElement("div"),b=document.createElement("section"),c=document.createElement("section"),d=document.createElement("input"),e=document.createElement("textarea"),f=document.createElement("input");a.className="noteWrapper",a.setAttribute("number",this._data.id),a.setAttribute("draggable","true"),a.id="note-"+this._data.id,a.style.left=(this._data.position.x||350)+"px",a.style.top=(this._data.position.y||150)+"px",a.appendChild(c),a.appendChild(b),c.appendChild(d),c.appendChild(f),b.appendChild(e),f.setAttribute("type","button"),d.className="textControl title",d.setAttribute("value",this._data.title),e.className="textControl description",e.textContent=this._data.description,e.style.resize="none",e.setAttribute("spellcheck","false"),f.className="btn delete",f.setAttribute("value","×"),this._element=a},c.NoteView.prototype._bind=function(){var a,c,d=this._element.querySelector(".btn.delete"),e=this._element.querySelectorAll(".title, .description"),f=this;for(d.addEventListener("click",function(a){var c=a.target.parentElement.parentElement;b.Storage.Notes.delete(f._date,f._data.id),c.parentElement.removeChild(c)}),this._element.addEventListener("mousedown",function(a){function c(a){var b=a.clientX-g.offsetLeft,c=a.clientY-g.offsetTop,d=c-i,f=b-h,j=f+a.currentTarget.clientWidth;d>0&&(e.style.top=c-i+"px"),g.clientWidth>j&&j>a.currentTarget.clientWidth&&(e.style.left=b-h+"px")}function d(a){f._data.position.y=a.clientY-g.offsetTop-i,f._data.position.x=a.clientX-g.offsetLeft-h,b.Storage.Notes.saveOne(f._date,f._data),e.style.cursor="text",e.removeEventListener("mouseup",d),e.removeEventListener("mouseout",d),e.removeEventListener("mousemove",c)}var e=this,g=this.parentElement,h=a.clientX-g.offsetLeft-e.offsetLeft,i=a.clientY-g.offsetTop-e.offsetTop;"button"!==a.currentTarget.type&&(e.style.cursor="move",e.addEventListener("mousemove",c),e.addEventListener("mouseout",d),e.addEventListener("mouseup",d))}),this._element.addEventListener("dragstart",function(a){a.preventDefault()}),a=0,c=e.length;c>a;a++)e[a].addEventListener("change",function(a){"text"===a.currentTarget.type?f._data.title=a.currentTarget.value:f._data.description=a.currentTarget.value,b.Storage.Notes.saveOne(f._date,f._data)})},c.NoteView.prototype.render=function(){if(!this.parentEle)throw new ReferenceError("A parent element is empty!");this._buildElement(),this._bind(),this.parentEle.appendChild(this._element)}}(Application),function(a){var b=a.getNamespace("Models");b.DateContainer=function(a,b){this.date=a,this.notes=b},b.DateContainer.prototype.save=function(){b.Storage.Notes.save(this.date,this.notes)},b.DateContainer.prototype.createNote=function(){var a=new b.Note;return this.notes.push(a),this.save(),a}}(Application),function(a){var b=a.getNamespace("Models");b.DateRange=function(){this._currentDate=null,this._currentWeek=null,this._initialize()},b.DateRange.MILISEC=864e5,b.DateRange.DAYS_QUANTITY=7,b.DateRange.prototype._initialize=function(){var a,c,d=new Date,e=d.getDay(),f=d.getTime()-(e-1)*b.DateRange.MILISEC,g=d.getTime()+(b.DateRange.DAYS_QUANTITY-e)*b.DateRange.MILISEC;for(0===e&&(f=d.getTime()-(b.DateRange.DAYS_QUANTITY-1)*b.DateRange.MILISEC,g=d),c=f,this._currentWeek=[];g>=c;c+=b.DateRange.MILISEC)a=new b.DateContainer(new Date(c),b.Storage.Notes.get(new Date(c))),this._currentWeek.push(a),c===d.getTime()&&(this._currentDate=a)},b.DateRange.prototype.createNote=function(){return this._currentDate.createNote()},b.DateRange.prototype.getNextWeek=function(){var a,c=this._currentWeek[this._currentWeek.length-1].date.getTime()+b.DateRange.MILISEC,d=c+(b.DateRange.DAYS_QUANTITY-1)*b.DateRange.MILISEC;for(this._currentWeek=[],a=c;d>=a;a+=b.DateRange.MILISEC)this._currentWeek.push(new b.DateContainer(new Date(a),b.Storage.Notes.get(new Date(a))));return this._currentDate=this._currentWeek[0],this._currentWeek},b.DateRange.prototype.getPreviousWeek=function(){var a,c=this._currentWeek[0].date.getTime()-b.DateRange.DAYS_QUANTITY*b.DateRange.MILISEC,d=c+b.DateRange.MILISEC*(b.DateRange.DAYS_QUANTITY-1);for(this._currentWeek=[],a=c;d>=a;a+=b.DateRange.MILISEC)this._currentWeek.push(new b.DateContainer(new Date(a),b.Storage.Notes.get(new Date(a))));return this._currentDate=this._currentWeek[this._currentWeek.length-1],this._currentWeek},b.DateRange.prototype.getCurrentWeek=function(){return this._currentWeek},b.DateRange.prototype.getCurrentDay=function(){return this._currentDate},b.DateRange.prototype.changeCurrentDay=function(a){var c;if("number"!=typeof a)throw new TypeError("Models.DateRange.getConcreteDay illegal argument error!");if(this._currentWeek[0].date.getTime()>a||this._currentWeek[this._currentWeek.length-1].date.getTime()<a)throw new RangeError("Date is out of the range!");return c=a-this._currentWeek[0].date.getTime(),this._currentDate=this._currentWeek[c/b.DateRange.MILISEC]}}(Application),function(a){var b=a.getNamespace("Models");b.DayNames=["Monday","Tuesday","Thursday","Wednesday","Friday","Saturday","Sunday"]}(Application),function(a){var b=a.getNamespace("Models");b.DaysEnum={MONDAY:0,TUESDAY:1,WEDNESDAY:2,THURSDAY:3,FRIDAY:4,SATURDAY:5,SUNDAY:6}}(Application),function(a){var b=a.getNamespace("Models");b.Months=["January","February","March","April","May","June","July","August","September","October","November","December"]}(Application),function(a){var b=a.getNamespace("Models");b.Note=function(a){this.id=b.Note.id++,this.date=a,this.title="Title",this.description="Description",this.position={x:0,y:0}},b.Note.id=0}(Application),function(a){var b=a.getNamespace("Models"),c=a.getNamespace("Utils");b.Storage={Notes:{get:function(a){var b=null;if(!(a instanceof Date))throw new TypeError("Illegal arguments!");return a=c.resetTime(a),b=localStorage&&localStorage[a.getTime()],b?JSON.parse(b):[]},save:function(a,b){if(!a instanceof Date)throw new TypeError("Illegal arguments!");a=c.resetTime(a),localStorage[a.getTime()]=JSON.stringify(b)},saveOne:function(a,c){var d,e,f;if(!c instanceof b.Note)throw new TypeError("Illegal argument");for(d=this.get(a),e=0,f=d.length;f>e;e++)if(d[e].id===c.id){d[e]=c;break}this.save(a,d)},"delete":function(a,b){var c,d,e;for(e=this.get(a),c=0,d=e.length;d>c&&e[c].id!==b;c++);e.splice(c,1),this.save(a,e)},deleteAll:function(a){if(!(a instanceof Date))throw new TypeError("Illegal arguments!");a=c.resetTime(a),localStorage.removeItem(a.getTime())}}}}(Application),function(a){var b=a.getNamespace("Utils");b.resetTime=function(a){if(!(a instanceof Date))throw new TypeError("Illegal argument!");return a.setHours(0),a.setMinutes(0),a.setSeconds(0),a.setMilliseconds(0),a},b.setTransformParams=function(a,b,c,d){d=d===!1?d:!0,a.style.webkitTransform=d?"translate3d("+b+"px,"+c+"px, 0px)":"",a.style.mozTransform=d?"translate3d("+b+"px,"+c+"px, 0px)":"",a.style.transform=d?"translate3d("+b+"px,"+c+"px, 0px)":""}}(Application);