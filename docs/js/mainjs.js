shortcut.add("Ctrl+2",function(){
	selectLineDown();
});
shortcut.add("Ctrl+1",function(){
	selectLineUp();
});
shortcut.add("Ctrl+0",function(){
	check();
});
shortcut.add("Ctrl+9",function(){
	checkbox();
});

//ーーtextareaを受け取って、[textlines,start,end,startlinenum,endlinenum]を返す関数ーー
function textData(textarea){
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
	var textdata = [textlines,start,end,startlinenum,endlinenum];
	return textdata;
}

//日付や時間の情報
function getNow() {
	var now = new Date();
	var year = now.getFullYear();
	var mon = now.getMonth() + 1; //１を足すこと
	var day = now.getDate();
	var hour = now.getHours();
	var min = now.getMinutes();

	//出力用
	document.getElementById( "hiduke" ).innerHTML = year + "/" + pluszero(mon) + "/" + pluszero(day);
	document.getElementById("nowtime").innerHTML="現在 " + pluszero(hour) + "時" + pluszero(min) + "分";

	return [year,mon,day,hour,min];
}
function pluszero(num){
	var num = ("0"+(num)).slice(-2);
	return num;
}

//　ローカルストレージからフォームにデータを戻す
document.getElementById("textarea").value = window.localStorage.getItem("textarea") || "";
var now = getNow();
//textareaのtextから、タスク情報を計測
if(alltasktime("✅")==undefined){
	
}else{
	document.getElementById("donetask").innerHTML = Math.floor(alltasktime("✅")[1]/60) + "h" + ("0"+(alltasktime("✅")[1] % 60)).slice(-2) + "m";
	document.getElementById("donetasknum").innerHTML = "✅：" + alltasktime("✅")[0];
}
if(alltasktime("◻️")==undefined){

}else{
	var tasktime = alltasktime("◻️");
	document.getElementById("alltasktime").innerHTML = Math.floor(tasktime[1]/60) + "h" + ("0"+(tasktime[1] % 60)).slice(-2) + "m";
	document.getElementById("tasknum").innerHTML = "◻️：" + tasktime[0];
	var now = getNow();
	var timesum = now[3]*60+now[4]+tasktime[1];
	document.getElementById("endtime").innerHTML = "<b>終了予定<br>"+(Math.floor(timesum/60)) + "時"+pluszero(timesum%60)+"分</b>";
}
if(doingtask()==undefined){

}else{
	var doingdata =doingtask();
	document.getElementById("doingdata").innerHTML = doingdata[0]+"m\/"+doingdata[1]+"m";
}

//textareaの自動調整
const sampleTextarea = document.querySelector('textarea');
sampleTextarea.style.height = sampleTextarea.scrollHeight + "px";
sampleTextarea.addEventListener('input', () => {
	sampleTextarea.style.height = "100px";
	sampleTextarea.style.height = sampleTextarea.scrollHeight + "px";
})



function testfunc(){
	alert(window.pageYOffset);
}

