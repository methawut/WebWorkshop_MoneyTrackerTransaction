// !อ้างอิง element ที่จะใช้เปลี่ยนแปลงหรือทำงาน ใน HTML
const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const Text = document.getElementById('text');
const Amount = document.getElementById('amount');

const DataTransaction = [
    {id : 1 , text : "ค่าเน็ต" , amount: -299} , 
    {id : 2 , text : "ค่าห้อง" , amount: -3750} , 
    {id : 3 , text : "เงินเดือน" , amount: +10000},
    {id : 4 , text : "เงิน Pass Time" , amount: +4000}
]

let Transaction = DataTransaction;      //*ตัวแปลประเภท Let เพราะเดี๋ยวจะมีการรับข้อมูลเข้ามา
/* [
    {id : 1 , text : "ค่าเน็ต" , amount: -299} , 
    {id : 2 , text : "ค่าห้อง" , amount: -3750} , 
    {id : 3 , text : "เงินเดือน" , amount: +10000},
    {id : 4 , text : "เงิน Pass Time" , amount: +4000}
]
    {Transaction.id , Transaction.text , Transaction.amount}
*/

init();











function init(){
    list.innerHTML = '';                                             //*ให้ตัวแปล "list" ที่อ้างอิงกับ element 'list' ใน HTML ไม่เก็บอะไรไว้ก่อน
    Transaction.forEach(AddData_SendToList_FUNC);                    //* ให้ตัวแปล Transaction ทำการ Loop ในฟังก์ชั่น AddData_SendToList_FUNC ให้หมด
    CalculateMoney();
}
// 
// 
// 
// 
// 
// 
// 
function AddData_SendToList_FUNC(Transaction){

    // TODO : ตัวแปล sign เก็บเครื่องหมาย +,-
    const Sign = Transaction.amount < 0 ? '-' : '+';          //* เขียนเงื่อนไขแบบสั้น  :::  if(Transaction.amount < 0) == '-', else == '+'  
    /*
    if(Transaction.amount < 0){
        Sign = '-'; 
        // console.log(Sign);
    }
    else{
        Sign = '+'; 
        // console.log(Sign);
    }
    */
    // TODO : ตัวแปล status เก็บเครื่องหมาย สถานะ 'plus' , 'minus' เพื่อเอาไปสร้าง class
    const status = Transaction.amount < 0 ? 'minus' : 'plus';  //* เขียนเงื่อนไขแบบสั้น  :::  "?" --> if , ":" --> else

    

    //TODO : สร้าง Tag "li" ด้วย Javascript หรือ เมื่อมีการ interact ผ่านเว็บ
    //? ลักษณะที่ต้องการให้สร้างโครงสร้าง เป็นเหมือนใน HTML เลย

    /* 
    * <li class="......"> 
    *   ค่าเน็ต <span> .. ..... </span> 
    *   <button class="delete-btn"> X </button> 
    * </li>
    */

    const item = document.createElement('li');                  //* ข้อมูลในตัวแปล "item" จะถูกเก็บใน Tag "li" ที่ถูกสร้างมาใหม่
    item.classList.add(status);                                 //* ทำการสร้าง class ที่ชื่ออยู่ในตัวแปล 'status' และเอาใส่ในตัวแปล item และจะถูกเก็บใน Tag "li" ที่ถูกสร้างมาใหม่
    item.innerHTML =                                            
    `${Transaction.text}
    <span> 
        ${Sign}${formatNumber(Math.abs(Transaction.amount))}                  
    </span>                                                     
    <button class="delete-btn" onclick = "removeData(${Transaction.id})" > X </button>`;                   //* onclick เมื่อมีการกดที่ Button นี้ จะทำการเรียกใช้ฟังก์ชั่น removeData(${Transaction.id}) --> ค่าที่ add เข้าไปในฟังก์ชั่นคือ id

    //* .innerHTML : ทำการสร้างชุดข้อมูลที่อ้างอิงกับรูปแบบ symtax ของ HTML
    //* ให้ตัวเลขที่ติดลบ ไม่แสดงเครื่องหมาย - ด้วย absolute
    console.log(item);

    list.appendChild(item);                                     //*้เพิ่มชุดข้อมูลลงในตัวแปล "list" ที่อ้างอิง element "list" ใน HTML
}
// 
// 
// 
// 
// 
// 
// 
function CalculateMoney(){

    // ! map --> วนทุกค่าใน array ที่ map (ตัวแปลที่ต้องการ return => ข้อมูลที่ต้องการจะ return )
    const FormAmount = Transaction.map(Transaction=>Transaction.amount);
    console.log(FormAmount);    //* FormAmount = [ Transaction.amount[0], Transaction.amount[1], Transaction.amount[2] ]

    // ! reduce --> นำค่าใน array ของตัวแปลที่เลือกมาโดย ((ตัวแปลใหม่ที่จะ return, ตำแหน่ง index ใน array) => (สมการ) , 0 (ตัวแปลใหม่ที่จะ return ค่าเริ่มต้นเป็น 0))
    const total = FormAmount.reduce((result,index) => (result+=index), 0).toFixed(2);     //*toFixed(2) : ทศนิยม 2 ตำแหน่ง
    console.log(total);         //*total == result = FormAmount[0] + FormAmount[1] + FormAmount[2]
    
    // TODO : ทำรายรับ
    // ! filter --> ทำการกรองค่าใน array ของตัวแปลที่เลือกมาโดยเป็นรูปแบบ Condition : (index=>index > 0) ---> return index(ตำแหน่งใน array) ที่มีค่ามากกว่า 0
    // *  กรองค่าใน index แต่ละตำแน่งของ FormAmount ว่าอันไหนมากกว่า 0 ::: และทำการ reduce ค่าที่ผ่านการกรองว่าอันไหนเป็นค่า + 
    const InCome = FormAmount.filter(index=>index>0).reduce((result,index) => (result+=index), 0).toFixed(2);
    console.log(InCome);
    /*
        FormAmount = [ Transaction.amount[0], Transaction.amount[1], Transaction.amount[2] ]
        FormAmount = [-299, -3750, 10000, 4000]  :::  FormAmount.filter(index=>index > 0) = [10000, 4000]
        InCome == result = FormAmount += FormAmount[index+1]
    */

    // TODO : ทำรายจ่าย
    // *  กรองค่าใน index แต่ละตำแน่งของ FormAmount ว่าอันไหนน้อยกว่า 0 ::: และทำการ reduce ค่าที่ผ่านการกรองว่าอันไหนเป็นค่า - 
    const OutSend = FormAmount.filter(index=>index < 0).reduce((result,index) => (result+=index), 0).toFixed(2);
    console.log(OutSend);   
    /*
        FormAmount = [ Transaction.amount[0], Transaction.amount[1], Transaction.amount[2] ]
        FormAmount = [-299, -3750, 10000, 4000]  :::  FormAmount.filter(index=>index < 0) = [-299, -3750]
        OutSend == result = FormAmount += FormAmount[index+1]
    */

    // !อ้างอิง : map, reduce, filter
    // !https://medium.com/@rennerwin/map-filter-reduce-%E0%B8%AA%E0%B8%B2%E0%B8%A1%E0%B8%97%E0%B8%AB%E0%B8%B2%E0%B8%A3%E0%B9%80%E0%B8%AA%E0%B8%B7%E0%B8%AD%E0%B9%83%E0%B8%99%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%88%E0%B8%B1%E0%B8%94%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%81%E0%B8%B1%E0%B8%9A-array-49b2cd966e79


    
    //TODO : แสดงผลยอกคงเหลือ, รายรับ, รายจ่าย ผ่านตัวแปลที่อ้างอิง Element ใน HTML
    // *.innerText : แสดงข้อความใหม่ใน tag ที่อ้างอิง ในHTML 
    // balance.innerText = `${total}`;                         //* ตัวแปล balance ที่อ้างอิง Tag "balance" ใน HTML มีค่า total(ยอดคงเหลือ) 
    balance.innerText = `฿` + formatNumber(total);
    // money_plus.innerText = `${InCome}`;                     //* ตัวแปล money_plus ที่อ้างอิง Tag "money-plus" ใน HTML มีค่า InCome(รายรับ) 
    money_plus.innerText = `฿` + formatNumber(InCome);
    // money_minus.innerText = `${OutSend}`;                   //* ตัวแปล money_minus ที่อ้างอิง Tag "money-minus" ใน HTML มีค่า OutSend(รายจ่าย) 
    money_minus.innerText = `฿` + formatNumber(OutSend);
}

