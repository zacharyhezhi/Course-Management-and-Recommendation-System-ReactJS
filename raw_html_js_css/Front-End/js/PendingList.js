function removeRow(inputobj)
{
	if(inputobj==null) return;
	var parentTD = inputobj.parentNode;
	var parentTR = parentTD.parentNode;
	var parentTBODY = parentTR.parentNode;
	parentTBODY.removeChild(parentTR);
}
