//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

var taskInput=document.getElementById('new-task');//Add a new task.
var addButton=document.querySelector('.add__button');//first button
var incompleteTaskHolder=document.getElementById('incomplete-tasks');//ul of #incompleteTasks
var completedTasksHolder=document.getElementById('completed-tasks');//completed-tasks
document.querySelector('.do__input').classList.add('dissapear');
document.querySelector('.do__label-edit').classList.add('dissapear');
document.querySelector('.do__li-edit').classList.add('editMode');


//New task list item
var createNewTaskElement=function(taskString) {

    var listItem=document.createElement('li');

    //input (checkbox)
    var checkBox=document.createElement('input');//checkbx
    //label
    var label=document.createElement('label');//label
    //input (text)
    var editInput=document.createElement('input');//text
    //button.edit
    var editButton=document.createElement('button');//edit button

    //button.delete
    var deleteButton=document.createElement('button');//delete button
    var deleteButtonImg=document.createElement('img');//delete button image
    listItem.className='do__li';
    label.innerText=taskString;
    label.className='do__label';

    //Each elements, needs appending
    checkBox.type='checkbox';
    editInput.type='text';
    editInput.className='do__input dissapear';

    editButton.innerText='Edit'; //innerText encodes special characters, HTML does not.
    editButton.className='button do__edit-button';

    deleteButton.className='button do__del-button';
    deleteButtonImg.src='./remove.svg';
    deleteButtonImg.className='container__img'
    deleteButton.appendChild(deleteButtonImg);


    //and appending.
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}



var addTask=function(){
    console.log('Add Task...');
    //Create a new list item with the text from the #new-task:
    if (!taskInput.value) return;
    var listItem=createNewTaskElement(taskInput.value);

    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value='';

}

//Edit an existing task.

var editTask=function(){
    console.log('Edit Task...');
    console.log('Change "edit" to "save"');


    var listItem=this.parentNode;
   
    var editInput=listItem.querySelector('input[type=text]');
    if (listItem.classList.contains('do__li')) {
        var label=listItem.querySelector('.do__label');
        var editBtn=listItem.querySelector('.do__edit-button');
    } else if (listItem.classList.contains('do__li-edit')) {
        var label=listItem.querySelector('.do__label-edit');
        var editBtn=listItem.querySelector('.do__save-button');
    } else if (listItem.classList.contains('done__li')) {
        var label=listItem.querySelector('.done__label');
        var editBtn=listItem.querySelector('.done__edit-button');
    }
    
    var containsClass=listItem.classList.contains('editMode');
    //If class of the parent is .editmode
    console.log(containsClass);
    if(containsClass){
        // editInput.classList.add('do__input').remove('do__input-edit');
        editInput.classList.add('dissapear');
        label.classList.remove('dissapear');
        //switch to .editmode
        //label becomes the inputs value.
        label.innerText=editInput.value;
        editBtn.innerText='Edit';
    }else{
        // editInput.classList.add('do__input-edit').remove('do__input');
        editInput.classList.remove('dissapear');
        label.classList.add('dissapear');
        editInput.value=label.innerText;
        editBtn.innerText='Save';
    }

    //toggle .editmode on the parent.
    listItem.classList.toggle('editMode');
};


//Delete task.
var deleteTask=function(){
    console.log('Delete Task...');

    var listItem=this.parentNode;
    // console.log(listItem);
    var ul=listItem.parentNode;
    // console.log(ul);
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);

}


//Mark task completed
var taskCompleted=function(){
    console.log('Complete Task...');

    //Append the task list item to the #completed-tasks
    var listItem=this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

}


var taskIncomplete=function(){
    console.log('Incomplete Task...');
//Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the #incompleteTasks.
    var listItem=this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}



var ajaxRequest=function(){
    console.log('AJAX Request');
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
// addButton.onclick=addTask;
addButton.addEventListener('click',addTask);
addButton.addEventListener('click',ajaxRequest);


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
    console.log('bind list item events');
//select ListItems children
    var checkBox=taskListItem.querySelector('input[type=checkbox]');
    if (taskListItem.classList.contains('do__li')) {
        var editButton=taskListItem.querySelector('.do__edit-button');
        var deleteButton=taskListItem.querySelector('.do__del-button');
    } else if (taskListItem.classList.contains('do__li-edit')) {
        var editButton=taskListItem.querySelector('.do__save-button');
        var deleteButton=taskListItem.querySelector('.do__del-button-edit');
    } else if (taskListItem.classList.contains('done__li')) {
        var editButton=taskListItem.querySelector('.done__edit-button');
        var deleteButton=taskListItem.querySelector('.done__del-button');
    }
    
    //Bind editTask to edit button.
    editButton.onclick=editTask;
    //Bind deleteTask to delete button.
    deleteButton.onclick=deleteTask;
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i=0; i<incompleteTaskHolder.children.length;i++){

    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (var i=0; i<completedTasksHolder.children.length;i++){
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.