//TODO : ฟังก์ชั่นที่ช่วยสามารถใส่ลูกน้ำให้ตัวเลข : https://blog.abelotech.com/posts/number-currency-formatting-javascript/
function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
// 
// 
// 
// 
// 
// 
// 
// TODO: ส่วนของการเพิ่มธุรกรรม
form.addEventListener('submit', Add_Transaction);           //*เมื่อมีการ submit เรียกใช้ฟังก์ชั่น Add_Transaction 

function Add_Transaction(event){
    event.preventDefault();                                 //* ให้ข้อมูลเก่ายังคงค้างอยู่
    // console.log("Send Transaction.....");
    
    if(Text.value.trim() === '' || Amount.value.trim() === ''){      //* เช็คว่าตัวแปล Text และ Amount ที่อ้างอิงกับ Element ใน HTML นั้น มีการพิมพ์ในช่องหรือไม่ (element: text, amount เป็น input)
        alert("กรุณาป้อนข้อมูลให้ครบ");                         //* ถ้าค่าข้างในว่าง ทำการขึ้น  pop-up แจ้งเตือน
    }
    else{                                                   //* ถ้ามีการพิมพ์ในช่อง ที่เป็นของตัวแปล Text และ Amount ที่อ้างอิงกับ Element ใน HTML (element: text, amount เป็น input)
        const data = {
            id:AutoID_FUNC(),
            text:Text.value,
            amount:+Amount.value
        }
        //* data == { id = (id ที่มีการสุ่มใน AutoID_FUNC), text = (ที่พิมพ์ในช่อง input (ตัวแปล Text ที่อ้างอิง Element ID "text" ใน HTML)), amount = (ที่พิมพ์ในช่อง input (ตัวแปล Amount ที่อ้างอิง Element ID "amount" ใน HTML)) }
        //* แบบปกติ: {id : 4 , text : "เงิน Pass Time" , amount: +4000}

        Transaction.push(data);                             //* ส่งไปเก็บในตัวแปล array Transaction
        AddData_SendToList_FUNC(data);                      //* เรียกใช้ฟังก์ชั่น AddData_SendToList_FUNC โดยเอาชุดข้อมูลที่พึ่งสร้าง add เข้าไป
        CalculateMoney();

        Text.value = '';                                    //* reset ช่อง Text และ Amount ที่อ้างอิงกับ Element ใน HTML (element: text, amount เป็น input)
        Amount.value ='';
    }
}

function AutoID_FUNC(){
    return Math.floor(Math.random()*1000000);               //* สร้างเลขแบบสุ่มตั้งแต่ 1 ถึง 1000000 เพื่อเอาไปสร้าง id
}
// 
// 
// 
// 
// 
// 
// TODO: ฟังก์ชั่นที่เอาไว้ลบข้อมูลที่เก็บธุรกรรม 
function removeData(id){
    console.log("delete id:" , id);

    Transaction = Transaction.filter(Transaction => Transaction.id != id);      //* ให้ตัวแปล Transaction ทำการเก็บชุดข้อมูลใหม่เพราะถูกกดลบธุรกรรม โดยทำการกรองเอา id ที่ไม่ได้ถูกเลือก ให้เก็บไว้
    // * Transaction(Old) = [1,2,3] ---> กดปุ่มลบ id ที่ 3 , Transaction(new) = [1,2]
    init();
    
}