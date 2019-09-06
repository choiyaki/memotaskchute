

function getNow() {
	var now = new Date();
	var year = now.getFullYear();
	var mon = now.getMonth()+1; //１を足すこと
	var day = now.getDate();
	var hour = now.getHours();
	var min = now.getMinutes();

	//出力用
	var today = year + "/" + mon + "/" + day
	document.getElementById( "hiduke" ).innerHTML = today ;
	return today;
	
}

//　ローカルストレージからフォームにデータを戻す
document.getElementById("textarea").value = window.localStorage.getItem("textarea") || "";


//textareaの自動調整
const sampleTextarea = document.querySelector('textarea');
sampleTextarea.style.height = sampleTextarea.scrollHeight + "px";
sampleTextarea.addEventListener('input', () => {
	sampleTextarea.style.height = "100px";
	sampleTextarea.style.height = sampleTextarea.scrollHeight + "px";
})

//下部ボタンの位置調整
/*
window.addEventListener('scroll',function() {
	var keysP = document.getElementById("keys");
	keysP.style.position = "absolute";
	keysP.style.paddingTop = (window.pageYOffset+300)+"px";
});
*/

function testfunc(){
	alert(window.pageYOffset);
}

//行頭にチェックボックスを追加
function checkbox(){
		var textarea = document.getElementById('textarea');
	
	//ーーtextareaを受け取って、[textlines,start,end,startlinenum,endlinenum]を返す関数ーー
	var textlines = textarea.value.split(/\n/);
	var start = textarea.selectionStart;
	var end = textarea.selectionEnd;
	var startlinenum = 0;
	var num = 0;
	for (i=0;i<textlines.length;i++){
		if(start>num-1){
			num = num+textlines[i].length+1;
			startlinenum++;
		}
	}
	var endlinenum = 0;
	var num = 0;
	for (i=0;i<textlines.length;i++){
		if(end>num-1){
			num = num+textlines[i].length+1;
			endlinenum++;
		}
	}
	for(i=startlinenum-1 ; i<=endlinenum-1 ; i++){
		const checkbox = /^◻️/;
		const check1 = /^✔︎/;
		const check2 = /^✅/;
		if(checkbox.test(textlines[i])==true||check1.test(textlines[i])==true||check2.test(textlines[i])==true){
			textarea.setSelectionRange(start ,end);
		}else{
			textlines[i] = "◻️" + textlines[i] + " @ #";
			textarea.value = textlines.join("\n");
			textarea.setSelectionRange(start+1 ,end+(endlinenum-startlinenum)+1);
		}
	}
}
//行頭にチェックマークを追加
function check(){
		var textarea = document.getElementById('textarea');
	
	//ーーtextareaを受け取って、[textlines,start,end,startlinenum,endlinenum]を返す関数ーー
	var textlines = textarea.value.split(/\n/);
	var start = textarea.selectionStart;
	var end = textarea.selectionEnd;
	var startlinenum = 0;
	var num = 0;
	for (i=0;i<textlines.length;i++){
		if(start>num-1){
			num = num+textlines[i].length+1;
			startlinenum++;
		}
	}
	var endlinenum = 0;
	var num = 0;
	for (i=0;i<textlines.length;i++){
		if(end>num-1){
			num = num+textlines[i].length+1;
			endlinenum++;
		}
	}
	for(i=startlinenum-1 ; i<=endlinenum-1 ; i++){
		const checkbox = /^◻️/;
		const doing = /^▶️/;
		if(checkbox.test(textlines[i])==true){
			textlines[i] = textlines[i].replace("◻️","▶️");
			textarea.value = textlines.join("\n");
			textarea.setSelectionRange(start ,end);
		}else if(doing.test(textlines[i])==true){
			textlines[i] = textlines[i].replace("▶️","✅");
			textarea.value = textlines.join("\n");
			textarea.setSelectionRange(start + textlines[i].length ,end + textlines[i].length);
		}else{
			const check1 = /^✔︎/;
			const check2 = /^✅/;
			if(check1.test(textlines[i])==true||check2.test(textlines[i])==true){
				textarea.setSelectionRange(start ,end);
			}else{
				textlines[i] = "✔︎" + textlines[i];
				textarea.value = textlines.join("\n");
				textarea.setSelectionRange(start+1 ,end+(endlinenum-startlinenum)+1);
			}
		}
	}
}




