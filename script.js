
let todo_list =[];
let pattern = /^[a-zA-Z0-9\s]+$/;
let table_id;

let appendDrop_end = document.getElementById("enddate_id").addEventListener("change",function(){

    let drop = document.getElementById("status_id");
    let enddate = new Date(document.getElementById("enddate_id").value);
    let startdate = new Date(document.getElementById("startdate_id").value);
    let date_error = document.getElementById("error_enddate");
    date_error.innerHTML = "";
    let currentdate = new Date();

    if(drop.options.length > 0){
        while (drop.options.length > 0) {
            console.log(drop.options.length);
            drop.remove(0);
          }
    }
    
    console.log("enter in end date",drop.options.length);
    StatusValidation(startdate,currentdate,enddate,drop);
    
});

let appendDrop_start = document.getElementById("startdate_id").addEventListener("change",function(){

    
    let drop = document.getElementById("status_id");
    let startdate = new Date(document.getElementById("startdate_id").value);
    let enddate = new Date(document.getElementById("enddate_id").value);
    let currentdate = new Date();


    if(drop.options.length > 0){
        while (drop.options.length > 0) {
            console.log(drop.options.length);
            drop.remove(0);
          }
    }
          
   StatusValidation(startdate,currentdate,enddate,drop);


});


function StatusValidation(startdate,currentdate,enddate,drop){

    if(startdate > enddate){
        setError("error_enddate","please check end date");
    }
    else if( startdate < currentdate && enddate < currentdate)
    {
            console.log("duepaass");
            let option1 = document.createElement("option");
            option1.setAttribute("value","DuePass");
            let option2 = document.createElement("option");
            option2.setAttribute("value","Completed")
    
            let optionText = document.createTextNode("DuePass");
            let optionText1 = document.createTextNode("Completed");
            option1.appendChild(optionText);
            option2.appendChild(optionText1);
    
            drop.appendChild(option1);
            drop.appendChild(option2);
    }
    else if(enddate > currentdate && startdate < currentdate)
    {
            let option4 = document.createElement("option");
            option4.setAttribute("value","InProgress");
          
            let optionText4 = document.createTextNode("InProgress");
            option4.appendChild(optionText4);
            drop.appendChild(option4);
    }
    else if(startdate > currentdate && enddate > currentdate)
    {
            console.log("incoming");
            let option3 = document.createElement("option");
            option3.setAttribute("value","UpComing");
            
            let optionText3 = document.createTextNode("UpComing");
            option3.appendChild(optionText3);
      
            drop.appendChild(option3);
    }
    else{
        console.log("all good");
    }
    
}

function disappear() {
    document.getElementById("activity_id").value = ""
    document.getElementById("startdate_id").value = ""
    document.getElementById("enddate_id").value = ""
    document.getElementById("status_id").value = ""

}

function popup_form(event){
    event.preventDefault(); 

    var action = event.submitter.value; 

  if (action === 'update') 
  {
    add_button();
  }else if (action === 'cancel') 
  {
    
    cancel_div();
  }

}

function submitData(event){
    event.preventDefault();
   
    let activity = document.getElementById("activity_id").value;
    let s_date = document.getElementById("startdate_id").value;
    let e_date = document.getElementById("enddate_id").value;
    let status = document.getElementById("status_id").value;

    console.log(status);

    
    
    if(activity.match(pattern)==null){
        setError("error_activity","No special Char is not allowed");
    }
    else{
        add_table_data(activity,s_date,e_date,status);
        disappear();
    }

    let activity_event = document.getElementById("activity_id");
    let activity_error = document.getElementById("error_activity");
    activity_event.addEventListener('input',()=>{
        activity_error.innerHTML = "";
    })



    
}

function setError(id,message){
        let element = document.getElementById(id);
        element.innerHTML = message;
}

function add_table_data(activity, s_date, e_date, status) {
    
    let obj = {
        activity: activity,
        s_date: s_date,
        e_date: e_date,
        status: status

    }
    
        todo_list.push(obj);
        display_table_data(todo_list);    


}

