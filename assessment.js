'use strict';

const userNameInput    = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided    = document.getElementById('result-area');
const tweetDivision    = document.getElementById('tweet-area');


assessmentButton.onclick =() => {
  const username = userNameInput.value;
  if (username.length === 0){
    return;
    //上記は処理を終了するコマンド 通称ガード句
  }
    //console.log(username); 動作確認
  //headerDividedの作成
  resultDivided.innerText = '';//前回の診断結果の枠（result）を空にする
  const headerDivided = document.createElement('div');//divタグをhtmlからではなくプログラミングの方から書くことによってそれぞれの名前に対して別の回答をできるようになる
  headerDivided.setAttribute('class', 'card-header');
  headerDivided.innerText = '診断結果'//上記のh３タグの中に記入する内容の編集
  resultDivided.appendChild (headerDivided); //apppendchild(解答をディスプレイに表示したい文章）

  //bodyDividedの作成
  const bodyDivided = document.createElement('div');
  bodyDivided.setAttribute('class', 'card-body');
  const paragraph = document.createElement('p');
  paragraph.setAttribute('class', 'card-text')
  const result = assessment(username);//assessment(username)　＝　検証(ユーザー名) 数字の配列に応じて結果(名：result)を取得
  paragraph.innerText = result;//診断結果をPタグの中に記入（この状態ではまだ画面には表示されない）
  bodyDivided.appendChild (paragraph);  //診断結果を（appendChildを通して）画面に表示
  //resultDivided に card スタイルを追加
  resultDivided.setAttribute('class', 'card');
  resultDivided.setAttribute('stile', 'max-width: 700px');
  //headerDivided　と　bodyDivided　を　resultDivided に差し込む
  resultDivided.appendChild(headerDivided);
  resultDivided.appendChild(bodyDivided);

  //ツイートエリアの作成
  //下記のようにリンクを分析し構築し直しことをリバースエンジニアリングという
  tweetDivision.innerText = '';
  const anchor = document.createElement('a');
  const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag=あなたのいいところ&ref_src=twsrc%5Etfw';
  anchor.setAttribute('href', hrefValue);//anchorの略称はaタグ
  anchor.setAttribute('class', 'twitter-hashtag-button');
  anchor.setAttribute('data-text', result);
  anchor.innerText = 'Tweet #あなたのいいところ';
  tweetDivision.appendChild(anchor);//質問　リンクを二つ以上貼る場合はどのようにanchorを使絵ばいい？

  const script = document.createElement('script');
  script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
  tweetDivision.appendChild(script);
}


//下記のプログラムは邪魔な配列を画面に先に表示し後に消すことができたらtrue、できなければfalseを返す式（まだconsoleへの記入は成功していない）
//<p>邪魔な配列です。プログラミングを起動して消しなさい。</p>　←これはHTMLに記入する文字列
//tweetDivision.innerText = '';
//if (tweetDivision.length === 0){
//  console.log('うまく作動しました')
//} else {
//  console.log('作動しませんでした。検証してください')
//}


//下記の文章はtruthyの性質を持っているかfalsyの性質を持っているかを判断することができる分別用の式。
//if (-1){
//  console.log('truthy')
//} else {
//  console.log('falsy')
//}



const answers = [
'###userName###のいいところは声です。###userName###の特徴的な声は皆を惹きつけ、心に残ります。',
'###userName###のいいところはまなざしです。###userName###に見つめられた人は、気になって仕方がないでしょう。',
'###userName###のいいところは情熱です。###userName###の情熱に周りの人は感化されます。',
'###userName###のいいところは厳しさです。###userName###の厳しさがものごとをいつも成功に導きます。',
'###userName###のいいところは知識です。博識な###userName###を多くの人が頼りにしています。',
'###userName###のいいところはユニークさです。###userName###だけのその特徴が皆を楽しくさせます。',
'###userName###のいいところは用心深さです。###userName###の洞察に、多くの人が助けられます。',
'###userName###のいいところは見た目です。内側から溢れ出る###userName###の良さに皆が気を惹かれます。',
'###userName###のいいところは決断力です。###userName###がする決断にいつも助けられる人がいます。',
'###userName###のいいところは思いやりです。###userName###に気をかけてもらった多くの人が感謝しています。',
'###userName###のいいところは感受性です。###userName###が感じたことに皆が共感し、わかりあうことができます。',
'###userName###のいいところは節度です。強引すぎない###userName###の考えに皆が感謝しています。',
'###userName###のいいところは好奇心です。新しいことに向かっていく###userName###の心構えが多くの人に魅力的に映ります。',
'###userName###のいいところは気配りです。###userName###の配慮が多くの人を救っています。',
'###userName###のいいところはその全てです。ありのままの###userName###自身がいいところなのです。',
'###userName###のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる###userName###が皆から評価されています。'
];


/**
 * 名前の文字列を渡すと診断結果を返す関数
 * ＠param{string} username ユーザーの名前
 * ＠param{return}　診断結果
 */
function assessment(userName){
  //全文字のコード番号の取得と合算
  let sumOfCharCode = 0; 
  for (let i = 0; i<userName.length; i++){
    sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
  }
  //文字コードの番号の合計を添え字の数で割って添字の数値を求め
  const index = sumOfCharCode % answers.length //0~answers.length - 1 の数値になる
  const result = answers[index];
  const resultUserName = result.replaceAll('###userName###', userName);
  //TODO
  return resultUserName;
}
console.assert(
  assessment ('根布晴希') === '根布晴希のいいところは好奇心です。新しいことに向かっていく根布晴希の心構えが多くの人に魅力的に映ります。',
);
console.assert(
  assessment ('根布晴希') === assessment ('根布晴希'),
  '同じ名前で診断をした場合に、診断の結果が一致しません'
)


userNameInput.onkeydown = event => {
  if (event.key === 'Enter');
  assessmentButton.onclick();//診断するという名前で登録したボタンを押した時と同じ関数を実行
}