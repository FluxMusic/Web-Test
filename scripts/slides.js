const input1 = document.getElementById('i1');
const input2 = document.getElementById('i2');
const input3 = document.getElementById('i3');
const input4 = document.getElementById('i4');

const label1 = document.getElementById('l1');
const label2 = document.getElementById('l2');
const label3 = document.getElementById('l3');
const label4 = document.getElementById('l4');

label1.addEventListener('click', () => {
    input1.checked = !input1.checked;
});
label2.addEventListener('click', () => {
    input2.checked = !input2.checked;
});
label3.addEventListener('click', () => {
    input3.checked = !input3.checked;
});
label4.addEventListener('click', () => {
    input4.checked = !input4.checked;
});