let arr = [];
let allArr = [];
let count;
document.querySelector('.input-text').addEventListener('keydown', createArr);

function createArr(e){
    if(e.key === 'Enter'){
        obj = {
            id: new Date().toISOString(),
            text: this.value,
            completed: false,
        }
    if(obj.text !== ''){
        arr.push(obj);
        allArr = [...arr];
    }
    this.value = '';    
    updateLocal(arr);
    draw(arr, arr.length);
    }
}

function updateLocal(){
    localStorage.setItem('task', JSON.stringify(allArr));
}

function draw(q, x){
    document.querySelector('.out').innerHTML = '';
    let str = '';
    
    q.forEach(item => {
        str += `
            <div class = "item">
                <input data = ${item.id} id = "${item.id}" class="checkbox" type="checkbox">
                <label class = "label  ${item.completed ? 'active lab' : ''}" data = ${item.id} for = "${item.id}">${item.text}</label>
                <span data = ${item.id}>X</span>
            </div>`;

        });
        document.querySelector('.out').innerHTML = str;
        document.querySelector('.left').innerHTML = 'Left: ' + x;
        
        document.querySelectorAll('span').forEach(item => item.addEventListener('click', close));
        document.querySelectorAll('.checkbox').forEach(item => item.addEventListener('click', check));
}

function close(e){
    let data = e.target.getAttribute('data');
    arr = arr.filter(item => item.id !== data );
    let arrAct = arr.filter(item => item.completed !== true);
    draw(arr, arrAct.length);
}


function check(e){
    
    let data = e.target.getAttribute('data')
    let label = document.querySelector(`[for = "${data}"]`);
    
    if(this.checked){
        count = arr.length;
        for(let key in arr){
            if(arr[key].id === data){
                arr[key].completed = !arr[key].completed;
        }
            if(arr[key].completed === true){
                label.classList.add('active');
                count = count - 1;
            }else{
                label.classList.remove('active');
                count = count;
            }
        }
        draw(arr, count);
    }
}

document.querySelector('.completed').addEventListener('click', () => {
    let arrCompleted = allArr.filter(item => item.completed === true);
    draw(arrCompleted, arr.length - arrCompleted.length);
});

document.querySelector('.act').addEventListener('click', act)
function act() {
    let arrAct = allArr.filter(item => item.completed !== true);
    draw(arrAct, arrAct.length);
}

document.querySelector('.all').addEventListener('click', () => {
    let arrCompleted = allArr.filter(item => item.completed === true);
    draw(allArr, allArr.length - arrCompleted.length);
})