//行頭にチェックボックスを追加
function checkbox(){
		var textarea = document.getElementById('textarea');
	var textdata = textData(textarea);
	var textlines = textdata[0];
	var start = textdata[1];
	var end = textdata[2];
	var startlinenum = textdata[3];
	var endlinenum = textdata[4];
	for(i=startlinenum-1 ; i<=endlinenum-1 ; i++){
		const checkbox = /^◻️/;
		const check1 = /^✔︎/;
		const check2 = /^✅/;
		if(checkbox.test(textlines[i])==true||check1.test(textlines[i])==true||check2.test(textlines[i])==true){
			textarea.setSelectionRange(start ,end);
		}else{
			textlines[i] = "◻️m【" + textlines[i] + "】 @ #";
			textarea.value = textlines.join("\n");
		}
	}
	var selecttop = 0;
	for(i=0;i<startlinenum-1;i++){
		selecttop = selecttop + (textlines[i].length +1);
	}
	textarea.setSelectionRange(selecttop+1 ,selecttop+1);
}
//行頭のチェックボックスをチェック
function check(){
	var textarea = document.getElementById('textarea');
	var textdata = textData(textarea);
	var textlines = textdata[0];
	var start = textdata[1];
	var end = textdata[2];
	var startlinenum = textdata[3];
	var endlinenum = textdata[4];
	const checkbox = /^◻️/;
	const doing = /^▶️/;
	if(checkbox.test(textlines[startlinenum-1])==true){
		if(textarea.value.indexOf("▶️")==-1){
			var lastdonetask = textarea.value.lastIndexOf("✅");
			var donelinenum = 0;
			var num = 0;
			for (i=0;i<textlines.length;i++){
				if(lastdonetask>num-1){
					num = num+textlines[i].length+1;
					donelinenum++;
				}
			}
			var endtimepos = textlines[donelinenum-1].indexOf("【");
			var endtime = textlines[donelinenum-1].substr(endtimepos-5,5);
			var taskname = textlines[startlinenum-1].indexOf("【");
			var taskproarea = textlines[startlinenum-1].substr(taskname);
			var mitumori = textlines[startlinenum-1].substr(0,taskname-1);
			textlines[startlinenum-1] = mitumori.replace("◻️","▶️") + "m " + endtime + "-" + taskproarea;
			textarea.value = textlines.join("\n");
			var cursorpos = textarea.value.indexOf("▶️")+mitumori.length+8;
			textarea.setSelectionRange(cursorpos ,cursorpos);
		}else{
			//実行中のタスク行の取得
			var doingtask = textarea.value.lastIndexOf("▶️");
			var doinglinenum = 0;
			var num = 0;
			for (i=0;i<textlines.length;i++){
				if(doingtask>num-1){
					num = num+textlines[i].length+1;
					doinglinenum++;
				}
			}
			//カーソル行はstartlinenum
			
			//終了時刻が入力されてるかどうか
			if(textlines[doinglinenum-1].indexOf("-【")==-1){
				//終了時刻が入力されていれば、
				function chuudan(textline,doingline,startlinenum){
				
				}
				var tasknamepos = textlines[doinglinenum-1].indexOf("【");
				var tasknameend = textlines[doinglinenum-1].indexOf("】");
				var mitumori = Number(textlines[doinglinenum-1].substr(0,tasknamepos-13).replace(/(.*?)▶️/,""));
				var kaishih = Number(textlines[doinglinenum-1].substr(tasknamepos-11,2));
				var kaishim = Number(textlines[doinglinenum-1].substr(tasknamepos-8,2));
				var shuuryouh = Number(textlines[doinglinenum-1].substr(tasknamepos-5,2));
				var shuuryoum = Number(textlines[doinglinenum-1].substr(tasknamepos-2,2));
				var jisseki = (shuuryouh*60+shuuryoum)-(kaishih*60+kaishim);
				var sabun = 0;
				if(mitumori-jisseki<0){
				}else{
					sabun = mitumori-jisseki;
				};
				textlines[doinglinenum-1] = "⏸"+jisseki+"m\/"+ textlines[doinglinenum-1].substr(0,tasknameend).replace("▶️","")+"（中断）"+textlines[doinglinenum-1].substr(tasknameend)+"\n◻️"+sabun+"m"+textlines[doinglinenum-1].substr(tasknamepos-0,tasknameend-tasknamepos)+"（再開）"+textlines[doinglinenum-1].substr(tasknameend);
				textarea.value = textlines.join("\n");
				var startnamepos = textlines[startlinenum-1].indexOf("【");
				textlines[startlinenum-1] = textlines[startlinenum-1].substr(0,startnamepos).replace("◻️","▶️")+" "+pluszero(shuuryouh)+":"+pluszero(shuuryoum)+"-"+textlines[startlinenum-1].substr(startnamepos);
				textarea.value = textlines.join("\n");
				var mitumoripos = textlines[startlinenum-1].substr(0,startnamepos-1);
				var cursorpos = textarea.value.indexOf("▶️")+mitumoripos.length+8;
				textarea.setSelectionRange(cursorpos ,cursorpos);
			}else{
				//書かれていなければ、まずは終了時刻を記入
				var now = getNow();
				//▶️20m 10:30-【タスク名がここに書かれます】@ +
				var tasknamepos = textlines[doinglinenum-1].indexOf("【");
				var tasknameend = textlines[doinglinenum-1].indexOf("】");
				textlines[doinglinenum-1] = textlines[doinglinenum-1].substr(0,tasknamepos)+pluszero(now[3])+":"+pluszero(now[4])+textlines[doinglinenum-1].substr(tasknamepos);
				//▶️20m 10:30-【タスク名がここに書かれます】@ +
				var tasknamepos = textlines[doinglinenum-1].indexOf("【");
				var tasknameend = textlines[doinglinenum-1].indexOf("】");
				var mitumori = Number(textlines[doinglinenum-1].substr(0,tasknamepos-13).replace(/(.*?)▶️/,""));
				var kaishih = Number(textlines[doinglinenum-1].substr(tasknamepos-11,2));
				var kaishim = Number(textlines[doinglinenum-1].substr(tasknamepos-8,2));
				var shuuryouh = Number(textlines[doinglinenum-1].substr(tasknamepos-5,2));
				var shuuryoum = Number(textlines[doinglinenum-1].substr(tasknamepos-2,2));
				var jisseki = (shuuryouh*60+shuuryoum)-(kaishih*60+kaishim);
				var sabun = 0;
				if(mitumori-jisseki<0){
				}else{
					sabun = mitumori-jisseki;
				};
				textlines[doinglinenum-1] = "⏸"+jisseki+"m\/"+ textlines[doinglinenum-1].substr(0,tasknameend).replace("▶️","")+"（中断）"+textlines[doinglinenum-1].substr(tasknameend)+"\n◻️"+sabun+"m"+textlines[doinglinenum-1].substr(tasknamepos-0,tasknameend-tasknamepos)+"（再開）"+textlines[doinglinenum-1].substr(tasknameend);
				
				var startnamepos = textlines[startlinenum-1].indexOf("【");
				textlines[startlinenum-1] = textlines[startlinenum-1].substr(0,startnamepos).replace("◻️","▶️")+" "+pluszero(shuuryouh)+":"+pluszero(shuuryoum)+"-"+textlines[startlinenum-1].substr(startnamepos);
				textarea.value = textlines.join("\n");
				var mitumoripos = textlines[startlinenum-1].substr(0,startnamepos-1);
				var cursorpos = textarea.value.indexOf("▶️")+mitumoripos.length+8;
				textarea.setSelectionRange(cursorpos ,cursorpos);
			}
		}
	}else if(doing.test(textlines[startlinenum-1])==true){
		if(textarea.value.indexOf("-【")==-1){
			//あらかじめ記入されてる終了時刻と開始時刻から実績を計算して記入
			var taskname = textlines[startlinenum-1].indexOf("【");
			var shuryomin = textlines[startlinenum-1].substr(taskname-2,2);
			var shuryoh = textlines[startlinenum-1].substr(taskname-5,2);
			var kaishimin = textlines[startlinenum-1].substr(taskname-8,2);
			var kaishih = textlines[startlinenum-1].substr(taskname-11,2);
			var jisseki = (Number(shuryoh)*60+Number(shuryomin))-(Number(kaishih)*60+Number(kaishimin))
			textlines[startlinenum-1] = "✅"+jisseki+"m/"+textlines[startlinenum-1].substr(taskname-15);
			textarea.value = textlines.join("\n");
			textarea.setSelectionRange(start + 4 ,end + 4);

		}else{
			//現在時刻を終了時刻欄に記入し、実績を計算して記入
			var now = getNow();
			var taskname = textlines[startlinenum-1].indexOf("【");
			var kaishipos = textlines[startlinenum-1].indexOf("m ");
			var kaishihour = Number(textlines[startlinenum-1].substr(kaishipos+2,2));
			var kaishimin = Number(textlines[startlinenum-1].substr(kaishipos+5,2));
			var jisseki = (now[3]*60+now[4])-(kaishihour*60+kaishimin);
			textlines[startlinenum-1] = "✅"+jisseki+"m/"+textlines[startlinenum-1].substr(0,taskname).replace("▶️","")+pluszero(now[3])+":"+pluszero(now[4])+textlines[startlinenum-1].substr(taskname);
			textarea.value = textlines.join("\n");
			textarea.setSelectionRange(start + 9 ,end + 9);
		}
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

//タスクの見積もり時間や実績時間を計算して返すfunc
function alltasktime(checkbox){
	var now = getNow();
	
	var textareatext = document.getElementById("textarea").value;
	var myregex = new RegExp(checkbox+"\[0-9\]\+m", "g");
	var tasks = textareatext.match(myregex);
	//alert(textareatext);
	if(tasks==null){
	
	}else{
		for(i=0;i<tasks.length;i++){
			tasks[i] = tasks[i].replace(checkbox,"").replace("m","");
			tasks[i] = Number(tasks[i]);
		}
		function sum(array) {
			// 合計を格納する変数
			var sum = 0;
			// 配列の長さまで
			for(var i = 0; i < array.length; i++) {
			// ひとつずつ足していく
			sum += array[i];
			}
			// 結果を返却
			return sum;
		}
		var alltasktime = [tasks.length,sum(tasks)];
		return alltasktime;
	}
}

//自動保存機能
//テキストを定める
//一定時間ごとに、テキストの変更があったかどうか確認する
setInterval(function (){
	getNow();
	var text = window.localStorage.getItem("textarea");
	var newtext = document.getElementById("textarea").value;
	if(text === newtext){
		//同じなら何もしない
	}else{
		//違ったら保存して、テキストを新しいものに書き換え
		window.localStorage.setItem("textarea", newtext);
		//タスクを計測し直す
		if(alltasktime("✅")== undefined){
		
		}else{
		document.getElementById("donetask").innerHTML = Math.floor(alltasktime("✅")[1]/60) + "h" + ("0"+(alltasktime("✅")[1] % 60)).slice(-2) + "m";
		document.getElementById("donetasknum").innerHTML = "✅：" + alltasktime("✅")[0];
		}
		var now = getNow();
		if(alltasktime("◻️")== undefined){
		
		}else{
		var tasktime = alltasktime("◻️");
		var timesum = now[3]*60+now[4]+tasktime[1];
		document.getElementById("endtime").innerHTML = "<b>終了予定<br>"+(Math.floor(timesum/60)) + "時"+(pluszero(timesum%60))+"分</b>";
		document.getElementById("alltasktime").innerHTML = Math.floor(tasktime[1]/60) + "h" + ("0"+(tasktime[1] % 60)).slice(-2) + "m";
		document.getElementById("tasknum").innerHTML = "◻️：" + tasktime[0];
		}
		var doingdata = doingtask();
		if(doingdata== undefined){
		
		}else{
		document.getElementById("doingdata").innerHTML = doingdata[0]+"m\/"+doingdata[1]+"m";
		}
	}
},2000);
function doingtask(){
	var textarea = document.getElementById('textarea');
	var textdata = textData(textarea);
	var textlines = textdata[0];
	var doing = textarea.value.indexOf("▶️");
	var doinglinenum = 0;
	var num = 0;
	for (i=0;i<textlines.length;i++){
		if(doing>num-1){
			num = num+textlines[i].length+1;
			doinglinenum++;
		}
	}
	if(doinglinenum==0){
	
	}else{
	var doingpos = textlines[doinglinenum-1].indexOf("▶️");
	var mitumorimpos = textlines[doinglinenum-1].indexOf("m ");
	var mitumori = textlines[doinglinenum-1].substr(doingpos+1, mitumorimpos-1);
	var kaishih = Number(textlines[doinglinenum-1].substr(mitumorimpos+2,2));
	var kaishim = Number(textlines[doinglinenum-1].substr(mitumorimpos+5,2));
	var jikkouchu = (now[3]*60+now[4])-(kaishih*60+kaishim)
	var doingdata = [jikkouchu,mitumori];
	return doingdata;
	}
}


//全てのテキストを選択 
function allselect() {
	var textarea = document.getElementById('textarea');
	textarea.focus();
	textarea.setSelectionRange(0 ,textarea.value.length);
}

//選択範囲の行を下に移動するfanc
function selectLineDown(){
	var textarea = document.getElementById('textarea');
	var textdata = textData(textarea);
	var textlines = textdata[0];
	var start = textdata[1];
	var end = textdata[2];
	var startlinenum = textdata[3];
	var endlinenum = textdata[4];
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
	var textdata = textData(textarea);
	var textlines = textdata[0];
	var start = textdata[1];
	var end = textdata[2];
	var startlinenum = textdata[3];
	var endlinenum = textdata[4];
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

	window.addEventListener('scroll',function() {
		var header = document.getElementById("header");
		header.style.top = (window.pageYOffset)+"px";
		var taskchute = document.getElementById("taskchute");
		taskchute.style.top = (window.pageYOffset+50)+"px";
	});