function display_table_data(array) {

    let placeholder = document.getElementById("display");
    
    let out ="" ;
    for (let i = 0; i < array.length; i++) {
        let status = array[i].status;
        let rowStyle ;
        if(status == "DuePass" || status == "Completed"){
            rowStyle = 'style="text-decoration: line-through;"'
        } 
        out+= `        
        
            <tr id="row" ${rowStyle}>
            
            <td>${array[i].activity}</td>
            <td>${array[i].s_date}</td>
            <td>${array[i].e_date}</td>
            <td>${array[i].status}</td>
            <td><span><button type="submit"  onClick = "edit_function(${i})" style="margin:10px;" >Edit</button><button type="submit" onClick="delete_record(${i})" style="background-color:red">Delete</button><span></td>
        
        </tr>
        
        `;    
    }

    placeholder.innerHTML=out;
   

}

function delete_record(id) {
    console.log(id);   
    for(element in todo_list){
       if(element == id){
            todo_list.splice(id,1);
            display_table_data(todo_list);
            console.log(todo_list);
          
       }
   }
  

}

function edit_function(id) {

   
    var popupOverlay = document.querySelector(".popup-overlay");
    popupOverlay.classList.add("active");

   
    
   for(element in todo_list) {
        if (id == element) {
            document.getElementById("edit_activity").value = todo_list[element].activity;
            document.getElementById("edit_sdate").value = todo_list[element].s_date;
            document.getElementById("edit_edate").value = todo_list[element].e_date;
            
        }
    }

    table_id = id;

}

function cancel_div(){
    
    var popupOverlay = document.querySelector(".popup-overlay");
    popupOverlay.classList.remove("active");
  
}

function add_button() {

    
    let form = document.getElementById("edit_form");
    form.addEventListener('submit',function(e){e.preventDefault();})
  

    let edit_activity = document.getElementById("edit_activity").value;
    let edit_sdate = document.getElementById("edit_sdate").value;
    let edit_edate = document.getElementById("edit_edate").value;
    let edit_status = document.getElementById("edit_status").value;

    console.log(edit_activity);
   
    if(edit_activity.match(pattern)==null){
        setError("editerror_activity","No special Char is not allowed");
    }
    else if(edit_sdate > edit_edate){
        setError("editerror_edate","please check end date");
    }
    else 
    {

        for(element in todo_list){
            if(element == table_id){
                todo_list[table_id].activity = edit_activity;
                todo_list[table_id].s_date = edit_sdate;
                todo_list[table_id].e_date = edit_edate;
                todo_list[table_id].status = edit_status;
            }
        }
        
    }
    
     display_table_data(todo_list);
   
    
     document.getElementById("edit_activity").addEventListener('input',()=>{
        document.getElementById("editerror_activity").innerHTML = "";
     });
     

     document.getElementById("edit_edate").addEventListener('change',()=>{
        document.getElementById("editerror_edate").innerHTML ="";
     })
}


    
document.getElementById("search-bar").addEventListener('keyup',function(){
    let search = document.getElementById("search-bar").value;
    // let pattern =/^[0-9]{4}\-[0-9]{1,2}\-[0-9]{1,2}$/;
    // if(search.match(pattern)){
        
    //     let newarray = todo_list.filter(val =>{
    //         if(val.s_date.includes(search) || val.e_date.includes(search))
    //         {
    //             let newobj = {
    //                 activity : val.activity,
    //                 startdate : val.s_date,
    //                 enddate : val.e_date,
    //                 status :val.status
    //             }
    //             return newobj;
                
    //         }
            
    //     })
    //     display_table_data(newarray);
    // }
    // else{
        
        let newarray = todo_list.filter(val =>{
                    if(val.activity.includes(search)  || val.s_date.includes(search) || val.e_date.includes(search) || val.status.includes(search)){
                        let newobj = {
                            activity : val.activity,
                            startdate : val.s_date,
                            enddate : val.e_date,
                            status :val.status
                        }
                        return newobj;
                    }
                   
                })
                display_table_data(newarray);       
    })
    
//})
   
    
    
        
        
    

    

   

    
