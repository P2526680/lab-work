var counter = 0;
function clickCounter()
{
  counter++;
  lbl.textContent = counter;
}

trigger.addEventListener('click', clickCounter);
