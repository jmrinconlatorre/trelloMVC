document.addEventListener('DOMContentLoaded', function () {

    // Declarations
    ///////////////

    const baseApiUrl = 'http://localhost:3000';
    const getTaskFromAPIRest = () => {

        // GET to /tasks
        fetch(baseApiUrl + '/tasks')
            .then(response => response.json())
            .then(tasks => {
                appendTasks(tasks);
            })
            .catch(console.error)

    }

    let colorPicker = document.querySelector('header'); //captura el color 

    //colorPicker.addEventListener("input", actualizarPrimero, false);
    colorPicker.addEventListener("change", watchColorPicker, false);

    function watchColorPicker(event) {
        var colorHeader = event.target.value;
        console.log(colorHeader);
        colorPicker.style.background = event.target.value;
        let endpoint = 'http://127.0.0.1:3000' + '/header/' + colorHeader;
        console.log(ev.target.value);
        fetch(endpoint)
            .then(res => res.json())
            .then(data => {
                document.querySelector('header').style.backgroundColor = data.color;
            })
    }

    //codigo de Dani
    // document.querySelector("header").addEventListener('change', (ev) => {

    //     let newColor = encodeURIComponent(ev.target.value);

    //     let endpoint = 'http://127.0.0.1:3000' + '/header/' + newColor;
    //     console.log(ev.target.value);
    //     fetch(endpoint)
    //         .then(res => res.json())
    //         .then(data => {
    //             document.querySelector('header').style.backgroundColor = data.color;
    //         })
    // })

    // let saveColorToBackend = colorHeader => {
    //     // GET to /tasks
    //     return fetch(baseApiUrl + '/tasks', {
    //             method: 'POST',
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({
    //                 colorHeader
    //             })
    //         })
    //         .then(response => response.json())

    //         .catch(console.error)
    // }



    const appendTasks = tasksArray => {
        let tasksSection = document.querySelector('main');

        tasksArray.forEach(task => {

            const taskNode = createTaskNode(task);
            tasksSection.appendChild(taskNode);

        })
    }

    const createTaskNode = taskObj => {

        // creat html string from value text
        let newTaskHtmlString = createTemplateHtmlString(taskObj)
        // console.log(newTaskHtmlString);

        // node creation from html string
        let taskNode = createNodeFromString(newTaskHtmlString)
        // console.log(taskNode)

        // add listeners
        addRemoveListener(taskNode, taskObj);
        addCompleteListener(taskNode);

        return taskNode;

    }

    let createTemplateHtmlString = ({
            text,
            color,
            id,
            completed
        }) =>
        `<div class="task ${completed ? 'completed': ''}" data-id="${id}" style="border-color: ${color}">
            <div class="text">${text}</div>
            <button class="remove">remove</button>
            <button class="complete">complete</button>
            <button class="color">change color</button>
            <button class="change">change name</button>
        </div>`
    let createNodeFromString = string => {
        let divNode = document.createElement('div');
        divNode.innerHTML = string;
        return divNode.firstChild;
    }

    let addRemoveListener = (node, task) => {
        node.querySelector('.remove').addEventListener('click', event => {
            // event.target.parentNode.remove();

            deleteTaskToBackend(task.id).then(() => node.remove())
        })
    }

    let addCompleteListener = node => {
        node.querySelector('.complete').addEventListener('click', event => {
            node.classList.toggle('completed')
        })
    }

    let saveTaskToBackend = text => {
        // GET to /tasks
        return fetch(baseApiUrl + '/tasks', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    text
                })
            })
            .then(response => response.json())

            .catch(console.error)
    }

    let deleteTaskToBackend = id => {
        //DELETE to /tasks
        return fetch(baseApiUrl + '/tasks', {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id
                })
            })
            .then(response => response.json())

            .catch(console.error)
    }

    
    

    // add tasks
    let inputNode = document.querySelector('header input');

    inputNode.addEventListener('keyup', function (event) {
        if (event.keyCode === 13) {
            //get value from input
            let newTaskText = event.target.value;


            saveTaskToBackend(newTaskText).then(() => {
                // creat html string from value text
                let newTaskHtmlString = createTemplateHtmlString({
                    text: newTaskText
                })
                // console.log(newTaskHtmlString);

                // node creation from html string
                let newTaskNode = createNodeFromString(newTaskHtmlString)
                // console.log(newTaskNode)

                // node inject to DOM in main
                document.querySelector('main').appendChild(newTaskNode)

                // clean value
                event.target.value = '';

                addRemoveListener(newTaskNode);
                addCompleteListener(newTaskNode);
            })
        }
    })

    // let inputColor = document.querySelector('header color');

    // inputColor.addEventListener('submit',function (event){

    //     let newColor = event.target.value;
    //     saveColorToBackend(newColor).then(()=>{


    //     }
    //     )

    // }

    // Encender la falla
    ////////////////////
    getTaskFromAPIRest();

})