//自動保存機能
//テキストを定める
//一定時間ごとに、テキストの変更があったかどうか確認する
setInterval(function (){
	var text = window.localStorage.getItem("textarea");
	var newtext = document.getElementById("textarea").value;
		if(text === newtext){
			//同じなら何もしない
		}else{
			//違ったら保存して、テキストを新しいものに書き換え
			window.localStorage.setItem("textarea", newtext);
	}
},2000);

function allselect() {
	var textarea = document.getElementById('textarea');
	textarea.focus();
	textarea.setSelectionRange(0 ,textarea.value.length);
}

//選択範囲の行を下に移動するfanc
function selectLineDown(){
	var textarea = document.getElementById('textarea');
	var textlines = textarea.value.split(/\n/);
	var start = textarea.selectionStart;
	var end = textarea.selectionEnd;
	var startlinenum = 0;
	var num = 0;
	for (i=0;i<textlines.length;i++){
		if(start>num-1){
			num = num+textlines[i].length+1;
			startlinenum++;
		}
	}
	var endlinenum = 0;
	var num = 0;
	for (i=0;i<textlines.length;i++){
		if(end>num-1){
			num = num+textlines[i].length+1;
			endlinenum++;
		}
	}
	//alert(textlines[startlinenum]+" , "+textlines[endlinenum]);
	var temp = textlines[endlinenum];
	if(temp === void 0){
		textarea.setSelectionRange(start+1 ,end);
		//textarea.setSelectionRange(start ,end);
	}else{
		var templength = temp.length;
		for(i=0;i<endlinenum-startlinenum+1;i++){
			textlines[endlinenum-i]=textlines[endlinenum-1-i];
			textlines[endlinenum-1-i]=temp;
		}
		textarea.value = textlines.join("\n");
		textarea.setSelectionRange(start+templength+1 ,end+templength+1);
	}
}

//選択範囲の行を上に移動するfanc
function selectLineUp(){
	var textarea = document.getElementById('textarea');
	
	//ーーtextareaを受け取って、[textlines,start,end,startlinenum,endlinenum]を返す関数ーー
	var textlines = textarea.value.split(/\n/);
	var start = textarea.selectionStart;
	var end = textarea.selectionEnd;
	var startlinenum = 0;
	var num = 0;
	for (i=0;i<textlines.length;i++){
		if(start>num-1){
			num = num+textlines[i].length+1;
			startlinenum++;
		}
	}
	var endlinenum = 0;
	var num = 0;
	for (i=0;i<textlines.length;i++){
		if(end>num-1){
			num = num+textlines[i].length+1;
			endlinenum++;
		}
	}

	var temp = textlines[startlinenum-2];
	if(temp === void 0){
		textarea.setSelectionRange(start+1 ,end);
	}else{
		var templength = temp.length;
		for(i=0;i<endlinenum-startlinenum+1;i++){
			textlines[startlinenum-2+i]=textlines[startlinenum-1+i];
			textlines[startlinenum-1+i]=temp;
		}
		textarea.value = textlines.join("\n");
		textarea.setSelectionRange(start-templength-1 ,end-templength-1);
	}
}

//textareaでtabインデントを可能にする
const TAB_STR = '    '
document.addEventListener('keydown', e => {
  if (e.target.tagName !== 'TEXTAREA' || e.keyCode !== 9) return false
  e.preventDefault()
  const slct = { left: e.target.selectionStart, right: e.target.selectionEnd }
  const lineStart = e.target.value.substr(0, slct.left).split('\n').length - 1
  const lineEnd = e.target.value.substr(0, slct.right).split('\n').length - 1
  const lines = e.target.value.split('\n')
  for (const i in lines) {
    if (i < lineStart || i > lineEnd || lines[i] === '') continue
    if (!e.shiftKey) {
      // 行頭にタブ挿入
      lines[i] = TAB_STR + lines[i]
      slct.left += i == lineStart ? TAB_STR.length : 0
      slct.right += TAB_STR.length
    } else if (lines[i].substr(0, TAB_STR.length) === TAB_STR) {
      // 行頭のタブ削除
      lines[i] = lines[i].substr(TAB_STR.length)
      slct.left -= i == lineStart ? TAB_STR.length : 0
      slct.right -= TAB_STR.length
    }
  }
  e.target.value = lines.join('\n')
  e.target.setSelectionRange(slct.left, slct.right)
  return false
})
