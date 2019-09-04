
//　ローカルストレージからフォームにデータを戻す
document.getElementById("textarea").value = window.localStorage.getItem("textarea") || "";

//textareaの自動調整
const sampleTextarea = document.querySelector('textarea');
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